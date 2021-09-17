// 理由配置文件，所有路由在这里配置

// 引入组件
import Login from '../pages/Login'
import UserCenter from '../pages/UserCenter'
const rotues=[
    {
        path:'/login',
        component:Login
    },
    {
        path:'/usercenter',
        component:UserCenter
    }
]
export default rotues;