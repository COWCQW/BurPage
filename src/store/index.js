import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from "redux"
import thunk from "redux-thunk"
import "@babel/polyfill"
// 引入blogredux
import {
  blogReducer
} from "./redux.blog.js"
import {
  journalReducer
} from "./redux.journal.js"
const reducer = combineReducers({
  blog: blogReducer,
  journal: journalReducer
})
const store = createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store