import React from 'react';
import Dialog from '../dialog/Dialog';

import Header from '../../components/header/Header'

import {
  Route,
  Switch,
} from "react-router-dom"

export default class Home extends React.Component {
    render() {
      return (
        <>
        <Header />
        <Switch>
          <Route path='/dialog' component={Dialog} />

        </Switch>
        </>
      );
    }
  }