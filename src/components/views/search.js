import React from 'react'
import '../../assets/css/search.css'
import '../../assets/css/icon-font/iconfont.css'

//引入接口
import {searchHot,searchInfo} from '../../util/axios'
 class Search extends React.Component{
     constructor(){
         super()
         this.state={
             hotsList:[],
             searchList:[],
             valFlag:''
         }
         this.sch = React.createRef();
         this.inpVal = React.createRef();
     }
     componentDidMount(){
          searchHot().then(res => {
              if(res.code === 200){
                //   console.log(res.result.hots);
                  this.setState({
                    hotsList: res.result.hots
                })
              }
          })
     }
    //封装一个搜索事件
    goSearch(keywords) {
        //点击输入框，label内容消失
        this.sch.current.innerText='';
        //给input赋值
        this.inpVal.current.value = keywords
        //调取搜索接口
        searchInfo({ keywords })
            .then(res => {
                if (res.code == 200) {
                    // console.log(res.result.songs, '搜索结果')
                    this.setState({
                        searchList: res.result.songs
                    })
                }
            })
    } 
     getVal(){
         //点击输入框，label内容消失
        this.sch.current.innerText='';
     }
     getInput() {
         this.setState({
             valFlag:this.inpVal.current.value
         })
         this.goSearch(this.inpVal.current.value)
    }
    keyup(e){
        if(e.keyCode == 13 && e.target.value != ''){
            this.goSearch(e.target.value)
        }
    }
    clearInfo(){
        //input为空
        this.inpVal.current.value = ''
        this.setState({
            searchList: [],
            valFlag:''
        })
        this.sch.current.innerText='搜索歌手、歌曲、专辑'
    }
    render(){
        const {hotsList,searchList,valFlag} = this.state;
        
            return (<div className='search'>
              <div className='sch'>
                  <i className='iconfont icon-Bduanzhongsousou'></i>
                  <input type='text' id='schinp' onFocus={this.getVal.bind(this)} ref={this.inpVal} onInput={this.getInput.bind(this)} onKeyUp={this.keyup.bind(this)}/>
                   <label ref={this.sch} htmlFor='schinp'>搜索歌手、歌曲、专辑</label> 
                   {
                        valFlag ? <button onClick={this.clearInfo.bind(this)} className='del'>×</button> : ''
                    }

              </div>
              <div>
              <h2 className='hottit'>热门搜索</h2>
               {/* 搜索列表 */}
               <div>
                    <ul className='song_ul'>
                        {
                            searchList.length > 0 ? searchList.map(newS => {
                                return (<li key={newS.id} className='newS_li'>
                                <div className='songl'>
                                    <p className='sname'>{newS.name}
                                    
                                    </p>
                                    <p className='sauthor'>
                                        <i className='bg'></i>
                                        {
                                            newS.artists ?
                                                newS.artists.map(item => {
                                                return <span key={item.id}>{item.name}</span>
                                                })
                                                : ''
                                                }-{newS.album.name}
                                        </p>
                                </div>
                                <div className='songr'>
                                   <span className='zt bg'></span>
                                </div>
                            </li>)
                            })
                                : <div className='hotcontent'>
                                {
                                    hotsList.map(item => {
                                    return <a key={item.first} onClick={this.goSearch.bind(this, item.first)}>{item.first}</a>
                                    })
                                }
                                
                                
              
                            </div>
                        }
                    </ul>
                </div>
              
              </div>
              
            </div>)
        }
}
 export default Search