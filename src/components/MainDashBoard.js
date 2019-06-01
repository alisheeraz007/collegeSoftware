import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import AdminSignUp from './AdminSignUp'
import CompanySignUp from './ComponySignUp'
import StudentSignUp from './StudentSignUp'


class MainDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: null,
            adminSignUp: true,
            companySignUp: false,
            studentSignUp: false
        }
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    uid: user.uid,
                })
            } else {
                this.props.history.push('/')
            }

        })
    }

    adminSignUpForm = (ev) => {
        this.setState({
            adminSignUp: true,
            companySignUp: false,
            studentSignUp: false,
        })
        document.getElementById("admin").className = "buttonFocus"
        document.getElementById("company").className = null
        document.getElementById("student").className = null
    }
    companySignUpForm = () => {
        this.setState({
            companySignUp: true,
            adminSignUp: false,
            studentSignUp: false,
        })
        document.getElementById("admin").className = null
        document.getElementById("company").className = "buttonFocus"
        document.getElementById("student").className = null
    }
    studentSignUpForm = () => {
        this.setState({
            adminSignUp: false,
            companySignUp: false,
            studentSignUp: true,
        })
        document.getElementById("admin").className = null
        document.getElementById("company").className = null
        document.getElementById("student").className = "buttonFocus"
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        // console.log(this.props)
        return (
            <div className="mainContainer">
                <div className="forSignUp">
                    <button className="buttonFocus" id="admin" onClick={(ev) => this.adminSignUpForm(ev)}>For <br /> Admin</button>
                    <button id="company" onClick={(ev) => this.companySignUpForm(ev)}>For <br /> Companys</button>
                    <button id="student" onClick={(ev) => this.studentSignUpForm(ev)}>For <br /> Students</button>
                </div>

                {this.state.adminSignUp ? <AdminSignUp props={this.props} /> : null}
                {this.state.companySignUp ? <CompanySignUp props={this.props} /> : null}
                {this.state.studentSignUp ? <StudentSignUp props={this.props} /> : null}
            </div>
        )
    }
}

export default withRouter(MainDashBoard);