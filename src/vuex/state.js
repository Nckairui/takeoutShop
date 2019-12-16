/* 
包含n个状态属性数据
*/

export default {
  latitude: 40.10038, //维度
  longitude: 116.36867, //经度
  address:'',//请求回的当前地址
  categorys:[], //商品分类列表
  shops:[], //商店列表
  user:{}, //个人信息
  token: localStorage.getItem('token_key') || '' //token 个人标识 用于登录验证 初始值从localStorage中取出 看有没有没有就给个空字符串作为初始值 标识还没有登录
}