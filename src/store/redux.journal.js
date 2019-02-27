// 初始化数据
// 浏览器环境 && node环境

let initState = {
  journalList:[]
} 
try {
  initState = window.__initReduxState__ && window.__initReduxState__.journal || initState
}catch(err){}

//  actionTypes
const INIT_JOURNAL_LIST = "init_journal_list"

// actionCreators
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
    const data = await fetch("/api/journal/getJournalList").then(res=>res.json()).then(data=>{
      


      return data.sort((a,b)=>compare(a.year,b.year)).map(item=>{
        return {
          year:item.year,
          articles:item.articles.sort((a,b)=>compare(b.date-a.date))
        }
      })
    })
    initJournal(data,dispatch)
  }
}


function compare(a,b){
  if(a === b)
    return 0
  else if(a>b)
    return -1
  else
    return 1
}



