import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'

class SearchInput extends Component{
  onSearch = (e) => {
	const searchTerm = e.target.value;
    BooksAPI.search(searchTerm)
    .then((results) => (
		this.props.onSearch(results)
    ))
  }
	render(){
    	return(
        	<div className="search-books-input-wrapper">
            	<input type="text" name="searchTerm" placeholder="Search by title or author" onChange={this.onSearch}/>
			</div>
        )
    }
}

export default SearchInput;