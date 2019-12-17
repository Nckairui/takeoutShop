<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name">
      <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <!-- 如果有多个轮播 就不能使用类名选择器来指定 而是要通过这个标签的唯一标识ref来指定 -->
      <div class="swiper-container" ref="sc1">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(foodCategoryList,index) in foodCategoryListArr" :key="index">
            <div class="link_to_food" v-for="(fc,index2) in foodCategoryList" :key="index2">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+fc.image_url">
              </div>
              <span>{{fc.title}}</span>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ul class="shop_list">
          <li class="shop_li border-1px" v-for="shop in shops" :key="shop.id" @click="$router.push('/shop')">
            <a>
              <div class="shop_left">
                <img class="shop_img" :src="'https://fuss10.elemecdn.com'+shop.image_path">
              </div>
              <div class="shop_right">
                <section class="shop_detail_header">
                  <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                  <ul class="shop_detail_ul">
                    <li class="supports" v-for="(s,index) in shop.supports" :key="index">{{s.icon_name}}</li>
                  </ul>
                </section>
                <section class="shop_rating_order">
                  <section class="shop_rating_order_left">
                    <Star :rating="shop.rating" :size="24"></Star>
                    <div class="rating_section">
                      {{shop.rating}}
                    </div>
                    <div class="order_section">
                      月售{{shop.recent_order_num}}单
                    </div>
                  </section>
                  <section class="shop_rating_order_right">
                    <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                  </section>
                </section>
                <section class="shop_distance">
                  <p class="shop_delivery_msg">
                    <span>¥{{shop.float_minimum_order_amount}}起送</span>
                    <span class="segmentation">/</span>
                    <span>配送费约¥{{shop.float_delivery_fee}}</span>
                  </p>
                </section>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper';
  import 'swiper/css/swiper.css';
  import chunk from 'lodash/chunk';//只引入打包好的工具函数,使最后打包编译的文件更小
  import Header from '../../components/Header/Header';
  import {mapState} from 'vuex';
  export default {
    //注册组件
    components:{
      Header
    },
   async mounted(){
      this.$store.dispatch('getShopList'); //分发获取商铺列表的action  
      await this.$store.dispatch('getFoodCategoryList') // 利用dsipatch的返回值是一个promise
      //这个promise可以.then来制定成功的回调 这个成功代表状态的数据变了 但页面还没变 可以调用$nextTick
      this.$nextTick(()=>{
        new Swiper (this.$refs.sc1, {
        loop: true, // 循环模式选项  (无缝)
        // 如果需要分页器(小圆点)
        pagination: {
          el: '.swiper-pagination',
        },
      })
      })//注意 写在await下面的所有代码都是代表放在成功的回调中
      // this.$store.dispatch('getFoodCategoryList',()=>{ //传入的回调相当于参数 需要手动调用
      //   console.log(123)
      //   //dispatch还可以指定第二个参数 是一个回调函数 也就是当这个action->mutation->state状态数据成功改变时调用
      //   this.$nextTick(()=>{
      //      new Swiper (this.$refs.sc1, {
      //       loop: true, // 循环模式选项  (无缝)
      //       // 如果需要分页器(小圆点)
      //       pagination: {
      //         el: '.swiper-pagination',
      //       },
      //     });
      //   })
      //   }) 
        //分发获取食物列表的action
      //注意 拿回来的数据是一个大数组  需要转换成二维数组
      //因为是轮播图 每页最多只有八个分类
      //所以需要遍历这个大数组 把小数组塞到大数组中
      //每八个塞到小数组中 小数组长度===8 再把小数组重新赋值为新的空数组
        
    },
    computed:{
      ...mapState(['address','categorys','shops']),
      //需要计算 把一维数组变为二维数组
      foodCategoryListArr(){
        let categorys = this.categorys; //拿到一维大数组
        let bigArr = [] //初始化大数组(二维数组)
        // let smallArr = []; //初始化小数组

        // categorys.forEach((item,index)=>{
        //     index++;
        //     if(smallArr.length < 8){
        //       smallArr.push(item);
        //     }else{
        //       bigArr.push(smallArr)
        //       smallArr = []
        //     }
        //     if(index == categorys.length-1){
        //       bigArr.push(smallArr)
        //     }
            
        // })
        bigArr = chunk(categorys,8)
        return bigArr
      }

    },
    //watch:{
      //需要在数据成功回来后,以及页面更新后 再new Swiper 创建轮播效果
      //方法1. 可以使用watch监视categorys的值  以及 使用nextTick(()=>{}) 
      //将传入的回调 在下次dom更新(页面)后调用  这个方法一般放在更新数据后
      //因为这样可以保证 在数据更新 并且在页面更新完 可以完成一些事情
      // categorys(value){
      //   if(value){
      //     this.$nextTick(()=>{
      //             //第三方库 轮播效果 swiper 必须有数据才能显示轮播效果
      //       // 所以选择在组件挂载完(页面初始化完) 在new Swiper对象
      //       //new Swiper ('.swiper-container', {
      //       //如果有多个轮播 就不能使用类名选择器来指定 而是要通过这个标签的唯一标识ref来指定 
      //     new Swiper (this.$refs.sc1, {
      //       loop: true, // 循环模式选项  (无缝)
      //       // 如果需要分页器(小圆点)
      //       pagination: {
      //         el: '.swiper-pagination',
      //       },
      //     });
      //     })
      //   }
      // }
   // }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
      .shop_container
        margin-bottom 50px
        .shop_list
          .shop_li
            bottom-border-1px(#f1f1f1)
            width 100%
            >a
              clearFix()
              display block
              box-sizing border-box
              padding 15px 8px
              width 100%
              .shop_left
                float left
                box-sizing border-box
                width 23%
                height 75px
                padding-right 10px
                .shop_img
                  display block
                  width 100%
                  height 100%
              .shop_right
                float right
                width 77%
                .shop_detail_header
                  clearFix()
                  width 100%
                  .shop_title
                    float left
                    width 200px
                    color #333
                    font-size 16px
                    line-height 16px
                    font-weight 700
                    &::before
                      content '品牌'
                      display inline-block
                      font-size 11px
                      line-height 11px
                      color #333
                      background-color #ffd930
                      padding 2px 2px
                      border-radius 2px
                      margin-right 5px
                  .shop_detail_ul
                    float right
                    margin-top 3px
                    .supports
                      float left
                      font-size 10px
                      color #999
                      border 1px solid #f1f1f1
                      padding 0 2px
                      border-radius 2px
                .shop_rating_order
                  clearFix()
                  width 100%
                  margin-top 18px
                  margin-bottom 8px
                  .shop_rating_order_left
                    float left
                    color #ff9a0d
                    .rating_section
                      float left
                      font-size 10px
                      color #ff6000
                      margin-left 4px
                    .order_section
                      float left
                      font-size 10px
                      color #666
                      transform scale(.8)
                  .shop_rating_order_right
                    float right
                    font-size 0
                    .delivery_style
                      transform-origin 35px 0
                      transform scale(.7)
                      display inline-block
                      font-size 12px
                      padding 1px
                      border-radius 2px
                    .delivery_left
                      color #fff
                      margin-right -10px
                      background-color #02a774
                      border 1px solid #02a774
                    .delivery_right
                      color #02a774
                      border 1px solid #02a774
                .shop_distance
                  clearFix()
                  width 100%
                  font-size 12px
                  .shop_delivery_msg
                    float left
                    transform-origin 0
                    transform scale(.9)
                    color #666
                  .segmentation
                    color #ccc
</style>