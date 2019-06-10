import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class StudentResumeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {

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
        // console.log(this.props.props.state.jobs)
        // console.log(this.props.props)
        return (
            <div className="mainContainer">
                <div className="account">
                    <p className='iconForAdmin '><i className="fas fa-long-arrow-alt-down"></i></p>
                    <div className="infoDiv">
                        <h3>Add Resumes</h3>
                        <form onSubmit={(ev) => this.post(ev)}>
                            <fieldset>
                                <legend>Student informaition</legend>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>First Name<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                                autoFocus
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Last Name<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Last Name"
                                                name="LastName"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                                autoFocus
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Short Description<sup>*</sup></th>
                                            <td><textarea
                                                cols="50"
                                                rows="3"
                                                type="text"
                                                placeholder="Short Description"
                                                name="shortDescription"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Contact Email<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Contact Email"
                                                name="studentEmail"
                                                onChange={(ev) => this.gettingValue(ev)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Contact Number<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Contact Number"
                                                name="contactNumber"
                                                onChange={(ev) => this.gettingValue(ev)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Current Address<sup>*</sup></th>
                                            <td><textarea
                                                cols="50"
                                                rows="3"
                                                type="text"
                                                placeholder="Current Address"
                                                name="currentAddress"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td className="radio">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    onChange={(ev) => this.gettingValue(ev)}
                                                    value="Male"
                                                />
                                                Male
                                                <br />
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    onChange={(ev) => this.gettingValue(ev)}
                                                    value="Female"
                                                />
                                                Female
                                                 <br />
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </fieldset><br />
                            <fieldset>
                                <legend>Academic Qualification</legend>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Education<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Matric/Inter/Bachelors/Master etc..."
                                                name="Education"
                                                onChange={(ev) => this.gettingValue(ev)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Last Institution</th>
                                            <td><input
                                                type="text"
                                                placeholder="Last Intitution?"
                                                name="lastInstitution"
                                                onChange={(ev) => this.gettingValue(ev)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Other Courses</th>
                                            <td><input
                                                type="text"
                                                placeholder="Other Courses"
                                                name="otherCourses"
                                                onChange={(ev) => this.gettingValue(ev)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Experience</th>
                                            <td><textarea
                                                cols="50"
                                                rows="3"
                                                type="text"
                                                placeholder="Experience"
                                                name="experience"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                            /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                            <div className="buttonDiv">
                                <button>Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(StudentResumeForm);