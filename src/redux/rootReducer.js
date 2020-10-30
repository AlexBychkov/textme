import { combineReducers } from 'redux';
import { MESSAGE } from "./type";

function messageReducer(state = 0, action) {
  if (action.type === MESSAGE) {
    return state;
  }
  return state;
}

export const rootReducer = combineReducers({
  message: messageReducer
});