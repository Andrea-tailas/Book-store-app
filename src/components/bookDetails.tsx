import "../App.css"
import  { useState } from 'react';
interface TodoFormProps {
    addBookHandler: (text: string) => void;
  }
  
  const createBook: React.FC<TodoFormProps> = ({ addBookHandler }) => {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!text.trim()) return;
      addBookHandler(text);
      setText('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Book Title"
        />
         <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Book Author"
        />
         <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Book publication year"
        />
        <button type="submit">Add</button>
      </form>
    );
  };
  
  export default createBook;