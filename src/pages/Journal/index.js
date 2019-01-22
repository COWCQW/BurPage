import React from "react"
import {NavLink} from "react-router-dom"
// 引入组件
import JournalArticleList from "components/JournalArticleList"
import JournalMenu from "components/JournalMenu"

import "./index.stylus"

class Journal extends React.PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <React.Fragment>
        <header className="journalHead">
          <span className="title">qwc'Journal</span>
          <NavLink to="/"/>
          <span></span>      
        </header>
        <section className="journalContent">
          <JournalMenu/>
          <JournalArticleList/>          
        </section>
      </React.Fragment>
    )
  }
}

export default Journal