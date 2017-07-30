'use strict'
import React from 'react'

import './ProgressBar.css'

class ProgressBar extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      // this.props.pathname seems buggy
      // force re-mount the node when url changes
      <div key={window.location.pathname}
           className="progress-bar animated slideInLeftProgress"
      />
    )
  }
}

export default ProgressBar