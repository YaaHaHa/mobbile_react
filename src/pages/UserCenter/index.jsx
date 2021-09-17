import React, { Component } from 'react'
// 获取请求
import {reqVerifyToken,reqLogout} from '../../api'
import {Toast,NavBar,Button} from 'antd-mobile'
import './index.less'
export default class UserCenter extends Component {
    /* 
        先效验是否登录成功，通过Token给浏览器效验
    */
    // 组件加载后，马上校验登录信息，防止通过url暴力查看
    state={
        avatar:'',
        nickName:'',
        phone:'',
        _id:''

    }
    async componentDidMount(){
        const result =await reqVerifyToken();
        // 拿到状态码和信息，判断是否效验成功
        const {code,message} =result;
        const {avatar,nickName,phone,_id} =result.data;
        if (code !== 20000){
            Toast.fail(message);
            this.props.history.replace('/login');
        }
        else {
            // 存到状态中
            this.setState({avatar,nickName,phone,_id})
        }

    }
    logout=async()=>{
      await reqLogout(this.state._id);
      //退出成功跳转到登录界面
      this.props.history.replace('/login');
      Toast.success('退出成功',2);
        
    }
    render() {
        const {avatar,nickName} =this.state;
        return (
            <div className='user-info'>
                <NavBar mode='light'>个人中心</NavBar>
                <img className='avatar' src={avatar} alt="" />
                <div className='nickName'>昵称：{nickName}</div>
                <Button type='warning' onTouchEnd={this.logout}>退出登录</Button>
            </div>
        )
    }
}
