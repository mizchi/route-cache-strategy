/* @flow */
import React from 'react'

export default function App(props: any) {
  console.log('render App')
  return (
    <div>
      <h1>{props.url}</h1>
      <p>{props.createdAt}</p>
    </div>
  )
}
