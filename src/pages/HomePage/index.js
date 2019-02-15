import React from "react"
import { NavLink } from "react-router-dom"
import HomePageBackground from "components/HomePageBackground"
import "./index.stylus"

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props)
    // 导航的信息
    this.navMsg = [
      {
        tag: "Blog",
        route: "blog"
      },
      {
        tag: "Journal",
        route: "journal"
      },
      {
        tag: "暂未开放/(｡ì _ í｡)",
        route: "/"
      }
    ]
  }
  render() {
    return (
      <React.Fragment>
        <div className="homePage">
          <h1>网络日志</h1>
          <h2>思索已知,探索新知</h2>
          <nav className="homePage_Item">
            <NavList
              navMsg={this.navMsg}
            />
            <a href="about">about</a>
          </nav>
        </div>
        <HomePageBackground/>
      </React.Fragment>
    )
  }
}

const NavList = (props) => {

  return (
    <React.Fragment>
      {
        props.navMsg.map((item)=>{
          const { tag, route} = item
          return <NavLink to={route} key={tag}>{tag}</NavLink>
        })
      }
    </React.Fragment>
  )
}


export default HomePage
