'use strict'
import {connect} from 'react-redux'

import Blogs from './Blogs'
import {getBlogs} from '../../actions'

function mapStateToProps (state, ownProps) {
  return {
    tag: ownProps.tag,
    blogs: state.page.blogs
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  getBlogs: (url) => dispatch(getBlogs(url))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)