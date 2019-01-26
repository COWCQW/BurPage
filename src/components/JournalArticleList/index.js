import React from "react"



class JournalArticalList extends React.PureComponent{

  constructor(props){
    super(props)
  }
  render(){
    const jouranls = this.props.journals?this.props.journals.articles:[]
    return (
      <div className="jouranlArticleList">
        {
          jouranls.map((journal)=>{
            return (
              <div className="journalArticle" key ={journal.date}>
                <h2>{journal.title}</h2>
                <h3>{journal.date}</h3>
                {
                  journal.cover?<img src={journal.cover}/>:null
                }
                <p>{journal.summary}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default JournalArticalList