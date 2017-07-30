'use strict'
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

const App = combineReducers({
  page,
  router: routerReducer
})


function page (state = {}, action) {
  switch (action.type) {
    case 'GET_ARTICLE':
      // don't flip the ordde...
      return {
        ...state,
        article: action.payload
      }

    case 'GET_BLOGS':
      return {
        ...state,
        blogs: action.payload
      }

    case 'GET_TAGS':
      return {
        ...state,
        tags: action.payload
      }

    default:
      return state
  }
}

export default App
