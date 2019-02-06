# MyReads Project
MyReads is a project to organize books in bookshelves. There are 3 bookshelves - Currently Reading, Read, Want to Read. 

The project also has a search functionality to search a database of books and add to one of the three book shelves.

Users can move books between shelves from the home or search pages.Each book has a dropdown that allows the user to select which shelf to move the book to. To remove a book from all shelves, select the "none" option from the dropdown.

## Installation
To get started developing right away:
* install all project dependencies with `npm install`
* start the development server with `npm start`

## BooksAPI
 
### getAll()
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### update(book, shelf)
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### search(query, maxResults)
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## More Information
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

