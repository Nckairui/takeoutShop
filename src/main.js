import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由器 
import 'lib-flexible' // flexible会自动根据设备情况动态设置rem的值的大小
import { Tabbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'// 引入mint-ui组件




//全局注册组件
Vue.component(Tabbar.name,Tabbar); //组件标签名mt-tabbar
Vue.component(TabItem.name,TabItem); //组件标签名 mt-tab-item
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);


Vue.config.productionTip = false;// 不显示 不是生产模式的提示

new Vue({
  render: h => h(App),
  router //注册路由器
}).$mount('#app')
