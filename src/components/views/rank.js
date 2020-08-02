import React from 'react'
import '../../assets/css/rank.css'
//引入路由导航链接
import { NavLink } from 'react-router-dom'
class Rank extends React.Component {
    constructor() {
        super()
        this.state = {
            bgImg: require('../../assets/images/hot_music_bg_2x.jpg'),
            rankList: [
                {
                    id: 1,
                    songName: '爸爸妈妈',
                    author: '李荣浩-有理想'
                },
                {
                    id: 2,
                    songName: '海底',
                    author: '一支榴莲-《独》'
                },
                {
                    id: 3,
                    songName: '你走',
                    author: '松紧先生（李宗锦）-你走'
                },
                {
                    id: 4,
                    songName: '收敛',
                    author: '不够-收敛'
                },
                {
                    id: 5,
                    songName: '丢了你',
                    author: '井胧-丢了你'
                }, {
                    id: 6,
                    songName: '官方回答',
                    author: 'O.WEN-官方回答'
                },
                {
                    id: 7,
                    songName: '夏天的风',
                    remarks: '（原唱：温岚）',
                    author: '火羊瞌睡了-夏天的风'
                },
                {
                    id: 8,
                    songName: '无人之岛',
                    author: '任然-没有发生得爱情'
                },
                {
                    id: 9,
                    songName: '外来之物',
                    author: '薛之谦-天外来物'
                },
                {
                    id: 10,
                    songName: '你是人间四月天',
                    author: '邵帅（解忧邵帅）-你是人间四月天'
                },
                {
                    id: 11,
                    songName: '爱,存在',
                    author: '卢卢快闭嘴-爱，存在'
                }
                ,
                {
                    id: 12,
                    songName: '雨爱',
                    author: '周星星-雨爱'
                }
                ,
                {
                    id: 13,
                    songName: 'Love Is Gone (feat. Dylan Matthew) (Acoustic)',
                    author: 'SLANDER / Dylan Matthew-Love Is Gone (Acoustic)'
                }
                ,
                {
                    id: 14,
                    songName: '与我无关',
                    author: '阿冗-与我无关'
                }
                ,
                {
                    id: 15,
                    songName: '还是分开',
                    author: '张叶蕾-还是分开'
                }
                ,
                {
                    id: 16,
                    songName: '情人',
                    author: '蔡徐坤-情人'
                }
                ,
                {
                    id: 17,
                    songName: '回到夏天',
                    remarks: '（我多想回到那个夏天）',
                    author: '傲七爷 / 爱写歌的小田-回到夏天'
                }, {
                    id: 18,
                    songName: '世间美好与你环环相扣',
                    author: '柏松-听闻余生'
                }
                ,
                {
                    id: 19,
                    songName: '7%',
                    author: 'XMASwu-柒'
                }
                ,
                {
                    id: 20,
                    songName: '冬眠',
                    author: '司南-冬眠'
                }
            ]
        }
    }
    render() {
        const { bgImg, rankList } = this.state
        return (<div className='rank'>
            <div className='hotbg'>
                <div className='hotimg'>
                </div>
                <p>更新日期：7月30日</p>
            </div>
            <ul >
                {
                    rankList.map(item => {
                        return <NavLink key={item.id} to={'/play/' + item.id}>
                            <li className='songList'>
                                <div className='songLeft'>
                                    {
                                        item.id < 10 ? <span>0{item.id}</span> : <span>{item.id}</span>
                                    }
                                </div>
                                <div className='songC'>
                                    
                                        {
                                            item.remarks ? <p className='sname'>{item.songName}{item.remarks}</p> : <p className='sname'>{item.songName}</p>
                                        }
                                    
                                       <p className='sauthor'>
                                        <i className='bg'></i>{item.author}</p>
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