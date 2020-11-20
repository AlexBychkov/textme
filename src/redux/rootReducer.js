import { combineReducers } from 'redux';
import { MESSAGE, USER_LOGIN, USER_LOGOUT, LOADING } from './type';

function messageReducer(state = null, action) {
  if (action.type === MESSAGE) {
    return state;
  }
  return state;
}

function loadingReducer(state = true, action) {
  if (action.type === LOADING) {
    console.log(LOADING);
    return action.payload;
  }
  return state;
}

function userReducer(state = null, action) {
  switch (action.type) {
    case USER_LOGOUT:
      console.log(USER_LOGOUT);
      return null;

    case USER_LOGIN:
      console.log(USER_LOGIN);
      return { ...action.payload };

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  message: messageReducer,
  user: userReducer,
  loading: loadingReducer,
});
