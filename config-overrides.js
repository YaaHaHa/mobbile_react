// 这个文件是给脚手架的webpack看的。webpack是基于node的，所以用cjs
const { override, fixBabelImports,addLessLoader,addPostcssPlugins } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile', //对哪个库进行按需引入
    libraryDirectory: 'es', //样式模块作为ES6模块处理
    style: true,//处理原文件样式
  }),
  addLessLoader({
    lessOptions:{
      javascriptEnabled: true, //允许js更改修改antd的less文件中的变量
      modifyVars: { 
        '@brand-primary': '#f30707',
        '@brand-primary-tap':'#b90808'
       },
    }
  }),
  addPostcssPlugins([
    require('postcss-px2rem')({
      remUnit:37.5   //按照设计师的设计稿计算出来的根字体大小
    })
  ])
);