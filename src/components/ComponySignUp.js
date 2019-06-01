import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import changePath from '../common/common'
import CompanySignIn from './CompanySignIn';

class CompanySignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: null,
            companyUsername: null,
            password: null,
            confirmPassword: null,
            uid: null,
            companySignIn: false
        }
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
                // console.log(uid)
                this.setState({
                    uid,
                })
            } else {
                this.props.history.push("/")
            }
        })
    }

    gettingValue = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            // console.log(this.props)
        })
    }

    companySignUp = (ev) => {
        ev.preventDefault()
        let obj = {
            companyName: this.state.companyName,
            companyUsername: this.state.companyUsername,
            password: this.state.password,
        }
        firebase.database().ref().child(this.state.uid).child("company").child(obj.companyName).set(obj)
    }

    companySignIn = () => {
        this.setState({
            companySignIn: true
        })
        setTimeout(() => {
            document.getElementById("companySignIn").classList += " signInDivOpen"
        }, 500)
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        // console.log(this.state.uid)
        return (
            <div className="adminSignUp">
                {this.state.companySignIn ? <CompanySignIn props={this.props} /> : null}
                <p className='iconForCompany'><i className="fas fa-long-arrow-alt-down"></i></p>
                <div className="inputDiv2">
                    <h3>Company Sign Up</h3>
                    <form onSubmit={(ev) => this.companySignUp(ev)}>
                        <input
                            type="text"
                            name="companyName"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Company Name"
                            required
                            autoFocus
                        />
                        <input
                            type="text"
                            name="companyUsername"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Company Username"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Password"
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Confirm Password"
                            required
                        />
                        <button>Sign Up</button>
                    </form>
                    <div>
                        <p>
                            Allready have an account ? Login to your account.<br />
                            <button
                                name=""
                                onClick={(ev) => this.companySignIn(ev.target.name, this.props)}
                            >Sign In</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default CompanySignUp;