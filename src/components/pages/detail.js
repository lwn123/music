import React from 'react';
import axios from 'axios';
import '../../assets/css/detail.css';
import { getPlayList, getPlayComment } from '../../util/axios'
import Index from '.';
class Detial extends React.Component{
    constructor() {
        super()
        this.state = {
            playDetail: {},
            commentDetail: []
        }
    }//挂载
    componentDidMount() {
        console.log(this.props, '属性')
        //组件一加载就调取歌单详情和歌单热门评论
        axios.all([getPlayList({ id: this.props.location.state.id }), getPlayComment({ id: this.props.location.state.id })])
            .then(axios.spread((playDetail, commentDetail) => {
                if (playDetail.code == 200) {
                    this.setState({
                        playDetail: playDetail.playlist
                    })
                }
                if (commentDetail.code == 200) {
                    this.setState({
                        commentDetail: commentDetail.hotComments
                    })
                }
                console.log(playDetail, 'playDetail详情')
                console.log(commentDetail, 'commentDetail详情')
            }))
    }
    //封装一个事件转化函数
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
        return `${year}年${month}月${day}日`
    }
    render() {
        const { playDetail,commentDetail } = this.state
        return (<div className='detail'>
            <div className='detail_top'>
                <img style={
                    {
                        width: "414px",
                        height:"218px",
                        zIndex:"-1"
                    }
                } src={playDetail.backgroundCoverUrl} alt="" />
                <p className='update'>{playDetail.updateFrequency}</p>
                <p className='title'>{playDetail.name}</p>
                <p className='detail_jieshao'>
                {playDetail.description}
                </p>
            </div>
            <h1 className='detail_list'>歌曲列表</h1>
            <ul className='detail_song'>
                {
                    playDetail.tracks ?
                        playDetail.tracks.map((item,i) => {
                        return  <li className='songList'>
                        <div className='songLeft'>
                            {i+1}
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
                        })
                        : ''
                }
            </ul>
            <div className='detial_more-wrap'>
                <div className='more-text'>查看更多歌曲，请下载客户端</div>
            </div>
            <h2 className='detail_list'>热门评论</h2>
            <ul className="detail_comment">
                {
                    commentDetail.map(item=>{
                        return <li key={item.time}>
                                <img style={
                                    {
                                        width:"40px",
                                        borderRadius:"50%"
                                    }
                                } src={item.user.avatarUrl} alt=""/>
                                <div>
                                <p className='nickname'>{item.user.nickname} <span>{item.likedCount}</span></p>
                                <p>{this.formatTime(item.time)}</p>
                                </div>
                        </li>
                    })
                }
            </ul>
        </div>)
    }
}


export default Detial;