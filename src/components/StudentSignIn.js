import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import StudentSignUp from './StudentSignUp';

class StudentSignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentUsername: null,
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
        if (this.props.props.props.state.studentData) {
            for (let i = 0; i < this.props.props.props.state.studentData.length; i++) {
                if (this.state.studentUsername === this.props.props.props.state.studentData[i].studentUsername
                    && this.state.password === this.props.props.props.state.studentData[i].password) {
                    this.props.props.props.confirmation(name)
                    // this.props.history.push("/StudentPannelPage")
                    // console.log("aaa")
                }
            }
        }
    }


    render() {
        console.log(this.props.props.props.state.studentConfirmation)
        return (
            <div className="adminPasscodeInputDiv">
                <div id="studentSignIn" className="signInDiv">
                    <h3>Student Sign In</h3>
                    <form>
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
                        <button name="studentConfirmation" onClick={(ev)=>this.checkUserNamePassword(ev)}>Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(StudentSignIn);