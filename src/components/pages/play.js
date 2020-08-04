import React from 'react';
//引入css文件
import '../../assets/css/play.css';

import $ from 'jquery'
import axios from 'axios'
import { getLyric, getUrl, getSongDetail } from '../../util/axios'
class play extends React.Component {
    constructor() {
        super()
        this.state = {
            img: require('../../assets/images/needle-ip6.png'),
            songUrl: '',
            lyric: '',
            songDetail: '',
            flag: false, //用来控制播放和暂停
            playTime:"00:00"
        }
        //创建ref
        this.playIcon = React.createRef()
        this.audio = React.createRef()
    }
    //组件一加载 就获取音乐的url和歌词
    componentDidMount() {
        axios.all([getLyric({ id: this.props.match.params.id }), getUrl({ id: this.props.match.params.id }), getSongDetail({ ids: this.props.match.params.id })])
            .then(axios.spread((lyric, songUrl, songDetail) => {
                console.log(lyric, '歌词')
                console.log(songUrl, '音乐地址')
                console.log(songDetail, 'songDetail')
                if (lyric.code === 200) {
                    let lyricInfo = lyric.lrc.lyric
                    //创建一个去除数组[]的正则
                    let reg = /\[(.*?)](.*)/g
                    //定义一个对象
                    let obj = {}
                    //把字符串的每一处[]符号 都替换掉
                    lyricInfo.replace(reg, (a, b, c) => {
                        //a 查找的那一处
                        //b 正则匹配的第一个
                        //c正则匹配的第er个
                        // [00:00.610]为什么你不在 aaaaaaaaa
                        //  00:00.610 bbbbbbbb
                        // 为什么你不在 cccccc
                        //如果是对象 obj[b] = c   {00:00.610 : 为什么你不在}
                        //字符串截取 截取出 00：00
                        b = b.slice(0, 5)
                        // console.log(a,'aaaaaaaaa')
                        // console.log(b,'bbbbbbbb')
                        // console.log(c,'cccccc')
                        obj[b] = c
                    })

                    console.log(obj, '歌词转化之后的对象')
                    this.setState({
                        lyric: obj
                    },()=>{
                        let audio = this.audio.current
                        //实时监听播放器的变化
                        audio.ontimeupdate=()=>{
                            //currentTime 当前正在播放的时间 以秒计
                           // console.log(audio.currentTime,"我正在播放")
                            //把播放器时间转化成 00:00 这种格式
                            let nowTime = this.tranTime(audio.currentTime)
                           // console.log(nowTime,"我正在播放")
                            if(nowTime in this.state.lyric){
                                this.setState({
                                    playTime:nowTime
                                },()=>{
                                    //歌词滚动
                                    this.moveLyric()
                                })
                            }
                        }
                    })
                }
                if (songUrl.code === 200) {
                    this.setState({
                        songUrl: songUrl.data[0].url
                    })
                }
                if (songDetail.code === 200) {
                    this.setState({
                        songDetail: songDetail.songs[0]
                    })
                }
            }))
    }
    //封装一个时间转化的事件
    tranTime(timer){
        let minute =( Math.floor(timer/60)+'').padStart(2,'0')
        let second = ( Math.floor(timer%60)+'').padStart(2,'0')
        return `${minute}:${second}`
    }
    //歌词滚动事件
    moveLyric(){
        //取出带active的p标签
        let active = document.getElementsByClassName('active')[0]
        //查找出active索引
        let index = $('.geci_box').children().index(active)
        let offset =31
        if(active){
            if(active.offsetTop>offset){
                //移动Y 轴 //transform: translateY(10px);
                $('.geci_box').css("transform",`translateY(-${index*offset}px)`)
            }
        }
    }
    //创建一个播放事件
    toPlay() {
        //当用户点击开关，取反
        this.setState({
            flag: !this.state.flag
        }, () => {
            if (this.state.flag) {
                //flag是真就应该暂停音乐
                this.audio.current.pause()
                //出现播放按钮
                this.playIcon.current.style.display = 'block'
            } else {
                //flag是假就应该播放音乐
                this.audio.current.play()
                //隐藏播放按钮
                this.playIcon.current.style.display = 'none'
            }
        })

    }
    render() {
        const { lyric, songUrl, songDetail, img ,playTime} = this.state
        return (<div className='play'>
            <div className="play_top">
                <img src={img} />
            </div>
            <div className="play_img_all" >
                <i ref={this.playIcon} className="play_icon" onClick={this.toPlay.bind(this)}></i>
                <div className="play_img_box" onClick={this.toPlay.bind(this)}>
                    <div className="small_img">
                        {songDetail.al ? <img src={songDetail.al.picUrl} alt="" /> : ''}
                    </div>
                </div>
            </div>
            <div className="play_txt">
                <div className="play_txt_name">
                    {songDetail.al ? <div>{songDetail.al.name}-<span className="singer">{songDetail.ar[0].name}</span></div> : ''}
                </div>
                <div className="play_txt_geci">
                    <div className="geci_box">
                        {/* 把对象转化成数组之后 循环遍历  Object.entries 把对象转化成枚举型的数组 类似for in*/}
                        {
                            Object.entries(lyric).map((item, i) => {
                                //当播放器时间和歌词的时间匹配的时候 加高亮
                                if(playTime == item[0]){
                                    return <p key={i} className='active'>{item[1]}</p>
                                }else{
                                    return <p key={i}>{item[1]}</p>
                                }
                                
                            })
                        }
                        <p ></p>
                    </div>
                </div>
            </div >
            <div className="audio_box">
                <audio ref={this.audio} src={songUrl} autoPlay></audio>
            </div >
            <div className='play_footer'>
                <span className='open'>打开</span>
                <span className='down'>下载</span>
            </div>
        </div >)
    }
}
 export default play