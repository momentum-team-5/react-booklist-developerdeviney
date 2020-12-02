import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Link, Redirect } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Status({ auth }) {
    const [read, setRead] = useState(false)
    const [reading, setReading] = useState(false)
    const [toread, setToRead] = useState(false)
    const [feedback, setFeedbackMsg] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        axios.post('https://books-api.glitch.me/api/books/status/:status', {
            read: read,
            reading: reading,
            toread: toread
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
            <h2 className='db b mv2'>Set Status<Link to='/books'>Go Back to Book List</Link></h2>

            <form onSubmit={handleSubmit}>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='read'>Read</label>
                    <input
                        className='f5 pa2 w-750'
                        type='radio'
                        id='read'
                        value={read}
                        onChange={event => setRead(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='reading'>Reading</label>
                    <input
                        className='f5 pa2 w-750'
                        type='radio'
                        id='reading'
                        value={reading}
                        onChange={event => setReading(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='toread'>To Read</label>
                    <input
                        className='f5 pa2 w-750'
                        type='radio'
                        id='toread'
                        value={toread}
                        onChange={event => setToRead(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div >
    )
}