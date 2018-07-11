import React from 'react';
// import { connect } from "react-redux";

export default class LoginPage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div class="registration__wrapper">
                    <div class="registration-form">
                        <h3>
                            Sign in to your account
                        </h3>

                        <ul>
                            <li>
                                <div class="input-container">
                                    <div class="inputSection">
                                        <input class="" type="text" placeholder="Username" />
                                    </div>
                                    <div class="inputSection">
                                        <input class="" type="password" placeholder="Password" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="grid-container--nowrap checkbox__blk space-between">
                                    <div class="a">
                                        <input id="acceptTerms" type="checkbox" />
                                        <label for="acceptTerms">Remember me</label>
                                    </div>

                                    <div class="a nw f-password">
                                        <a href="#">
                                            Forgot Password?
                                            </a>
                                    </div>
                                </div>
                            </li>

                            <li class="submit-area">
                                <input type="button" value="LOGIN" id="SubmitForm" class="open-account-button" />
                            </li>
                            <li class="social-registration">
                                <div class="horizontal-separator-container short-separator">
                                    <span class="horizontal-separator">or</span>
                                </div>
                                <div id="SubmitForm" class="open-account-button-facebook"><i class="facebook__icon"></i>Login with Facebook</div>
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