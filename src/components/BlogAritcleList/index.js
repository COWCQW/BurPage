import React from "react"
import {connect} from "react-redux"
import {fetchBloglist} from "../../store/redux.blog"
import './index.stylus'

const mapStateToProps = (state) => ({
    blog:state.blog
})
const mapDispatchToProps = {
	fetchBloglist
}
class BlogArticleList extends React.PureComponent {
  constructor(props){
    super(props)
  }
  render(){
    const type = this.props.match.params.type
    const articles = type === undefined ? this.props.blog.blogList:this.props.blog.blogListSortByType[type]
		return articles === undefined? null: (
			<section className="blogArticleList">
        {
            type === undefined?null:(
                <h2 className="type">
                    {type}
                </h2>
            )
        }
        {
            articles.map((article)=>{
                const {title,date,type,summary,cover} = article
                return (
                <div className="article" key={article.date+article.date}>
                    <h2 className="article-head">{title}</h2>
                    <div className="article-body">
                        <div className="top">
                            <div className="date">
                                <i></i>
                                <span>{date}</span>
                            </div>
                            <div className="type">
                                <i></i>
                                <span>{type}</span>
                            </div>
                        </div>
                        <img className = "cover" src={cover} alt=""/>
                        <p>{summary}</p>
                    </div>
                </div>)
            })
        }
    </section>)
  }
  componentWillMount(){
		// alert()
		this.props.fetchBloglist()
    // if(this.props.blog.blogList.length === 0)
    //   this.props.fetchBloglist()
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogArticleList)