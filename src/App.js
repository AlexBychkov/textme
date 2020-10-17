import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";

import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/component' component={Home} />
        <Route path='/login' component={Login} />
        <Redirect from='/' to='/home' />
      </Switch>
    </div>
  );
}

export default App;
