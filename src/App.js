import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelves from './Components/BookShelves'
import SearchBook from './Components/SearchBook'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
 	 state = {
       	loading: true,
        allBooks: [],
       	searchResults: [],
       	displaying: [
          				{ 
                        	name: 'Read', 
                         	books: []
                        },
          				{ 
                        	name: 'Currently Reading', 
                         	books: []
                        },
          				{ 
                        	name: 'Want to Read', 
                         	books: []
                        }
     				]
 	 }
	
	findBooks = (event) => {
      	const query = event.target.value
        if (query === '') {
			this.setState({ searchResults: [] })
          	return
        }
		BooksAPI.search(query, 20).then(searchResults => {
        	if (searchResults.error) {
             	searchResults = []
            }
            this.setState({ searchResults }, this.setValues)
  		});
  	};

	setValues = () => {
      	let searchResults = this.state.searchResults.slice()
        let read = this.state.displaying[0].books.map(b => b.id)
        let currentlyReading = this.state.displaying[1].books.map(b => b.id)
        let wantToRead = this.state.displaying[2].books.map(b => b.id)
        searchResults.forEach(book => {
          	if (read.includes(book.id)) {
              	book.shelf = 'read'
            } else if (currentlyReading.includes(book.id)) {
              	book.shelf = 'currentlyReading'
            } else if (wantToRead.includes(book.id)) {
              	book.shelf = 'wantToRead'
            }
        })
      	this.setState({ searchResults })
    }

	emptySearched = () => {
    	this.setState({ searchResults: [] })
    }

	onShelfChange = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then( () => {
          		let allBooks = this.state.allBooks.slice()
                let searchResults = this.state.searchResults.slice()
                let allBooksIDs = allBooks.map(b => b.id)
                if (!allBooksIDs.includes(book.id)) {
                    allBooks.push(book)
               	}
          		allBooks.map((b) => {
                  	if (b.id === book.id) {
                      	b.shelf = shelf
                    }                           	
                  	return b
                })
          		searchResults.map((b) => {
                  	if (b.id === book.id) {
                      	b.shelf = shelf
                    }                           	
                  	return b
                })
          		this.setState({ allBooks, searchResults }, this.filterShelves)
        	})
    }

	filterShelves = () => {
    	let displaying = this.state.displaying.slice()
        displaying[0].books = this.state.allBooks.filter((b) => b.shelf === 'read')
		displaying[1].books = this.state.allBooks.filter((b) => b.shelf === 'currentlyReading')
        displaying[2].books = this.state.allBooks.filter((b) => b.shelf === 'wantToRead')
       	this.setState({ displaying })
    }


	componentDidMount() {
        BooksAPI.getAll().then(allBooks => {
            this.setState({ allBooks }, this.filterShelves)
        }).then(() => {
        	this.setState({ loading: false })
        })
    }

 	render() {
  		const { displaying } = this.state

		return (
      		<div className="app">
        		<Route path="/search" render={( {history} ) => (
          			<SearchBook emptySearched={ this.emptySearched } searchResults={ this.state.searchResults } findBooks={ this.findBooks } onShelfChange={ this.onShelfChange } />
        		)}/>
				<Route exact path="/" render={() => (
					<BookShelves loading={ this.state.loading } onShelfChange={ this.onShelfChange } shelves={ displaying } />
				)}/>
     		</div>
    	)
  	}
}

export default BooksApp
