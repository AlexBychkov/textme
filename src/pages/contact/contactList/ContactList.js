import React, { Component } from 'react';
import { connect } from 'react-redux';

import Contact from '../Contact';
import CreateContactForm from '../createContactForm/CreateContactForm';

import { db } from '../../../services/firebase';

import { List, Fab } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.state = {
      contacts: [],
      contactSearch: '',
      filteredContacts: [],
      createContactModal: false,
    };
  }

  loadContacts = () => {
    db.ref('users/' + this.user.uid + '/contacts').once('value', (usersRaw) => {
      if (usersRaw.val()) {
        Object.keys(usersRaw.val()).forEach((userId) => {
          db.ref(`users/${userId}`).once('value', (userRaw) => {
            this.setState({
              ...this.state,
              contacts: [
                ...this.state.contacts,
                {
                  ...userRaw.val(),
                  id: userRaw.key,
                },
              ],
            });
          });
        });
      }
    });
  };

  handleSearch = (e) => {
    this.setState(
      {
        ...this.state,
        contactSearch: e.target.value.trim(),
      },
      () => {
        this.filterContacts();
      }
    );
  };

  filterContacts = () => {
    let newArray = this.state.contacts.filter((item) =>
      item.name.toLowerCase().includes(this.state.contactSearch.toLocaleLowerCase())
    );
    this.setState({
      ...this.state,
      filteredContacts: newArray,
    });
  };

  componentDidMount() {
    this.loadContacts();
  }

  addContact = (data) => {
    this.setState(
      {
        ...this.state,
        contacts: [...this.state.contacts, data],
      },
      () => {
        console.log(this.state.contacts);
      }
    );
  };

  deleteContact = (id) => {
    db.ref('users/' + this.user.uid + '/contacts/' + id).remove();

    this.setState({
      ...this.state,
      contacts: this.state.contacts.filter((item) => item.id !== id),
    });
  };

  renderContacts = () => {
    const { filteredContacts, contactSearch, contacts } = this.state;

    if (contactSearch.length > 0) {
      return (
        filteredContacts.length > 0 &&
        filteredContacts.map((item, index) => (
          <Contact contactData={item} key={index} deleteContact={this.deleteContact} />
        ))
      );
    } else
      return (
        contacts.length > 0 &&
        contacts.map((item, index) => (
          <Contact contactData={item} key={index} deleteContact={this.deleteContact} />
        ))
      );
  };

  toggleModal = () =>
    this.setState({
      ...this.state,
      createContactModal: !this.state.createContactModal,
    });

  render() {
    const { createContactModal } = this.state;

    return (
      <div>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: 'absolute', bottom: '15px', right: '15px' }}
          onClick={() => this.toggleModal()}
        >
          <SearchIcon />
        </Fab>
        {createContactModal && (
          <CreateContactForm
            addPerson={this.addContact}
            isOpen={createContactModal}
            toggleModal={this.toggleModal}
          />
        )}
        <List style={{ maxWidth: '360px', width: '100%', margin: '0 auto' }}>
          {this.renderContacts()}
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ContactList);
