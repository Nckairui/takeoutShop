<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:!isPwdLogin}" @click="isPwdLogin=false">短信登录</a>
          <a href="javascript:;" :class="{on:isPwdLogin}" @click="isPwdLogin=true">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:!isPwdLogin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="myPhone" name="myPhone" v-validate="'required|phone'">
              <span style="color: red;" v-show="errors.has('myPhone')">{{ errors.first('myPhone') }}</span>
              <button :disabled="!isRightPhoneNumber" class="get_verification" 
              :class="{right_phone_number:isRightPhoneNumber}" @click.prevent="sendCode">{{isSendCode?`短信已发送(${codeTime}s)`:'发送验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="myCodeSms" name="myCodeSms" v-validate="'required|code'">
              <span style="color: red;" v-show="errors.has('myCodeSms')">{{ errors.first('myCodeSms') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:isPwdLogin}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名"
                v-model="myUsername" name="myUsername" v-validate="'required|username'">
                <span style="color: red;" v-show="errors.has('myUsername')">{{ errors.first('myUsername') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd?'text':'password'" maxlength="8" placeholder="密码"
                v-model="myPassword" name="myPassword" v-validate="'required|password'">
                <span style="color: red;" v-show="errors.has('myPassword')">{{ errors.first('myPassword') }}</span>
                <div class="switch_button " @click="isShowPwd = !isShowPwd" :class="isShowPwd?'on':'off'">
                  <div class="switch_circle" :class="isShowPwd?'right':''"></div>
                  <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码"
                v-model="myCode" name="myCode" v-validate="'required|code'">
                <span style="color: red;" v-show="errors.has('myCode')">{{ errors.first('myCode') }}</span>
                <img class="get_verification" src="./images/captcha.svg" alt="captcha">
                
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        //定义一个标志 用来判断是否加on也就是动态切换时密码登录还是短信登录
        isPwdLogin:'',
        isShowPwd:false, //点击切换是否能直接看见密码 默认是false
        myPhone:'',//获取手机号 
        myCodeSms:'',//短信验证码
        myUsername:'',//用户名
        myPassword:'',//密码
        myCode:'',//验证码
        codeTime:10,//倒计时验证时间
        isSendCode:false,//是否已经发送验证码

      }
    },
    computed:{
      isRightPhoneNumber(){
        //通过验证手机号返回布尔值
        return /^1\d{10}$/.test(this.myPhone);
      }
    },
    methods:{
      //发送验证码
      sendCode(){
        let interval
        if(this.isSendCode) return
        this.codeTime = 10;
        this.isSendCode = true;
        //动态减少时间的效果
      interval = setInterval(() => {
         this.codeTime--;
          if(this.codeTime == 0){
            this.isSendCode = false  
            clearInterval(interval)
          }
       }, 1000);
      },
     async login(){
        //点击登录 向后台发请求验证信息
        let success;
        //首先需要将指定的表单验证一遍 判断是短信登录还是密码登录 要验证的表单不同
        if(this.isPwdLogin){
          //密码登录
           success = await this.$validator.validateAll(['myUsername','myPassword','myCode']) // 对指定的所有表单项进行验证
            //注意这个promise 无论是验证成功还是验证失败都是成功的promise
            //只是拿到的success 是true 验证成功 还是 false 验证失败
            if(success){
              //发请求
            }
       }else{
          //短信登录
           success = await this.$validator.validateAll(['myPhone','myCodeSms']) // 对指定的所有表单项进行验证
          if(success){
              //发请求
            }
        }
        
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform:translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
