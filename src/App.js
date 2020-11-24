import React from 'react'
import './App.css'
import Nav from './components/Nav'
import Login from './Login'
import Books from './Books'
import MyBooks from './components/MyBooks'
import MyNotes from './components/MyNotes'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/books' component={Books} />
          <Route path='/mybooks' component={MyBooks} />
          <Route path='/mynotes' component={MyNotes} />
        </Switch>
      </div>
    </Router>
  )
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

export default App