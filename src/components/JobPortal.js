import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Loader from './Loader';
import DescriptionDiv from './DescriptionDiv';

class JobPortal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descriptionDiv: false
        }
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // if (this.props.state.companyConfirmation) {

                this.setState({
                    uid: user.uid,
                })
                // }
                //  else {
                //     this.props.history.push("/MainDashBoard")
                // }
            } else {
                this.props.history.push('/')
            }

        })
    }

    jobDescription=(ev)=>{
        ev.preventDefault();
        for(let i = 0; i < this.props.props.state.jobs.length; i++){
            if(Number(this.props.props.state.jobs[i].number) === Number(ev.target.name)){
                this.setState({
                    number: this.props.props.state.jobs[i].number,
                    descriptionDiv: true,
                })
                setTimeout(()=>{
                    document.getElementById("descriptionDiv").classList += " signInDivOpen"
                },500)
            }
        }
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        return (
            this.props.props.state.jobs ?
                <div className="mainContainer">
                {this.state.descriptionDiv ? <DescriptionDiv props={this.props} state={this.state} />:null}
                    <div className="account">
                        <p className='jobs'><i className="fas fa-long-arrow-alt-down"></i></p>
                        <div className="infoDiv">
                            <h3>Jobs</h3>
                            <div>
                                {this.props.props.state.jobs.map((job, index) => {
                                    return (
                                        <div className="jobDiv" key={index}>
                                            <p>
                                                {job.jobTitle}
                                                <span>posted By {job.companyName}</span>
                                            </p>
                                            <p className="description">
                                                {job.jobDescription}
                                            </p>
                                            <p className="moreDetails"><button name={job.number} onClick={(ev)=>this.jobDescription(ev)}>More Details...</button></p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                : <p>no jobs yet </p>
        )
    }
}
export default withRouter(JobPortal);