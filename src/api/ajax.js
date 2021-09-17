// 该文件是对axois的二次封装，目的是：统一处理请求的错误，返回服务器的纯数据
import axios from 'axios'
import {Toast} from 'antd-mobile'
// 进度条
import Nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
axios.interceptors.request.use((config)=>{
    Nprogress.start();      //进度条开始
  return config
})

// 使用axios的响应拦截器
axios.interceptors.response.use(
    response =>{
        Nprogress.done();   //进度条结束    
        return response.data;
    },
    // 在这里拦截失败
    err =>{
        Nprogress.done();   //进度条结束
        Toast.fail(err.message,4);
        return new Promise(()=>{})
    }
)
// 暴露出去
export default axios;