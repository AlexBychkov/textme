import React, { Component } from 'react';
import Contact from '../Contact';
import CreateContactForm from '../createContactForm/CreateContactForm';
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import './ContactList.css';
import { TextFields } from '@material-ui/icons';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contactSearch: '',
      filteredContacts: [],
      createContactModal: false,
    };
  }

  loadContacts = () => {
    const initContacts = [
      {
        id: 1,
        name: 'Tolik',
        phone: '123456',
        email: 'tol@mail.com',
      },
      {
        id: 2,
        name: 'Valera',
        phone: '123789',
        email: 'val@mail.com',
      },
    ];
    this.setState({
      ...this.state,
      contacts: initContacts,
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
    const { contactSearch, createContactModal } = this.state;

    return (
      <div className="contact-list">
        <Table className={'table'} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>
                <div className={'contact-list'}>
                  <TextField
                    id="outlined-basic"
                    label="search"
                    value={contactSearch}
                    onChange={(e) => this.handleSearch(e)}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CreateContactForm
              addPerson={this.addContact}
              isOpen={createContactModal}
              toggleModal={this.toggleModal}
            />
            {this.renderContacts()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ContactList;
