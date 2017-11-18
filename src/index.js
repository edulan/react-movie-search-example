import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import './index.css'
import AppContainer from './components/AppContainer'

import { defaultSearchPath } from './utils/urlHelper'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/search/:term' component={AppContainer} />
      <Redirect to={defaultSearchPath()} />
    </Switch>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
