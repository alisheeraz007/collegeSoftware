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

firebase.initializeApp(firebaseConfig)

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
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
            />} />

        </Router>
      </div>
    )
  }
}

export default App;
