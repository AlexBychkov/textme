import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import GlobalMenu from './components/menu/Menu'

import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

function App() {
    return (
      <div className="App">
        <GlobalMenu />
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/component' component={Home} />
          <Redirect from='/' to='/home'/>
        </Switch>
      </div>
    );
  }

export default App;
