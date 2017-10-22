import React from 'react'

// It's a function...
function connectUrl () {
  // Which returns a function that takes a component...
  return function (WrappedComponent) {
    // It creates a new wrapper component...
    class ConnectedComponent extends React.Component {
      render () {
        // And it renders the component it was given
        return <WrappedComponent {...this.props} />
      }
    }

    // Remember: it takes a component and returns a new component
    // Gotta return it here.
    return ConnectedComponent
  }
}

export default connectUrl
