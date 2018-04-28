import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBook extends Component {
  	render() {
    	return (
  			<div className="search-books">
            	<div className="search-books-bar">
              		<Link onClick={ this.props.emptySearched } to="/" className="close-search">Close</Link>
              		<div className="search-books-input-wrapper">
                		<input onChange={ (event) => this.props.findBooks(event) } type="text" placeholder="Search by title or author"/>
           			</div>
          		</div>
            	<div className="search-books-results">
              		<ol className="books-grid">
						{ (this.props.searchResults) && this.props.searchResults.map((book) => (
                     		<Book key={ book.id } book={ book } onShelfChange={ this.props.onShelfChange } />
                      	))}
					</ol>
            	</div>
     		</div>
		)
	}
}

SearchBook.propTypes = {
    emptySearched: PropTypes.func.isRequired,
  	searchResults: PropTypes.func.isRequired,
  	findBooks: PropTypes.func.isRequired,
  	onShelfChange: PropTypes.func.isRequired
}

export default withRouter(SearchBook)
