import React from 'react'
import '../../assets/css/search.css'
import '../../assets/css/icon-font/iconfont.css'
 class Search extends React.Component{
     constructor(){
         super()
         this.sch = React.createRef()
     }
        
     getVal(){
         //点击输入框，label内容消失
        this.sch.current.innerText='';
     }
    render(){
            return (<div className='search'>
              <div className='sch'>
                  <i className='iconfont icon-Bduanzhongsousou'></i>
                  <input type='text' id='schinp' onFocus={this.getVal.bind(this)}/>
                   <label ref={this.sch} htmlFor='schinp'>搜索歌手、歌曲、专辑</label> 
              </div>
              <div>
              <h2 className='hottit'>热门搜索</h2>
              <div className='hotcontent'>
                  <a>Taylor Swift</a>
                  <a>Billie Eilish</a>
                  <a>无虑镜</a>
                  <a>潘玮柏</a>
                  <a>天外来物</a>
                  <a>Troye Sivan</a>
                  <a>亚运会歌征集</a>
                  <a>上半年音乐榜单</a>
                  <a>要我怎么办</a>
                  <a>2020毕业音乐会</a>

              </div>
              </div>
              
            </div>)
        }
}
 export default Search