<template>
  <div class="app">
  <router-view></router-view>
   <FooterNav v-show="$route.meta.isShowFooter"></FooterNav>
  </div>
</template>

<script>
import FooterNav from './components/FooterNav/FooterNav'
export default {
  components:{
    FooterNav
  },
  mounted(){
     this.$store.dispatch('getAddress');
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './common/stylus/mixins.styl'
 
        
  
   

    
</style>
