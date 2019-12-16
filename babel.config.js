module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //为了实现ui组件的按需引入 需要在babel.config.js中配置 
  plugins: [         
    ['babel-plugin-component', {
      "libraryName": "mint-ui", // 针对mint-ui库实现按需引入打包
      "style": true // 自动打包对应的css
    }]
  ]
}
