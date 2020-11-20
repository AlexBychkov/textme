import React, { Component } from 'react';
import { auth } from '../../services/firebase';
import 'fontsource-roboto';
import { TextField, Container, Button } from '@material-ui/core';
import { AsYouType } from 'libphonenumber-js';
import { connect } from 'react-redux';
import logo from '../../big-logo.png';
import { logIn, loading } from '../../redux/actions';

function PhoneBlock(props) {
  return (
    <div>
      <p>Welcome</p>
      <p>
        To enter the application, enter your phone number, <br />
        we will send an SMS with a code to it
      </p>
      <TextField
        key="phone-number"
        label="Phone"
        placeholder="+7 707 070 00 77"
        onChange={props.changePhone}
        helperText={props.phone.error ? 'Error' : ''}
        error={props.phone.error}
      />
      <br />
      <Button id="send-sms" onClick={props.sendPhone} color="primary">
        Send SMS
      </Button>
    </div>
  );
}

function CodeBlock(props) {
  return (
    <div>
      <p>
        Enter the code sent to the number <b>{props.formatPhone}</b>
      </p>
      <TextField
        key="sms-code"
        label="Code"
        placeholder="123456"
        onChange={props.changeCode}
        helperText={props.code.error ? 'Error' : ''}
        error={props.code.error}
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

  handleChangePhone(e) {
    const newPhone = this.state.phone;
    newPhone.value = e.target.value;
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

  handleSendCode() {
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
