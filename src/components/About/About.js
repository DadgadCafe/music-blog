'use strict'
import React from 'react'

import './About.css'
import Article from '../Article'

class About extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="about">
          <Article/>
      </div>
    )
  }
}

export default About