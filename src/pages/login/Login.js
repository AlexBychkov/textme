import React, { Component } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'fontsource-roboto'
import {
  TextField,
  Container,
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { AsYouType } from 'libphonenumber-js'
import { connect } from 'react-redux'
import logo from '../../big-logo.png'
import { USER_LOGIN, USER_LOGOUT } from '../../redux/type'

function Progress(props) {
  return (
    <Backdrop open={props.open} style={{ zIndex: 10 }}>
      <CircularProgress style={{ color: '#ffffff' }} />
    </Backdrop>
  )
}

function User(props) {
  return (
    <div>
      <p>We entered</p>
      <p>Phone number: {props.user.phoneNumber}</p>
      <p>ID: {props.user.uid}</p>
      <Button id="logout" onClick={props.logout} color="primary">
        Sign Out
      </Button>
    </div>
  )
}

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
  )
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
  )
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.firebaseConfig = {
      apiKey: 'AIzaSyCV18O6EkYzeNNLmyyStZa-TM1Err5YM5A',
      authDomain: 'textme-dev.firebaseapp.com',
      databaseURL: 'https://textme-dev.firebaseio.com',
      projectId: 'textme-dev',
      storageBucket: 'textme-dev.appspot.com',
      messagingSenderId: '931156542953',
      appId: '1:931156542953:web:66225807e0781953dcb778',
    }

    this.state = {
      phone: { value: '', error: false },
      code: { value: '', error: false },
      codeSended: false,
      progress: true,
    }

    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleChangeCode = this.handleChangeCode.bind(this)
    this.handleSendPhone = this.handleSendPhone.bind(this)
    this.handleSendCode = this.handleSendCode.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    this.asYouType = new AsYouType('RU')
  }

  firebaseInit() {
    firebase.initializeApp(this.firebaseConfig)
  }

  componentDidMount() {
    this.firebaseInit()
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ progress: false })
      if (user) {
        this.props.onLogin(user)
      } else {
        console.log('No user is signed in')
      }
    })
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-sms', {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved')
      },
    })
  }

  handleChangePhone(e) {
    const newPhone = this.state.phone
    newPhone.value = e.target.value
    this.setState({ phone: newPhone })
  }

  handleChangeCode(e) {
    const newCode = this.state.code
    newCode.value = e.target.value
    this.setState({ code: newCode })
  }

  handleSendPhone() {
    this.asYouType.reset().input(this.state.phone.value)

    if (this.asYouType.getNumber() === undefined || !this.asYouType.isValid()) {
      const newPhone = this.state.phone
      newPhone.error = true
      this.setState({ phone: newPhone })
      return false
    }

    const newPhone = this.state.phone
    newPhone.error = false
    this.setState({ progress: true, phone: newPhone })

    const phoneNumber = this.asYouType.getNumber().number
    const appVerifier = this.recaptchaVerifier
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        this.setState({ progress: false, codeSended: true })
        this.confirmationResult = confirmationResult
      })
      .catch((error) => {
        this.setState({ progress: false })
      })
  }

  handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.onLogout()
        this.setState({ codeSended: false })
      })
      .catch((error) => {
        console.log(error, 'signOut error')
      })
  }

  handleSendCode() {
    const code = this.state.code.value
    this.setState({ progress: true })
    this.confirmationResult
      .confirm(code)
      .then((result) => {
        this.setState({ progress: false })
      })
      .catch((error) => {
        const newCode = this.state.code
        newCode.error = true
        this.setState({ code: newCode, progress: false })
      })
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Progress open={this.state.progress} />
        <img src={logo} alt="Logo" style={{ maxWidth: '256px' }} />
        <br />
        {!this.props.user ? (
          this.state.codeSended ? (
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
          )
        ) : (
          <User user={this.props.user} logout={this.handleLogout} />
        )}
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (user) => dispatch({ type: USER_LOGIN, payload: user }),
    onLogout: () => dispatch({ type: USER_LOGOUT }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
