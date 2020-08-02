import React from 'react'
 class Search extends React.Component{
    render(){
        console.log(this,'子类')
            return (<div>
                <h1>播放页面</h1>
                <h2>当前歌曲id是---{this.props.match.params.id}</h2>
            </div>)
        }
}
 export default Search