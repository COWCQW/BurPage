import "whatwg-fetch"


// initState 初始化数据
const initState = {
  blogList:[],
  blogListSortByDate:[],
  blogListSortByType:{}
}
// actionTypes
const INIT_BLOGLIST = "init_bloglist"
const SORT_BLOGLIST_BY_DATE = "sort_bloglist_by_date"
const SORT_BLOGLIST_BY_TYPE = "sort_bloglist_by_type"

// ActionCreators
const initBloglist = (payload) => {
  return {
    type:INIT_BLOGLIST,
    payload
  }
}
const initBloglistSortByDate = (payload) => {

  const result = payload.reduce((init,cur)=>{
    const year = cur.date.slice(0,4)
    const insert = {
      ...cur,
      route:`/blog/${cur.type}/${cur.title}.md`,
      date:cur.date.slice(5)
    }
    let target = init.find((item)=>item.year===year)
    if(target!=null)
      target.articles.push(insert)
    else
      init.push({
        year,
        articles:[insert]
      })
    return init
  },[])

  return {
    type: SORT_BLOGLIST_BY_DATE,
    payload: result
  }
}
const initBlogListSortByType = (payload) => {
  
  const result = payload.reduce((init,cur)=>{
    const type = cur.type
    let target = init[type]
    if(target!=undefined)
      target.push(cur)
    else
      init[type] = [cur]
    return init
  },{})

  return {
    type: SORT_BLOGLIST_BY_TYPE,
    payload:result
  }
}

// Reducer
export const blogReducer = (state=initState,action) => {
  switch(action.type){
  case INIT_BLOGLIST:
    return {
      ...state,
      blogList:[...action.payload]
    }
  case SORT_BLOGLIST_BY_DATE:
    return {
      ...state,
      blogListSortByDate:[...action.payload]
    }
  case SORT_BLOGLIST_BY_TYPE:
    return {
      ...state,
      blogListSortByType:{...action.payload}
    }
  default:
    return state
  }
}
// 从服务器拉取数据
export const fetchBloglist = () => {
  return async (dispatch,getState) => {
    const blogList = getState().blog.blogList
    if(blogList.length != 0)
      return
    const data = await fetch("/api/blog/getBlogList").then(res=>res.json())
    dispatch(initBloglist(data))
    dispatch(initBloglistSortByDate(data))
    dispatch(initBlogListSortByType(data))
  }
}


