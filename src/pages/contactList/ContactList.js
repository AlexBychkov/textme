import { List, ListItem, ListItemText } from '@material-ui/core';
import React, { Component } from 'react';
import classes from './ContactList.module.css';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  loadContacts = () => {
    this.setState({
      ...this.state,
      contacts: [
        {
          id: 1,
          name: 'Ivan',
          phone: '123456',
          email: 'tol@mail.com',
        },
        {
          id: 2,
          name: 'Maxim',
          phone: '123789',
          email: 'val@mail.com',
        },
      ],
    });
  };

  componentDidMount() {
    this.loadContacts();
  }

  render() {
    const { contacts } = this.state;
    return (
      <div className={classes.contactList}>
        <p>Contacts</p>
        <List>
          {contacts.length > 0 &&
            contacts.map((item) => {
              return (
                <ListItem key={item.id} button>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              );
            })}{' '}
        </List>
      </div>
    );
  }
}

export default ContactList;
