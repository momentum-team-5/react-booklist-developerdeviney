import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Link, Redirect } from "react-router-dom"

export default function Books({ auth }) {
    const [books, setBooks] = useState([])
    const statuses = ['toread', 'reading', 'read']
    const getBooks = () => {
        axios.get('https://books-api.glitch.me/api/books', {
            auth: auth
        })
            .then(response => {
                setBooks(response.data.books)
            })
    }

    useEffect(getBooks, [auth])

    if (!auth) {
        // eslint-disable-next-line react/jsx-no-undef
        return <Redirect to='/login' />
    }

    function markBookAsStatus(book, status) {
        axios.put('https://books-api.glitch.me/api/books/' + book._id, {
            title: book.title,
            authors: book.authors,
            status: status
        }, { auth: auth })
            .then(res => {
                getBooks()
            })
    }

    return (
        <div className='Books'>
            <h2>Books</h2>
            {books.map(book => (
                <div key={books._id} className='Book'>
                    <Link to={'/books/' + book._id}>{book.title || 'No Title'}</Link>
                    <p>Written by: {book.authors} on <strong>{book.status}</strong></p>

                    {statuses.filter(s => s !== book.status).map(status => (
                        <button key={status} onClick={() => markBookAsStatus(book, status)}>
                            Mark as {status}
                        </button>
                    ))}
                </div>
            ))
            }
            <div className='mv2'>
                <button><Link to='/addbook'>Add A Book</Link></button>
            </div>
        </div >
    )
}
