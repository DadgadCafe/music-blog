'use strict'
import {connect} from 'react-redux'

import SideBar from './SideBar'

function mapStateToProps (state, ownProps) {
  return {
    isIndex: state.router.location.pathname === '/'
  }
}

export default connect(mapStateToProps)(SideBar)
