import React from "react"

class JournalMenu extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      isBtnClose:false,
      currentIndex:0
    }
    this.handleMenuBtnClick = this.handleMenuBtnClick.bind(this)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
  }
  handleMenuItemClick(index){
    this.setState((pre)=>({
      currentIndex:index
    }))
  }
  handleMenuBtnClick(){
    this.setState((pre)=>({
      isBtnClose: !pre.isBtnClose
    }))
  }
  render(){
    const years = [
      "2019",
      "2018",
      "2017",
      "2016"
    ]
    return (
      <aside className={this.state.isBtnClose?"journalMenu":"journalMenu btnOpen"}>
        <div className="button"
          onClick={this.handleMenuBtnClick}
        ></div>
        {
          years.map((year,index)=>{
            return (
              <div 
                className={index == this.state.currentIndex?"active year":"year"}
                onClick={()=>this.handleMenuItemClick(index)}
              >
                {year}
              </div>
            )
          })
        }
      </aside>
    )
  }
}

export default JournalMenu