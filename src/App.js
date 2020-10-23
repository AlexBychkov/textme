import React from 'react';
import './App.css';
import Home from './pages/home/Home';
<<<<<<< HEAD
import Contact from './pages/contact/Contact';
import ContactList from './pages/contact/contactList/ContactList';
=======
import Header from './components/header/Header'
>>>>>>> origin/menu

import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/menu

export default App;
