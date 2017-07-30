'use strict'
import React from 'react'
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'

import {history} from '../store'
import App from '../components/App'
import Blogs from '../components/Blogs'
import Tags from '../components/Tags'
import About from '../components/About'
import Blog from '../components/Blog'

const Router = () => (
  <ConnectedRouter history={history}>
    <BrowserRouter basename="/music-blog">
    <App>
      <Switch>
        <Route exact path="/"/>
        <Route exact path="/blog" component={Blogs}/>
        <Route exact path="/blog/:blogId" component={Blog}/>
        <Route exact path="/tag" component={Tags}/>
        <Route exact path="/tag/:tagId" component={Tags}/>
        <Route exact path="/about" component={About}/>
        <Redirect from="**" to="/"/>
      </Switch>
    </App>
    </BrowserRouter>
  </ConnectedRouter>
)

export default Router