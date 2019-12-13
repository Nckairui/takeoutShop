const path = require('path');
const px2rem = require('postcss-px2rem')
      // 配置postcs-px2rem
      const postcss = px2rem({
        remUnit: 37.5   //设置这个值就是 设计稿宽度的十分之一 也就是设计稿的的font-size值
            //设计稿上的元素 除以这个值 换算出rem 而 设计稿与不同设备之间都是等比的关系
            // 所以rem值都是相同的
            //至于十分之一是为了提高精确度 (js对运算不是很精确) 和便于换算
            //在css中直接写px就行 这个库 会自动将px转换成对应的rem
      })
function resolve (dir) {
     return path.join(__dirname, dir)
}
module.exports = { //只能写vue封装的配置
  lintOnSave: false, //关闭eslint语法检查
  configureWebpack: {// 当前配置需要写入该选项中
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        //'vue$': 'vue/dist/vue.esm.js', 
        '@': resolve('src'), // 设置文件查找路径，可简写文件查找路径
        'components': resolve('src/components'),
      }
    }
  },
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
},
 
  
}