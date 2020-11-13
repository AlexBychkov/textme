import React from 'react'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router-dom'

function App(props) {
  return (
    <div className="App">
      <Route path="/">
        {props.user !== null ? <Home /> : <Redirect from="/" to="/login" />}
      </Route>
      <Route path="/login" component={Login} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(App)
