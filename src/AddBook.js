import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Link, Redirect } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function AddBook({ auth }) {
    const [title, setTitle] = useState('')
    const [authors, setAuthors] = useState('')
    const [feedbackMsg, setFeedbackMsg] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        axios.post('https://books-api.glitch.me/api/books', {
            title: title,
            authors: [authors]
        }, { auth })
            .then(response => {
                setFeedbackMsg({ type: 'success', message: 'Book Updated' })
            })
    }

    if (!auth) {
        return <Redirect to='/login/' />
    }
    return (
        <div className='AddBook'>
            <h2 className='db b mv2'>Add A Book or <Link to='/books'>Go Back to Book List</Link></h2>

            <form onSubmit={handleSubmit}>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='title'>Title</label>
                    <input
                        className='f5 pa2 w-500'
                        type='text'
                        id='title'
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='authors'>Author</label>
                    <input
                        className='f5 pa2 w-500'
                        type='text'
                        id='authors'
                        value={authors}
                        onChange={event => setAuthors(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <button type='submit'>Add Book</button>
                </div>
            </form>
        </div >
    )
}