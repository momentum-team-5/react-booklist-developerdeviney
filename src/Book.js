import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Redirect, useParams } from "react-router-dom"



export default function Book({ auth }) {
    const { id } = useParams()
    const [book, setBook] = useState({})
    const [deleted, setDeleted] = useState(false)
    const [status, setStatus] = useState({})
    const [edit, setEdit] = useState(null)
    const [note, setNote] = useState({})

    useEffect(() => {
        axios.get('https://books-api.glitch.me/api/books/', {
            auth: auth
        })

            .then(response => {
                const listOfBooks = response.data.books
                setBook(listOfBooks.find(book => book._id === id))
            })
    }, [id])

    function deleteBook() {
        axios.delete('https://books-api.glitch.me/api/books/' + id, {
            auth: auth
        })
            .then(response => {
                setDeleted(true)
            })
    }

    function editBook() {
        axios.put('https://books-api.glitch.me/api/books/:id', {
            auth: auth
        })
            .then(response => {
                setEdit(response.data.book)
            })
    }
    if (!auth) {
        return <Redirect to='/login' />
    }

    if (deleted) {
        return <Redirect to='/' />
    }

    // if (edit) {
    //     return <Redirect to='/books._id' />
    // }

    // if (note) {
    //     return <Redirect to='/books._id' />
    // }

    return (
        <div className='Book'>
            <h2>{book.title || 'No Title'}</h2>
            <p>Written by: {book.authors} on <strong>{book.status}</strong></p>
            <div>
                <button onClick={note}>Add Note</button>
                <button onClick={editBook}>Edit Book</button>
                <button onClick={deleteBook}>Delete Book</button>
            </div>
        </div>
    )
}
