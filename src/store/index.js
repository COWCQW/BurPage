import { createStore, applyMiddleware,combineReducers,compose} from "redux"
import thunk from "redux-thunk"
import "@babel/polyfill"
// 引入blogredux
import { blogReducer } from "./redux.blog.js"
console.log(blogReducer)
const reducer = combineReducers({
  blog:blogReducer
})
const store =  createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store