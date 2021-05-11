const initState = {
  model: null,
}

const modelReducer = (state = initState, action) => {
  if (action.type === "SET_MODEL") {
    state = {
      ...state,
      model: action.model,
    }
  }
  return state
}

export default modelReducer
