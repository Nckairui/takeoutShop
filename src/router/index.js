//创建路由器对象
import Vue from 'vue';
import vueRouter from 'vue-router';
import routes from './routes';

//注意必须让Vue声明使用vueRouter插件
Vue.use(vueRouter);

export default new vueRouter({
  mode:'history',
  routes
})