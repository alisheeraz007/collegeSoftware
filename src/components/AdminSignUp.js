import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import changePath from '../common/common'

class AdminSignUp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="adminSignUp">
                <p className='iconForAdmin'><i class="fas fa-long-arrow-alt-down"></i></p>
                <div className="inputDiv2">
                    <h3>Admin Sign Up</h3>
                    <form onSubmit={(ev) => { this.signUp(ev) }}>
                        <input
                            type="text"
                            name="userName"
                            onChange={(ev) => { this.gettingValue(ev) }}
                            placeholder="Username"
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
                                onClick={(ev) => changePath(ev.target.name, this.props)}
                            >Sign In</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminSignUp;