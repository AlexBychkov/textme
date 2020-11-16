import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from './services/firebase';

import { loading, logIn, logOut } from './redux/actions';

import Login from './pages/login/Login';
import Dialog from './pages/dialog/Dialog';
import ContactList from './pages/contact/contactList/ContactList';
import Contact from './pages/contact/Contact';

import Loading from './components/Loading';
import Header from './components/header/Header';

import './App.css';

class App extends React.Component {
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      this.props.onLoading(false);
      if (user) {
        this.props.onLogin(user);
      } else {
        this.props.onLogout();
      }
    });
  }
  render() {
    if (this.props.user === null) {
      return (
        <div className="App">
          <Loading open={this.props.loading} />
          <Login />
        </div>
      );
    }
    return (
      <div className="App">
        <Loading open={this.props.loading} />
        <Header />
        <Route path="/">
          <Switch>
            <Route path="/dialog" component={Dialog} />
            <Route path="/contact" component={Contact} />
            <Route path="/contactList" component={ContactList} />
          </Switch>
        </Route>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (user) => dispatch(logIn(user)),
    onLogout: () => dispatch(logOut()),
    onLoading: (is_load) => dispatch(loading(is_load)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
