import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Redirect } from "react-router-dom"


export default function Books({ auth }) {
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios.get('https://books-api.glitch.me/api/books', {
            auth: auth
        })

            .then(response => {
                setBooks(response.data.books)
            })
    })

    if (!auth) {
        // eslint-disable-next-line react/jsx-no-undef
        return <Redirect to='/login' />
    }

    return (
        <div className='Books'>
            <h2>Books</h2>
            {books.map(books => (
                <div key={books.title} className='Books'>
                    <h3>{books.title || 'No Title'}</h3>
                    <p>Written by {books.authors} on {books.status}</p>
                </div>
            ))}
        </div>
    )
}
