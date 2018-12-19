import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { readCookie } from 'view/Utils/Cookies';
import Preloader from 'view/Utils/Preloader';
import "./style.css"

import { userAPI } from "./../../../../../../../config/constants";
import { FormattedMessage } from 'react-intl';

// import UserData from "./UserData.json"
// import UserBalance from "./UserBalance.json"

class MyAccount extends Component {
    state = { UserData: null, UserBalance: {} }

    componentDidMount() {
        let accessToken = readCookie('token');
        if (accessToken) {
            this._asyncRequest = fetch(userAPI, {
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
                        this.setState(prevState => {
                            if (JSON.stringify(response.response) !== JSON.stringify(prevState.UserData)) {
                                let userData = response.response;
                                userData.dateOfBirth = userData.dateOfBirth || '';
                                return { ...prevState, UserData: userData }
                            }
                        })
                    }
                })
        }
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.state.balance && (props.state.balance !== state.UserBalance)) {
            return { UserBalance: props.state.balance }
        }

        return null;
    }


    render() {

        if (this.state.UserData !== null) {
            return (
                <Fragment>
                    <div className={"personal" + this.state.UserBalance.bonusAmount!==0 &&this.state.UserBalance.regularBonusBalance.amount!==0?"hide_border":null}>
                        <div className="avatar__container">
                            <div className="avatar__icon"></div>
                        </div>
                        <div className="personal-info">
                            <div className="personal-info-name">
                                <div className="personal-info__first">{this.state.UserData.firstName}</div>
                                <div className="personal-info__last">{this.state.UserData.lastName}</div>
                            </div>
                            <div className="user-current-funds">
                                <div className="deposit__cell">
                                    <div className="title">
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.Deposit.Title" defaultMessage="Deposit"/>
                                    </div>
                                    <span>{this.state.UserBalance.amount-this.state.UserBalance.reserved} {this.state.UserData.currency}</span>
                                </div>
                                <div className="bonus__cell">
                                    <div className="title">
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.Bonus.Title" defaultMessage="Bonus"/>
                                    </div>
                                    <span>{this.state.UserBalance.bonusAmount} {this.state.UserData.currency}</span>
                                    <i className="funds-refresh__icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>


                    {this.state.UserBalance.bonusAmount!==0 &&this.state.UserBalance.regularBonusBalance.amount!==0?
                        <div className="account-bonus__section">
                            {this.state.UserBalance.bonusAmount!==0?      <div className="signup-bonus__wrapper">
                                <h2>
                                    <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.Caption" defaultMessage="Signup bonus"/>
                                </h2>
                                <a className="micro__button balance-info__button">
                                    <i className="balance-info__icon"></i>
                                    <span>
                                    <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.Terms.Title" defaultMessage="Signup bonus terms"/>
                                </span>
                                </a>
                                <div className="detailed-balance__wrapper">
                                    <div className="user-current-funds">
                                        <div className="title">
                                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.BonusBalance.Caption" defaultMessage="Bonus balance"/>
                                        </div>
                                        <span>{this.state.UserBalance.bonusAmount} {this.state.UserData.currency}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="title">
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.LeftToRollover.Caption" defaultMessage="Left to rollover"/>
                                    </div>
                                    <div className="progress" role="progressbar" tabIndex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                                        <div className="progress-meter" style={{ width: '15%' }}></div>
                                    </div>
                                    <div>{this.state.UserBalance.rolloveredAmount} {this.state.UserData.currency}</div>
                                </div>
                                <div className="row">
                                    <div className="title">
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.BonusExpiration.Caption" defaultMessage="Bonus expiration"/>
                                    </div>
                                    <div className="progress" role="progressbar" tabIndex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
                                        <div className="progress-meter" style={{ width: '75%' }}></div>
                                    </div>
                                    <div>{new Date(this.state.UserBalance.finallyTimeout).toLocaleString()}</div>
                                </div>
                            </div>:null}
                            {this.state.UserBalance.regularBonusBalance.amount!==0?
                                <div className="weekly-bonus__wrapper">
                                    <h2>
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.WeeklyBonus.Caption" defaultMessage="Weekly bonus"/>
                                    </h2>
                                    <a className="micro__button balance-info__button">
                                        <i className="balance-info__icon"></i>
                                        <span>
                                    <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.WeeklyBonusTerms.Title" defaultMessage="Weekly bonus terms"/>
                                </span>
                                    </a>
                                    <div className="user-current-funds">
                                        <div className="title">
                                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.WeeklyBonusBalance.Caption" defaultMessage="Weekly bonus balance"/>
                                        </div>
                                        <span>{this.state.UserBalance.regularBonusBalance.amount} {this.state.UserData.currency}</span>
                                    </div>
                                    <div className="row">
                                        <div className="title">
                                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.BonusExpiration" defaultMessage="Bonus expiration"/>:
                                            <span className="primary-color"> {this.state.UserBalance.bonusAmount} {this.state.UserData.currency} </span>
                                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.SignupBonus.on" defaultMessage="on"/>&nbsp;
                                            {new Date(this.state.UserBalance.regularBonusBalance.expiringAt).toLocaleString()} </div>
                                    </div>
                                </div>:null}

                        </div>


                        :null}


                    <div className="account-details__section">
                        <h2>
                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.AccountDetails.Caption" defaultMessage="Account details"/>
                        </h2>

                        <div className="personal-data">
                            <div className="cell">
                                <div className="form-layout">
                                    <h4><FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.PersonalInformation.Caption" defaultMessage="Personal information"/>
                                        <div className="micro__button edit__button">
                                            <i className="edit__icon"></i><FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.PersonalInformation.Edit.Title" defaultMessage="Edit"/>
                                        </div>
                                    </h4>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="firstName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.PersonalInformation.FirstName.Label" defaultMessage="First Name"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <input value={this.state.UserData.firstName} type="text" id="firstName" disabled />
                                        </div>
                                    </div>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="lastName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.PersonalInformation.LastName.Label" defaultMessage="Last Name"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <input value={this.state.UserData.lastName} type="text" id="lastName" disabled />
                                        </div>
                                    </div>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="firstName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.PersonalInformation.Birthday.Label" defaultMessage="Birthday"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <div className="control-group__birthday">
                                                <span className="input">
                                                    <input className="input__control" type="text" name="birthday-day" value={this.state.UserData.dateOfBirth.split('.')[0]} maxLength="2" placeholder="Day" autoComplete="off" disabled />
                                                </span>
                                                <span className="select">
                                                    <select className="control-select" defaultValue={parseInt(this.state.UserData.dateOfBirth.split('.')[1], 10)} name="birthday-month" disabled>
                                                        {['Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((val, index) =>
                                                            <option key={index} value={index}>{val}</option>
                                                        )}
                                                    </select>
                                                </span>
                                                <span className="input">
                                                    <input type="text" className="input__control" name="birthday-year" value={this.state.UserData.dateOfBirth.split('.')[2]} maxLength="4" placeholder="Year" autoComplete="off"
                                                        disabled />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="firstName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.PersonalInformation.BankName.Label" defaultMessage="Bank Name"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <input value={this.state.UserData.bankName} type="text" id="firstName" disabled />
                                        </div>
                                    </div>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="firstName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.PersonalInformation.BankAccountNumber.Label" defaultMessage="Bank account number"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <input value={this.state.UserData.bankAccountNumber} type="text" id="firstName" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cell">
                                <div className="form-layout">
                                    <h4><FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.ContactDetails.Caption" defaultMessage="Contact details"/>
                                    <div className="micro__button edit__button">
                                        <i className="edit__icon"></i>
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.ContactDetails.Edit.Title" defaultMessage="Edit"/>
                                    </div>
                                    </h4>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="firstName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.ContactDetails.Country.Label" defaultMessage="Country"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <select className="control-select" name="country" disabled>
                                                <option value="ru">Russia</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="firstName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.ContactDetails.Address.Label" defaultMessage="Address"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <input value="Saint-Petersburg" type="text" id="firstName" disabled />
                                        </div>
                                    </div>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="firstName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.ContactDetails.EmailAddress.Label" defaultMessage="E-mail Address"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <input value={this.state.UserData.email} type="email" id="firstName" disabled />
                                        </div>
                                    </div>
                                    <div className="form-layout__row">
                                        <div className="form-layout__cell label__cell">
                                            <label htmlFor="firstName">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.ContactDetails.PhoneNumber.Label" defaultMessage="Phone Number"/>:
                                            </label>
                                        </div>
                                        <div className="form-layout__cell">
                                            <input value={this.state.UserData.phone} type="tel" id="firstName" disabled />
                                            <button className="verify-button button green">
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.ContactDetails.VerifyPhoneNumber.Title" defaultMessage="Verify phone number"/>:
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="confirm-area">
                        <button className="confirm-button button">
                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyAccount.Button.SaveChange" defaultMessage="Save change"/>
                    </button>
                    </div>
                </Fragment>
            )
        }
        else {
            return <Preloader /> //TODO: check preloader settings
        }
    }
}

function mapStateToProps(state) {
    return {
        state: {
            balance: state.balance,
        }
    }
}

export default connect(mapStateToProps)(MyAccount)