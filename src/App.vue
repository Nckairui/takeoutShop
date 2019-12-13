<template>
  <div class="app">
  <router-view></router-view>
    <mt-tabbar v-model="selected" value="takeOut">
    <router-link :to="{name:'takeOut'}" class="footer-link">
       <mt-tab-item id="takeOut">
        <p class="iconfont icon-ziyuan"></p>
        外卖
       </mt-tab-item>
    </router-link>
    <router-link :to="{name:'search'}" class="footer-link">
     <mt-tab-item id="search">
      <p class="iconfont icon-sousuo"></p>
        搜索
      </mt-tab-item>
    </router-link>
    <router-link :to="{name:'order'}" class="footer-link">
      <mt-tab-item id="order">
      <p class="iconfont icon-icon"></p>
      订单
      </mt-tab-item>
    </router-link>
    <router-link :to="{name:'myCenter'}" class="footer-link">
      <mt-tab-item id="myCenter">
        <p class="iconfont icon-geren"></p>
      我的
      </mt-tab-item>
    </router-link>
  </mt-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selected:{}
    }
  }
  
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './common/stylus/mixins.styl'
  $color = green
  .router-link-active
    color $color !important 
  .app
    width 100%
    height 100%
    .footer-link
      width 25%
      .iconfont
        font-size 25px
        margin 5px
        
  
   

    
</style>
