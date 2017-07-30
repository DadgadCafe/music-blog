'use strict'
import React from 'react'
import {Link} from 'react-router-dom'

import './Blogs.css'
import Loader from '../Loader'
import {formatDate} from '../../utils'

class Blogs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async getBlogs (url) {
    this.setState({
      isLoading: true
    })

    await this.props.getBlogs(url)

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
    this.getBlogs(this.props.tag)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.tag !== nextProps.tag) {
      this.getBlogs(nextProps.tag)
    }
  }

  render () {
    const {blogs} = this.props

    return (
      this.state.isLoading
        ? <Loader/>
        : <div className="blogs animated bounceInUp">
          {
            blogs.map(meta => (
              <section key={meta.url}
                       className="box"
              >
                <Link to={`/blog/${meta.url}`}>
                  <h1>
                    {meta.title}
                  </h1>
                </Link>
                <section className="blog-meta">
                <span className="meta">
                  {formatDate(meta.updateDate || meta.date)}
                </span>
                  {
                    meta.tags.map((tag) => (
                      <Link to={`/tag/${tag}`}
                            className="meta"
                            key={tag}
                      >
                        #{tag}
                      </Link>
                    ))
                  }
                </section>
              </section>
            ))
          }
        </div>
    )
  }
}

export default Blogs