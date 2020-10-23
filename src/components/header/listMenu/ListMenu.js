import React from 'react';
import { ListItem, ListItemText, List, ListItemIcon } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactList from '../../../pages/contact/contactList/ContactList';

export function FirstListMenu() {
    const itemList = [
        {
            text: 'Send message',
            path: '/message',
            icon: <SendIcon />
        },

        {
            text: 'Profile',
            path: '/profile',
            icon: <PersonIcon />
        },

        {
            text: 'Contact',
            path: '/contact-list',
            icon: <PermContactCalendarIcon />
        },
    ];

    return (
        <ListMenu itemList={itemList} />
    );
};

export function SecondListMenu() {
    const itemList = [
        {
            text: 'Settings',
            path: '/settings',
            icon: <SettingsIcon />
        },
    ];

    return (
        <ListMenu itemList={itemList} />
    );
};



export function ListMenu(props) {
    const itemList = props.itemList;

    //style for link
    const active = {
        fontWeight: "bold",
        color: "black",
        textDecoration: 'underline',
    };
    const styleLink = {
        textDecoration: 'none',
        color: "black"
    };

    return (
        <List>
            {itemList.map((elem, index) => (
                <NavLink to={itemList[index].path} activeStyle={active} style={styleLink}>
                    <ListItem button key={itemList[index].text}>
                        <ListItemIcon>{itemList[index].icon}</ListItemIcon>
                        <ListItemText>{itemList[index].text}</ListItemText>
                    </ListItem>
                </NavLink>
            ))}
        </List>

    );
}




