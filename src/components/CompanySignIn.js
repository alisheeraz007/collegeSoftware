import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class CompanySignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyUsername: null,
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
        if (this.props.props.props.state.companyData) {
            for (let i = 0; i < this.props.props.props.state.companyData.length; i++) {
                if (this.state.companyUsername === this.props.props.props.state.companyData[i].companyUsername
                    && this.state.password === this.props.props.props.state.companyData[i].password) {
                    this.props.props.props.confirmation(name)
                    this.props.props.props.confirmation("companyConfirmation")
                    this.props.history.push("/CompanyPannelPage")
                }
            }
        }
    }

    render() {
        // console.log(this.props)
        return (
            <div className="adminPasscodeInputDiv">
                <div id="companySignIn" className ="signInDiv">
                    <h3>Company Sign In</h3>
                    <form>
                        <input
                            type="text"
                            name="companyUsername"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Company Username"
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
                        <button name="companyConfirmation" onClick={(ev)=>this.checkUserNamePassword(ev)}>Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(CompanySignIn);