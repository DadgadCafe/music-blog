'use strict'
import {connect} from 'react-redux'

import Tags from './Tags'
import {getTags} from '../../actions'

function mapStateToProps (state, ownProps) {
  return {
    tags: state.page.tags,
    tagId: ownProps.match.params.tagId,
    url: ownProps.match.url,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getTags: () => dispatch(getTags())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags)