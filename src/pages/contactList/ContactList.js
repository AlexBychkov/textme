import { List, ListItem, ListItemText, TextField } from '@material-ui/core';
import React, { Component } from 'react';


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
            ]
        });
    };

    componentDidMount() {
        this.loadContacts();

    }

    render() {
        const { contacts } = this.state;
        return (
            <div className="contact-list" style={{width: '100%',
            maxWidth: 360,marginLeft: '140px'}}>
                {/*contacts.length > 0 && contacts.map(item => {
                        if (item.id > 1) return <div key={item}>{item.id}</div>;
                    })
                 */}
                <p>Contacts</p>
                <List>
                    {contacts.length > 0 && contacts.map(item => {
                        return (
                            <ListItem key={item.id} button>
                                <ListItemText>{item.name}</ListItemText>
                            </ListItem>
                        )
                    })
                    } </List>
            </div>
        );
    }
}


export default ContactList;