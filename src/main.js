import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由器 
import 'lib-flexible' // flexible会自动根据设备情况动态设置rem的值的大小
import store from './vuex/store' // 注册store







Vue.config.productionTip = false;// 不显示 不是生产模式的提示

new Vue({
  render: h => h(App),
  router, //注册路由器 全局可以通过this组件对象可以看到 $router路由器对象 $route当前路由对象
  store //注册store  vuex的核心对象 全局可以通过this 组件对象 看到$store
}).$mount('#app')
