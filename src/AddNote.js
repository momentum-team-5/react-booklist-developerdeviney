import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'
import axios from 'axios'

export default function AddNote({ auth }) {
    const { id } = useParams()
    const [title, setTitle] = useState({})
    const [deleted, setDelete] = useState(false)

    useEffect(() => {
        axios.get('https://books-api.glitch.me/api/books/' + id, {
            auth: auth
        })
            .then(response => {
                const note = response.data.note
                setNote(note.find(title => title._id === id))
            })
    }, [id])


    function deleteNote(event) {
        event.preventDefault()

        axios.delete('https://books-api.glitch.me/api/notes/' + id, {
            auth: auth
        })
            .then(response => {
                setDelete(TextTrackCue)
            })
    }

    if (!auth) {
        return <Redirect to='/login/' />
    }

    if (deleted) {
        return <Redirect to='/books' />
    }

    return (
        <div className='AddBook'>
            <h2 className='db b mv2'>Add A Book or <Link to='/books'>Go Back to Book List</Link></h2>

            <form onSubmit={handleSubmit}>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='title'>Note Title</label>
                    <input
                        className='f5 pa2 w-750'
                        type='text'
                        id='noteTitle'
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='body'>Make a Note</label>
                    <input
                        className='f5 pa2 h-750 w-750'
                        type='text'
                        id='notebody'
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