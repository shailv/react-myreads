import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import SearchBooks from './SearchBooks'

/** 
* @description Bookshelf array with shelf name and ID for displaying shelves
*/
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
  },
  {
    "shelfID": "none",
    "shelfName": "None"
  }
]

/** 
* @description Displays user's books on shelves with links to search page
*/
class BooksApp extends React.Component {
  /**
   * @description Create state object to store all books saved by user
   * @constructor Initializes state and binds OnShelfChange event
   * @param {Object} props 
   */  
  constructor(props) {
    super(props);
    this.state = {
      booksList: {}
    };
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  /** 
  * @description Handles shelf update event to update the book shelf name using BooksAPI
  * @param {Object} bookToUpdate Book object that needs to be updated
  * @param {string} newShelfName Shelf name that was selected by user
  */
  onShelfChange(bookToUpdate, newShelfName) {
    //update the book shelf name in BooksAPI
    BooksAPI.update(bookToUpdate, newShelfName);

    //refresh booksList with the updated book and update the state
    const newBookList = Object.assign({}, this.state.booksList);
    const bookPosition = Object.values(newBookList).findIndex(b => b.id === bookToUpdate.id);
    newBookList[bookPosition] = bookToUpdate;
    this.setState(() => ({ booksList: newBookList }));
  }

  /** 
  * @description Get all books when component is mounted
  */
  componentDidMount() {
    BooksAPI.getAll().then((data) => this.setState(() => ({ booksList: data })));
  }

  /** 
  * @description Handle routing for search and home. Render SearchBooks component and display books in user's shelves
  */
  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks shelves={bookShelves}
            onShelfChange={(bookToUpdate, newShelfName) => {
              this.onShelfChange(bookToUpdate, newShelfName);
              //history.push('/');
            }} />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookShelves.filter(shelf => shelf.shelfID !== 'none').map((shelf) => (
                  <div className="bookshelf" key={shelf.shelfID}>
                    <h2 className="bookshelf-title">{shelf.shelfName}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {Object.values(this.state.booksList).filter(book => book.shelf === shelf.shelfID).map(bookObject =>
                          <li key={bookObject.id}>
                            <Book bookObject={bookObject} onShelfChange={this.onShelfChange} shelves={bookShelves} />
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