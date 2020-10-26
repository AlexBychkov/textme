import React, { Component } from 'react';
import { TableCell, TableRow } from '@material-ui/core';




class Contact extends Component {
    render() {
        const { contactData: { name, phone, email, id } } = this.props;
        return (
            <TableRow>
                <TableCell>
                    {name}
                </TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell onClick={() => this.props.deleteContact(id)} >X</TableCell>
            </TableRow>
        );
    }
}

export default Contact;