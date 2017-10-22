import React from 'react'
import PropTypes from 'prop-types'

function connectUrl (mapParamsToProps) {
  return function (WrappedComponent) {
    class ConnectUrl extends React.Component {
      constructor (props) {
        super(props)

        this.state = {
          wrappedProps: mapParamsToProps(this.props.match.params)
        }
      }

      componentWillReceiveProps (nextProps) {
        const locationChanged = nextProps.location !== this.props.location

        if (locationChanged) {
          this.setState(() => ({
            wrappedProps: mapParamsToProps({...nextProps.match.params})
          }))
        }
      }

      render () {
        // TODO: Should we exclude Route props?
        return <WrappedComponent {...this.props} {...this.state.wrappedProps} />
      }
    }

    ConnectUrl.propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    }

    return ConnectUrl
  }
}

export default connectUrl
