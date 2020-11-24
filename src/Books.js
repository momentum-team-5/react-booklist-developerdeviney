import React, { useState, useEffect } from 'react'
import './App.css'
// import { Link } from 'react-router-dom'

function Books() {
    useEffect(() => {
        fetchBooks();
    }, []);

    const [books, setBooks] = useState([])

    const fetchBooks = async () => {
        const data = await fetch(
            'https://books-api.glitch.me/api/books'
        );
        const books = await data.json();
        console.log(books)
        setBooks(books.title)
    };


    return (
        <div>
            {books.map(books => (
                <h1>{books.title}</h1>
            ))}


        </div>

    )
}

export default Books