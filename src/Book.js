import React, { Component } from 'react'

/**
 * @description Book component displays a single book instance and handles shelf change event
 */
class Book extends Component {
    /**
     * @description Create state object to store book and shelf values
     * @constructor Initializes state and binds OnShelfChange event
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            shelf: props.bookObject.shelf,
            book: props.bookObject
        }
        this.onShelfChange = this.onShelfChange.bind(this);
    }

    /** 
     * @description On selection of shelf dropdown, change shelf of book and save in state 
     * @param {Object} e Event object with value of shelf
    */
    onShelfChange = (event) => {
        const updatedBook = Object.assign({}, this.state.book)
        updatedBook.shelf = event.target.value;
        this.setState(() => ({ book: updatedBook, shelf: updatedBook.shelf}));

        this.props.onShelfChange(updatedBook, event.target.value);
    }

    /**
     * @description Renders a single book image with dropdown to update it's shelf
     */
    render() {
        const bookObject = this.state.book;
        return (
            <div className="book">
                {bookObject.imageLinks &&
                    <div>
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookObject.imageLinks.thumbnail})` }}></div>

                            <div className="book-shelf-changer">
                                <select value={this.state.shelf} onChange={this.onShelfChange}>
                                    <option value="move" disabled>Move to...</option>
                                    {this.props.shelves.map(shelf =>
                                        <option key={shelf.shelfID} value={shelf.shelfID}>{shelf.shelfName}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{bookObject.title}</div>
                        <div className="book-authors">{bookObject.author}</div>
                    </div>
                }
            </div>
        )
    }
}

export default Book;
