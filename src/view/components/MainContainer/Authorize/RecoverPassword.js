import React, {Component} from 'react';
import {readCookie, setCookie} from 'view/Utils/Cookies';
import {connect} from "react-redux";
import {resetPassEmailUrl} from "./../../../../config/constants";
import {withRouter} from 'react-router-dom';

import {Form, Button} from 'antd';
import './style.css';
import {FormattedMessage} from "react-intl";

import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {HTTP_METHOD_POST, superJsonRpcFetch} from "../../../../superFetch";
import {checkResetPassCodeUrl, resetPassSMSUrl, setNewPasswordUrl} from "../../../../config/constants";


const FormItem = Form.Item;

const SUCCESS_WITHEMAIL_MODE = 'You will receive email with the recovery code. \n' +
    'Please enter it here and follow instructions, or click on the recovery link in the email message itself.';

const STATE_NAME__WAIT_USERNAME = 'wait-username';
const STATE_NAME__WAIT_CODE = 'wait-code';
const STATE_NAME__WAIT_PASSWORD = 'wait-password';

class RecoverPassword extends Component {

    state = {

        stateName: (
            this.props.code
                ? STATE_NAME__WAIT_PASSWORD
                : STATE_NAME__WAIT_USERNAME
        ),

        name: '',
        showError: false,
        rememberMe: false,
        balance: "0",
        recoveryMethod: 0,
        mode: 'email',
        errorMessage: '',

        code: this.props.code || null,
        password1: null,
        password2: null,
        passwordUpdated: false,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.state.isAuthenticated && props.location.pathname === "/password_recovery") {
            window.location.href = "/";
        }
        return state;
    }

    onChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    };

    handleChange = event => {
        this.setState({mode: event.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name || this.state.name.length === 0) return;
        (async () => {
            let url = this.state.mode === 'email' ? resetPassEmailUrl : resetPassSMSUrl;

            await superJsonRpcFetch(null, url, HTTP_METHOD_POST, {username: this.state.name})
                .then(async (resp) => {
                    console.log(resp);
                    if (resp.ok) {
                        if (resp.response && resp.response.return) {
                            // TODO: show successful message
                            this.setState({
                                stateName: STATE_NAME__WAIT_CODE,
                                showError: false
                            });
                        } else {
                            this.setState({
                                showError: true,
                                errorMessage: Array.isArray(resp.errors) ? resp.errors[0].message : 'Unexpected error!'
                            });
                        }
                    } else {
                        this.setState({
                            showError: true,
                            errorMessage: Array.isArray(resp.errors) ? resp.errors[0].message : 'Wrong username'
                        });
                    }
                });
        })();
    };

    handleCheckCodeSubmit = (e) => {
        e.preventDefault();
        (async () => {
            await superJsonRpcFetch(null, checkResetPassCodeUrl, HTTP_METHOD_POST, {code: this.state.code})
                .then(async (resp) => {
                    console.log(resp);
                    if (resp.ok) {
                        if (resp.response) {
                            this.setState({
                                stateName: STATE_NAME__WAIT_PASSWORD,
                                showError: false
                            });
                        } else {
                            this.setState({
                                showError: true,
                                errorMessage: Array.isArray(resp.errors) ? resp.errors[0].message : 'Unexpected error!'
                            });
                        }
                    } else {
                        this.setState({
                            showError: true,
                            errorMessage: Array.isArray(resp.errors) ? resp.errors[0].message : 'Wrong code'
                        });
                    }
                });
        })();
    };

    handleSetPasswordSubmit = (e) => {
        e.preventDefault();
        if (!this.state.password1 || this.state.name.password1 === 0) return;
        (async () => {
            await superJsonRpcFetch(null, setNewPasswordUrl, HTTP_METHOD_POST, {
                code: this.state.code,
                password1: this.state.password1,
                password2: this.state.password2,
            })
                .then(async (resp) => {
                    console.log(resp);
                    if (resp.ok) {
                        this.setState({});
                        if (resp.response) {
                            this.setState({showError: false, passwordUpdated: true});
                            setTimeout(() => {
                                // TODO: redirect to login page
                                window.location.href = "/login";
                            }, 3000);
                        } else {
                            this.setState({
                                showError: true,
                                errorMessage: Array.isArray(resp.errors) ? resp.errors[0].message : 'Unexpected error'
                            });
                        }
                    } else {
                        this.setState({
                            showError: true,
                            errorMessage: Array.isArray(resp.errors) ? resp.errors[0].message : 'Wrong code'
                        });
                    }
                });
        })();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {classes} = this.props;

        if (STATE_NAME__WAIT_USERNAME === this.state.stateName) {
            return (
                <div className="page-grid__item main scroll">
                    <Form onSubmit={this.handleSubmit} prefixCls="reset-password-form-username">
                        <div className="registration__wrapper">
                            <div className="registration-form">
                                <h3><FormattedMessage id="MainContainer.RecoverPassword.Caption"/></h3>

                                <div className={"alertbox " + (this.state.showError ? "" : "hide")}>
                                    <span className="alertbox__message">{this.state.errorMessage}</span>
                                </div>

                                <ul>
                                    <li className="text-center">
                                        Please choose way the method of recovery:

                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <RadioGroup
                                                aria-label="Provider"
                                                name="provider1"
                                                className={classes.group}
                                                value={this.state.mode}
                                                onChange={this.handleChange}
                                                row
                                            >
                                                <FormControlLabel
                                                    value="email"
                                                    control={<Radio
                                                        classes={{root: classes.radio, checked: classes.checked}}/>}
                                                    label="E-mail"
                                                    className={classes.ControlLabel}
                                                />
                                                <FormControlLabel
                                                    value="sms"
                                                    control={<Radio
                                                        classes={{root: classes.radio, checked: classes.checked}}/>}
                                                    label="SMS"
                                                    className={classes.ControlLabel}
                                                />

                                            </RadioGroup>
                                        </FormControl>


                                    </li>
                                    <li>
                                        <div className="input-container">
                                            <FormItem prefixCls="inputSection">
                                                {getFieldDecorator('userName', {
                                                    rules: [{required: true, message: 'Please input your username!'}],
                                                })(
                                                    <input type="text" placeholder="Enter your username"
                                                           onChange={e => this.onChange(e, 'name')}/>
                                                )}
                                            </FormItem>

                                        </div>
                                    </li>


                                    <li className="submit-area">
                                        <FormItem>
                                            <Button type="primary" htmlType="submit"
                                                    className="login-form-button open-account-button">
                                                <FormattedMessage
                                                    id="MainContainer.RecoverPassword.Button.Send-recovery-code"/>
                                            </Button>
                                        </FormItem>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            );
        } else if (STATE_NAME__WAIT_CODE === this.state.stateName) {
            return (
                <div className="page-grid__item main scroll">
                    <Form onSubmit={this.handleCheckCodeSubmit} prefixCls="reset-password-form-code">
                        <div className="registration__wrapper">
                            <div className="registration-form">
                                <h3><FormattedMessage id="MainContainer.RecoverPassword.Caption"/></h3>

                                <div className={"alertbox " + (this.state.showError ? "" : "hide")}>
                                    <span className="alertbox__message">{this.state.errorMessage}</span>
                                </div>

                                <ul>
                                    <li>
                                        <div className="input-container">
                                            <FormItem prefixCls="inputSection">
                                                <input id="rp_code" name="rp_code" type="text"
                                                       placeholder="Enter your code from email"
                                                       onChange={e => this.onChange(e, 'code')}/>
                                            </FormItem>

                                        </div>
                                    </li>


                                    <li className="submit-area">
                                        <FormItem>
                                            <Button type="primary" htmlType="submit"
                                                    className="login-form-button open-account-button">
                                                Validate code
                                            </Button>
                                        </FormItem>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            );
        } else if (STATE_NAME__WAIT_PASSWORD === this.state.stateName) {
            return (
                <div className="page-grid__item main scroll">
                    <Form onSubmit={this.handleSetPasswordSubmit} prefixCls="reset-password-form-pass">
                        <div className="registration__wrapper">
                            {
                                (this.state.passwordUpdated === false)
                                    ?
                                    <div className="registration-form">
                                        <h3>Please, write new password</h3>

                                        <div className={"alertbox " + (this.state.showError ? "" : "hide")}>
                                            <span className="alertbox__message">{this.state.errorMessage}</span>
                                        </div>

                                        <ul>
                                            <li>
                                                <div className="input-container">
                                                    <FormItem prefixCls="inputSection">
                                                        <input id="rp_password1" name="rp_password1" type="password"
                                                               placeholder="Enter password"
                                                               value={""}/* TODO: unexpected wildfowl */
                                                               onChange={e => this.onChange(e, 'password1')}/>
                                                    </FormItem>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="input-container">
                                                    <FormItem prefixCls="inputSection">
                                                        <input id="rp_password2" name="rp_password2" type="password"
                                                               placeholder="Repeat please"
                                                               onChange={e => this.onChange(e, 'password2')}/>
                                                    </FormItem>
                                                </div>
                                            </li>


                                            <li className="submit-area">
                                                <FormItem>
                                                    <Button type="primary" htmlType="submit"
                                                            className="login-form-button open-account-button">
                                                        Update password
                                                    </Button>
                                                </FormItem>
                                            </li>

                                        </ul>
                                    </div>
                                    :
                                    <div className="registration-form">
                                        <h3>Password changed successfully!</h3>
                                    </div>
                            }
                        </div>
                    </Form>
                </div>
            );
        }
    }
}


const styles = theme => ({
    radio: {
        color: 'black',
        padding: '15px 10px',
        '&$checked': {
            color: 'red',
        }
    },
    ControlLabel: {
        display: 'flex!important',
        flexDirection: 'row!important',
        margin: '0 20px 0 0!important',
    }
});

const WrappedNormalLoginForm = Form.create()(RecoverPassword);

function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
        }
    }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(WrappedNormalLoginForm)))
