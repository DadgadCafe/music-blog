'use strict'
import {connect} from 'react-redux'

import About from './About'

function mapStateToProps (state, ownProps) {
  return {
    url: ownProps.match.url
  }
}

export default connect(mapStateToProps)(About)
