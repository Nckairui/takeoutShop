<template>
  <footer>
    <div class="footer-nav">
      <span class="footer-item" :class="{on:$route.path === '/msite'}" @click="goto('/msite')">
        <i class="iconfont icon-unie65b"></i>
        <span>首页</span>
      </span>
      <span class="footer-item" :class="{on:$route.path === '/search'}" @click="goto('/search')">
        <i class="iconfont icon-sousuo"></i>
        <span>搜索</span>
      </span>
      <span class="footer-item" :class="{on:$route.path === '/order'}" @click="goto('/order')">
        <i class="iconfont icon-icon"></i>
        <span>订单</span>
      </span>
      <span class="footer-item" :class="{on:$route.path === '/profile'}" @click="goto('/profile')">
        <i class="iconfont icon-geren"></i>
        <span>个人</span>
      </span>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    methods:{
      goto(path){
        //编程式路由导航
       //如果重复点击会出现警告 从同一位置跳转到同一位置
       if(this.$route.path !== path){
           this.$router.replace(path);
       }else{
         //如果重复点击 就代表刷新当前的页面 发送一般的http请求
         //使用window.location
         window.location.href = path;
         
       }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .footer-nav
    top-border-1px(rgba(0,0,0,0.1))
    display flex
    position fixed
    left 0
    bottom 0
    height 50px
    width 100%
    background-color white
    .footer-item 
      width 25%
      display flex
      flex-direction column
      text-align center
      &.on
        color $green
      i 
        font-size 20px
        margin 5px


 
</style>
