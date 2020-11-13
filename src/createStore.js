export function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, { type: '__INIT__' })
  const subscribers = []

  return {
    dispatch(action) {},
    subscribe(callback) {
      subscribers.push(callback)
    },
    getState() {
      return state
    },
  }
}
