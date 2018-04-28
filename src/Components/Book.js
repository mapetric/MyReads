import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component {  
	render() {
    	return (
          	<li>
        		<div className="book">
            		<div className="book-top">
                		<div 
          					className="book-cover" style={{ 
          						width: 128,
          						height: 193,
          						backgroundImage: (this.props.book.imageLinks.thumbnail && `url("${ this.props.book.imageLinks.thumbnail.replace('http', 'https') }")`)
          					}}>
          				</div>
                		<div className="book-shelf-changer">
                    		<select value={ this.props.book.shelf || 'none' } onChange={ (event) => this.props.onShelfChange(this.props.book, event.target.value) }>
                       			<option value="nope" disabled>Move to...</option>
                         		<option value="currentlyReading">Currently Reading</option>
                        		<option value="wantToRead">Want to Read</option>
                    			<option value="read">Read</option>
          						<option value="none">None</option>
                  	  		</select>
                      </div>
             		</div>
              		<div className="book-title">{ this.props.book.title && this.props.book.title }</div>
             		<div className="book-authors">{ this.props.book.authors && this.props.book.authors.join(', ') }</div>
      			</div>
			</li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
  	onShelfChange: PropTypes.func.isRequired
}

export default withRouter(Book)