import React from "react"
import './index.stylus'


class BlogAchieve extends React.PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    const achieves = [
      {
        years:"2017",
        articles:[
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          },
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          },
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          }
        ]
      },
      {
        years:"2017",
        articles:[
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          },
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          },
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          }
        ]
      },
      {
        years:"2017",
        articles:[
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          },
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          },
          {
            date:"3-20",
            title:"如何快乐的划水",
            route:"如何快乐的划水.md"
          }
        ]
      }
    ]
    return (
      <section className="blogAchieve">
        <h2>目前共计2篇文章，继续努力</h2>
        {
          achieves.map((achieve=>(
          <div className="achieve" key={achieve.years}>
            <h3 className="year">{achieve.years}</h3>
            <div>
              {achieve.articles.map((article)=>(
                <div key = {article.date}>
                  <span>{article.date}</span>
                  {article.title}
                </div>
              ))}
            </div>
          </div>)))
        }
      </section>)
  }
}

export default BlogAchieve