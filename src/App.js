import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './all.css';
import firebaseConfig from './config/configKey'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import SignInPage from './components/SignInPage'
import SignUpPage from './components/SignUpPage'
import MainDashBoard from './components/MainDashBoard'
import AdminSignIn from './components/AdminSignIn';
import CompanySignIn from './components/CompanySignIn';
import StudentSignIn from './components/StudentSignIn';

firebase.initializeApp(firebaseConfig)

class App extends Component {
  constructor() {
    super()
    this.state = {
        adminConfirmation:false,
        companyConfirmation:false,
        studentConfirmation:false,
    }
  }

  authStateChange = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref().child(user.uid).on('value', (snap) => {
          if (snap.val()) {
            let data = snap.val()
            this.setState({
              data,
            })
          }
          if (snap.val().admin) {
            let adminData = Object.values(snap.val().admin)
            this.setState({
              adminData,
            })
          }
          if (snap.val().company) {
            let companyData = Object.values(snap.val().company)
            this.setState({
              companyData,
            })
          }
          if (snap.val().students) {
            let studentData = Object.values(snap.val().students)
            this.setState({
              studentData,
            })
          }
        })
      } else {
        this.props.history.push("/")
      }
    })
  }

  confirmation=(name)=>{
    let confirmation = name;
    this.setState({
      [confirmation]: true
    })
  }

  componentWillMount() {
    this.authStateChange()
  }

  render() {
    return (
      <div>
        <Router>

          <Route
            exact path="/"
            render={() => <SignInPage
              state={this.state}
              authStateChange={this.authStateChange}
            />} />

          <Route
            path="/SignUpPage"
            render={() => <SignUpPage
              state={this.state}
            />} />

          <Route
            path="/MainDashBoard"
            render={() => <MainDashBoard
              state={this.state}
              confirmation={this.confirmation}
            />} />

        </Router>
      </div>
    )
  }
}

export default App;
