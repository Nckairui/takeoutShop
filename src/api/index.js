//包含n个请求接口函数的模块

import axios from './myAxios';


//1、根据经纬度获取位置详情  latitude维度 longitude经度
export const reqAddress = (latitude,longitude) => axios.get(`/position/${latitude},${longitude}`);

//2、获取食品分类列表
export const reqFoodCategoryList = () => axios.get('/index_category')

//3、根据经纬度获取商铺列表
export const reqShopList = ({latitude,longitude})=> axios.get('/shops',{params:{latitude,longitude}})
