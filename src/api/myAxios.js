//封装axios 添加请求拦截器 响应拦截器
/* 
对axio进行2次封装一个能发ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

import axios from 'axios';
import qs from 'qs' //query-string 可以将json参数变为urlencoded参数的库
import { Indicator,MessageBox,Toast } from 'mint-ui'; //引入mint-ui组件
import store from '@/vuex/store';
import router from '@/router'

const instance = axios.create({
  baseURL:'/api',
  timeout: 20000 //延迟时间 超过20s请求是啊比
})

//请求拦截器
instance.interceptors.request.use((config)=>{
  Indicator.open() //请求时展示loading效果
  //config 是请求时的配置对象 请求时包含的所有信息数据都在config中
  //将拦截下来的config中的data请求体参数转变成urlencoded类型参数 因为服务器没设置处理json类型的参数
  const data = config.data
  if(data instanceof Object){
    //如果是对象形式(json) 就转换成urlencoded
    config.data = qs.stringify(data)
  }
  //添加请求头参数 token 如果状态中有token就携带过去 没有就不携带
  let token = store.state.token;
  if(token){
    config.headers.Authorization = token
  }else{
    if(config.headers.needToken){
      //没有携带token,并且还需要token根本不用发请求 直接返回一个失败的promise或者抛出一个异常 
      throw new Error('没有权限,请登录')
    }
  }
  

  return config;//需要return出config才能发出请求
})

//响应拦截器 
instance.interceptors.response.use(
  response=>{
    Indicator.close(); // 成功时关闭loading效果
    return response.data
  },
  error=>{
    console.log(error.response)
    Indicator.close(); // 失败时关闭loading效果
    //拦截下来 统一处理异常
    //alert('请求失败'+error.message);

    //如果是两次请求则会跳转到login 再跳转login 第二的跳转不必要 所以可以加一个判断
    
    //如果是需要token的请求分为三种情况 没有token 有token过期了  有token没过期(正常)
    //判断 如果是需要token的请求 
    //如果是没有携带token
    let path;
    if(!error.response){
      //在不是路由组件的地方可以拿到当前路由对象 可以从这个路由对象中拿到path
      path = router.currentRoute.path
      if(path !== '/login'){
          //打回登录界面
        router.replace('/login')
         //如果失败了 但没有失败的响应 说明没有发请求 而是需要token结果没携带token 抛出了一个异常
        Toast(error.message);
      }
 
    }else{
      if(error.response.status == 401){
        //这种情况是 发请求了 但是token过期了 需要清除数据 打回登录页面
        store.dispatch("clearUser");
        path = router.currentRoute.path
        if(path !== '/login'){
          router.replace('/login')
          Toast('登录失效,请重新登录');
        }
        
      }else if(error.response.status == 404){
        MessageBox('提示','请求的资源不存在');
      }else{
        MessageBox('提示',error.message + '请求有误,请重试');
      }
    }

  




    return new Promise(()=>{}) //返回一个pendding状态的promise 中断promise链 
  })

  export default instance;