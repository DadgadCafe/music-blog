'use strict'
import React from 'react'

import './Loader.css'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="loader">
        <div className="ball-scale-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default App