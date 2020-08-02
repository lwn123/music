import React from 'react'
//引入组件相关样式
import '../../assets/css/index.css'
//引入要渲染的组件
// export default 导出  import 变量
// export let a    导出  import {变量}
import Home from '../views/home' 
import Rank from '../views/rank'
import Search from '../views/search'
//调用路由插件
import {Switch,Route,Redirect,NavLink} from 'react-router-dom'
 class Index extends React.Component{
    render(){
            return (<div className='index'>
                <div className='title'>
                    <span className='tName'>优音乐</span>
                    <span className='down'>下载APP</span>
                </div>
                {/* 导航链接视图 */}
                <div className='tabBar'>
                    <div className='tabwrap'>
                    <NavLink activeClassName='select' to='/index/home'>
                        推荐音乐</NavLink>
                    </div>
                    <div className='tabwrap'>
                    <NavLink activeClassName='select' to='/index/rank'>热歌榜</NavLink>
                    </div>
                    
                    <div className='tabwrap'>
                    <NavLink activeClassName='select' to='/index/search'>搜索</NavLink>
                    </div>
                    
                </div>
                <div className='tworouter'>
                   {/* 二级路由出口 */}
                <Switch>
                    <Route path='/index/home' component={Home}></Route>
                    <Route path='/index/rank' component={Rank}></Route>
                    <Route path='/index/search' component={Search}></Route>
                    <Redirect to='/index/home'></Redirect>
                </Switch>
                </div>
               
            </div>)
        }
}
 export default Index