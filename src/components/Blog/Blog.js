'use strict'
import React from 'react'

import './Blog.css'
import Article from '../Article'

class Blog extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="about">
          <Article url={this.props.url}/>
      </div>
    )
  }
}

export default Blog