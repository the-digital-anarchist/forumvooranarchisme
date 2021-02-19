export const actionTypes = {
  CHOSENVALUE: "CHOSENVALUE",
}

export const initialState = []

const equalsValue = (action) => (theme) => theme.id === action.themeValue.id

export const reducer = (state = initialState, action) => {
  switch (action.Type) {
    case actionTypes.CHOSENVALUE: {
      const valueExists = state.some(equalsValue(action))
      if (valueExists) {
        const indexedValue = state.findIndex(equalsValue(action))
        const stateCopy = state
        stateCopy[indexedValue].value = action.themeValue.value
        console.log(stateCopy)
        return stateCopy
      }
      return [...state, action.themeValue]
    }
    default:
      return state
  }
}
