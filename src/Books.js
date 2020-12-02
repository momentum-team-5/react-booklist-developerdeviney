import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Link, Redirect } from "react-router-dom"
import AddBook from './AddBook'




export default function Books({ auth }) {
    const [books, setBooks] = useState([])


    useEffect(() => {
        axios.get('https://books-api.glitch.me/api/books', {
            auth: auth
        })

            .then(response => {
                setBooks(response.data.books)
            })
    }, [auth])


    if (!auth) {
        // eslint-disable-next-line react/jsx-no-undef
        return <Redirect to='/login' />
    }

    return (
        <div className='Books'>
            <h2>Books</h2>
            {books.map(book => (
                <div key={books._id} className='Book'>
                    <Link to={'/books/' + book._id}>{book.title || 'No Title'}</Link>
                    <p>Written by: {book.authors} on <strong>{book.status}</strong></p>
                </div>
            ))}
            <div className='mv2'>
                <Link to='/addbook'>Add A Book</Link>
            </div>
        </div >
    )
}
