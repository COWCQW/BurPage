import React from "react"
import {NavLink} from "react-router-dom"

class NavList extends React.PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <ul 
        className={this.props.type}
      >
        {
          // 这里key值为index值，不修改
          this.props.navMsg.map((item,index) => {
            // 获取tag，route，icon
            const {tag,route,icon} = item
            return (
              <NavLink key={index} to={route} exact activeStyle={{
                fontSize:"100px"
              }}>
                {icon ? <i className={icon}/>:null}
                {tag}
              </NavLink>)
          })
        }
      </ul>
    )
  }
  
}

export default NavList