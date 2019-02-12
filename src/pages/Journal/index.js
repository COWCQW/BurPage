import React from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
// 引入组件
import JournalArticleList from "components/JournalArticleList"
import JournalMenu from "components/JournalMenu"

import { fetchJournalList,initJournal } from "store/redux.journal"
import "./index.stylus"

class Journal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentYear: `${new Date().getFullYear()}`
    }
    this.handleChangeClick = this.handleChangeClick.bind(this)
  }
  handleChangeClick(currentYear) {
    this.setState(() => ({
      currentYear
    }))
  }
  render() {
    const years = this.props.journalList.map(i => i.year)
    return (
      <React.Fragment>
        <header className="journalHead">
          <span className="title"> qwc 'Journal</span> <NavLink to="/" />
          <span> </span>
        </header>
        <section className="journalContent">
          <JournalMenu
            years={years}
            currentYear={this.state.currentYear}
            handleChangeClick={this.handleChangeClick}
          />
          <JournalArticleList
            journals={this.props.journalList.find(
              i => this.state.currentYear === i.year
            )}
          />
        </section>
      </React.Fragment>
    )
  }
  componentDidMount() {
    if(window.__initReduxState__ && window.__initReduxState__.journal && window.__initReduxState__.journal.journalList.length!= 0)
      this.props.synchronizeBlogDate(window.__initReduxState__.journal.journalList)
    else
      this.props.fetchJournalList()
  }
}

const mapStateToProps = state => ({
  journalList: state.journal.journalList
})
const mapDispatchToProps = dispatch =>{
  return {
    fetchJournalList:() => dispatch(fetchJournalList()),
    synchronizeBlogDate:(payload) => initJournal(payload,dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Journal)
