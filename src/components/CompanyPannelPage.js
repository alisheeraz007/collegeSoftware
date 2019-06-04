import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Loader from './Loader'
import CompanyAccount from './CompanyAccount'
// import StudentsAccount from './StudentsAccount'

class CompanyPannelPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: null,
            account: false,
            students:true
        }
    }


    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (this.props.state.companyConfirmation) {

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
            students: false
        })
        document.getElementById("students").className = null
        document.getElementById("account").className = "buttonFocus"
    }
    students = () => {
        this.setState({
            account: false,
            students: true
        })
        document.getElementById("students").className = "buttonFocus"
        document.getElementById("account").className = null
    }

    componentWillMount() {
        // this.authStateChange()
    }

    render() {
        return (
            // this.state.uid?
            <div className="mainContainer">
                {this.state.account ? <CompanyAccount props={this.props} state={this.state}/> : null}
                <div className="toggleButtonDiv">
                    <button id="students" className="buttonFocus" onClick={this.students}>Students</button>
                    <button id="account" onClick={this.account}>Add Job</button>
                    <button onClick={this.account}><i className="fas fa-sign-out-alt"></i></button>
                </div>
            </div>
            // :<Loader/>
        )
    }
}

export default withRouter(CompanyPannelPage);