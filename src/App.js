import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Header from './components/header/Header';

import {
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/component' component={Home} />

        {/*  <Redirect from='/' to='/home'/> */}
      </Switch>
    </div>
  );
}

export default App;
