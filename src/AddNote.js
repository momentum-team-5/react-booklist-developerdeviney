import React, { useState, useEffect } from 'react'
import { useParams, Redirect, Link } from 'react-router-dom'
import './App.css'
import axios from 'axios'

export default function AddNote({ auth }) {
    const { id } = useParams()
    const [note, setNote] = useState({})
    const [deleted, setDelete] = useState(false)
    const [feedbackMsg, setFeedbackMsg] = useState('')

    useEffect(() => {
        axios.get('https://books-api.glitch.me/api/books/' + id, {
            auth: auth
        })
            .then(response => {
                const note = response.data.note
                setNote(note.find(title => title._id === id))
            })
    }, [id])

    function handleSubmit(event) {
        event.preventDefault()

        axios.post('https://books-api.glitch.me/api/books/:id/notes', {
            note: note
        }, { auth })
            .then(response => {
                setFeedbackMsg({ type: 'success', message: 'Book Updated' })
            })
    }

    function deleteNote(event) {
        event.preventDefault()

        axios.delete('https://books-api.glitch.me/api/notes/' + id, {
            auth: auth
        })
            .then(response => {
                setDelete(true)
            })
    }

    if (!auth) {
        return <Redirect to='/login/' />
    }

    if (deleted) {
        return <Redirect to='/books' />
    }

    return (
        <div className='AddNote'>
            <h2 className='db b mv2'>Add A Book or <Link to='/books'>Go Back to Book List</Link></h2>

            <form onSubmit={handleSubmit}>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='title'>Note Title</label>
                    <input
                        className='f5 pa2 w-750'
                        type='text'
                        id='note'
                        value={note}
                        onChange={event => setNote(event.target.value)}
                    />
                </div>

                <div className='mv2'>
                    <button type='submit'>Add Note</button>
                </div>
            </form>
        </div >
    )
}