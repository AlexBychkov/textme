import { combineReducers } from 'redux'
import { MESSAGE, USER_LOGIN, USER_LOGOUT } from './type'

function messageReducer(state = 0, action) {
  if (action.type === MESSAGE) {
    return state
  }
  return state
}

function user(state = null, action) {
  switch (action.type) {
    case USER_LOGOUT:
      console.log(USER_LOGOUT)
      return { ...state, user: null }

    case USER_LOGIN:
      console.log(USER_LOGIN)
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export const rootReducer = combineReducers({
  message: messageReducer,
  user,
})
