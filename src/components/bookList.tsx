import "../App.css"
import React,{useState} from 'react'
import {ActionType} from '../alltypes'
import {Book} from '../alltypes'

import "../App.css"
interface BookListProps {
  books:Book[]
  dispatch: React.Dispatch<ActionType>;
  // setCount: any;

}

const bookList:React.FC<BookListProps> = ({books,dispatch}) => {
  const [editBook, setEditBook] = useState<number>(0);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editPublicationYear, setEditPublicationYear] = useState<number>(0);

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


  


  return (
    <div className="booklist">
    <table border={1} cellPadding={10}>
        <tbody>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>Actions</th>
          </tr>
          {books && books.map((book) => (
            <tr key={book.id}>
              <td>{editBook===book.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  title="title"
                />
              ) : (
                book.title
              )
              }</td>
              <td>{editBook===book.id ? (
                <input
                  type="text"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  title="author"
                />
              ) : (
                book.author
              )}</td>
              <td>{editBook===book.id ? (
                <input
                  type="number"
                  value={editPublicationYear}
                  onChange={(e) => setEditPublicationYear(parseInt(e.target.value))}
                  title="publicationYear"
                />
              ) : (
                book.publicationYear
              
              )}</td>
              <td>
                {editBook === book.id ? (
                  <button onClick={()=>handleSaveEdit(book.id)}>Save</button>

                ) : (
                  <>
                  <button onClick={() => handleUpdateBook(book)}>Update</button>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                  </>
                )
                }
               
              </td>
            </tr>
          ))}
        </tbody>
     </table>
    </div>
  )
}

export default bookList