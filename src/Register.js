import axios from 'axios'
import React, { useState } from 'react'
import clsx from 'clsx'
import { Link, Redirect } from 'react-router-dom'


export default function Register({ auth, onRegister }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [feedbackMsg, setFeedbackMsg] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        axios.post('https://books-api.glitch.me/api/users', {
            username: username,
            password: password
        })
            .then(response => {
                setFeedbackMsg({ type: 'success', message: 'Account Created.' })
                onRegister({ username, password })
            })
            .catch(error => {
                setFeedbackMsg({ type: 'error', message: error.response.data.errors[0] })
            })
    }
    if (auth) {
        return <Redirect to='/' />
    }

    return (
        <div classname='Register'>
            <h2 className='signup'>Sign Up or <Link to='/login'>Log In</Link></h2>
            {
                feedbackMsg &&
                (
                    <div className={clsx(
                        'ba', 'bw1', 'pa3',
                        {
                            'bg-red': (feedbackMsg.type === 'error'),
                            white: (feedbackMsg.type === 'error'),
                            'bg-green': (feedbackMsg.type === 'success')
                        }
                    )}
                    >
                        {feedbackMsg.message}
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='username'>Username</label>
                    <input
                        required
                        className='f5 pa2 w-100'
                        type='text'
                        id='username'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <label className='db b mv2' htmlFor='password'>Password</label>
                    <input
                        required
                        className='f5 pa2 w-100'
                        type='password'
                        id='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div className='mv2'>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}