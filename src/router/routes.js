import MSite from "../pages/MSite/MSite.vue";
import Search from "../pages/Search/Search.vue";
import Order from "../pages/Order/Order.vue";
import Profile from "../pages/Profile/Profile.vue";
import Login from "../pages/Login/Login";
import Shop from '@/pages/Shop/Shop'
import Goods from '@/pages/Shop/Goods/Goods'
import Ratings from '@/pages/Shop/Ratings/Ratings'
import Info from '@/pages/Shop/Info/Info'


export default [
  /*
     四个一级路由 
    takeOut 外卖
    search 搜索
    order 订单
    myCenter 我的中心
    */
    //   注册路由 
    //只有这四个路由需要展示footerNav其他都不需要
    //所以只需要在这四个路由组件中传特定的路由元参数就行
    // meta路由元参数本质就是路由组件对象携带的参数
    //meta存在于$route上
    //meta必须是对象 从meta中取出属性值
    { 
      name: 'MSite',
      path: '/msite',
      component: MSite,
      meta:{
        isShowFooter:true
      }
    },
    {
      name: 'Search',
      path: '/search',
      component: Search,
      meta:{
        isShowFooter:true
      }
    },
    { 
      name: 'Order',
      path: '/order',
      component: Order,
      meta:{
        isShowFooter:true
      }
    },
    {
      name: 'Profile',
      path: '/profile',
      component: Profile,
      meta:{
        isShowFooter:true
      }
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      path:'/shop',
      component: Shop,
      children:[
        {
          path:'/shop/goods',
          component:Goods
        },
        {
          path:'/shop/ratings',
          component:Ratings
        },
        {
          path:'info',
          component:Info
        }
      ]
    },
    { //在初始化页面给个重定向 定向到首页
      path:'/',
      redirect:'/msite'
    }
]