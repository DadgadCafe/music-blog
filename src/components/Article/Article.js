'use strict'
import React from 'react'

import './Article.css'
import Loader from '../Loader'
import {formatDate} from '../../utils'

class Article extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async getArticle (url) {
    this.setState({
      isLoading: true
    })

    await this.props.getArticle(url)

    try {
      this.setState({
        isLoading: false
      })
    } catch (e) {
      // prevent setState on unmount node
      console.error(e)
    }
  }

  componentDidMount () {
    this.getArticle(this.props.url)
  }

  render () {
    const {article} = this.props
    return (
      this.state.isLoading
        ? <Loader/>
        : <div className="article animated fadeInLeft">
          <h1 className="title">
            {article.meta.title}
          </h1>
          <article className="content"
                   dangerouslySetInnerHTML={{__html: article.content}}
          />
          <h4 className="footer">
            {article.meta.updateDate && `Edited @${formatDate(article.meta.updateDate)} / `}
            Posted @{formatDate(article.meta.date)}
          </h4>
        </div>
    )
  }
}

export default Article