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


export default () => createStore(reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ ? 
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()):
    compose(applyMiddleware(thunk))
)