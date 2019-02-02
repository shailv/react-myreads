import React, { Component } from 'react'

/**
 * Book component displays a single book instance and handles shelf change event
 */
class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelf: props.bookObject.shelf,
            book: props.bookObject
        }
        this.onShelfChange = this.onShelfChange.bind(this);
    }

    /* On selection of shelf dropdown, change shelf of book and save in state */
    onShelfChange = (event) => {
        const updatedBook = Object.assign({}, this.state.book)
        updatedBook.shelf = event.target.value;
        this.setState(() => ({ book: updatedBook }));

        this.props.onShelfChange(updatedBook, event.target.value);
    }

    render() {
        const bookObject = this.state.book;
        return (
            <div className="book">
                <div className="book-top">
                    //display cover if image object exists
                    {bookObject.imageLinks &&
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookObject.imageLinks.thumbnail})` }}></div>
                    }
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf} onChange={this.onShelfChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookObject.title}</div>
                <div className="book-authors">{bookObject.author}</div>

            </div>
        )
    }
}

export default Book;