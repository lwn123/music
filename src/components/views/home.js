import React from 'react'
import '../../assets/css/home.css'
 class Home extends React.Component{
     constructor(){
         super()
         this.state={
             hotSongList:[
                 {
                     id:1,
                     img:'http://p2.music.126.net/qZ25SAx2rhH-Qpsb1DWZZg==/109951165188459074.jpg?imageView=1&type=webp&thumbnail=369x0',
                     detail:' [VIP专享] 一周新歌推荐'
                 },{
                    id:2,
                    img:'http://p2.music.126.net/cpb3jNJiyua6XaK5i35UdA==/109951165163645522.jpg?imageView=1&type=webp&thumbnail=369x0',
                    detail:' 这个世界很大，可是没人听我说话'
                },{
                    id:3,
                    img:'http://p2.music.126.net/lMjuNL1ifmroz_KE8dnfkw==/109951164863932384.jpg?imageView=1&type=webp&thumbnail=369x0',
                    detail:'中文DJ（电摇版）（车载DJ）开车驾车必听'
                },{
                    id:4,
                    img:'http://p2.music.126.net/hTVO5FTWdilRhrUPyrTVXQ==/109951164996647014.jpg?imageView=1&type=webp&thumbnail=369x0',
                    detail:'好听的歌没有完整版，就像喜欢的人没有结局'
                },{
                    id:5,
                    img:'http://p2.music.126.net/2jy8QSBjtjRSeyLKR3aaCw==/109951164509321497.jpg?imageView=1&type=webp&thumbnail=369x0',
                    detail:'KORG P1000电子琴'
                },{
                    id:6,
                    img:'http://p2.music.126.net/INq3U1kogB4zwrtTWP7kVg==/109951164983505096.jpg?imageView=1&type=webp&thumbnail=369x0',
                    detail:'维吾尔语精选歌曲'

                }
             ],
             newSong:[
                 {
                     id:1,
                     songName:'致我们终将逝去的青春 (2020重唱版)',
                     author:'张靓颖-致我们终将逝去的青春'
                 },{
                    id:2,
                    songName:'如果我是海',
                    author:'李荣浩-麻雀'
                },{
                    id:3,
                    songName:'祝我快乐',
                    author:'汪苏泷-祝我快乐'
                },{
                    id:4,
                    songName:'星星之火',
                    author:'罗云熙-星星之火'
                },{
                    id:5,
                    songName:'晚来天欲雪',
                    author:'恋恋故人难 / 云の泣-晚来天欲雪'
                },{
                    id:6,
                    songName:'先知',
                    author:'田馥甄-先知'
                },{
                    id:7,
                    songName:'我行我素我爱你',
                    author:'郁可唯-我行我素我爱你'
                },{
                    id:8,
                    songName:'星星之火',
                    author:'罗云熙-星星之火'
                },{
                    id:9,
                    songName:'PARADISE',
                    author:'Ravi / 河成云-PARADISE'
                },{
                    id:10,
                    songName:'睹物思人',
                    author:'武艺-PARADISE'
                },{
                    id:11,
                    songName:'尘埃',
                    author:'董嘉鸿-尘埃'
                }
             ]
         }
     }
    render(){
        const {hotSongList,newSong} = this.state;
            return (<div className='home'>
                <h2 className='remd_t1'>推荐歌单</h2>
                <ul className='remd_ul'>
                    {
                        hotSongList.map(item => {
                            return (
                                <li key={item.id}>
                                <div className='imgWrap'>
                                <img src={item.img} />
                                </div>
                                <p>{item.detail}
                                </p>
                            </li>

                            )
                        })
                    }
                </ul>
                <h2 className='remd_t1'>最新音乐</h2>
                <ul className='song_ul'>
                    {
                        newSong.map(song => {
                            return(<li key={song.id} className='newS_li'>
                                <div className='songl'>
                                    <p className='sname'>{song.songName}</p>
                                    <p className='sauthor'>
                                        <i className='bg'></i>{song.author}</p>
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