import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Loading from './Loading'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BookShelves extends Component {	
  	render() {
    	return (
        	<div className="list-books">
            	<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
          		{ 
          			this.props.loading && <div className='loading-container'>
          				<Loading loading={ this.props.loading } />
          			</div> 
          		}
          		{ 
          			!this.props.loading && this.props.shelves.map((shelfContent, index) => (
        				<BookShelf key={ index } shelfName={ shelfContent.name } bookList={ shelfContent.books } onShelfChange={ this.props.onShelfChange } />
        			))
    			}
  			 	<div className="open-search">
              		<Link to="/search">Add a book</Link>
            	</div>	
			</div>	
        )
    }
}

BookShelves.propTypes = {
    loading: PropTypes.bool.isRequired,
  	shelves: PropTypes.array.isRequired,
  	onShelfChange: PropTypes.func.isRequired
}

export default withRouter(BookShelves)
