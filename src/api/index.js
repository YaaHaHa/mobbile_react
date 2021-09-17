// 统一管理项目中所有ajax请求
// 引入经过二次封装的axios
import ajax from './ajax'



// 请求验证码
export const reqVerifyCode = phone => ajax.post('http://localhost:3000/login/digits',{phone})
    // 注意这里是return啊，因为在使用时传参了带了()，相当于把这里的函数拉过去那边执行一次，不会对接下来的语句有影响
    // ruturn的话，因为await，会对后面的语句影响
 

// 请求登录
export const reqLogin = (phone,code) => ajax.post('http://localhost:3000/login/phone',{phone,code})


// 验证用户是否登陆
export const reqVerifyToken = () =>ajax.post('http://localhost:3000/login/verify')

// 退出登录
export const reqLogout= (_id) => ajax.post('http://localhost:3000/logout',{_id})
