import React, { PureComponent } from 'react'
import './App.css'

import Error from './Error'
import Search from './Search'
import List from './List'
import Company from './Company'

import { buildSearchPath } from './urlHelper'
import { searchCompany as search } from './companyService'

class App extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      term: props.match.params.term,
      items: [],
      errorMessage: null
    }

    this.updateUrl = this.updateUrl.bind(this)
    this.performSearch = this.performSearch.bind(this)
    this.receiveSearch = this.receiveSearch.bind(this)
    this.setError = this.setError.bind(this)
    this.clearError = this.clearError.bind(this)
    this.updateItems = this.updateItems.bind(this)
    this.updateTerm = this.updateTerm.bind(this)
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
    const locationChanged = nextProps.location !== this.props.location

    if (locationChanged) {
      this.updateTerm(nextProps.match.params.term)
    }
  }

  updateUrl (term) {
    if (this.props.match.params.term !== term) {
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
    this.updateItems(search.result)
  }

  clearError () {
    this.setError(null)
  }

  setError (errorMessage) {
    this.setState(() => ({ errorMessage }))
  }

  updateItems (items) {
    this.setState(() => ({ items }))
  }

  updateTerm (term) {
    this.setState(() => ({ term }))
  }

  render () {
    const { items, term, errorMessage } = this.state

    return (
      <div className='App'>
        <div className='Search'>
          <Search
            term={term}
            onSearch={this.updateTerm}
          />
        </div>
        <div className='Items'>
          {errorMessage
            ? <Error message={errorMessage} />
            : <List items={items} itemRenderer={(item) => <Company {...item} />} />}
        </div>
      </div>
    )
  }
}

App.defaultProps = {
  search: search
}

export default App
