Vue的vant库比较不错，

### 为什么用3X版本的更改主题颜色方法？因为利用的是less-loader，脚手架可以解析less文件了。
less@3.12.2 less-loader@7.1.0

### 在src下建立util(tools)文件夹，把修改font-size写进去，保持index.html清洁

### 不用在less中写345/@font计算rem，利用插件帮我们计算，因为webpack强大的功能，设置好交给他计算就行了。
postcss-px2rem包，在congfig-overrides.js中配置

### src下创建congif配置文件，作为配置整个项目的文件。创建routes文件，把所有路由写在这里与数组的形式暴露出去，在组件中遍历创建Route

### antd-mobile中的Button边框去不掉


### 按钮的disable拦不住onTocherStart，拦的住onClick。

### 巧用return，搭配if筛选，拦下不符合条件的.

### 新建api文件夹，里面是和接口有关的文件，ajax.js是二次封装的axios，设置了拦截器统一处理错误和数据

### 在api文件夹里创建index.js，用来发送请求，任何地方调用他就能发请求，省的发一次写一次，万一地址变了，不好维护，

### Token，一个唯一的用户身份标识，登录成功时服务器返回一个Token，包含用户的身份信息，退出登录销毁Token。Token是可以重新生成的，是有过期时间的。   有的网站把Token拆成十几份，每一份都加密，防止Token丢失，网站通过cookie把Token给用户，再次访问这个网站，自动就带上cookie了

### 授权第三方登陆，比如在自己的网站上，使用github账号的登陆，只会接收到github账号的一些公开的数据比如头像昵称，隐私数据不会被拿到。  自己的网站拿着github给的网站唯一标识和机密码识别网站身份。

## Client ID       --网站标识
***

## 网站机密码
***

## 查询授权码
***，每个用户的都不一样

## 返回第三方Token给我们的浏览器
**
用第一组key-value
github授权：**
