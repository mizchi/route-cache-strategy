/* @flow */
import { createStore } from 'redux'

export type State = {
  url: string,
  createdAt: number
}

export type Action = { type: 'REPLACE', payload: State }

const originalReducer = (state: State, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Wrap with whole replacer
export const rootReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'REPLACE':
      return action.payload
    default:
      return originalReducer(state, action)
  }
}

export default (initialState: State) => createStore(rootReducer, initialState)
