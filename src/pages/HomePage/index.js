import React from "react"

import NavList from "common/NavList"
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
        tag: "Application",
        route: "application"
      },
      {
        tag: "About",
        route: "about"
      }
    ]
  }
  render() {
    return (
      <React.Fragment>
        <div className="homePage">
          <h1> BUrPage </h1>
          <h2> Thought & Design & Build </h2>
          <NavList navMsg={this.navMsg} type="homePage_Item" />
        </div>
        <HomePageBackground> </HomePageBackground>
      </React.Fragment>
    )
  }
}

export default HomePage
