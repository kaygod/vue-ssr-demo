import Koa2 from 'koa';
import staticFiles from 'koa-static';
import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';
import App from './App.vue';
import VueMeta from 'vue-meta';
import { createRouter, routerReady } from './route';
import { createStore } from './vuex/store';
import { sync } from 'vuex-router-sync';
import { getServerAxios } from "./util/getAxios";
import { proxyHanlder } from "./middleware/proxy";

Vue.use(VueMeta);

const renderer = createRenderer();

const app = new Koa2();

/**
 * 静态资源直接返回
 */
app.use(staticFiles('public'));

/**
 * 做接口转发
 */
proxyHanlder(app);

/**
 * 应用接管路由
 */
app.use(async function(ctx) {
  const req = ctx.request;

  //图标直接返回
  if (req.path === '/favicon.ico') {
    ctx.body = '';
    return false;
  }

  const router = createRouter(); //创建路由

  const store = createStore(getServerAxios(ctx)); //创建数据仓库

  // 同步路由状态(route state)到 store
  sync(store, router);

  const vm = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  const meta_obj = vm.$meta(); // 生成的头信息

  router.push(req.url);

  // 等到 router 将可能的异步组件和钩子函数解析完
  await routerReady(router);

  const matchedComponents = router.getMatchedComponents();

  if (!matchedComponents.length) {
    ctx.body = '没有找到该网页,404';
    return;
  }

  ctx.set('Content-Type', 'text/html;charset=utf-8');

  let htmlString;

  const context = { title: 'hello' }; //创建一个上下文对象

  try {
    await Promise.all(
      matchedComponents.map((Component) => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
          });
        }
      })
    );
    htmlString = await renderer.renderToString(vm, context);
  } catch (error) {
    console.error(err);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
  const result = meta_obj.inject();
  const { title, meta } = result;

  ctx.body = `<html>
  <head>
   ${title ? title.text() : ''}
   ${meta ? meta.text() : ''}
   ${context.styles ? context.styles : ''}
  </head>
    <body>
      ${htmlString}
      <script>
         var context = {
           state: ${JSON.stringify(store.state)}
         }
      </script>
      <script src="./index.js"></script>
    </body>
  </html>`;
});

app.listen(3000);
