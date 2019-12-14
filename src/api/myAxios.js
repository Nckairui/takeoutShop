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


const instance = axios.create({
  baseURL:'/api',
  timeout: 20000 //延迟时间 超过20s请求是啊比
})

//请求拦截器
instance.interceptors.request.use((config)=>{
  //config 是请求时的配置对象 请求时包含的所有信息数据都在config中
  //将拦截下来的config中的data请求体参数转变成urlencoded类型参数 因为服务器没设置处理json类型的参数
  const data = config.data
  if(data instanceof Object){
    //如果是对象形式(json) 就转换成urlencoded
    config.data = qs.stringify(data)
  }
  return config;//需要return出config才能发出请求
})

//响应拦截器
instance.interceptors.response.use(
  response=>{
    return response.data
  },
  error=>{

    //拦截下来 统一处理异常
    alert('请求失败'+error.message);
    return new Promise(()=>{}) //返回一个pendding状态的promise 中断promise链 
  })

  export default instance;