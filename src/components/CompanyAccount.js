import React, { Component } from 'react';
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
            jobCatogories:["Accounting","Executive","Manufacturing",
                " Admin & Clerical"," Franchise","Nonprofit",
                "Banking & Finance"," Government"," Part Time"
                ,"Business Opportunities","Health Care","Retail"
                ,"Contract & Freelance","Hospitality","Sales & Marketing"
                ,"Customer Service","Human Resources","Science & Biotech"
                ,"Diversity Opportunities","Information Technology","Transportation"
                ,"Engineering"," Internships & College"]
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
            // console.log(this.props)
        })
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="account">
                    <p className='iconForAdmin '><i className="fas fa-long-arrow-alt-down"></i></p>
                    <div className="infoDiv">
                        <h3>Add Job</h3>
                        <form>
                            <fieldset>
                                <legend>Job informaition</legend>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Title<sup>*</sup></th>
                                            <td><input
                                                type="text"
                                                placeholder="Enter job Title Here"
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Description<sup>*</sup></th>
                                            <td><textarea
                                                cols="50"
                                                rows="4"
                                                type="text"
                                                placeholder="Description"
                                            /></td>
                                        </tr>
                                        <tr>
                                            <th>Job Type</th>
                                            <td>
                                                <select>
                                                    {this.state.jobTypes.map((job) => {
                                                        return (
                                                            <option>
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
                                                <select>
                                                    {this.state.jobCatogories.map((job) => {
                                                        return (
                                                            <option>
                                                                {job}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default CompanyAccount;