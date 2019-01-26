import React from "react"
import { connect } from "react-redux"
import { fetchBloglist } from "store/redux.blog"
import "./index.stylus"

const mapStateToProps = state => ({
  blog: state.blog
})
const mapDispatchToProps = {
  fetchBloglist
}
class BlogArticleList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showItemNmuber: 4
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
          pre.showItemNmuber + 5 >= this.props.blog.blogList.length
            ? this.props.blog.blogList.length
            : pre.showItemNmuber + 5
      }))
    }
  }
  initScroll(fn) {
    // this.before = 0
    window.addEventListener("scroll", fn)
  }
  render() {
    const type = this.props.match.params.type
    const articles =
      type === undefined
        ? this.props.blog.blogList.slice(0, this.state.showItemNmuber)
        : this.props.blog.blogListSortByType[type].slice(
            0,
            this.state.showItemNmuber
          )
    return articles === undefined ? null : (
      <section className="blogArticleList">
        {" "}
        {type === undefined ? null : <h2 className="type"> {type} </h2>}{" "}
        {articles.map(article => {
          const { title, date, type, summary, cover } = article
          return (
            <div className="article" key={article.date + article.date}>
              <h2 className="article-head"> {title} </h2>{" "}
              <div className="article-body">
                <div className="top">
                  <div className="date">
                    <i> </i> <span> {date} </span>
                  </div>{" "}
                  <div className="type">
                    <i> </i> <span> {type} </span>
                  </div>{" "}
                </div>{" "}
                {cover ? <img className="cover" src={cover} alt="" /> : null}{" "}
                <p> {summary} </p>{" "}
              </div>{" "}
            </div>
          )
        })}{" "}
      </section>
    )
  }
  componentWillMount() {
    if (this.props.blog.blogList.length === 0) this.props.fetchBloglist()
    this.initScroll(this.lazyLoad)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.lazyLoad)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogArticleList)
