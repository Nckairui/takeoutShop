//创建路由器对象
import Vue from 'vue';
import vueRouter from 'vue-router';
import TakeOut from "../pages/TakeOut.vue";
import Search from "../pages/Search.vue";
import Order from "../pages/Order.vue";
import MyCenter from "../pages/MyCenter.vue";

//注意必须让Vue声明使用vueRouter插件
Vue.use(vueRouter);

export default new vueRouter({
  routes: [
    /*
     四个一级路由 
    takeOut 外卖
    search 搜索
    order 订单
    myCenter 我的中心
    */
    //   注册路由 
    { 
      name: 'takeOut',
      path: '/takeout',
      component: TakeOut
    },
    {
      name: 'search',
      path: '/search',
      component: Search
    },
    { 
      name: 'order',
      path: '/order',
      component: Order
    },
    {
      name: 'myCenter',
      path: '/mycenter',
      component: MyCenter
    }
  ]
})