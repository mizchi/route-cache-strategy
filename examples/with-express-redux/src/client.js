/* @flow */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import createStore from './store'
import type { State } from './store'

const initialState: State = window.__PRELOADED_STATE__

const store = createStore(initialState)

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('main')
)
