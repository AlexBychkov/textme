import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import MenuDialog from '../../../components/menuDialog/MenuDialog';

import { connect } from 'react-redux';
import { db as database } from '../../../services/firebase';

import { TextField, IconButton, Grid } from '@material-ui/core';
import { Send, EmojiEmotionsOutlined } from '@material-ui/icons';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import classes from './InputTextArea.module.css';

class TextArea extends Component {
  state = {
    inputValue: '',
    dialogId: this.props.match.params.dialogId,
    picker: false,
  };

  createMessage = (type, enter, payload) => {
    const objToPush = {};
    let messageValue = this.state.inputValue;

    if (enter) messageValue = messageValue.slice(0, messageValue.length - 1);

    switch (type) {
      case 'text':
        objToPush.message = messageValue;
        break;

      case 'location':
        objToPush.message = payload;
        break;

      // Uncomment below, pass param to createMessage and use it here below
      // case 'audio':
      //   objToPush.message =
      //   break;

      default:
        break;
    }

    objToPush.timestamp = new Date().getTime();
    objToPush.type = type;
    objToPush.user = this.props.user.uid;

    this.setState({
      inputValue: '',
    });
    database.ref().child(`/messages/${this.state.dialogId}`).push(objToPush);
  };

  validateOnClick = (e) => {
    if (this.state.inputValue !== '') this.createMessage('text');
  };

  validateOnKeyUp = (e) => {
    if (this.state.inputValue === `\n` || this.state.inputValue === '') {
      this.setState({ inputValue: '' });
      return;
    }
    if (e.keyCode === 13) this.createMessage('text', true);
  };

  pickerToggle = () => {
    this.setState({ picker: !this.state.picker });
  };
  addEmoji = (emoji, event) => {
    this.setState({ inputValue: `${this.state.inputValue} ${emoji.colons}` });
  };

  render() {
    return (
      <div className={classes.TextArea}>
        <TextField
          onChange={(e) => {
            this.setState({ inputValue: e.target.value });
          }}
          onKeyUp={this.validateOnKeyUp}
          value={this.state.inputValue}
          className={classes.TextField}
          multiline
          rowsMax="3"
          rows="2"
          size="medium"
          placeholder="TextHere"
        />
        <IconButton onClick={this.validateOnClick}>
          <Send />
        </IconButton>
        <IconButton>
          <MenuDialog createMessage={this.createMessage} />
        </IconButton>
        <Grid className = {classes.EmojiIconContainer}>
          <IconButton onClick={this.pickerToggle}> 
            <EmojiEmotionsOutlined />
          </IconButton>
          {this.state.picker && (
            <Picker
              sheetSize={32}
              onClick={this.addEmoji}
              title="Pick your emoji…"
              set="twitter"
              style={{ position: 'absolute', bottom: '50px', right: '20px' }}
            />
          )}
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TextArea));
