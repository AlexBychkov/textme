import React from 'react'
import Dialog from '../dialog/Dialog'

import Header from '../../components/header/Header'
import ContactList from '../contact/contactList/ContactList'
import Contact from '../contact/Contact'

import { Route, Switch } from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/dialog" component={Dialog} />
          <Route path="/contact" component={Contact} />
          <Route path="/contactList" component={ContactList} />
        </Switch>
      </>
    )
  }
}
