import React from 'react'
//引入App.css
import './App.css'
//引入要渲染的组件
import Index from './components/pages/index'
import List from './components/pages/list'
import Play from './components/pages/play'
//引入路由插件中相关的属相方法
import {Switch,Route,Redirect} from 'react-router-dom'
//app.js中不要写任何内容 会影响其他组件 我们可以渲染一级路由的出口
 class App extends React.Component{
    render(){
      return (<div className='app'>
        {/* 一级路由出口 */}
        <Switch>
          <Route path='/index' component={Index}></Route>
          <Route path='/list' component={List}></Route>
          {/* 动态路由 */}
          <Route path='/play/:id' component={Play}></Route>
          <Redirect to='/index'></Redirect>
        </Switch>
      </div>)
    }
}
 export default App