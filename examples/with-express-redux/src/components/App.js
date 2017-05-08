/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { isUrlCacheable, compileCacheStrategies } from '../../../../src'
import strategies from '../strategies'

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
      if (isUrlCacheable(compileCacheStrategies(strategies))(url)) {
        const data = await fetchUrlState(url)
        console.log(data, context)
        if (location.pathname !== url) {
          console.log('pushed to', url)
          context.store.dispatch({
            type: 'REPLACE',
            payload: data
          })
          history.pushState({}, '', url)
        }
      } else {
        location.href = url
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
      <Link url={'/items/bbb'} />
    </div>
  )
})
