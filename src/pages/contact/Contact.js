import React, { Component } from 'react';

import ProfileModal from './../../components/profiles/ProfilesModal';

import {
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class Contact extends Component {
  render() {
    let user = this.props.contactData;
    return (
      <ListItem>
        <ListItemAvatar>
          <ProfileModal user={user}>
            <Avatar src={user.avatar ? user.avatar : ''}>
              {user.name && user.name.charAt(0)}
            </Avatar>
          </ProfileModal>
        </ListItemAvatar>
        <ProfileModal user={user}>
          <ListItemText primary={user.name} secondary={user.phone} />
        </ProfileModal>
        <ListItemSecondaryAction onClick={() => this.props.deleteContact(user.id)}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Contact;
