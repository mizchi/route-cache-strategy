/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = state => state

const fetchUrlState = async (url: string) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'applicaiton/json' }
  })
  return await res.json()
}

const Link = (
  { url }: { url: string },
  context: { store: { dispatch: Function } }
) => (
  <button
    onClick={async () => {
      const data = await fetchUrlState(url)
      console.log(data, context)
      if (location.pathname !== url) {
        console.log('pushed to', url)
        history.pushState({}, '', url)
      }
    }}
  >
    Go to {url}
  </button>
)

Link.contextTypes = {
  store: PropTypes.any
}

export default connect(mapStateToProps)(function App(props: any) {
  return (
    <div>
      <h1>{props.url}</h1>
      <p>{props.createdAt}</p>
      <Link url={'/'} />
      <Link url={'/nocache'} />
      <Link url={'/items/aaa'} />
    </div>
  )
})
