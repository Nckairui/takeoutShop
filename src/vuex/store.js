//创建vuex核心对象store 并暴露
import Vue from 'vue';
import Vuex from 'vuex';

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//声明使用Vuex插件
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})