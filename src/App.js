import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";

import {
  Route,
  Redirect,
} from "react-router-dom"


function App() {
  return (
    <div className="App">
        <Route path="/">
          {true ? <Home /> : <Redirect from='/' to="/login" />}
        </Route>
        <Route path='/login' component={Login} />
    </div>
  );
}

export default App;
