<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(computedStar,index) in computedStars" :key="index" :class="{...computedStar}"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['rating','size'],
    computed:{
      computedStars(){
        let star = this.rating;
        let initStar = parseInt(star);
        let on = {on:true};
        let off = {off:true};
        let half = {half:true};
        let arr = [];
        if(initStar){
          for(let i = 0;i < 5;i++){
            if(i < initStar){
              arr.push(on)
            }
            }
            if(star - initStar >= 0.5){
              arr.push(half)
            }else{
             arr.push(off)   
          }
          for(let i = 0;i < 5 - initStar -1;i++){
            arr.push(off)
          }
       
        }else{
           if(star - initStar >= 0.5){
            arr.push(half)
            }else{
             arr.push(off)   
          }
          for(let i = 0;i < 4;i++){
            arr.push(off)
          }
        }
        return arr;
    }
  }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl';
  .star 
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
