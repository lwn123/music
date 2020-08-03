import React from 'react'
import '../../assets/css/home.css'
import axios from 'axios';
//引入swipercss
import 'swiper/css/swiper.min.css'
import 'swiper/js/swiper.min.js'
//调用swipe让插件
import Swiper from 'swiper';
import {personalized,banner,getNewSongs} from '../../util/axios'
 class Home extends React.Component{
    constructor(){
         super()
         this.state={
             songList:[],
             banner:[],
             newSong:[]
         }
    }
     //挂载
    componentDidMount(){
        axios.all([personalized({limit:6}), banner(), getNewSongs()]).then(axios.spread((hotSongList,bannerList,newSong) => {
            //推荐歌单
            if (hotSongList.code === 200) {
                this.setState({
                    songList: hotSongList.result
                })
            }
            //最新音乐
            if(newSong.code === 200){
                this.setState({
                    newSong:newSong.result
                })
            }
            //获取轮播图
            if (bannerList.code === 200) {
                //可以通过filter 对数组进行过滤
                let banners = bannerList.banners.filter((item, i) => i < 4)
                this.setState({
                    banner: banners
                }, () => {
                    let swiper = new Swiper('.swiper-container', {
                        autoplay: {
                            delay: 2500,
                        },
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    });
                })
            }

        }))
    }
    render(){
        const {songList,newSong,banner} = this.state;
            return (<div className='home'>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            banner.map(item => {
                                return <div key={item.imageUrl} className="swiper-slide">
                                    <img className='imgUrl' src={item.imageUrl} alt="" />
                                </div>
                            })
                        }
                        
                    </div>
                    {/* 分页器。如果放置在swiper-container外面，需要自定义样式。 */}
                    <div className="swiper-pagination"></div>
                </div>
                <h2 className='remd_t1'>推荐歌单</h2>
                <ul className='remd_ul'>
                    {
                        songList.map(item => {
                            return (
                                <li key={item.id}>
                                <div className='imgWrap'>
                                <img src={item.picUrl} />
                                </div>
                                <p>{item.name}
                                </p>
                            </li>

                            )
                        })
                    }
                </ul>
                <h2 className='remd_t1'>最新音乐</h2>
                <ul className='song_ul'>
                    {
                        newSong.map(newS => {
                            return(<li key={newS.id} className='newS_li'>
                                <div className='songl'>
                                    <p className='sname'>{newS.song.name}
                                    {
                                        newS.song.alias ?
                                            newS.song.alias.map(item => {
                                                return <span style={
                                                    {
                                                        color:"#888"
                                                    }
                                                } key={item}>({item})</span>
                                            })
                                            : ''
                                    }
                                    </p>
                                    <p className='sauthor'>
                                        <i className='bg'></i>
                                        {
                                            newS.song.artists ?
                                                newS.song.artists.map(item => {
                                                return <span key={item.id}>{item.name}</span>
                                                })
                                                : ''
                                                }-{newS.song.album.name}
                                        </p>
                                </div>
                                <div className='songr'>
                                   <span className='zt bg'></span>
                                </div>
                            </li>)
                        })
                    }
                </ul>
                <div className='footer'>
                    <div className='logo'>优音乐</div>
                    <div className='link'>打开APP,发现更多好音乐</div>
                    <p>优音乐公司版权所有©1997-2020   杭州乐读科技有限公司运营</p>
                    
                </div>
            </div>)
        }
}
 export default Home