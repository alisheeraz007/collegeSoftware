import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Loader from './Loader'
import JobPortal from './JobPortal'
import StudentResumeForm from './StudentResumeForm'

class StudentPannelPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: null,
            jobs: true,
            account: false,
        }
    }


    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (this.props.state.studentConfirmation) {

                    this.setState({
                        uid: user.uid,
                    })
                } else {
                    this.props.history.push("/MainDashBoard")
                }
            } else {
                this.props.history.push('/')
            }

        })
    }

    account = () => {
        this.setState({
            account: true,
            jobs: false
        })
        document.getElementById("jobs").className = null
        document.getElementById("account").className = "buttonFocus"
    }
    jobs = () => {
        this.setState({
            account: false,
            jobs: true
        })
        document.getElementById("jobs").className = "buttonFocus"
        document.getElementById("account").className = null
    }

    goBack=()=>{
        this.props.history.push("/MainDashBoard")
    }

    componentWillMount() {
        // this.authStateChange()
    }

    render() {
        return (
            // this.state.uid?
            <div className="mainContainer">
                {this.state.jobs ? <JobPortal props={this.props} state={this.state}/> : null}
                {this.state.account ? <StudentResumeForm props={this.props} state={this.state}/> : null}
                <div className="toggleButtonDiv">
                    <button id="jobs" className="buttonFocus" onClick={this.jobs}>jobs</button>
                    <button id="account" onClick={this.account}>My Account</button>
                    <button onClick={this.goBack}><i className="fas fa-sign-out-alt"></i></button>
                </div>
            </div>
            //: <Loader/>
        )
    }
}

export default withRouter(StudentPannelPage);