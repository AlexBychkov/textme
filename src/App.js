import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Dialog from './pages/dialog/Dialog';
import Login from "./pages/login/Login";
import Header from './components/header/Header'

import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

function App() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/component' component={Home} />
          <Route path='/dialog' component={Dialog} />
          <Route path='/login' component={Login} />
          <Redirect from='/' to='/home'/>
         {/*  <Redirect from='/' to='/home'/> */}
        </Switch>
      </div>
    );
  }

export default App;
