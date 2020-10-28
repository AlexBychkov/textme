import { MESSAGE } from "./type";

export function rootReducer(state, action) {
  if (action.type === MESSAGE) {
    return state;
  }
  return state;
}