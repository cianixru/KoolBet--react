import React from 'react';
// import { connect } from "react-redux";
import { Form, Input, Select, Button } from 'antd';

import './style.css';

const FormItem = Form.Item;
const Option = Select.Option;


class RegPage extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    validateBirthday = (rule, value, callback) => {
        const year = new Date().getFullYear();
        if (value && value >= (year - 18)) {
            callback('Registration allowed only over 18 years of age');
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div class="page-grid__item main scroll">
                <Form onSubmit={this.handleSubmit} prefixCls="login-form" >
                    <div className="registration__wrapper">
                        <div className="registration-form">
                            <h3>Registration</h3>
                            <ul>
                                <li>
                                    <div className="input-container">
                                        <div className="labelContainer">
                                            <label>Login details</label>
                                            <label className="requiredAsterix">*</label>
                                        </div>
                                        <FormItem prefixCls="inputSection">
                                            {getFieldDecorator('email', {
                                                rules: [{
                                                    type: 'email', message: 'The input is not valid E-mail!',
                                                }, {
                                                    required: true, message: 'Please input your E-mail!',
                                                }],
                                            })(
                                                <Input placeholder="Your email address" />
                                            )}
                                        </FormItem>

                                        <FormItem prefixCls="inputSection">
                                            {getFieldDecorator('nickname', {
                                                rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                                            })(
                                                <Input placeholder="Your username" />
                                            )}
                                        </FormItem>

                                        <div className="inputSection">
                                            <div className="control-group">
                                                <div className="inputSection dub">
                                                    <FormItem prefixCls="inputSection">
                                                        {getFieldDecorator('password', {
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please input your password!',
                                                            }, {
                                                                validator: this.validateToNextPassword,
                                                            }],
                                                        })(
                                                            <Input type="password" placeholder="Choose a password" />
                                                        )}
                                                    </FormItem>
                                                </div>
                                                <div className="inputSection dub">
                                                    <FormItem prefixCls="inputSection">
                                                        {getFieldDecorator('confirm', {
                                                            rules: [{
                                                                required: true, message: 'Confirm your password!',
                                                            }, {
                                                                validator: this.compareToFirstPassword,
                                                            }],
                                                        })(
                                                            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm password" />
                                                        )}
                                                    </FormItem>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-container">
                                        <div className="labelContainer">
                                            <label>Your mobile number</label>
                                            <label className="requiredAsterix">*</label>
                                        </div>
                                        <div className="control-group">
                                            <div className="inputSection countrycode">
                                                <select name="" id="">
                                                    <option value="+1">+1</option>
                                                    <option value="+20">+20</option>
                                                    <option value="+212">+212</option>
                                                </select>
                                            </div>
                                            <div className="inputSection">
                                                <FormItem prefixCls="inputSection">
                                                    {getFieldDecorator('phoneNumber', {
                                                        rules: [{ required: true, message: 'Please input your phone number!' }],
                                                    })(
                                                        <input type="text" placeholder="(012)345-67-89" />
                                                    )}
                                                </FormItem>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-container">
                                        <div className="labelContainer">
                                            <label>Personal Details</label>
                                            <label className="requiredAsterix">*</label>
                                        </div>
                                        <div className="inputSection">
                                            <FormItem prefixCls="inputSection">
                                                {getFieldDecorator('firstName', {
                                                    rules: [{ required: true, message: 'Please input your first name!' }],
                                                })(
                                                    <input type="text" placeholder="First Name" />
                                                )}
                                            </FormItem>
                                        </div>
                                        <div className="inputSection">
                                            <FormItem prefixCls="inputSection">
                                                {getFieldDecorator('lastName', {
                                                    rules: [{ required: true, message: 'Please input your last name!' }],
                                                })(
                                                    <input type="text" placeholder="Last Name" />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>
                                    <div className="input-container">
                                        <FormItem prefixCls="inputSection">
                                            {getFieldDecorator('birthday', {
                                                rules: [{
                                                    required: true, message: 'Please input your birthday!'
                                                }, {
                                                    validator: this.validateBirthday,
                                                }],
                                            })(
                                                <div className="control-group__birthday">

                                                    <span className="input">
                                                        <select className="control-select" name="birthday-month">
                                                            <option value="00" hidden>Day</option>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="12">13</option>
                                                            <option value="12">14</option>
                                                            <option value="12">15</option>
                                                            <option value="12">16</option>
                                                            <option value="12">17</option>
                                                            <option value="12">18</option>
                                                        </select>
                                                    </span>
                                                    <span className="select">
                                                        <select className="control-select" name="birthday-month">
                                                            <option value="00" hidden>Month</option>
                                                            <option value="01">January</option>
                                                            <option value="02">February</option>
                                                            <option value="03">March</option>
                                                            <option value="04">April</option>
                                                            <option value="05">May</option>
                                                            <option value="06">June</option>
                                                            <option value="07">July</option>
                                                            <option value="08">August</option>
                                                            <option value="09">September</option>
                                                            <option value="10">October</option>
                                                            <option value="11">November</option>
                                                            <option value="12">December</option>
                                                        </select>
                                                    </span>
                                                    <span className="input">
                                                        <Input type="text" className="input__control" onBlur={this.handleConfirmBlur} maxLength="4" placeholder="Year" autocomplete="off" />
                                                    </span>
                                                </div>
                                            )}
                                        </FormItem>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-container">
                                        <div className="labelContainer">
                                            <label>Affiliate</label>
                                        </div>
                                        <div className="inputSection">
                                            <input className="" type="text" placeholder="Affiliate code" />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="checkbox__blk">
                                        <input id="acceptTerms" type="checkbox" />
                                        <label for="acceptTerms">I confirm that I am over 18 years old.</label>
                                    </div>
                                </li>
                                <li className="submit-area">
                                    <Button type="primary" htmlType="submit" className="login-form-button open-account-button">
                                        LOGIN
                                    </Button>
                                </li>
                                <li className="social-registration">
                                    <div className="horizontal-separator-container short-separator">
                                        <span className="horizontal-separator">or</span>
                                    </div>
                                    <div id="SubmitForm" className="open-account-button-facebook"><i className="facebook__icon"></i>Register with Facebook</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}


const WrappedNormalLoginForm = Form.create()(RegPage);

export default WrappedNormalLoginForm;




// function mapStateToProps (state) {
//     return {
//         state:{
//         }
//     }
//   }

// export default connect(mapStateToProps)(MainContainer)