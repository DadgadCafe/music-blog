'use strict'

import {createStore, applyMiddleware, compose} from 'redux'
import promiseMw from 'redux-promise'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'react-router-redux'

import reducers from '../reducers'

const history = createBrowserHistory()
const routerMw = routerMiddleware(history)

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(
//   reducers,
//   composeEnhancer(applyMiddleware(promiseMw))
// )

const store = composeEnhancer(
  applyMiddleware(promiseMw, routerMw)
)(createStore)(reducers)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

export default store
export {history}