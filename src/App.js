import React from 'react'
import './App.css'
import Register from './Register'
import Login from './Login'
import Books from './Books'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useLocalStorage } from './hooks'
import Book from './Book'
import AddBook from './AddBook'
import EditBook from './EditBook'
//import AddNote from './Addnote'


function App() {
  const [auth, setAuth] = useLocalStorage('books_auth', null)

  return (
    <Router>
      <div className="App">
        {auth && (
          <div>
            <span>Logged in as {auth.username}</span> | <button onClick={() => setAuth(null)}>Log Out</button>
          </div>
        )}

        <Switch>
          {/* <Route path='/addnote'>
            <AddNote auth={auth} />
          </Route> */}

          <Route path='/addbook'>
            <AddBook auth={auth} />
          </Route>

          <Route path='/editbook'>
            <EditBook auth={auth} />
          </Route>

          <Route path='/books/:id'>
            <Book auth={auth} />
          </Route>

          <Route path='/books/:id'>
            <Books auth={auth} />
          </Route>

          <Route path='/signup'>
            <Register
              auth={auth}
              onRegister={setAuth}
            />
          </Route>

          <Route path='/login'>
            <Login
              auth={auth}
              onLogin={setAuth}
            />
          </Route>

          <Route path='/' >
            <Books auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router >
  )
}

export default App