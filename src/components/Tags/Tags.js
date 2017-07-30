'use strict'
import React from 'react'
import {NavLink} from 'react-router-dom'

import './Tags.css'
import Blogs from '../Blogs'
import Loader from '../Loader'

class Tags extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async getTags () {
    this.setState({
      isLoading: true
    })

    await this.props.getTags()

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
    this.getTags()
  }

  render () {
    const {tags, tagId, url} = this.props

    return (
      this.state.isLoading
        ? <Loader />
        : <div className="tags">
          <section className="all-tags animated pulse">
            {
              tags.map((tag) => {
                const to = `/tag/${tag}`
                return (
                  <section className="box"
                           key={tag}
                  >
                    <NavLink to={to}
                             activeClassName="selected"
                    >
                      #{tag}
                    </NavLink>
                  </section>
                )
              })
            }
          </section>
          {
            tagId
            && <section className="selected-tag animated bounceInUp">
              <Blogs tag={url}/>
            </section>
          }
        </div>
    )
  }
}

export default Tags