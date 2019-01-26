import axios from "axios"
// 初始化数据
const initState = {
  journalList:[]
}

//  actionTypes
const INIT_JOURNAL_LIST = "init_journal_list"

// actionCreators

const initJournalList = (payload) => {
  return {
    type:INIT_JOURNAL_LIST,
    payload
  }
}
// reducer
export const journalReducer = (state=initState,action) => {
  switch(action.type){
    case INIT_JOURNAL_LIST:
      return {...state,journalList:action.payload}
    default:
      return state
  }
}


export const fetchJournalList = () => {

  return async dispatch => {
    const res = await axios.get("/api/journal/getJournalList")
    dispatch(initJournalList(res.data))
  }
}




