import React from "react"



class JournalArticalList extends React.PureComponent{

  constructor(props){
    super(props)
  }
  render(){
    const jouranls = [
      {
        title:"启航2019",
        date:"2018-12-03",
        cover:"",
        summary:"《Journals》是欧美流行小天王Justin Bieber发行的第四张个人录音室专辑，将只可在有限的时间（2013年12月23日至2014年1月9日）内通过iTunes音乐商店购买。专辑由第一支单曲《Heartbreaker》推广，发布于10月7日。2016年7月22日，journals的实体专辑正式在日本发行，也仅在日本发行。"
      },
      {
        title:"启航2019",
        date:"2018-12-03",
        cover:"",
        summary:"《Journals》是欧美流行小天王Justin Bieber发行的第四张个人录音室专辑，将只可在有限的时间（2013年12月23日至2014年1月9日）内通过iTunes音乐商店购买。专辑由第一支单曲《Heartbreaker》推广，发布于10月7日。2016年7月22日，journals的实体专辑正式在日本发行，也仅在日本发行。"
      },
      {
        title:"启航2019",
        date:"2018-12-03",
        cover:"",
        summary:"《Journals》是欧美流行小天王Justin Bieber发行的第四张个人录音室专辑，将只可在有限的时间（2013年12月23日至2014年1月9日）内通过iTunes音乐商店购买。专辑由第一支单曲《Heartbreaker》推广，发布于10月7日。2016年7月22日，journals的实体专辑正式在日本发行，也仅在日本发行。"
      },
      {
        title:"启航2019",
        date:"2018-12-03",
        cover:"",
        summary:"《Journals》是欧美流行小天王Justin Bieber发行的第四张个人录音室专辑，将只可在有限的时间（2013年12月23日至2014年1月9日）内通过iTunes音乐商店购买。专辑由第一支单曲《Heartbreaker》推广，发布于10月7日。2016年7月22日，journals的实体专辑正式在日本发行，也仅在日本发行。"
      }
    ]
    return (
      <div className="jouranlArticleList">
        {
          jouranls.map((journal)=>{

            return (
              <div className="journalArticle" key ={journal.date}>
                <h2>{journal.title}</h2>
                <h3>{journal.date}</h3>
                {
                  journal.cover?<img src={cover}/>:null
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