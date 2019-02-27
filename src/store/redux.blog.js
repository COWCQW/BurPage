
// initState 初始化数据
// 浏览器端 node 端
let initState = {
  blogList:[],
  blogListSortByDate:[],
  blogListSortByType:{}
}
try {
  initState = window.__initReduxState__ && window.__initReduxState__.blog || initState
} catch (error) {
}


// actionTypes
const INIT_BLOGLIST = "init_bloglist"
const SORT_BLOGLIST_BY_DATE = "sort_bloglist_by_date"
const SORT_BLOGLIST_BY_TYPE = "sort_bloglist_by_type"

// ActionCreators
export const initBloglist = (payload) => {
  return {
    type:INIT_BLOGLIST,
    payload
  }
}
export const initBloglistSortByDate = (payload) => {

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
export const initBlogListSortByType = (payload) => {
  
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
export const initBlog = (payload,dispatch) => {
  dispatch(initBloglist(payload))
  dispatch(initBloglistSortByDate(payload))
  dispatch(initBlogListSortByType(payload))
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
    const url = "/api/blog/getBlogList"
    const data = await fetch(url).then(res=>res.json())
    data.sort((a,b)=>{
      if(a.date === b.date)
        return 0
      else if(a.date < b.date)
        return 1
      else
        return -1

    })
    initBlog(data,dispatch)
  }
}


