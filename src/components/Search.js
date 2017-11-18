import React, { PureComponent } from 'react'

class Search extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      term: this.props.term
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setTerm = this.setTerm.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.term !== this.props.term) {
      this.setTerm(nextProps.term)
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    this.props.onSearch(this.state.term)
  }

  handleChange (event) {
    this.setTerm(event.target.value)
  }

  setTerm (term) {
    this.setState(() => ({ term }))
  }

  render () {
    const { term } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input className='Search-Input' type='search' value={term} onChange={this.handleChange} required />
        <button type='submit'>Search</button>
      </form>
    )
  }
}

Search.defaultProps = {
  term: ''
}

export default Search
