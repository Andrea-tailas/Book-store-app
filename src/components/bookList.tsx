import "../App.css"
import React,{useState,useCallback} from 'react'
import {ActionType} from '../alltypes'
import {Book} from '../alltypes'

import "../App.css"
interface BookListProps {
  dispatch: React.Dispatch<ActionType>;
  booksPerPage:number;
  filterBooks:Book[];
}



const bookList:React.FC<BookListProps> = ({dispatch,filterBooks,booksPerPage}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editBook, setEditBook] = useState<number>(0);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editPublicationYear, setEditPublicationYear] = useState<number>(0);


  const indexOfLastBook = currentPage * booksPerPage;
const indexOfFirstBook = indexOfLastBook - booksPerPage;
const currentBooks = filterBooks && filterBooks.slice(indexOfFirstBook, indexOfLastBook);
const totalPages = Math.ceil(filterBooks && filterBooks.length / booksPerPage);



  const handleDeleteBook = (id: number) => {
    dispatch({ type: "DELETE_BOOK", payload: id });
  }
  
  const handleUpdateBook = (book:Book) => {
    setEditBook(book.id)
    setEditTitle(book.title)
    setEditAuthor(book.author)
    setEditPublicationYear(book.publicationYear)
  }
    
const handleSaveEdit = (id:number) => {
    dispatch({
      type: "UPDATE_BOOK",
      payload: {
        id,
        title: editTitle,
        author: editAuthor,
        publicationYear: editPublicationYear,
}});setEditBook(0)
}

const handlePageChange = useCallback((Num:number) => {
  setCurrentPage(Num)
}, []);
  


  return (
    <div className="booklist">
    <table border={1} >
        <tbody>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th id="actions" >Actions</th>
          </tr>
          {currentBooks && currentBooks.map((filterBooks) => (
            <tr key={filterBooks.id}>
              <td>{editBook===filterBooks.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  title="title"
                />
              ) : (
                filterBooks.title
              )
              }</td>
              <td>{editBook===filterBooks.id ? (
                <input
                  type="text"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  title="author"
                />
              ) : (
                filterBooks.author
              )}</td>
              <td>{editBook===filterBooks.id ? (
                <input
                  type="number"
                  value={editPublicationYear}
                  onChange={(e) => setEditPublicationYear(parseInt(e.target.value))}
                  title="publicationYear"
                />
              ) : (
                filterBooks.publicationYear
              
              )}</td>
              <td>
                {editBook === filterBooks.id ? (
                  <button onClick={()=>handleSaveEdit(filterBooks.id)}>Save</button>

                ) : (
                  <>
                  <button onClick={() => handleUpdateBook(filterBooks)}>Update</button>
                  <button onClick={() => handleDeleteBook(filterBooks.id)}>Delete</button>
                  </>
                )
                }
               
              </td>
            </tr>
          ))}
        </tbody>
     </table>
     <div>
        <button onClick={()=>{handlePageChange(currentPage - 1)}}
         disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={()=>{handlePageChange (currentPage + 1)}}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default bookList