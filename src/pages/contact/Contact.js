import React, { Component } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import ProfileModal from './../../components/profiles/ProfilesModal';



class Contact extends Component {
    render() {
        const { contactData: { name, phone, email, id } } = this.props;
        return (
            <TableRow>
                <TableCell>
                    <ProfileModal>{name}</ProfileModal>
                </TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell onClick={() => this.props.deleteContact(id)} >X</TableCell>
            </TableRow>
        );
    }
}

export default Contact;