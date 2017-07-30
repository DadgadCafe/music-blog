'use strict'
import {connect} from 'react-redux'

import Blog from './Blog'

function mapStateToProps (state, ownProps) {
  return {
    url: ownProps.match.url
  }
}

export default connect(mapStateToProps)(Blog)