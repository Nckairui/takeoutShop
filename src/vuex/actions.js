/* 
包含n个间接更新状态的方法(能进行异步操作(发请求) 逻辑代码)
*/
import {SET_ADDRESS,SET_CATEGORYS,SET_SHOPS,SAVE_USER,SAVE_TOKEN} from './mutation-type';
import { reqAddress, reqFoodCategoryList, reqShopList, reqAutoLogin} from '../api';
export default {
  async getAddress({commit,state}){
    //发请求 根据经纬获取当前位置
    const {latitude,longitude} = state
    const result = await reqAddress(latitude,longitude);
    const {code,data} = result
    if(code === 0){
      commit(SET_ADDRESS,data);
    }
  },
  //async getFoodCategoryList({commit},callback){
  async getFoodCategoryList({commit}){
    //发请求 获取商品列表信息
    const result = await reqFoodCategoryList();
    const {code,data} = result
    if(code === 0){
      commit(SET_CATEGORYS,data); //注意这里的commit mutation是同步的 在这个下面相当于状态数据已经变了
      //但页面还没有变
      //在数据成功回来后 调用nextTick等待页面更新
      //typeof callback === 'function' && callback();//只有传了callback并且是函数 才会调用
    }
  },
  async getShopList({commit,state}){
    //发请求 获取商店列表信息
    const {latitude,longitude} = state
    const result = await reqShopList({latitude,longitude});
    const {code,data} = result
    if(code === 0){
      commit(SET_SHOPS,data);
    }
  },
  //将个人信息 与 token分别 存入状态中
  saveUser({commit},user){
    let token = user.token;   
    //将token保存到localStorage中 完成七天免登录
    localStorage.setItem('token_key',token);
    delete user.token;
    commit(SAVE_USER,user);
    commit(SAVE_TOKEN,token);
  },
  //自动登录的异步action 保存数据 
  async autoLogin({commit,state}){
    if(state.token && !state.user._id){
      //有token说明之前登录过 七天免登录 但是没有用户信息 所以是关闭浏览器了(因为用户信息没有保存到localstorage中 所以需要自动登录)
      const result = await reqAutoLogin()
      const {code,data,msg} = result;
      if(code === 0){
        //代表成功 保存用户信息
        commit(SAVE_USER,data);
      }
    }
  },
  clearUser({commit}){
    localStorage.removeItem('token_key');
    commit(SAVE_USER,{});
    commit(SAVE_TOKEN,'');
  }
}
