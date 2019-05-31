import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import changePath from '../common/common'

class SignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collegeName: "",
            email: "",
            number: "",
            password: "",
            confirmPassword: "",
        }
    }

    gettingValue = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            // console.log(this.state)
        })
    }

    signUp = (ev) => {
        ev.preventDefault();
        let obj = {
            collegeName: this.state.collegeName,
            email: this.state.email,
            number: this.state.number
        }
        const firebaseRef = firebase.database().ref()
        firebase.auth().createUserWithEmailAndPassword(obj.email, this.state.password)
            .then((res) => {
                firebaseRef.child(res.user.uid).child("CollegeInformaition").set(obj)
                // this.props.openHiddenDiv("Successfully Signed Up")
                this.props.history.push("/MainDashBoard")
            })
            .catch((error) => {
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                this.props.openHiddenDiv(errorMessage)
                // setTimeout(() => {
                //     document.getElementById("alertDiv").classList += " redAlert"
                // }, 350)
                // console.log(errorMessage);
                // ...
            });
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="headerDiv">
                    <p>
                        Sign Up Page
                    </p>
                </div>
                <div className="inputDiv">
                    <form onSubmit={(ev) => { this.signUp(ev) }}>
                        <input
                            type="text"
                            name="collegeName"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="College Name"
                            required
                            autoFocus
                        />
                        <input
                            type="text"
                            name="email"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="number"
                            name="number"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Number"
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
                            Allready have an account ? Login to your account.
                        <button
                                name=""
                                onClick={(ev) => changePath(ev.target.name, this.props)}
                            >Sign In</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(SignUpPage);