import Vue from 'vue';
import App from '../App.vue';
import { createRouter } from '../route';
import VueMeta from 'vue-meta';
import { createStore } from '../vuex/store';
import { getClientAxios } from "../util/getAxios";

Vue.config.productionTip = false;

Vue.use(VueMeta);

const router = createRouter(); //创建路由

const store = createStore(getClientAxios());

if (window.context && window.context.state) {
  store.replaceState(window.context.state);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#root', true);
