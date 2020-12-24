import React, { Component } from 'react';
import { connect } from 'react-redux';

import Contact from '../Contact';

import { db } from '../../../services/firebase';

import { List, Fab, TextField } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import ModalAddContact from '../modalAddContact/ModalAddContact';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.state = {
      myContacts: [],
      contactSearch: '',
      filteredContacts: [],
      createContactModal: false,
    };
  }

  loadContacts = () => {
    this.setState({
      ...this.state,
      myContacts: [],
      createContactModal: false,
      contactSearch: '',
      filteredContacts: [],
    });
    db.ref('users/' + this.user.uid + '/contacts').once('value', (usersRaw) => {
      if (usersRaw.val()) {

        Object.keys(usersRaw.val()).forEach((userId) => {
          db.ref(`users/${userId}`).once('value', (userRaw) => {
            this.setState({
              ...this.state,
              myContacts: [
                ...this.state.myContacts,
                {
                  ...userRaw.val(),
                  id: userRaw.key,
                  friend: true,
                },
              ],
            });
          });
        });
      }
    });
  };

  handleSearch = (e) => {
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      this.setState(
        {
          ...this.state,
          contactSearch: e.target.value.trim(),
        },
        () => {
          this.filterContacts();
        }
      );
    }
  };

  filterContacts = () => {
    let newArray = this.state.myContacts.filter((item) => {
      let flagName = item.name.toLowerCase().includes(this.state.contactSearch.toLocaleLowerCase())
      if (flagName) {
        return flagName
      } else {
        return item.phone.includes(this.state.contactSearch)
      }
    }
    );
    this.setState({
      ...this.state,
      filteredContacts: newArray,
    });
  };

  componentDidMount() {
    this.loadContacts();
  }

  deleteContact = (id) => {
    db.ref('users/' + this.user.uid + '/contacts/' + id).remove();
    this.loadContacts();
  };

  addContact = (id) => {
    const update = {};
    update['/users/' + this.user.uid + '/contacts/' + id] = true;
    db.ref().update(update);
    this.loadContacts();
  };

  renderContacts = () => {
    const { filteredContacts, contactSearch, myContacts } = this.state;

    if (contactSearch.length > 0) {
      return (
        filteredContacts.length > 0 &&
        filteredContacts.map((item, index) => (
          <Contact contactData={item} key={index} deleteContact={this.deleteContact} addContact={this.addContact} />
        ))
      );
    } else
      return (
        myContacts.length > 0 &&
        myContacts.map((item, index) => (
          <Contact contactData={item} key={index} deleteContact={this.deleteContact} addContact={this.addContact} />
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
          <ModalAddContact
            deleteContact={this.deleteContact}
            addContact={this.addContact}
            isOpen={createContactModal}
            toggleModal={this.toggleModal}
          />

        )}
        <TextField
          id="outlined-basic"
          label="search in your"
          style={{ maxWidth: '360px', width: '100%'}}
          value={this.state.contactSearch}
          onChange={(e) => this.handleSearch(e)}
        />

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
