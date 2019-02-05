import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from './BooksAPI'
import SearchInput from "./SearchInput";

/**
 * @description Renders the search input and displays results
 */
class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: {},
      usersShelf: {}
    };
    this.onSearch = this.onSearch.bind(this);
    this.onShelfChange = this.onShelfChange.bind(this);
  }
  /** 
  * @description Get all books on user's shelves
  */
  componentDidMount() {
    BooksAPI.getAll().then((data) => this.setState(() => ({ usersShelf: data })));
  }

  /** 
  * @description Save search results in state and update books with user's shelf values
  * @param {Object} results Search results Book collection
  */
  onSearch(results) {
    if (Array.isArray(results)) {
      results.forEach((result) => {
        const bookOnShelf = this.state.usersShelf.filter(book => book.id === result.id);
        result.shelf = (bookOnShelf.length > 0) ? bookOnShelf[0].shelf : 'none';
      })
      this.setState(() => ({ searchResults: results }));
    }
    else {
      this.setState(() => ({ searchResults: {} }));
    }
  }

  /** 
  * @description Update book's shelf and refresh state to reflect the book's new shelf
  * @param {Object} bookToUpdate Book object that needs to be updated
  * @param {string} newShelfName Shelf name that was selected by user
  */
  onShelfChange(bookToUpdate, newShelfName) {
    //update the book shelf name in BooksAPI
    BooksAPI.update(bookToUpdate, newShelfName);

    //refresh booksList with the updated book and update the state
    this.setState((currentState) => {
      const updatedSearchResults = [...currentState.searchResults];
      const bookPosition = updatedSearchResults.findIndex(b => b.id === bookToUpdate.id)

      updatedSearchResults[bookPosition] = bookToUpdate;
      return { searchResults: updatedSearchResults }
    });
  }
  /** 
  * @description Render SearchInput component and display books in search result
  */
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <SearchInput
            onSearch={this.onSearch}
          />
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Array.isArray(this.state.searchResults) &&
              this.state.searchResults.map(result => (
                <li key={result.id}>
                  <Book shelves={this.props.shelves}
                    bookObject={result}
                    onShelfChange={this.onShelfChange}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;