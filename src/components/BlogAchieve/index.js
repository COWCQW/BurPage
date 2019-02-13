import React from "react"
import {connect} from "react-redux"
import "./index.stylus"

const mapStateToProps = (state) => ({
  blog:state.blog
})

class BlogAchieve extends React.PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    const achieves = this.props.blog.blogListSortByDate
    const number = this.props.blog.blogList.length
    return (
      <section className="blogAchieve">
        <h2>目前共计{number}篇文章，继续努力</h2>
        {
          achieves.map((achieve=>(
            <div className="achieve" key={achieve.years}>
              <h3 className="year">{achieve.year}</h3>
              <div>
                {achieve.articles.map((article)=>(
                  <a 
                    className="item"
                    key = {article.date}
                    href={`/blog/${article.type}/${article.title}.md`}
                  >
                    <span>{article.date}</span>
                    {article.title}
                  </a>
                ))}
              </div>
            </div>)))
        }
      </section>)
  }
}

export default connect(mapStateToProps)(BlogAchieve)