import React, { useRef } from 'react';
import { ActionType } from "../alltypes";
 import "../App.css"
interface BookFormProps {
    dispatch: React.Dispatch<ActionType>
}
 
const form: React.FC<BookFormProps> = ({ dispatch }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);
 
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (titleRef.current && authorRef.current && yearRef.current) {
            const newBook = {
                id: Date.now(),
                title: titleRef.current.value,
                author: authorRef.current.value,
                publicationYear: Number(yearRef.current.value),
            
            };
            dispatch({ type: 'CREATE_BOOK', payload: newBook });
            titleRef.current.value = '';
            authorRef.current.value = '';
            yearRef.current.value = '';
        }
    };
 
    return (
        <form onSubmit={handleSubmit} className='forminput'>
            <input ref={titleRef} type="text" placeholder="Title" required />
            <input ref={authorRef} type="text" placeholder="Author" required />
            <input ref={yearRef} type="number" placeholder="Publication Year" required />
            <button type="submit" className='addbtn'>Add Book</button>
        </form>
    );
};
 
export default form;