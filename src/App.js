import React from 'react'
import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import SearchBooks from './SearchBooks'

const bookShelves = [
  {
    "shelfID": "currentlyReading",
    "shelfName": "Currently Reading"
  },
  {
    "shelfID": "wantToRead",
    "shelfName": "Want to Read"
  },
  {
    "shelfID": "read",
    "shelfName": "Read"
  }
]
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksList: {}
    };
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  onShelfChange(bookToUpdate, newShelfName) {

    //update the book shelf name in BooksAPI
    BooksAPI.update(bookToUpdate, newShelfName);

    //refresh booksList with the updated book and update the state
    const newBookList = Object.assign({}, this.state.booksList);
    const bookPosition = Object.values(newBookList).findIndex(b => b.id === bookToUpdate.id);
    newBookList[bookPosition] = bookToUpdate;
    this.setState(() => ({ booksList: newBookList }));
  }

  //Get all books when component is mounted
  componentDidMount() {
    BooksAPI.getAll().then((data) => this.setState(() => ({ booksList: data })));
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={SearchBooks} />

        <Route exact path='/' render={() => (
          
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookShelves.map((shelf) => (
                  <div className="bookshelf" key={shelf.shelfID}>
                    <h2 className="bookshelf-title">{shelf.shelfName}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {Object.values(this.state.booksList).filter(book => book.shelf === shelf.shelfID).map(bookObject =>
                          <li key={bookObject.id}>
                            <Book bookObject={bookObject} onShelfChange={this.onShelfChange} />
                          </li>
                        )}
                      </ol>

                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="open-search">
				<Link to='/search'>Search a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}
export default BooksApp;
