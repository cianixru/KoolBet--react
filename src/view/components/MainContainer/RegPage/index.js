import React, {Fragment} from 'react';
// import { connect } from "react-redux";
import {Form, Input, Select, Button, DatePicker, Checkbox} from 'antd';

import './style.css';
import './reactTelInputStyles.css';
import './datePicker.css';
import './checkbox.css';

import {signUpFieldsListAPI, signUpAPI, verifyEmailAPI} from "config/constants";
import ReactTelInput from "react-telephone-input";

import {injectIntl, intlShape, FormattedMessage} from 'react-intl';

import {withRouter, Redirect, Link} from 'react-router-dom';

import messages from "./messages.lang";

import VerifyEmailMessageBox from "./VerifyEmailMessageBox"

import flags from './../../../img/flags.png'
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {facebookAppID} from "../../../../config/constants";


const FormItem = Form.Item;
const Option = Select.Option;

class RegPage extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        signUpFieldsList: [],
        acceptTermsChecked: false,
        completeMessage: false,
        requestResponse: false,
        showError: true,
        errorResponse: null
    };

    requestMethod = signUpFieldsListAPI;

    componentDidMount() {
        let verify_email = this.urlParse("verify_email")
        if (Boolean(verify_email)) {
            this.requestMethod = verifyEmailAPI + verify_email;
        }
        fetch(this.requestMethod)
            .then(response => {
                // if (response.ok) {
                return response.json();
                // }
            })
            .then(response => {
                if (response !== undefined) {
                    if (Boolean(verify_email)) {
                        this.setState({requestResponse: response.response})
                    } else {
                        this.setState({signUpFieldsList: response.response})
                    }
                }
            })
    }

    urlParse = (param) => {
        let params = new URLSearchParams(this.props.location.search);
        let bookCodeUrl = params.get(param);
        return bookCodeUrl;
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            let values = fieldsValue;
            if (typeof fieldsValue['date_of_birth'] !== "undefined" && fieldsValue['date_of_birth'] !== null) {
                values = {
                    ...fieldsValue,
                    'date_of_birth': fieldsValue['date_of_birth'].format('DD/MM/YYYY'),
                    "terms_and_cond_version": "undefined",
                    "default_language": "EN"
                };
                delete values.confirm;
            }
            if (!err) {
                let fetchParams = {
                    method: "POST",
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify(values)
                };

                fetch(signUpAPI, fetchParams)
                    .then((response) => {
                        if (response.ok) {
                            this.setState({completeMessage: true})
                            this.setState({showError: false});
                        }
                        else {
                            this.setState({showError: true});
                        }
                        return response.json()
                    })
                    .then(
                        (response) => {
                            if (!response.ok)
                                this.setState({errorResponse: response.errors});
                        }
                    )
            }
        });
    };

    handleInputChange = (telNumber, selectedCountry) => {
        console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
    };

    handleInputBlur = (telNumber, selectedCountry) => {
        console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(<FormattedMessage id={"MainContainer.RegPage.ConfirmPasswordError"}
                                       defaultMessage={"Two passwords that you enter is inconsistent!"}/>);
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };
    validateBirthday = (rule, value, callback) => {
        if (value !== null && typeof value !== "undefined") {
            var birthdate = new Date(value.format('YYYY/MM/DD'));
            var cur = new Date();
            var diff = cur - birthdate;
            var age = Math.floor(diff / 31536000000);
            if (age < 18) callback(<FormattedMessage id={"MainContainer.RegPage.RegistrationAllowedOnlyOver18years"}
                                                     defaultMessage={"Registration allowed only over 18 years of age"}/>);
        }
        callback();
    };
    onDatePickerChange = (date, dateString) => {
        console.log(dateString, date);
    };

    acceptTermsChecked = (e) => {
        this.setState({
            acceptTermsChecked: e.target.checked,
        });
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const {formatMessage} = this.props.intl;

        let loginDetailsContainer = [];
        let mobileContainer = [];
        let personalDetailsContainer = [];
        let affiliateContainer = [];
        let acceptTermsContainer = [];
        let additionalContainer = [];

        let loginDetailArr = ["email", "password", "username"];
        let mobileArr = ["phone"];
        let personalDetailsArr = ["firstname", "lastname", "date_of_birth", "address"];
        let affiliateArr = ["connected_affiliate"];
        let acceptTermsArr = ["acceptTerms"];
        let additionalArr = [];

        this.state.signUpFieldsList.map(e => {
            if (loginDetailArr.includes(e.name)) loginDetailsContainer.push(e);
            if (mobileArr.includes(e.name)) mobileContainer.push(e);
            if (personalDetailsArr.includes(e.name)) personalDetailsContainer.push(e);
            if (affiliateArr.includes(e.name)) affiliateContainer.push(e);
            if (acceptTermsArr.includes(e.name)) acceptTermsContainer.push(e);
            if (additionalArr.includes(e.name)) additionalContainer.push(e);
            if (!loginDetailArr.includes(e.name) && !mobileArr.includes(e.name) && !personalDetailsArr.includes(e.name) && !affiliateArr.includes(e.name)) additionalContainer.push(e);
        });

        const sortArr = (personA, personB) => {
            return personA.age - personB.age;
        };

        const loginDetails = loginDetailsContainer.map(e => {
            if (e.name === "email") {
                return (
                    <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                        {getFieldDecorator(e.name, {
                            rules: [{
                                type: e.name,
                                message: <FormattedMessage id={"MainContainer.RegPage.Error.TheInputIsNotValidEmail"}
                                                           defaultMessage={"The input is not valid E-mail!"}/>,
                            }, {
                                required: e.mandatory,
                                message: <FormattedMessage id={"MainContainer.RegPage.Error.PleaseInputYourEmail"}
                                                           defaultMessage={"Please input your E-mail!"}/>,
                            }],
                        })(
                            <Input name={e.name} placeholder={formatMessage(messages["Placeholder.YourEmailAddress"])}/>
                        )}
                    </FormItem>
                );
            }

            if (e.name === "username") {
                return (
                    <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                        {getFieldDecorator(e.name, {
                            rules: [{
                                required: e.mandatory,
                                message: <FormattedMessage id={"MainContainer.RegPage.Error.PleaseInputYourUsername"}
                                                           defaultMessage="Please input your username!"/>,
                                whitespace: false
                            }],
                        })(
                            <Input name={e.name} placeholder={formatMessage(messages["Placeholder.YourUsername"])}/>
                        )}
                    </FormItem>
                );
            }

            if (e.name === "password") {
                return (
                    <div className="inputSection">
                        <div className="control-group">
                            <div className="inputSection dub">
                                <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                                    {getFieldDecorator(e.name, {
                                        rules: [{
                                            required: e.mandatory,
                                            message: <FormattedMessage
                                                id={"MainContainer.RegPage.Error.PleaseInputYourPassword"}
                                                defaultMessage="Please input your password!"/>,
                                        }, {
                                            validator: this.validateToNextPassword,
                                        }],
                                    })(
                                        <Input type="password" name={e.name}
                                               placeholder={formatMessage(messages["Placeholder.ChoosePassword"])}/>
                                    )}
                                </FormItem>
                            </div>
                            <div className="inputSection dub">
                                <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                                    {getFieldDecorator("confirm", {
                                        rules: [{
                                            required: e.mandatory,
                                            message: <FormattedMessage
                                                id={"MainContainer.RegPage.Error.ConfirmYourPassword"}
                                                defaultMessage="Confirm your password!"/>,
                                        }, {
                                            validator: this.compareToFirstPassword,
                                        }],
                                    })(
                                        <Input type="password" name="password-confirm" onBlur={this.handleConfirmBlur}
                                               placeholder={formatMessage(messages["Placeholder.ConfirmPassword"])}/>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                    </div>
                )
            }
        });

        const affiliate = affiliateContainer.map(e => {
            if (e.name === "connected_affiliate") {
                return (
                    <Fragment>
                        <div className={"labelContainer" + (e.hidden) ? "hide" : null}>
                            <label><FormattedMessage id={"MainContainer.RegPage.Label.Affiliate"}
                                                     defaultMessage="Affiliate"/></label>
                        </div>
                        <div className="inputSection">
                            <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                                {getFieldDecorator(e.name, {
                                    rules: [{required: e.mandatory}],
                                })(
                                    <Input name={e.name}
                                           placeholder={formatMessage(messages["Placeholder.AffiliateCode"])}/>
                                )}
                            </FormItem>
                        </div>
                    </Fragment>
                )
            }
        });

        const personalDetails = personalDetailsContainer.map(e => {
            if (e.name === "firstname") {
                return (
                    <div className="inputSection">
                        <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                            {getFieldDecorator(e.name, {
                                rules: [{
                                    required: e.mandatory,
                                    message: <FormattedMessage
                                        id={"MainContainer.RegPage.Error.PleaseInputYourFirstName"}
                                        defaultMessage="Please input your first name!"/>
                                }],
                            })(
                                <input type="text" name={e.name}
                                       placeholder={formatMessage(messages["Placeholder.FirstName"])}/>
                            )}
                        </FormItem>
                    </div>
                )
            }
            if (e.name === "lastname") {
                return (
                    <div className="inputSection">
                        <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                            {getFieldDecorator(e.name, {
                                rules: [{
                                    required: e.mandatory,
                                    message: <FormattedMessage
                                        id={"MainContainer.RegPage.Error.PleaseInputYourLastName"}
                                        defaultMessage="Please input your last name!"/>
                                }],
                            })(
                                <input type="text" name={e.name}
                                       placeholder={formatMessage(messages["Placeholder.LastName"])}/>
                            )}
                        </FormItem>
                    </div>
                )
            }
            if (e.name === "address") {
                return (
                    <div className="inputSection">
                        <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                            {getFieldDecorator(e.name, {
                                rules: [{
                                    required: e.mandatory,
                                    message: <FormattedMessage id={"MainContainer.RegPage.Error.PleaseInputYourAddress"}
                                                               defaultMessage="Please input your address!"/>
                                }],
                            })(
                                <input type="text" name={e.name}
                                       placeholder={formatMessage(messages["Placeholder.Address"])}/>
                            )}
                        </FormItem>
                    </div>
                )
            }
            if (e.name === "date_of_birth") {
                return (
                    <div className="inputSection">
                        <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                            {getFieldDecorator(e.name, {
                                rules: [{
                                    type: 'object',
                                    required: e.mandatory,
                                    message: <FormattedMessage
                                        id={"MainContainer.RegPage.Error.PleaseInputYourBirthday"}
                                        defaultMessage="Please input your birthday!"/>
                                },
                                    {validator: this.validateBirthday}]
                            })(
                                <DatePicker onChange={this.onDatePickerChange}
                                            placeholder={formatMessage(messages["Placeholder.DateOfBirth"])}
                                            format="DD/MM/YYYY"/>
                            )}
                        </FormItem>
                    </div>
                )
            }
        });

        const mobileNumber = mobileContainer.map(e => {
            if (e.name === "phone") {
                return (
                    <Fragment>
                        <div className="labelContainer">
                            <label><FormattedMessage id={"MainContainer.RegPage.Label.YourMobileNumber"}
                                                     defaultMessage="Your mobile number"/></label>
                            {(e.mandatory) ? <label className="requiredAsterix">*</label> : null}
                        </div>
                        <div className="inputSection">
                            <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                                {getFieldDecorator(e.name, {
                                    rules: [{
                                        required: e.mandatory,
                                        message: <FormattedMessage
                                            id={"MainContainer.RegPage.Error.PleaseInputYourPhoneNumber"}
                                            defaultMessage="Please input your phone number!"/>
                                    }],
                                })(
                                    <ReactTelInput
                                        defaultCountry="cm"
                                        flagsImagePath={flags}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputBlur}
                                    />
                                )}
                            </FormItem>
                        </div>
                    </Fragment>
                )
            }
        });

        const additional = additionalContainer.map(e => {
            if (e.type === "STRING") {
                return (
                    <div className="inputSection">
                        <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                            {getFieldDecorator(e.name, {
                                rules: [{required: e.mandatory}],
                            })(
                                <input type="text" name={e.name} placeholder={e.name}/>
                            )}
                        </FormItem>
                    </div>
                )
            }

            if (e.type === "CURRENCY") {
                return (
                    <div className="inputSection">
                        <FormItem prefixCls="inputSection" className={(e.hidden) ? "hide" : null}>
                            {getFieldDecorator(e.name, {
                                initialValue: e.defaultValue,
                            })(
                                <Select name={e.defaultValue}>
                                    <Option value={e.defaultValue}>{e.defaultValue}</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>
                )
            }
        });

        return (
            <div className="page-grid__item main scroll">
                {
                    (!this.state.completeMessage)
                        ?

                        <div className="registration__wrapper">
                            <div className="registration-form">
                                <h3><FormattedMessage id={"MainContainer.RegPage.Label.Registration"}
                                                      defaultMessage="Registration"/></h3>

                                {(this.state.errorResponse &&
                                    <div className="alertbox">
                                            <span className="alertbox__message">
                                                {
                                                    (this.state.errorResponse)
                                                        ? this.state.errorResponse[0].htmlMessage
                                                        : null
                                                }
                                            </span>
                                    </div>
                                )}

                                <Form onSubmit={this.handleSubmit} prefixCls="login-form">
                                    <ul>
                                        {(loginDetails) &&
                                        <div className="input-container">
                                            <div className="labelContainer">
                                                <label><FormattedMessage id={"MainContainer.RegPage.Label.LoginDetails"}
                                                                         defaultMessage="Login details"/></label>
                                                <label className="requiredAsterix">*</label>
                                            </div>
                                            {loginDetails}
                                        </div>
                                        }

                                        {(mobileNumber) &&
                                        <div className="input-container">
                                            {mobileNumber}
                                        </div>
                                        }

                                        {(personalDetails) &&
                                        <div className="input-container">
                                            <div className="labelContainer">
                                                <label><FormattedMessage
                                                    id={"MainContainer.RegPage.Label.PersonalDetails"}
                                                    defaultMessage="Personal Details"/></label>
                                                <label className="requiredAsterix">*</label>
                                            </div>
                                            {personalDetails}
                                        </div>
                                        }

                                        {(affiliate) &&
                                        <div className="input-container">
                                            {affiliate}
                                        </div>
                                        }

                                        {additional}

                                        <div className="input-container">
                                            <div className="inputSection checkbox__blk">
                                                <Checkbox
                                                    checked={this.state.acceptTermsChecked}
                                                    onChange={this.acceptTermsChecked}
                                                ><FormattedMessage
                                                    id={"MainContainer.RegPage.Label.IConfirmThatIAmOver18yearsOld"}
                                                    defaultMessage="I confirm that I am over 18 years old."/>
                                                </Checkbox>
                                            </div>
                                        </div>

                                        <div className="submit-area">
                                            <Button type="primary" htmlType="submit"
                                                    className="login-form-button open-account-button">
                                                <FormattedMessage
                                                    id={"MainContainer.RegPage.Button.Title.CreateAccount"}
                                                    defaultMessage="Create Account"/>
                                            </Button>
                                        </div>
                                        {/*<li className="social-registration">
                                            <div className="horizontal-separator-container short-separator">
                                                <span className="horizontal-separator"><FormattedMessage id={"MainContainer.RegPage.Text.or"} defaultMessage="or" /></span>
                                            </div>
                                            <div id="SubmitForm" className="open-account-button-facebook"><i className="facebook__icon"></i><FormattedMessage id={"MainContainer.RegPage.Button.Title.RegisterWithFacebook"} defaultMessage="Register with Facebook" /></div>
                                        </li>*/}

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
                                                <div className="open-account-button-facebook"
                                                     onClick={renderProps.onClick}><i
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

                        :
                        <VerifyEmailMessageBox requestResponse={this.state.requestResponse}/>
                }

            </div>

        )
    }
}


let WrappedNormalLoginForm = Form.create()(RegPage);

WrappedNormalLoginForm.propTypes = {
    intl: intlShape.isRequired
};


export default withRouter((injectIntl(WrappedNormalLoginForm)));