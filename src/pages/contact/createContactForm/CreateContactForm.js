import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@material-ui/core/Modal';
import { Button, TableCell, TableRow, TextField } from '@material-ui/core';

class CreateContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    };
  }

  handleSubmit = (e) => {
    const { contactName, contactPhone, contactEmail } = this.state;
    if (contactName.length > 0 && contactPhone.length > 0 && contactEmail.length > 0) {
      this.props.addPerson({
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
        id: uuidv4(),
      });
      this.setState({
        contactName: '',
        contactPhone: '',
        contactEmail: '',
      });
    }
  };

  handleChange = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  render() {
    const { contactName, contactPhone, contactEmail } = this.state;
    return (
      <TableRow>
        <TableCell>
          <TextField
            type="text"
            placeholder="name"
            required
            value={contactName}
            name="contactName"
            onChange={(e) => this.handleChange(e)}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="text"
            placeholder="phone"
            required
            value={contactPhone}
            name="contactPhone"
            onChange={(e) => this.handleChange(e)}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="email"
            placeholder="email"
            required
            value={contactEmail}
            name="contactEmail"
            onChange={(e) => this.handleChange(e)}
          />
        </TableCell>
        <TableCell>
          <Button onClick={(e) => this.handleSubmit(e)}>Add Contact</Button>
        </TableCell>
      </TableRow>
    );
  }
}
export default CreateContactForm;
