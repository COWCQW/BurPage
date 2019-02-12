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
export const initJournal  = (payload,dispatch) => {
  dispatch({
    type:INIT_JOURNAL_LIST,
    payload:payload
  })
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

  return async (dispatch,getState) => {
    // 防止重复发送请求
    const journalList = getState().journal.journalList
    if(journalList.length != 0)
      return
    const data = await fetch("/api/journal/getJournalList").then(res=>res.json())
    dispatch(initJournalList(data))
  }
}




