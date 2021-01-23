import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore(_axios) {
  return new Vuex.Store({
    state: {
      list: [],
      name: 'kay',
    },
    actions: {
      getList({ commit }, params) {
          const url = '/api/v2/city/lookup?location=guangzhou&key=9423bb18dff042d4b1716d084b7e2fe0';
          return _axios.get(url).then((res)=>{
            commit("setList",res.data.location); 
          })
      },
    },
    mutations: {
      setList(state, data) {
        state.list = data || [];
      },
    },
  });
}
