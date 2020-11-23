import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { database } from '../../../firebase';

import { TextField, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MenuDialog from '../../../components/menuDialog/MenuDialog';

import classes from './InputTextArea.module.css';

class TextArea extends Component {
  state = {
    inputValue: '',
    dialogId: this.props.match.params.dialogId,
  };

  createMessage = (type, enter) => {
    const objToPush = {};
    let messageValue = this.state.inputValue;

    if (enter) messageValue = messageValue.slice(0, messageValue.length - 1);

    objToPush.message = messageValue;
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
          fullWidth
          rowsMax="3"
          rows="2"
          size="medium"
          placeholder="TextHere"
        />
        <IconButton onClick={this.validateOnClick}>
          <SendIcon />
        </IconButton>
        <IconButton>
					<MenuDialog /* sendMessage={this.sendMessageOnClickHandler} *//>
				</IconButton>	
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
