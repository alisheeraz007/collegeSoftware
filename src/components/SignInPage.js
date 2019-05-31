import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import changePath from '../common/common'
import Loader from './Loader'

class SignInPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            loader: false
        }
    }

    gettingValue=(ev)=>{
        this.setState({
            [ev.target.name]: ev.target.value
        },()=>{
            // console.log(this.state)
        })
    }

    signIn = (ev) => {
        ev.preventDefault()
        this.setState({
          loader: true
        },()=>{})
        // console.log(this.props)
        // let validition = this.checkValidation()
        // if (validition) {
          // console.log("true")
          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
            //   this.setState({
            //     loader: false
            //   })
            //   this.props.authStateChange()
              // console.log(res)
              this.props.history.push("/MainDashBoard")
            //   this.setState({
            //       loader:false
            //   })
            //   this.props.openHiddenDiv("Successfully Logged In")
            })
            .catch((e) => {
              this.setState({
                loader: false
              })
            //   this.props.openHiddenDiv(e.message)
            //   setTimeout(() => {
            //     document.getElementById("alertDiv").classList += " redAlert"
            //   }, 350);
            })
        // }
      }

    render() {
        return (
            this.state.loader?<Loader/>:
            <div className="mainContainer">
                <div className="headerDiv">
                    <p>
                        Sign In Page
                    </p>
                </div>
                <div className="inputDiv">
                    <form onSubmit={(ev)=>{this.signIn(ev)}}>
                        <input
                            type="text"
                            name="email"
                            onChange={(ev)=>{this.gettingValue(ev)}}
                            placeholder="Email"
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={(ev)=>{this.gettingValue(ev)}}
                            placeholder="Password"
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <div>
                    <p>
                        dont have an account ? sign up to get an account.
                        <button
                        name="SignUpPage"
                        onClick={(ev) => changePath(ev.target.name, this.props)}                        
                        >Sign Up</button>
                    </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(SignInPage);