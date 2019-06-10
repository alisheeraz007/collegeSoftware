import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class CompanyAccount extends Component {
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
            companyName:null,
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
            // console.log(this.state)
        })
    }

    post=(ev)=>{
        ev.preventDefault();
        let number = 0
        if(this.props.props.state.number){
            number = Number(this.props.props.state.number);
        }
        
        let obj = {
            jobTitle: this.state.jobTitle,
            jobDescription: this.state.jobDescription,
            jobType: this.state.jobType,
            jobCategory: this.state.jobCategory,
            location: this.state.location,
            address: this.state.address,
            jobTypeRadio: this.state.jobTypeRadio,
            companyName:this.state.companyName,
            companyEmail: this.state.companyEmail,
            website: this.state.website,
            number: Number(number) + 1
        }
        firebase.database().ref().child(this.state.uid).child("jobs").child(obj.jobTitle).set(obj)
        firebase.database().ref().child(this.state.uid).child("number").set(obj.number)        
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        // console.log(this.props.props.state.jobs)
        return (
            <div className="mainContainer">
                <div className="account">
                    <p className='iconForAdmin '><i className="fas fa-long-arrow-alt-down"></i></p>
                    <div className="infoDiv">
                        <h3>Add Job</h3>
                        <form onSubmit={(ev)=>this.post(ev)}>
                            <fieldset>
                                <legend>Job informaition</legend>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Title<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Enter job Title Here"
                                                name="jobTitle"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                                autoFocus
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Description<sup>*</sup></th>
                                            <td><textarea
                                                cols="50"
                                                rows="4"
                                                type="text"
                                                placeholder="Description"
                                                name="jobDescription"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Job Type</th>
                                            <td>
                                                <select
                                                    name="jobType"
                                                    onChange={(ev) => this.gettingValue(ev)}
                                                >
                                                    {this.state.jobTypes.map((job, index) => {
                                                        return (
                                                            <option key={index}>
                                                                {job}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Job Category</th>
                                            <td>
                                                <select
                                                    name="jobCategory"
                                                    onChange={(ev) => this.gettingValue(ev)}
                                                >
                                                    {this.state.jobCatogories.map((job, index) => {
                                                        return (
                                                            <option key={index}>
                                                                {job}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Location<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Location"
                                                name="location"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Address<sup>*</sup></th>
                                            <td><textarea
                                                cols="50"
                                                rows="4"
                                                type="text"
                                                placeholder="Address"
                                                name="address"
                                                onChange={(ev) => this.gettingValue(ev)}
                                                required
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Job Type</th>
                                            <td className="radio">
                                                <input
                                                    type="radio"
                                                    name="jobTypeRadio"
                                                    onChange={(ev) => this.gettingValue(ev)}
                                                    value="Part Time"
                                                />
                                                Part Time
                                                <br />
                                                <input
                                                    type="radio"
                                                    name="jobTypeRadio"
                                                    onChange={(ev) => this.gettingValue(ev)}
                                                    value="Full Time"
                                                />
                                                Full Time
                                                 <br />
                                                <input
                                                    type="radio"
                                                    name="jobTypeRadio"
                                                    onChange={(ev) => this.gettingValue(ev)}
                                                    value="FreeLance"
                                                />
                                                FreeLance
                                                <br />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset><br />
                            <fieldset>
                                <legend>Company Information</legend>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Company Names<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Company Name"
                                                name="companyName"
                                                onChange={(ev) => this.gettingValue(ev)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Contact Email<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Contact Email"
                                                name="companyEmail"
                                                onChange={(ev) => this.gettingValue(ev)}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Website</th>
                                            <td><input
                                                type="text"
                                                placeholder="Website"
                                                name="website"
                                                onChange={(ev) => this.gettingValue(ev)}
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
export default withRouter(CompanyAccount);