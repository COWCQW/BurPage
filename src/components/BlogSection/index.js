import React from "react"
import {Route} from "react-router-dom"
import Recent from "components/Recent"


class BlogSection extends React.PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <React.Fragment>
        <Route path="/blog/recent" component={Recent}></Route>
      </React.Fragment>
    )
  }
}
export default BlogSection