import React from 'react';
// import { connect } from "react-redux";

export default class LoginPage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className="registration__wrapper">
                    <div className="registration-form">
                        <h3>
                            Sign in to your account
                        </h3>

                        <ul>
                            <li>
                                <div className="input-container">
                                    <div className="inputSection">
                                        <input className="" type="text" placeholder="Username" />
                                    </div>
                                    <div className="inputSection">
                                        <input className="" type="password" placeholder="Password" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="grid-container--nowrap checkbox__blk space-between">
                                    <div className="a">
                                        <input id="acceptTerms" type="checkbox" />
                                        <label for="acceptTerms">Remember me</label>
                                    </div>

                                    <div className="a nw f-password">
                                        <a href="#">
                                            Forgot Password?
                                            </a>
                                    </div>
                                </div>
                            </li>

                            <li className="submit-area">
                                <input type="button" value="LOGIN" id="SubmitForm" className="open-account-button" />
                            </li>
                            <li className="social-registration">
                                <div className="horizontal-separator-container short-separator">
                                    <span className="horizontal-separator">or</span>
                                </div>
                                <div id="SubmitForm" className="open-account-button-facebook"><i className="facebook__icon"></i>Login with Facebook</div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

        )
    }
}







// function mapStateToProps (state) {
//     return {
//         state:{
//         }
//     }
//   }

// export default connect(mapStateToProps)(MainContainer)