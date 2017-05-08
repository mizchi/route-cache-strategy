/* @flow */
import { createStore } from 'redux'

export type State = {
  url: string,
  createdAt: number
}

export type Action = { type: 'WIP' }

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default (initialState: State) => createStore(reducer, initialState)
