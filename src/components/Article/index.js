'use strict'
import {connect} from 'react-redux'

import Article from './Article'
import {getArticle} from '../../actions'

function mapStateToProps (state, ownProps) {

  return {
    url: ownProps.url,
    article: state.page.article
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  getArticle: (url) => dispatch(getArticle(url))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)