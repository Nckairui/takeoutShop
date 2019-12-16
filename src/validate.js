import Vue from 'vue';
import VeeValidate from 'vee-validate'//使用 vee-validate 第三方库验证表单
import zh_CN from 'vee-validate/dist/locale/zh_CN' //提示信息本地化 为了使提示的name显示成中文 里面包含中文的一些配置属性

//在注册使用插件
Vue.use(VeeValidate);
//提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    myPhone: '手机号',
    myCode: '验证码',
    myUsername:'用户名',
    myPassword: '密码',
    myCodeSms:'短信验证码'
  }
})
//自定义验证规则
VeeValidate.Validator.extend('phone', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})
VeeValidate.Validator.extend('username', {
  validate: value => {
    return /^\w+$/.test(value)
  },
  getMessage: field => field + '必须填写'
})
VeeValidate.Validator.extend('password', {
  validate: value => {
    return /^\w+$/.test(value)
  },
  getMessage: field => field + '必须填写'
})
VeeValidate.Validator.extend('code', {
  validate: value => {
    return /^[a-zA-Z0-9]{4}$/.test(value)
  },
  getMessage: field => field + '必须是4位字符'
})