import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './App.css'

import Error from './Error'
import Search from './Search'
import List from './List'
import Movie from './Movie'

class App extends PureComponent {
  render () {
    const { items, term, errorMessage, onSearch } = this.props

    return (
      <div className='App'>
        <div className='Search'>
          <Search
            term={term}
            onSearch={onSearch}
          />
        </div>
        <div className='Items'>
          {errorMessage
            ? <Error message={errorMessage} />
            : <List items={items} itemRenderer={(item) => <Movie {...item} />} />}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  items: PropTypes.array,
  term: PropTypes.string,
  errorMessage: PropTypes.string
}

export default App
