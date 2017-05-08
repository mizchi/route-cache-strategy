/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const initialState = window.__PRELOADED_STATE__

ReactDOM.render(<App {...initialState} />, document.querySelector('main'))
