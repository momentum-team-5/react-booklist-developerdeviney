import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Redirect, Link, useParams } from "react-router-dom"

export default function EditBook({ auth }) {
    const { id } = useState('')
    const [title, setTitle] = useState('')
    const [authors, setAuthors] = useState('')
    const [feedbackMsg, setFeedbackMsg] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        axios.put('https://books-api.glitch.me/api/books/:id' + id, {
            title: title,
            authors: authors
        }, { auth })
            .then(response => {
                setFeedbackMsg({ type: 'success', message: 'Book Updated' })
            })
    }

    if (!auth) {
        return <Redirect to='/login/' />
    }

    if (feedbackMsg) {
        return <Redirect to='/books' />
    }

    return (
        <div className='EditBook'>
            <h2 className='db b mv2'>Edit Book or <Link to='/book'>Go Back to Book List</Link></h2>

            <form onSubmit={handleSubmit}>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='title'>Title</label>
                    <input
                        className='f5 pa2 w-750'
                        type='text'
                        id='title'
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='authors'>Author</label>
                    <input
                        className='f5 pa2 w-750'
                        type='text'
                        id='authors'
                        value={authors}
                        onChange={event => setAuthors(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <button onClick={EditBook}>Edit</button>
                </div>
            </form>
        </div >
    )
}