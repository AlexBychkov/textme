import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../../services/firebase';

import Contact from '../Contact';

import Modal from '@material-ui/core/Modal';
import { Container, List, TextField } from '@material-ui/core';

class ModalAddContact extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.state = {
      allContacts: [],
      contactSearch: '',
      filteredAllContacts: [],
    };
  }

  loadAllContacts = () => {
    db.ref('users/').once('value', (usersRaw) => {
      if (usersRaw.val()) {
        Object.keys(usersRaw.val()).forEach((userId) => {

          if (this.user.uid !== userId) { //не показываем свой контакт
            db.ref(`users/${userId}`).once('value', (userRaw) => {
              let friend = false;
              if (this.user.contacts[userId]) {
                friend = true;
              }
              this.setState({
                ...this.state,
                allContacts: [
                  ...this.state.allContacts,
                  {
                    ...userRaw.val(),
                    id: userRaw.key,
                    friend: friend,
                  },
                ],
              });
            });
          }
        });
      }
    });
  };

  filterAllContacts = () => {
    let newArray = this.state.allContacts.filter((item) => {
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
      filteredAllContacts: newArray,
    });
  };

  handleSearchOther = (e) => {
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      this.setState(
        {
          ...this.state,
          contactSearch: e.target.value.trim(),
        },
        () => {
          this.filterAllContacts();
        }
      );
    }
  }

  renderContacts = () => {
    const { filteredAllContacts, contactSearch, allContacts } = this.state;

    if (contactSearch.length > 0) {
      return (
        filteredAllContacts.length > 0 &&
        filteredAllContacts.map((item, index) => (
          <Contact contactData={item} key={index} deleteContact={this.props.deleteContact} addContact={this.props.addContact} />
        ))
      );
    } else
      return (
        allContacts.length > 0 &&
        allContacts.map((item, index) => (
          <Contact contactData={item} key={index} deleteContact={this.props.deleteContact} addContact={this.props.addContact} />
        ))
      );
  };

  componentDidMount() {
    this.loadAllContacts();
  }

  render() {
    return (
      <Modal
        open={this.props.isOpen}
        onClose={() => this.props.toggleModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container style={{ backgroundColor: '#ffffff', maxWidth: '360px', margin: '10vh auto' }}>
          <TextField
            label="search other contact"
            style={{ maxWidth: '360px', width: '100%' }}
            value={this.statecontactSearch}
            onChange={(e) => this.handleSearchOther(e)}
          />
          <List>
            {this.renderContacts()}
          </List>
        </Container>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ModalAddContact);
