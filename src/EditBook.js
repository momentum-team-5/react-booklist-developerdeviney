import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Redirect, Link, useParams } from "react-router-dom"

export default function EditBook({ auth }) {
    const { id } = useParams()
    const [feedbackMsg, setFeedbackMsg] = useState('')
    const [book, setBook] = useState({ authors: [] })


    function handleSubmit(event) {
        event.preventDefault()

        axios.put('https://books-api.glitch.me/api/books/' + id, book, { auth })
            .then(response => {
                setFeedbackMsg({ type: 'success', message: 'Book Updated' })
            })
    }

    useEffect(() => {
        axios.get('https://books-api.glitch.me/api/books/' + id, {
            auth: auth
        })
            .then(response => {
                setBook(response.data.book)
            })
    }, [auth, id])

    function setTitle(title) {
        setBook({ authors: book.authors, status: book.status, title: title })
    }

    function setAuthors(authors) {
        setBook({
            authors: authors.split(", "),
            status: book.status,
            title: book.title
        })
    }

    if (!auth) {
        return <Redirect to='/login/' />
    }

    if (feedbackMsg) {
        return <Redirect to='/' />
    }

    return (
        <div className='EditBook'>
            <h2 className='db b mv2'>Edit Book or <Link to='/'>Go Back to Book List</Link></h2>

            <form onSubmit={handleSubmit}>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='title'>Title</label>
                    <input
                        className='f5 pa2 w-750'
                        type='text'
                        id='title'
                        value={book.title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='authors'>Author</label>
                    <input
                        className='f5 pa2 w-750'
                        type='text'
                        id='authors'
                        value={book.authors.join(", ")}
                        onChange={event => setAuthors(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <button type="submit">Submit Edit</button>
                </div>
            </form>
        </div >
    )
}