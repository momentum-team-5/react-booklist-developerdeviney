import axios from 'axios'
import clsx from 'clsx'
import React, { useState } from 'react'

import './App.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link, Redirect } from 'react-router-dom'


export default function Login({ auth, onLogin }) {
    // https://serverless-stack.com/chapters/create-a-login-page.html
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [feedbackMsg, setFeedbackMsg] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        axios.get('https://books-api.glitch.me/api/users', {
            auth: {
                username: username,
                password: password
            }
        })
            .then(response => {
                setFeedbackMsg({ type: 'success', message: 'Logged In' })
                onLogin({ username, password })
            })
            .catch(error => {
                setFeedbackMsg({
                    type: 'error', message: 'Username or Password isnt valid'
                })
            })
    }

    if (auth) {
        return <Redirect to='/' />
    }



    return (
        <div classname='Login'>
            <h2 className='login'>Log In or <Link to='/signup'> Sign Up</Link></h2>
            {feedbackMsg && (
                <div ClassName={clsx(
                    'ba', 'bw1', 'pa3',
                    {
                        'bg-red': (feedbackMsg.type === 'error'),
                        white: (feedbackMsg.type === 'error'),
                        'bg-green': (feedbackMsg.type === 'success')
                    }
                )}
                >{feedbackMsg.message}
                </div>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group size='lg' controlId='email'>
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        autoFocus
                        type='username'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        id='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
                <Button block size='md'
                    type='submit'
                >Login
                    </Button>
            </Form>
        </div >
    )
}
