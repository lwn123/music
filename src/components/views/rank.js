import React from 'react'
import '../../assets/css/rank.css'

//引入接口
import {getHotList} from '../../util/axios'
//引入路由导航链接
import { NavLink } from 'react-router-dom'
class Rank extends React.Component {
    constructor() {
        super()
        this.state = {
            updateTime:0,
            rankList: []
        }
    }
    componentDidMount(){
        getHotList().then(res =>{
            console.log(res);
            if(res.code===200){
                  //对返回列表进行过滤
                  let hotList = res.playlist.tracks.filter((item, i) => i < 20)
                this.setState({
                    updateTime:res.playlist.updateTime,
                    rankList: hotList
                })
            }
        })
    }
    //封装一个时间转化函数
    formatTime(timer) {
        let date = new Date(timer)
        //年份
        let year = date.getFullYear()
        let month = (date.getMonth() + 1 + '').padStart(2, '0')
        //天数
        let day = (date.getDate() + '').padStart(2, '0')
        //小时
        let hours = (date.getHours() + '').padStart(2, '0')
        //分钟
        let minutes = (date.getMinutes() + '').padStart(2, '0')
        //秒数
        let seconds = (date.getSeconds() + '').padStart(2, '0')
        return `${month}月${day}日`
    }
    render() {
        const {rankList,updateTime } = this.state
        return (<div className='rank'>
            <div className='hotbg'>
                <div className='hotimg'>
                </div>
    <p>更新日期：{this.formatTime(updateTime)}</p>
            </div>
            <ul >
                {
                    rankList.map((item,i) => {
                        return <NavLink key={item.id} to={'/play/' + item.id}>
                            <li className='songList'>
                                <div className='songLeft'>
                                    {
                                        i < 9 ? <span style={
                                            i < 3? 
                                            {
                                                color:'red'
                                            }:{}
                                        }>0{i+1}</span> : <span>{i+1}</span>
                                    }
                                </div>
                                <div className='songC'>
                                        {
                                            item.alia ? <p className='sname'>{item.name}<span style={
                                                {
                                                    color:'#888'
                                                }
                                            }>{item.alia}</span>
                                            </p> : <p className='sname'>{item.name}</p>
                                        }
                                    
                                       <p className='sauthor'>
                                        <i className='bg'></i>
                                        {
                                            item.ar ?
                                                item.ar.map(item => {
                                                    return <span key={item.id}>{item.name}</span>
                                                })
                                                : ''
                                        }-{item.al.name}
                                        </p>
                                </div>
                                <div className='songr'>
                                   <span className='zt bg'></span>
                                </div>
                            </li>
                        </NavLink>
                    })
                }
            </ul>
            <div className='footer'>
                <p>查看完整榜单<span className='more'>&gt;</span></p>
            </div>
        </div>)
    }
}
export default Rank