import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import AdminSignIn from './AdminSignIn';

class AdminSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminUsername: null,
            password: null,
            confirmPassword: null,
            uid: null,
            adminSignIn: false,
        }
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
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


    adminSignUp = (ev) => {
        ev.preventDefault()
        let obj = {
            adminUsername: this.state.adminUsername,
            password: this.state.password,
        }
        firebase.database().ref().child(this.state.uid).child("admin").child(this.state.adminUsername).set(obj)
    }

    adminSignIn=()=>{
        this.setState({
            adminSignIn: true
        })
        setTimeout(()=>{
            document.getElementById("adminSignIn").classList += " signInDivOpen"
        },500)
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        return (
            <div className="adminSignUp">
            {this.state.adminSignIn ? <AdminSignIn props={this.props}/>: null}
                <p className='iconForAdmin'><i className="fas fa-long-arrow-alt-down"></i></p>
                <div className="inputDiv2">
                    <h3>Admin Sign Up</h3>
                    <form onSubmit={(ev) => { this.adminSignUp(ev) }}>
                        <input
                            type="text"
                            name="adminUsername"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Admin Username"
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
                                onClick={(ev) => this.adminSignIn(ev)}
                            >Sign In</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminSignUp;