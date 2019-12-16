import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由器 
import 'lib-flexible' // flexible会自动根据设备情况动态设置rem的值的大小
import store from './vuex/store' // 注册store
import './validate' //引入validate验证器 只是让他执行一次 
import Star from './components/Star/Star'
import i18n from './i18n';
import { Button } from 'mint-ui';
import * as API from '@/api' //使用暴露的另一种写法将所有暴露的数据 放到一个API对象中



Vue.prototype.$API = API; //将API挂载到Vue的原型对象上 使每个组件对象都能看到

Vue.component('Star',Star); //全局注册组件
Vue.component(Button.name,Button);
Vue.config.productionTip = false;// 不显示 不是生产模式的提示

new Vue({
  render: h => h(App),

  //注册路由器 全局可以通过this组件对象可以看到 $router路由器对象 $route当前路由对象
  router,

  i18n,

  //注册store  vuex的核心对象 全局可以通过this 组件对象 看到$store
  store
}).$mount('#app')
