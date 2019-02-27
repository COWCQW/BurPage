import React from "react"
import "./index.stylus"
class JournalMenu extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isBtnClose: true
    }
    this.handleMenuBtnClick = this.handleMenuBtnClick.bind(this)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
  }
  handleMenuItemClick(year) {
    this.props.handleChangeClick(year)
    document.documentElement.scrollTo(0, 0)
  }
  handleMenuBtnClick() {
    this.setState(pre => ({
      isBtnClose: !pre.isBtnClose
    }))
  }
  render() {
    const years = this.props.years
    return (
      <aside
        className={
          this.state.isBtnClose ? "journalMenu" : "journalMenu btnOpen"
        }
      >
        <div className="button" onClick={this.handleMenuBtnClick} /> 
        {years.map((year, index) => {
          return (
            <div
              className={
                this.props.currentYear === year ? "active year" : "year"
              }
              onClick={() => this.handleMenuItemClick(year)}
              key={year}
            >
               
              {year} 
            </div>
          )
        })} 
      </aside>
    )
  }
}

export default JournalMenu
