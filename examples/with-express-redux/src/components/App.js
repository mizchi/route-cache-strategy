/* @flow */
import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => state

export default connect(mapStateToProps)(function App(props: any) {
  console.log('render App')
  return (
    <div>
      <h1>{props.url}</h1>
      <p>{props.createdAt}</p>
    </div>
  )
})
