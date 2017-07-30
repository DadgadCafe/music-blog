'use strict'
import {connect} from 'react-redux'
import ProgressBar from './ProgressBar'

function mapStateToProps (state, ownProps) {
  return {
    pathname: state.router.location.pathname
  }
}

export default connect(mapStateToProps)(ProgressBar)
