import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, db } from './services/firebase';

import { loading, logIn, logOut } from './redux/actions';

import Login from './pages/login/Login';
import DialogList from './pages/dialogList/DialogList';
import Dialog from './pages/dialog/Dialog';
import ContactList from './pages/contact/contactList/ContactList';
import Contact from './pages/contact/Contact';
import Settings from './pages/settings/Settings';

import Loading from './components/Loading';
import Header from './components/header/Header';

import './App.css';

class App extends React.Component {
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      this.props.onLoading(false);
      if (user) {
        db.ref('/users/' + user.uid).on('value', (snapshot) => {
          if (snapshot.val()) {
            this.props.onLogin({ ...snapshot.val(), uid: user.uid });
          } else {
            this.props.onLogout();
          }
        });
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
        <Header />
        <Route path="/">
          <Switch>
            <Route path="/dialog" component={DialogList} exact />
            <Route path="/dialog/:dialogId" component={Dialog} />
            <Route path="/contact" component={Contact} />
            <Route path="/contactList" component={ContactList} />
            <Route path="/settings" component={Settings} />
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
    onLoading: (isLoad) => dispatch(loading(isLoad)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
