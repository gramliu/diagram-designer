const initState = {
  model: null,
}

const modelReducer = (state = initState, action) => {
  if (action.type === "SET_MODEL") {
    if (Array.isArray(action.model)) {
      state = {
        ...state,
        model: action.model,
      }
    } else {
      console.error("Invalid model: " + action.model)
    }
  }
  return state
}

export default modelReducer
