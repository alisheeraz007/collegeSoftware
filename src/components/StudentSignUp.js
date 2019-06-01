import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import changePath from '../common/common';
import StudentSignIn from './StudentSignIn';

class StudentSignUp extends Component {
    constructor(props) {
        super(props)
        this.state={
            studentUsername: null,
            password: null,
            confirmPassword: null,
            uid: null,
            studentSignIn: false
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

    studentSignUp = (ev) => {
        ev.preventDefault()
        let obj = {
            studentUsername: this.state.studentUsername,
            password: this.state.password,
        }
        firebase.database().ref().child(this.state.uid).child("students").child(obj.studentUsername).set(obj)
    }

    studentSignIn = () => {
        this.setState({
            studentSignIn: true
        })
        setTimeout(() => {
            document.getElementById("studentSignIn").classList += " signInDivOpen"
        }, 500)
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        return (
            <div className="adminSignUp">
            {this.state.studentSignIn ? <StudentSignIn props={this.props} /> : null}
                <p className='iconForStudent'><i className="fas fa-long-arrow-alt-down"></i></p>
                <div className="inputDiv2">
                    <h3>Student Sign Up</h3>
                    <form onSubmit={(ev) => { this.studentSignUp(ev) }}>
                        <input
                            type="text"
                            name="studentUsername"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Student Username"
                            required
                            autoFocus
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
                                onClick={(ev) => this.studentSignIn(ev)}
                            >Sign In</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default StudentSignUp;