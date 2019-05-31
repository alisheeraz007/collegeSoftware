import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import changePath from '../common/common'

class CompanySignUp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="adminSignUp">
                <p className='iconForCompany'><i class="fas fa-long-arrow-alt-down"></i></p>
                <div className="inputDiv2">
                    <h3>Company Sign Up</h3>
                    <form onSubmit={(ev) => { this.signUp(ev) }}>
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
                                onClick={(ev) => changePath(ev.target.name, this.props)}
                            >Sign In</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default CompanySignUp;