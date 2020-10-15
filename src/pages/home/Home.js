import React from 'react';
import MaterialUiTestComponent from '../../components/MaterialUiTestComponent';

export default class Home extends React.Component {
    render() {
      return <MaterialUiTestComponent btnName="First button!" fieldName="My Name"></MaterialUiTestComponent>;
    }
  }