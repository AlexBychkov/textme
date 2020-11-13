import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@material-ui/core/Modal';

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
    e.preventDefault();
    const { contactName, contactPhone, contactEmail } = this.state;
    if (contactName.length > 0 && contactPhone.length > 0 && contactEmail.length > 0)
      this.props.addPerson({
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
        id: uuidv4(),
      });
  };

  handleChange = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  render() {
    const { contactName, contactPhone, contactEmail } = this.state;
    return (
      <Modal
        open={this.props.isOpen}
        onClose={() => this.props.toggleModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form className="create-form" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="name"
            required
            value={contactName}
            name="contactName"
            onChange={(e) => this.handleChange(e)}
          />
          <input
            type="text"
            placeholder="phone"
            required
            value={contactPhone}
            name="contactPhone"
            onChange={(e) => this.handleChange(e)}
          />
          <input
            type="email"
            placeholder="email"
            required
            value={contactEmail}
            name="contactEmail"
            onChange={(e) => this.handleChange(e)}
          />
          <button type="submit">Add Contact</button>
        </form>
      </Modal>
    );
  }
}
export default CreateContactForm;
