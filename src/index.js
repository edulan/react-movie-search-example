import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import './index.css'
import App from './App'

import { buildSearchPath } from './urlHelper'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/search/:term' component={App} />
      <Redirect to={buildSearchPath('The Matrix')} />
    </Switch>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
