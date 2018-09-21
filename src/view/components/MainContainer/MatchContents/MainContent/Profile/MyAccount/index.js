import React, { Component, Fragment } from 'react';

import UserData from "./UserData.json"
import UserBalance from "./UserBalance.json"

class MyAccount extends Component {
    render() {
        return (
            <Fragment>

                {/* {console.log(UserData.response)}
                {console.log(UserBalance.response)} */}
                
                <div className="personal">
                    <div className="avatar__container">
                        <div className="avatar__icon"></div>
                    </div>
                    <div className="personal-info">
                        <div className="personal-info-name">
                            <div className="personal-info__first">{UserData.response.firstName}</div>
                            <div className="personal-info__last">{UserData.response.lastName}</div>
                        </div>
                        <div className="user-current-funds">
                            <div className="deposit__cell">
                                <div className="title">Deposit</div>
                                <span>{UserBalance.response.amount} {UserData.response.currency}</span>
                            </div>
                            <div className="bonus__cell">
                                <div className="title">Bonus</div>
                                <span>{UserBalance.response.bonusAmount} {UserData.response.currency}</span>
                                <i className="funds-refresh__icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="account-bonus__section">
                    <div className="signup-bonus__wrapper">
                        <h2>Signup bonus</h2>
                        <a href="#" className="micro__button balance-info__button">
                            <i className="balance-info__icon"></i>
                            <span>Signup bonus terms</span>
                        </a>
                        <div className="detailed-balance__wrapper">
                            <div className="user-current-funds">
                                <div className="title">Bonus balance</div>
                                <span>1000.00 XAF</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="title">Left to rollover</div>
                            <div className="progress" role="progressbar" tabIndex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                                <div className="progress-meter" style={{ width: '15%' }}></div>
                            </div>
                            <div>120000.00 XAF</div>
                        </div>
                        <div className="row">
                            <div className="title">Bonus expiration</div>
                            <div className="progress" role="progressbar" tabIndex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                                <div className="progress-meter" style={{ width: '75%' }}></div>
                            </div>
                            <div>06.26.2018</div>
                        </div>
                    </div>
                    <div className="weekly-bonus__wrapper">
                        <h2>Weekly bonus</h2>
                        <a href="#" className="micro__button balance-info__button">
                            <i className="balance-info__icon"></i>
                            <span>Weekly bonus terms</span>
                        </a>
                        <div className="user-current-funds">
                            <div className="title">Weekly bonus balance</div>
                            <span>600.00 XAF</span>
                        </div>
                        <div className="row">
                            <div className="title">Bonus expiration:
                <span className="primary-color">64 XAF</span> on 2018-06-13</div>

                        </div>
                    </div>
                </div>

                <div className="account-details__section">
                    <h2>Account details</h2>

                    <div className="personal-data">
                        <div className="cell">
                            <div className="form-layout">
                                <h4>Personal information
                    <div className="micro__button edit__button">
                                        <i className="edit__icon"></i>Edit</div>
                                </h4>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="firstName">First Name:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <input value={UserData.response.firstName} type="text" id="firstName" disabled />
                                    </div>
                                </div>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="lastName">Last Name:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <input value={UserData.response.lastName} type="text" id="lastName" disabled />
                                    </div>
                                </div>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="firstName">Birthday:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <div className="control-group__birthday">
                                            <span className="input">
                                                <input className="input__control" type="text" name="birthday-day" value={UserData.response.dateOfBirth.split('.')[0]} maxLength="2" placeholder="Day" autoComplete="off" disabled />
                                            </span>
                                            <span className="select">
                                                <select className="control-select" defaultValue={parseInt(UserData.response.dateOfBirth.split('.')[1])} name="birthday-month" disabled>
                                                {['Month','January','February','March','April','May','June','July','August','September','October','November','December'].map((val,index)=>
                                                    <option value={index}>{val}</option>
                                                )}
                                                </select>
                                            </span>
                                            <span className="input">
                                                <input type="text" className="input__control" name="birthday-year" value={UserData.response.dateOfBirth.split('.')[2]} maxLength="4" placeholder="Year" autoComplete="off"
                                                    disabled />
                                            </span>
                                        </div>

                                    </div>
                                </div>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="firstName">Bank Name:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <input value={UserData.response.bankName} type="text" id="firstName" disabled />
                                    </div>
                                </div>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="firstName">Bank account number:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <input value={UserData.response.bankAccountNumber} type="text" id="firstName" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            <div className="form-layout">
                                <h4>Contact details
                                    <div className="micro__button edit__button">
                                        <i className="edit__icon"></i>Edit</div>
                                </h4>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="firstName">Country:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <select className="control-select" name="country" disabled>
                                            <option value="ru">Russia</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="firstName">Address:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <input value="Saint-Petersburg" type="text" id="firstName" disabled />
                                    </div>
                                </div>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="firstName">E-mail Address:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <input value={UserData.response.email} type="email" id="firstName" disabled />
                                    </div>
                                </div>
                                <div className="form-layout__row">
                                    <div className="form-layout__cell label__cell">
                                        <label htmlFor="firstName">Phone Number:</label>
                                    </div>
                                    <div className="form-layout__cell">
                                        <input value={UserData.response.phone} type="tel" id="firstName" disabled />
                                        <button className="verify-button button green">Verify phone number</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="confirm-area">
                    <button className="confirm-button button">
                        Save change
                    </button>
                </div>

            </Fragment>
        );
    }
}

export default MyAccount;