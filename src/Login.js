import React, { useState, useEffect } from 'react'
import '/App.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function Login() {
    // https://serverless-stack.com/chapters/create-a-login-page.html
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function validateForm() {
        return email.length > 0 && password.length > 0
    }

    function handleSubmit(event) {
        event.preventDefault()
    }


};
return (
    <div classname='Login'>
        <Form onSubmit={handleSubmit}>
            <Form.Group size='lg' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </Form.Group>
            <Form.Group size='lg' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Form.Group>
            <Button block size='md'
                type='submit'
                disabled={!validateForm()}
            >Login
          </Button>
            <Button block size='md'
                type='create'
            >Create an Account
          </Button>
        </Form>
    </div >
)
}