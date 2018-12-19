import React, {Component} from 'react';
import {readCookie, setCookie} from 'view/Utils/Cookies';
import {connect} from "react-redux";
import {authAPI} from "config/constants";
import {Link, withRouter} from 'react-router-dom';

import {Form, Button} from 'antd';
import './style.css';
import {FormattedMessage} from "react-intl";
import {facebookAppID, facebookLoginUrl, userAPI} from "../../../../config/constants";

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {HTTP_METHOD_POST, superJsonRpcFetch} from "../../../../superFetch";

const FormItem = Form.Item;

class LoginPage extends Component {

    state = {name: '', password: '', showError: false, rememberMe: false, balance: "0"};

    static getDerivedStateFromProps(props, state) {
        // console.log("referrer = " + document.referrer);
        if (props.state.isAuthenticated && props.location.pathname === "/login") {
            let url = new URL(window.location.href);
            if (url.searchParams.get("redirect")) {
                props.history.push(url.searchParams.get("redirect"));
            } else if (document.referrer && document.referrer.split('/')[2] === window.location.href.split('/')[2]) {
                props.history.goBack();
            } else {
                window.location.href = "/";
            }
        }
        return state;
    }

    onChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    };

    onCheck = (e, type) => {
        this.setState({
            [type]: e.target.checked,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields(async (err, values, state) => {
            let fetchParams = {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                credentials: 'include',
                body: JSON.stringify({"username": this.state.name, "password": this.state.password})
            };

            await fetch(authAPI, fetchParams)
                .then(async (response) => {
                    if (response.ok) {
                        this.setState({showError: false});
                        if (response.headers.get("Authorization") !== null) {
                            setCookie('token', response.headers.get("Authorization"), {expires: (this.state.rememberMe ? 180 : 1)});
                            this.props.dispatch({type: 'AUTHORIZATION', payload: true});

                            /* let accessToken = readCookie('token');
                             if (accessToken) {
                                 this._asyncRequest = await fetch(userAPI, {
                                     method: "GET",
                                     headers: { "Content-type": "application/json", "Authorization": "Bearer " + accessToken },
                                     credentials: 'include',
                                 })
                                     .then(response => {
                                         if (response.ok) {
                                             return response.json();
                                         }
                                     })
                                     .then(response => {
                                         this._asyncRequest = null;
                                         if (response !== undefined) {
                                             this.props.dispatch({type: 'UPDATE_CURRENT_USER_DATA', data: response["response"]});
                                         }
                                     })
                             }*/


                        }
                    }
                    else {
                        this.setState({showError: true});
                    }
                })
            // .then((response) => {

            // })
        });
    };

    responseFacebook = (response) => {
        console.log(response);
        if (response.accessToken === undefined)
            return;

        let fetchParams = {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            credentials: 'include',
            body: JSON.stringify({
                accessToken: response.accessToken,
                expiresIn: response.data_access_expiration_time,
                signedRequest: response.signedRequest,
                userId: response.id,
                email: response.email,
                firstName: response.first_name,
                lastName: response.last_name,
                birthday: response.birthday || null,
                affiliateCode: null,
            })
        };

        fetch(facebookLoginUrl, fetchParams)
            .then(async (response) => {
                if (response.ok) {
                    this.setState({showError: false});
                    if (response.headers.get("Authorization") !== null) {
                        setCookie('token', response.headers.get("Authorization"), {expires: (this.state.rememberMe ? 180 : 1)});
                        this.props.dispatch({type: 'AUTHORIZATION', payload: true});
                    }
                }
            });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="page-grid__item main scroll">

                <div className="registration__wrapper">
                    <div className="registration-form">
                        <h3><FormattedMessage id="MainContainer.LoginPage.Caption"
                                              defaultMessage="Sign in to your account"/></h3>

                        <div className={"alertbox " + (this.state.showError ? "" : "hide")}>
                                <span className="alertbox__message">
                                    <FormattedMessage id="MainContainer.LoginPage.LoginError"
                                                      defaultMessage="Login or password is incorrect"/>
                                </span>
                        </div>

                        <Form onSubmit={this.handleSubmit} prefixCls="login-form">

                            <ul>
                                <li>
                                    <div className="input-container">
                                        <FormItem prefixCls="inputSection">
                                            {getFieldDecorator('userName', {
                                                rules: [{required: true, message: 'Please input your username!'}],
                                            })(
                                                <input type="text" placeholder="Name"
                                                       onChange={e => this.onChange(e, 'name')}/>
                                            )}
                                        </FormItem>
                                        <FormItem prefixCls="inputSection">
                                            {getFieldDecorator('password', {
                                                rules: [{required: true, message: 'Please input your Password!'}],
                                            })(
                                                <input type="password" placeholder="Password"
                                                       onChange={e => this.onChange(e, 'password')}/>
                                            )}
                                        </FormItem>
                                    </div>
                                </li>

                                <li>
                                    <FormItem>
                                        <div className="grid-container--nowrap checkbox__blk space-between">
                                            <div className="a">
                                                <input id="acceptTerms" type="checkbox" checked={this.state.rememberMe}
                                                       onChange={e => this.onCheck(e, 'rememberMe')}/>
                                                <label htmlFor="acceptTerms">
                                                    <FormattedMessage id="MainContainer.LoginPage.RememberMe"
                                                                      defaultMessage="Remember me"/>
                                                </label>
                                            </div>

                                            <div className="a nw f-password">
                                                <a>
                                                    <Link to="/password_recovery">
                                                        <FormattedMessage id="MainContainer.LoginPage.ForgotPassword"
                                                                          defaultMessage="Forgot Password?"/>
                                                    </Link>
                                                </a>
                                            </div>
                                        </div>
                                    </FormItem>
                                </li>

                                <li className="submit-area">
                                    <FormItem>
                                        <Button type="primary" htmlType="submit"
                                                className="login-form-button open-account-button">
                                            <FormattedMessage id="MainContainer.LoginPage.Button.Login"
                                                              defaultMessage="LOGIN"/>
                                        </Button>
                                    </FormItem>
                                </li>
                            </ul>

                        </Form>

                        <ul>
                            <li className="social-registration">

                                <div className="horizontal-separator-container short-separator">
                                            <span className="horizontal-separator">
                                                <FormattedMessage id="MainContainer.LoginPage.Or" defaultMessage="or"/>
                                            </span>
                                </div>

                                <FacebookLogin
                                    appId={facebookAppID}
                                    callback={this.responseFacebook}
                                    fields="email,last_name,first_name,birthday"
                                    scope="public_profile,user_birthday"
                                    returnScopes={true}
                                    render={renderProps => (
                                        <div className="open-account-button-facebook" onClick={renderProps.onClick}><i
                                            className="facebook__icon"/>
                                            <FormattedMessage id="MainContainer.LoginPage.LoginWithFacebook"
                                                              defaultMessage="Login with Facebook"/>
                                        </div>
                                    )}
                                />

                            </li>
                        </ul>

                    </div>
                </div>


            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(LoginPage);

function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
        }
    }
}

export default connect(mapStateToProps)(withRouter(WrappedNormalLoginForm))
