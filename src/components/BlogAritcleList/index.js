import React from "react"
import './index.stylus'
class BlogArticleList extends React.PureComponent {
    constructor(props){
        super(props)
    }
    render(){
        // const articles = this.props.articleList
        const articles = [{
            title:"读书笔记",
            date:"2019-1-21",
            type:"算法与数据结构",
            summary:"The children render prop receives all the same route props as the component and render methods, except when a route fails to match the URL, then match is null. This allows you to dynamically adjust your UI based on whether or not the route matches. Here we’re adding an active class if the route matches"
        }]
        return <section className="blogArticleList">
            {
                articles.map((article)=>{
                    const {title,date,type,summary,cover} = article
                    return (
                    <div className="article" key={article.date+article.date}>
                        <h2 className="article-head">{title}</h2>
                        <div className="article-body">
                            <div className="top">
                                <div className="date">
                                    {date}<i></i>
                                </div>
                                <div className="type">
                                    {type}<i></i>
                                </div>
                            </div>
                            <img className = "cover" src={cover} alt=""/>
                            <p>{summary}</p>
                        </div>
                    </div>)
                })
            }
        </section>
    }
}

export default BlogArticleList