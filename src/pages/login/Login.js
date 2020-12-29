import React, { Component, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { logIn, loading } from '../../redux/actions';

import { auth } from '../../services/firebase';

import PhoneInput from 'react-phone-number-input';
import { AsYouType } from 'libphonenumber-js';

import 'fontsource-roboto';
import { TextField, Container, Button } from '@material-ui/core';

import 'react-phone-number-input/style.css';
import './Login.css';

import logo from '../../big-logo.png';

function PhoneBlock(props) {
  const [value, setValue] = useState();
  const { changePhone, sendPhone } = props;
  useEffect(() => {
    changePhone(value);
  }, [changePhone, value]);
  return (
    <div className="first-input-section">
      <p>Welcome</p>
      <p>
        To enter the application, enter your phone number, <br />
        we will send an SMS with a code to it
      </p>
      <PhoneInput
        autoFocus
        key="phone-number"
        label="Phone"
        international
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendPhone();
          }
        }}
      ></PhoneInput>
      <br />
      <Button id="send-sms" onClick={sendPhone} color="primary">
        Send SMS
      </Button>
    </div>
  );
}

function CodeBlock(props) {
  return (
    <div>
      <p>
        Enter the code sent to the number <br />
        <b>{props.formatPhone}</b>
      </p>
      <TextField
        autoFocus
        key="sms-code"
        label="Code"
        placeholder="123456"
        onChange={props.changeCode}
        helperText={props.code.error ? 'Error' : ''}
        error={props.code.error}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            props.sendCode();
          }
        }}
      />
      <br />
      <Button onClick={props.sendCode} color="primary">
        Validate
      </Button>
    </div>
  );
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: { value: '', error: false },
      code: { value: '', error: false },
      codeSended: false,
    };

    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleSendPhone = this.handleSendPhone.bind(this);
    this.handleSendCode = this.handleSendCode.bind(this);

    this.asYouType = new AsYouType('RU');
  }

  componentDidMount() {
    this.recaptchaVerifier = new auth.RecaptchaVerifier('send-sms', {
      size: 'invisible',
      callback: (response) => {
        return new Promise((resolve, reject) => {
          if (response) {
            const data = {
              token: response,
            };
            return resolve(data); // We need to resolve promise anyway
          } else {
            this.recaptchaVerifier.reset();
            return reject('Invalid captcha verification.');
          }
        });
      },
    });
  }

  handleChangePhone(value) {
    const newPhone = this.state.phone;
    newPhone.value = value;
    this.setState({ phone: newPhone });
  }

  handleChangeCode(e) {
    const newCode = this.state.code;
    newCode.value = e.target.value;
    this.setState({ code: newCode });
  }

  handleSendPhone() {
    this.asYouType.reset().input(this.state.phone.value);

    if (this.asYouType.getNumber() === undefined || !this.asYouType.isValid()) {
      const newPhone = this.state.phone;
      newPhone.error = true;
      this.setState({ phone: newPhone });
      return false;
    }

    const newPhone = this.state.phone;
    newPhone.error = false;
    this.props.onLoading(true);
    this.setState({ phone: newPhone });

    const phoneNumber = this.asYouType.getNumber().number;
    auth()
      .signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log('confirmationResult');
        this.props.onLoading(false);
        this.setState({ codeSended: true });
        this.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        this.recaptchaVerifier.reset();
        this.props.onLoading(false);
      });
  }

  handleSendCode(e) {
    const code = this.state.code.value;
    this.props.onLoading(true);
    this.confirmationResult
      .confirm(code)
      .then((result) => {
        this.props.onLoading(false);
      })
      .catch((error) => {
        const newCode = this.state.code;
        newCode.error = true;
        this.props.onLoading(false);
        this.setState({ code: newCode });
      });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <img src={logo} alt="Logo" style={{ maxWidth: '256px' }} />
        <br />
        {this.state.codeSended ? (
          <CodeBlock
            formatPhone={this.asYouType.getNumber().formatInternational()}
            changeCode={this.handleChangeCode}
            sendCode={this.handleSendCode}
            code={this.state.code}
          />
        ) : (
          <PhoneBlock
            phone={this.state.phone}
            changePhone={this.handleChangePhone}
            sendPhone={this.handleSendPhone}
          />
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (user) => dispatch(logIn(user)),
    onLoading: (isLoad) => dispatch(loading(isLoad)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
