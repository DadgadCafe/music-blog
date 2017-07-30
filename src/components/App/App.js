'use strict'
import React from 'react'
import Sidebar from '../SideBar'
import ProgressBar from '../ProgressBar'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <ProgressBar/>
        <Sidebar/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App