import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class DescriptionDiv extends Component {
    constructor(props) {
        super(props)
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

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        // console.log(this.props.props.props)
        return (
            <div className="adminPasscodeInputDiv">
                <div id="descriptionDiv" className="signInDiv">
                    <h3>Job Details</h3>
                    <table className = "jobDescription">
                        {this.props.props.props.state.jobs.map((job, index) => {
                            return (
                            Number(job.number) === Number(this.props.state.number)?
                            <tbody key={index}>
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Company Name:</th>
                                            <td>{job.companyName}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Job Title:</th>
                                            <td>{job.jobTitle}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Job Description:</th>
                                            <td>{job.jobDescription}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Job Type:</th>
                                            <td>{job.jobType}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Job Category:</th>
                                            <td>{job.jobCategory}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Job Time:</th>
                                            <td>{job.jobTypeRadio}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Location:</th>
                                            <td>{job.location}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Full Address:</th>
                                            <td>{job.address}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Contact Email:</th>
                                            <td>{job.companyEmail}</td>
                                        </tr>
                                        : null}
                                    {Number(job.number) === Number(this.props.state.number) ?
                                        <tr>
                                            <th>Website:</th>
                                            <td>{job.website}</td>
                                        </tr>
                                        : null}
                                </tbody>:null
                            )
                        })}
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(DescriptionDiv)