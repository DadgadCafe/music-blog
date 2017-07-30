'use strict'
import {connect} from 'react-redux'

import Tags from './Tags'
import {getTags} from '../../actions'

function mapStateToProps (state, ownProps) {
  return {
    tags: state.page.tags,
    pathname: state.router.location.pathname
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getTags: () => dispatch(getTags())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags)