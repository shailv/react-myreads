import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book' 
import SearchInput from './SearchInput'

class SearchBooks extends Component{
  constructor(props){
    super(props);
  	this.state={
      searchResults : {}
    }
  }
  onShelfChange = (results) => {
		this.setState(() => ({
        	searchResults : results
        }))
  }
	render(){
    	return(
          <div className="search-books">
            <div className="search-books-bar">
      			<Link to='/' className='close-search'>Close</Link>
              	<SearchInput 
          			onSearch={(results) => (
          				this.setState(() => ({searchResults : results}))
					)}
  				/>
            </div>
            <div className="search-books-results">
	      		<ol className="books-grid">
{console.log(Object.values(this.state.searchResults))}
                  {this.state.searchResults && 
                    Object.values(this.state.searchResults).map((result) => (
                  	<li key={result.id}>
                      <Book bookObject={result} onShelfChange={this.onShelfChange} />
					</li>
                  	))
				   }
				</ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks