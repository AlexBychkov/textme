import React, { Component } from 'react'
import * as firebase from 'firebase/app'
import "firebase/auth"
import 'fontsource-roboto'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { AsYouType } from 'libphonenumber-js'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import logo from '../../big-logo.png'

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
      <p>Мы вошли</p>
      <p>Номер телефона: {props.user.phoneNumber}</p>
      <p>ID: {props.user.uid}</p>
      <Button id="logout" onClick={props.logout} color="primary">Выход</Button>
    </div>
  )
}

function PhoneBlock(props) {
  return (
    <div>
      <p>Добро пожаловать</p>
      <p>Для входа в приложение введите ваш номер телефона, <br />на него мы отправим СМС с кодом</p>
      <TextField
        key="phone-number"
        label="Номер телефона"
        placeholder="+7 707 070 00 77"
        onChange={props.changePhone}
        helperText={props.phone.error ? "Ошибка" : ""}
        error={props.phone.error}
      />
      <br />
      <Button id="send-sms" onClick={props.sendPhone} color="primary">Отпрвить СМС</Button>
    </div>
  )
}

function CodeBlock(props) {
  return (
    <div>
      <p>Введите код, отправленный на номер <b>{props.formatPhone}</b></p>
      <TextField
        key="sms-code"
        label="СМС код"
        placeholder="123456"
        onChange={props.changeCode}
        helperText={props.code.error ? "Ошибка" : ""}
        error={props.code.error}
      />
      <br />
      <Button onClick={props.sendCode} color="primary">Проверить код</Button>
    </div>
  )
}

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.firebaseConfig = {
      apiKey: "AIzaSyCV18O6EkYzeNNLmyyStZa-TM1Err5YM5A",
      authDomain: "textme-dev.firebaseapp.com",
      databaseURL: "https://textme-dev.firebaseio.com",
      projectId: "textme-dev",
      storageBucket: "textme-dev.appspot.com",
      messagingSenderId: "931156542953",
      appId: "1:931156542953:web:66225807e0781953dcb778",
    }

    this.state = {
      phone: { value: '', error: false },
      code: { value: '', error: false },
      codeSended: false,
      user: null,
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
    firebase.auth().languageCode = 'ru'
  }

  componentDidMount() {
    this.firebaseInit()
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ progress: false })
      if (user) {
        this.setState({ user: user })
      } else {
        console.log('No user is signed in')
      }
    })
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-sms', {
      'size': 'invisible',
      'callback': response => {
        console.log('reCAPTCHA solved')
      }
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
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        this.setState({ progress: false, codeSended: true })
        this.confirmationResult = confirmationResult
      }).catch(error => {
        this.setState({ progress: false })
      })
  }

  handleLogout() {
    firebase.auth().signOut().then(() => {
      this.setState({ user: null, codeSended: false })
    }).catch(error => {
      console.log(error, 'signOut error')
    })

  }

  handleSendCode() {
    const code = this.state.code.value
    this.setState({ progress: true })
    this.confirmationResult.confirm(code).then(result => {
      this.setState({ progress: false })
      this.setState({ user: result.user })
    }).catch(error => {
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
        {!this.state.user
          ? this.state.codeSended
            ? <CodeBlock formatPhone={this.asYouType.getNumber().formatInternational()} changeCode={this.handleChangeCode} sendCode={this.handleSendCode} code={this.state.code} />
            : <PhoneBlock phone={this.state.phone} changePhone={this.handleChangePhone} sendPhone={this.handleSendPhone} />
          : <User user={this.state.user} logout={this.handleLogout} />
        }
      </Container>
    )
  }
}
