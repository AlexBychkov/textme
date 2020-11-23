import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './pages/login/Login';
import DialogList from './pages/dialogList/DialogList';
import Dialog from './pages/dialog/Dialog';
import Header from './components/header/Header';
import ContactList from './pages/contact/contactList/ContactList';
import Contact from './pages/contact/Contact';

import './App.css';

function App(props) {
  if (props.user === null) {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
  return (
    <div className="App">
      <Header />
      <Route path="/">
        <Switch>
          <Route path="/dialog" component={DialogList} exact />
          <Route path="/dialog/:dialogId" component={Dialog} />
          <Route path="/contact" component={Contact} />
          <Route path="/contactList" component={ContactList} />
        </Switch>
      </Route>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
