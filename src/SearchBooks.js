import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import SearchInput from "./SearchInput";
/**
 * Renders the search input and displays results
 */
class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: {}
    };
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          //search text input component
          <SearchInput
            onSearch={results =>
              this.setState(() => ({ searchResults: results }))
            }
          />
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            //display results if search results is not empty
            {Array.isArray(this.state.searchResults) &&
              Object.values(this.state.searchResults).map(result => (
                <li key={result.id}>
                  <Book
                    bookObject={result}
                    onShelfChange={this.props.onShelfChange}
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