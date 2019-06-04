import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Loader from './Loader';

class JobPortal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminUsername: null,
            password: null,
            confirmPassword: null,
            uid: null,
            adminSignIn: false,
            jobTypes: ["Agriculture, Food and Natural Resources", "Architecture and Construction", "Arts, Audio/Video Technology and Communications"
                , "Business Management and Administration", "Education and Training", "Finance", "Government and Public Administration",
                "Health Science", "Hospitality and Tourism", "Human Services", "Information Technology", "Law, Public Safety, Corrections and Security",
                "Manufacturing", "Marketing, Sales and Service", "Science, Technology, Engineering and Mathematics",
                "Transportation, Distribution and Logistics"],
            jobCatogories: ["Accounting", "Executive", "Manufacturing",
                " Admin & Clerical", " Franchise", "Nonprofit",
                "Banking & Finance", " Government", " Part Time"
                , "Business Opportunities", "Health Care", "Retail"
                , "Contract & Freelance", "Hospitality", "Sales & Marketing"
                , "Customer Service", "Human Resources", "Science & Biotech"
                , "Diversity Opportunities", "Information Technology", "Transportation"
                , "Engineering", " Internships & College"],
            jobTitle: null,
            jobDescription: null,
            jobType: null,
            jobCategory: null,
            location: null,
            address: null,
            jobTypeRadio: null,
            companyName: null,
            companyEmail: null,
            website: null
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

    gettingValue = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            console.log(this.state)
        })
    }

    post = (ev) => {
        ev.preventDefault();
        let obj = {
            jobTitle: this.state.jobTitle,
            jobDescription: this.state.jobDescription,
            jobType: this.state.jobType,
            jobCategory: this.state.jobCategory,
            location: this.state.location,
            address: this.state.address,
            jobTypeRadio: this.state.jobTypeRadio,
            companyName: this.state.companyName,
            companyEmail: this.state.companyEmail,
            website: this.state.website
        }
        firebase.database().ref().child(this.state.uid).child("jobs").child(obj.jobTitle).set(obj)
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        return (
            this.props.props.state.jobs ?
                <div className="mainContainer">
                    <div className="account">
                        <p className='jobs'><i className="fas fa-long-arrow-alt-down"></i></p>
                        <div className="infoDiv">
                            <h3>Jobs</h3>
                            <div>
                                {this.props.props.state.jobs.map((job) => {
                                    return (
                                        <div className="jobDiv">
                                            <p>
                                            {job.jobTitle}
                                            </p>
                                            <p className="description">
                                            {job.jobDescription}
                                            </p>
                                            <p className="moreDetails"><button>More Details...</button></p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                :<Loader/>
                    )
    }
}
export default withRouter(JobPortal);