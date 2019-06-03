import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class AdminSignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminUsername: null,
            password: null,
            uid: null,
        }
    }

    gettingValue = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            // console.log(this.props)
        })
    }

    checkUserNamePassword = (ev) => {
        ev.preventDefault()
        // console.log(ev.target.name)
        let name = ev.target.name;
        if (this.props.props.props.state.adminData) {
            for (let i = 0; i < this.props.props.props.state.adminData.length; i++) {
                if (this.state.adminUsername === this.props.props.props.state.adminData[i].adminUsername
                    && this.state.password === this.props.props.props.state.adminData[i].password) {
                    this.props.props.props.confirmation(name)
                    this.props.props.props.confirmation("adminConfirmation")
                    this.props.history.push("/AdminPannelPage")
                    // console.log("aaa")
                }
            }
        }
    }

    render() {
        console.log(this.props.props.props.state.adminConfirmation)
        return (
            <div className="adminPasscodeInputDiv">
                <div id="adminSignIn" className="signInDiv">
                    <h3>Admin Sign In</h3>
                    <form>
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
                        <button name="adminConfirmation" onClick={(ev) => this.checkUserNamePassword(ev)}>Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(AdminSignIn);