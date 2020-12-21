import React, { useState } from 'react';
import { db } from '../../services/firebase';

import {
  Grid,
  Button,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  Checkbox,
  Avatar,
  TextField,
} from '@material-ui/core';

import { useStyles } from './selectUsersStyles';
import { connect } from 'react-redux';
import { CloseOutlined } from '@material-ui/icons';

const SelectUsers = (props) => {
  const [selected, setSelected] = useState({});
  const [title, setTitle] = useState('');

  const classes = useStyles();

  const handleChecker = (event) => {
    setSelected((prev) => {
      const id = event.target.value;
      const checked = event.target.checked;
      return {
        ...prev,
        [id]: checked,
      };
    });
  };


  const createChatHandler = () => {
    const ObjToPush = {};
    for (let prop in selected) {
      selected[prop] && (ObjToPush[prop] = true);
    }
    ObjToPush[props.user.uid] = true;
    const key = db.ref().child(`members`).push(ObjToPush).key;

    db.ref().child(`chats/${key}`).set({
      title: title,
      created: props.user.uid,
      message: `welcome to ${title} chat`,
      type: 'text',
      user: props.user.uid
    })

    for (let userId in ObjToPush) {
      db.ref().child(`users/${userId}/chats/${key}`).set(true);
    }
    setTitle('');
    props.handleClose();
  };

  return (
    <Grid container direction="column" align="flex-start">
      <CloseOutlined className={classes.closeIcon} onClick={props.handleClose} />
      <FormControl>
        <FormLabel>Choose members</FormLabel>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            label="Title:"
            labelPlacement="top"
            control={
              <TextField
                className = {classes.field}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            }
          />
          {props.users &&
            Object.keys(props.users).map((user) => {
              if (user === props.user.uid) return false;
              const name = props.users[user].name;
              const avatar = `${props.users[user].avatar}`;

              return (
                <FormControlLabel
                  value={user}
                  control={
                    <>
                      <Avatar src={avatar && avatar}>{name && name.charAt(0)}</Avatar>
                      <Checkbox value={user} color="primary" onChange={handleChecker} />
                    </>
                  }
                  label={name}
                  labelPlacement="end"
                  key={user}
                />
              );
            })}
        </FormGroup>
      </FormControl>

      <Grid>
        <Button color="primary" variant="contained" onClick={createChatHandler}>
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(SelectUsers);
