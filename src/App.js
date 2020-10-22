import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import ContactList from './pages/contact/contactList/ContactList';

import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/component' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/contact-list' component={ContactList} />
        <Redirect from='/' to='/home' />
        <Route component={'NotFoundPage'} />
        <Route path="/404" component={'NotFoundPage'} />
      </Switch>
    </div>
  );
}

export default App;
