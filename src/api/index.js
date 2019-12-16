//包含n个请求接口函数的模块

import axios from './myAxios';


//1、根据经纬度获取位置详情  latitude维度 longitude经度
export const reqAddress = (latitude,longitude) => axios.get(`/position/${latitude},${longitude}`);

//2、获取食品分类列表
export const reqFoodCategoryList = () => axios.get('/index_category',{
  header:{
    //添加请求头参数
    needToken:true
  }
})

//3、根据经纬度获取商铺列表
export const reqShopList = ({latitude,longitude})=> axios.get('/shops',{params:{latitude,longitude},
  headers:{
    needToken:true
  }
})

//4. 发送短信验证码
export const reqSendCode = (phone)=> axios.get('/sendcode',{
  params:{
    phone
  }
})
//5. 手机号验证码登陆
export const reqLoginBySms = ({phone,code})=> axios.post('/login_sms',{
  phone,
  code
})
//6、用户名密码登陆
export const reqLoginByPwd = ({name,pwd,captcha})=> axios.post('/login_pwd',{
  name,
  pwd,
  captcha
})

//7. 自动登录
export const reqAutoLogin = ()=> axios.get('/auto_login')