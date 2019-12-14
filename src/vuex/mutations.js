/* 
包含n个直接更新状态的方法(不能进行异步操作 逻辑代码)
*/
import {SET_ADDRESS,SET_CATEGORYS,SET_SHOPS} from './mutation-type';
export default {
  [SET_ADDRESS](state,address){
    state.address = address;
  },
  [SET_CATEGORYS](state,categorys){
    state.categorys = categorys;
  },
  [SET_SHOPS](){
    state.shops = shops;
  }
}