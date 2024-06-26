import { useCallback } from 'react'
import './App.css'
import Form from './components/form'
import BookList from './components/bookList'
import useBooksReducer from './hooks/bookReducer'
// import BookListPage from "../src/components/pages"


function App() {
  const [state, dispatch] = useBooksReducer()

  const handleSearch = useCallback((searchTerm: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SEARCH_BOOK', payload: searchTerm.target.value })
  }, [dispatch])

  const filterBooks = state.books && state.books.filter((book) => book.title.toLowerCase().includes(state.searchquery.toLowerCase()))

  const currentBooks = filterBooks && filterBooks.slice((state.currentpage - 1) * state.booksperpage, state.currentpage * state.booksperpage)

  


  return (
    <>
    <div className="bookApp">
      <h1>Book App</h1>
     <div>
      <Form dispatch={dispatch}/>
      <div className='search'>
      <input type='text' placeholder='Enter book to search...' value={state.searchquery} onChange={handleSearch} title="text"/>
      </div>
      <BookList  books={currentBooks} dispatch={dispatch}/>
     </div>
    </div>
    </>
  )
}

export default App
