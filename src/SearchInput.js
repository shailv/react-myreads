import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

/**
 * Search input component to get search term and fetch results
 */
class SearchInput extends Component {
  /* Fetch search results and pass it to parent component */
  onSearch = (e) => {
    const searchTerm = e.target.value;
    //call API for search term length greater than 3 
    if (searchTerm.length > 3) {
      BooksAPI.search(searchTerm)
        .then((results) => (
          this.props.onSearch(results)
        ))
    }
  }
  render() {
    return (
      <div className="search-books-input-wrapper">
        <input type="text" name="searchTerm" placeholder="Search by title or author" onChange={this.onSearch} />
      </div>
    )
  }
}

export default SearchInput;