import React, { createContext, useContext, useReducer } from "react"
import { reducer, initialState, State } from "./reducer"

const AppContext = createContext(null)

export const StateProvider = ({ children }) => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>{children}</AppContext.Provider>
)

export const useStateValue = () => useContext(AppContext)
