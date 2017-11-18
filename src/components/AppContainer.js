import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import App from './App'
import connectUrl from './connectUrl'

import { buildSearchPath } from '../utils/urlHelper'
import search from '../services/movieSearch'

class AppContainer extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      term: props.term,
      items: [],
      errorMessage: null
    }

    this.updateUrl = this.updateUrl.bind(this)
    this.performSearch = this.performSearch.bind(this)
    this.receiveSearch = this.receiveSearch.bind(this)
    this.setError = this.setError.bind(this)
    this.clearError = this.clearError.bind(this)
    this.setItems = this.setItems.bind(this)
    this.setTerm = this.setTerm.bind(this)
  }

  componentDidMount () {
    // Side effects
    this.updateUrl(this.state.term)
    this.performSearch(this.state.term)
  }

  componentDidUpdate (_, prevState) {
    const termChanged = prevState.term !== this.state.term

    if (termChanged) {
      // Side effects
      this.updateUrl(this.state.term)
      this.performSearch(this.state.term)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.term !== this.props.term) {
      this.setTerm(nextProps.term)
    }
  }

  updateUrl (term) {
    // Only update if needed
    if (this.props.term !== this.state.term) {
      this.props.history.push(buildSearchPath(term))
    }
  }

  performSearch (term) {
    this.props.search(term).then(this.receiveSearch)
  }

  receiveSearch (search) {
    if (search.error) {
      this.setError(search.error.message)
      return
    }

    this.clearError()
    this.setItems(search.result)
  }

  clearError () {
    this.setError(null)
  }

  setError (errorMessage) {
    this.setState(() => ({ errorMessage }))
  }

  setItems (items) {
    this.setState(() => ({ items }))
  }

  setTerm (term) {
    this.setState(() => ({ term }))
  }

  render () {
    const { items, term, errorMessage } = this.state

    return (
      <App
        items={items}
        term={term}
        errorMessage={errorMessage}
        onSearch={this.setTerm}
      />
    )
  }
}

AppContainer.propTypes = {
  term: PropTypes.string,
  search: PropTypes.func
}

AppContainer.defaultProps = {
  search: search
}

function mapParamsToProps ({ term }) {
  return {
    term
  }
}

export default connectUrl(mapParamsToProps)(AppContainer)
