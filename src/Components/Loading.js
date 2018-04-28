import React, { Component } from 'react'
import { RingLoader } from 'react-spinners'
import PropTypes from 'prop-types'

class Loading extends Component {
  	render() {
    	return (
      		<div className='sweet-loading'>
        		<RingLoader
          			color={'#2E7C31'}
          			size={ 300 }
          			loading={this.props.loading} 
        		/>
      		</div>
    	)
  	}
}

Loading.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default Loading