import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Loader from './Loader'

class AdminPannelPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: null
        }
    }


    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (this.props.state.adminConfirmation) {

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

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        return (
            this.state.uid?
            <div className="mainContainer">
                <div className="headerDiv">
                    <p>
                        Admin Pannel Page
                    </p>
                </div>
            </div>:
            <Loader/>
        )
    }
}

export default withRouter(AdminPannelPage);