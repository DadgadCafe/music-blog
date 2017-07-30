'use strict'
import {connect} from 'react-redux'

import SideBar from './SideBar'

function mapStateToProps (state, ownProps) {
  // state.router.location.pathname seems buggy with basename url
  return {
    isIndex: window.location.pathname === '/music-blog/'
  }
}

export default connect(mapStateToProps)(SideBar)
