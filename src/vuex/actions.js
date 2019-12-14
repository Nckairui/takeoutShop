/* 
包含n个间接更新状态的方法(能进行异步操作(发请求) 逻辑代码)
*/
import {SET_ADDRESS,SET_CATEGORYS,SET_SHOPS} from './mutation-type';
import { reqAddress, reqFoodCategoryList, reqShopList} from '../api';
export default {
  async getAddress({commit,state}){
    //发请求 根据经纬获取当前位置
    const {latitude,longitude} = state
    const result = await reqAddress(latitude,longitude);
    const {code,data,error} = result
    if(code === 0){
      console.log(data)
      commit(SET_ADDRESS,data);
    }
  },
  async getFoodCategoryList({commit}){
    //发请求 获取商品列表信息
    const result = await reqFoodCategoryList();
    const {code,data,error} = result
    if(code === 0){
      commit(SET_CATEGORYS,data);
    }
  },
  async getShopList({commit,state}){
    //发请求 获取商店列表信息
    const {latitude,longitude} = state
    const result = await reqShopList({latitude,longitude});
    const {code,data,error} = result
    if(code === 0){
      commit(SET_SHOPS,data);
    }
  }
}
