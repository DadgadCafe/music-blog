'use strict'
import React from 'react'
import {Link} from 'react-router-dom'

import {CSSTransition, TransitionGroup} from 'react-transition-group'
import './SideBar.css'

const Fade = ({children, ...props}) => (
  <CSSTransition
    {...props}
    timeout={1000}
    appear={true}
    classNames={{
      appearActive: 'animated slideInLeft',
      enterActive: 'animated slideInLeft',
      exitActive: 'animated slideOutLeft'
    }}
  >
    {children}
  </CSSTransition>
)

class SideBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: props.isIndex
    }
  }

  handleToggle () {
    if (!this.props.isIndex) {
      const isOpen = !this.state.isOpen
      this.setState({isOpen})
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({isOpen: nextProps.isIndex})
  }

  render () {
    const SidebarOn = () => (
      <div className="on">
        <Link to="/blog" className="link">
          <i className='ion-android-list'/>
        </Link>
        <Link to="/tag" className="link">
          <i className='ion-pricetags'/>
        </Link>
        <Link to="/about" className="link">
          <i className='ion-android-person'/>
        </Link>
        <a href="https://github.com/" target="_blank" className="link">
          <i className='ion-social-octocat'/>
        </a>
        <a className="link">
          <i className={this.props.isIndex ? 'ion-code' : 'ion-android-arrow-back'}/>
        </a>

      </div>
    )
    const SidebarOff = () => (
      <div className="off link">
        <i className="ion-more"/>
      </div>
    )

    return (
      <div className="sidebar"
           onClick={::this.handleToggle}
      >
        <TransitionGroup>
          {
            this.state.isOpen &&
            <Fade>
              <SidebarOn/>
            </Fade>
          }
          {
            !this.state.isOpen &&
            <Fade>
              <SidebarOff/>
            </Fade>
          }
        </TransitionGroup>
      </div>
    )
  }
}

export default SideBar
