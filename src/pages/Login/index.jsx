import React, { Component } from 'react'
import {NavBar,InputItem,Button,Toast} from 'antd-mobile'
// 引入图片
import github from './imgs/github.png'
import qq from './imgs/qq.png'
import wechat from './imgs/wechat.png'
import './index.less'
// 引入正则
import {phoneReg,veriftReg} from '../../config/reg'
// 引入发送请求的函数
import {reqVerifyCode,reqLogin} from '../../api'
export default class Login extends Component {

    state={
        phone:'',
        verifyCode:'',
        time:60,
        disClick:false
    }

    saveData=(type)=>{
      return (value)=>{
        if (type === 'phone' && phoneReg.test(value)) return this.setState({[type]:value})
        if (type === 'verifyCode' && veriftReg.test(value)) return this.setState({[type]:value})
        else this.setState({[type]:''})
      }
    }
    sendMessage=async()=>{
        const {phone,disClick} =this.state;
        if (disClick) return;
        // 拿到节点设置className
        const {verifyBtn} =this;
        // 效验一下，不合法就提示,直接返回
        if (!phone) return Toast.fail('手机号格式不合法', 1);

        // 发送请求
        await reqVerifyCode(phone);
        Toast.success('发送成功',3)
        // 把按钮设为禁止
        this.setState({disClick:true});
        // 更改样式
        verifyBtn.className='verifyBtnDisable';

        this.timer=setInterval(() => {
            let {time} =this.state;
            time--
            // 到时间了，关了定时器,倒计时时间初始化，打开disClick，样式改回来
            if(time<=0) {
                clearInterval(this.timer);
                this.setState({disClick:false,time:60});
                verifyBtn.className='verify-btn';
                // 这里要ruturn，不然下面还要执行依据setState，time就成0了
                return;
            }
            this.setState({time})
        }, 1000);
    }
    login=async()=>{
        const {phone,verifyCode} =this.state
        // 因为按钮禁止还是会触发onTocher，所以在这里拦截一下
        if (!(phone && verifyCode)) return Toast.fail('请检查手机号或验证码格式',2)
        const result =await reqLogin(phone,verifyCode);
        const {code,message} =result;
        // 登陆成功跳转个人中心
        if (code === 20000) {
            Toast.success('登录成功',2);
            this.props.history.push('/usercenter')
        }
        else Toast.fail(message)

    }
    // 第三方登陆子github登陆
    githubLogin=()=>{
      window.location.href='https://github.com/login/oauth/authorize?client_id=aa502a3b82bbd3b61fe9'
    }
    // 卸载组件前(跳转到个人中心前)，关掉计时器
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    render() {
        const {disClick,time,phone,verifyCode} =this.state;
        return (
            <div className='login'>
                {/* 导航栏 */}
                <NavBar mode="light">个人中心</NavBar>
                {/* 输入手机号 */}
                <InputItem onChange={this.saveData('phone')} placeholder="请输入手机号"/>
                {/* 身份验证，发送验证码 */}
                <div className="verify">
                    <InputItem onChange={this.saveData('verifyCode')} placeholder="请输入验证码"/>
                    <button 
                        disabled={this.state.disClick} 
                        onTouchStart={this.sendMessage} 
                        ref={b => this.verifyBtn=b} 
                        className='verify-btn'
                        >{disClick ? `发送验证码(${time})`:'发送验证码'}</button>
                </div>
                {/* 登录按钮 */}
                <Button 
                    type='primary'
                    // 通过验证才能解除登录按钮的禁止状态
                    disabled={(phone && verifyCode)? false:true}
                    onTouchEnd={this.login}
                    >登录</Button>
                <div className="footer">
                    <span className='other'>其他登录方式</span>
                    <div className="imgs">
                        <img src={github} onTouchEnd={this.githubLogin} alt="" />
                        <img src={qq} alt="" />
                        <img src={wechat} alt="" />
                    </div>
                    <span className='footer-text'>未注册的手机号，验证后会自动创建账号，登录既代表同意：
                    <a href='http://baidu.com'>《隐私政策》</a>
                    </span>
                </div>

            </div>
        )
    }
}
