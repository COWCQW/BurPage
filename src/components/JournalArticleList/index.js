import React from "react"
import "./index.stylus"


class JournalArticalList extends React.PureComponent{

  constructor(props){
    super(props)
    this.state = {
      showItemNmuber:5
    }
    this.lazyLoad = this.lazyLoad.bind(this)
  }
  lazyLoad(e) {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    // if (scrollTop > 80 && scrollTop < this.before)
    //   document.querySelector(".blogHeader .nav").className = "nav fixed"
    // else document.querySelector(".blogHeader .nav").className = "nav"

    // this.before = scrollTop
    if (scrollTop + clientHeight > scrollHeight - 100) {
      this.setState(pre => ({
        showItemNmuber:
          pre.showItemNmuber + 5 >= this.props.journals.articles.length
            ? this.props.journals.articles.length
            : pre.showItemNmuber + 5
      }))
    }
  }
  initScroll(fn) {
    // this.before = 0
    window.addEventListener("scroll", fn)
  }
  render(){
    const jouranls = this.props.journals?
      this.props.journals.articles.slice(0,this.state.showItemNmuber):
      []
    return (
      <div className="jouranlArticleList">
        {
          jouranls.map((journal)=>{
            return (
              <a 
                className="journalArticle" 
                key ={journal.date}
                href={`/journal/${journal.date.slice(0,4)}/${journal.title}.md`}
              >
                <h2>{journal.title}</h2>
                <h3>{journal.date}</h3>
                {
                  journal.cover?<img src={journal.cover}/>:null
                }
                <p>{journal.summary}</p>
              </a>
            )
          })
        }
      </div>
    )
  }
  componentDidMount(){
    this.initScroll(this.lazyLoad)
  }
  componentWillUnmount(){
    window.removeEventListener("scroll",this.lazyLoad)
  }
}

export default JournalArticalList