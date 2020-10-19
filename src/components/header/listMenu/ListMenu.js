import React from 'react';
import { ListItem, ListItemText, List } from '@material-ui/core';

import { NavLink } from 'react-router-dom';

/*
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
*/


export function FirstListMenu() {
    const pathItem = {
        'Profile': '/profile',
        'Contact': '/contact',
        'Send message': '/message'
    }

    const listText = ['Profile', 'Contact', 'Send message']

    return (
        <ListMenu listText={listText} listPath={pathItem} />
    );
};

export function SecondListMenu() {
    const pathItem = {
        'Setings': '/setings',

    }

    const listText = ['Setings']

    return (
        <ListMenu listText={listText} listPath={pathItem} />
    );
};



export function ListMenu(props) {
    const listText = props.listText // []
    const listPath = props.listPath // {}

    //style for link
    const active = {
        fontWeight: "bold",
        color: "black",
        textDecoration: 'underline',
    }
    const styleLink = {
        textDecoration: 'none',
        color: "black"
    }


    return (
        <List>
            {listText.map((text, index) => (
                <NavLink to={listPath[text]} activeStyle={active} style={styleLink}>
                    <ListItem button key={text}>
                        {/*     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText>{text}</ListItemText>
                    </ListItem>
                </NavLink>
            ))}
        </List>

    );
}




