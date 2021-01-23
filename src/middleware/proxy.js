import proxy from 'koa-server-http-proxy';

export const proxyHanlder = (app)=>{
    app.use(proxy('/api', {
        target: 'https://geoapi.qweather.com', //网上寻找的开放API接口,支持返回地理数据.如果发现本接口失效了,可以将本页面target和vuex/store.js的getList方法换上新接口地址
        pathRewrite: { '^/api': '' },
        changeOrigin: true
    }));
}

  