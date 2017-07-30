'use strict'
import React from 'react'

import './ProgressBar.css'

class ProgressBar extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      // force re-mount the node when url changes
      <div key={this.props.pathname}
           className="progress-bar animated slideInLeftProgress"
      />
    )
  }
}

export default ProgressBar