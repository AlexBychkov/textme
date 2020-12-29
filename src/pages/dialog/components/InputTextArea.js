import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//import MenuDialog from '../../../components/menuDialog/MenuDialog';
import AddLocation from '../../../components/map/AddLocation';

import { connect } from 'react-redux';
import { db as database } from '../../../services/firebase';

import Voice from './voiceMessage/Voice';

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
  textInputRef = React.createRef();

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

      case 'audio':
        objToPush.message = payload;
        break;

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
    this.textInputRef.current.focus();
  };

  validateOnClick = (e) => {
    this.textInputRef.current.focus();

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
          rowsMax="4"
          rows="1"
          size="medium"
          autoFocus={true}
          placeholder="TextHere"
          inputRef={this.textInputRef}
        />
        {this.state.inputValue ? (
          <IconButton className={classes.IconButton} onClick={this.validateOnClick}>
            <Send className={classes.Icon} />
          </IconButton>
        ) : (
          <>
            <Voice createMessage={this.createMessage} />
            <IconButton className={classes.IconButton}>
              <AddLocation createMessage={this.createMessage} />
            </IconButton>
          </>
        )}

        <Grid className={classes.EmojiIconContainer}>
          <IconButton className={classes.IconButton} onClick={this.pickerToggle}>
            <EmojiEmotionsOutlined className={classes.Icon} />
          </IconButton>
          {this.state.picker && (
            <Picker
              sheetSize={32}
              perLine={6}
              onClick={this.addEmoji}
              title="Pick emoji…"
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
