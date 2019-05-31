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

    adminSignUpForm = () => {
        this.setState({
            adminSignUp: true,
            companySignUp: false,
            studentSignUp: false,
        })
    }
    companySignUpForm = () => {
        this.setState({
            companySignUp: true,
            adminSignUp: false,
            studentSignUp: false,
        })
    }
    studentSignUpForm = () => {
        this.setState({
            adminSignUp: false,
            companySignUp: false,
            studentSignUp: true,
        })
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="forSignUp">
                    <button onClick={this.adminSignUpForm}>For <br /> Admin</button>
                    <button onClick={this.companySignUpForm}>For <br /> Companys</button>
                    <button onClick={this.studentSignUpForm}>For <br /> Students</button>
                </div>

                {this.state.adminSignUp ? <AdminSignUp /> : null}
                {this.state.companySignUp ? <CompanySignUp /> : null}
                {this.state.studentSignUp ? <StudentSignUp /> : null}
            </div>
        )
    }
}

export default withRouter(MainDashBoard);