import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
	render() {
    	return (
        	<div className="bookshelf">
           		<h2 className="bookshelf-title">{ this.props.shelfName }</h2>
            	<div className="bookshelf-books">
               		<ol className="books-grid">
         	 			{ this.props.bookList.map((book) => (
                            <Book key={ book.id } book={ book } onShelfChange={ this.props.onShelfChange } />
        				))}
              		</ol>
            	</div>
        	</div>
        )
    }
}

BookShelf.propTypes = {
    shelfName: PropTypes.string.isRequired,
  	bookList: PropTypes.array.isRequired,
  	onShelfChange: PropTypes.func.isRequired
}

export default withRouter(BookShelf)