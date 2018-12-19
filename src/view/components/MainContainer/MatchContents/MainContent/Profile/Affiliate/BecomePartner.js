import {Component, Fragment} from 'react';

import {affiliateAPI,restAPI} from "config/constants";
import React from "react";
import {FormattedMessage} from "react-intl";
import AffiliateModal from "./AffiliateModal";
import "./style.css"
import {readCookie} from 'view/Utils/Cookies';

class BecomePartner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalWindowText: ""
        };
    }

    toggleModalVisible = () => {
        this.setState(prevState => {
            return {showModal: !prevState.showModal}
        })
    }

    becomePartnerHandler = () => {
        let accessToken = readCookie('token');
        if (accessToken) {
            this._asyncRequest = fetch(affiliateAPI, {
                method: "POST",
                headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
                credentials: 'include',
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        this.setState({
                            showModal: true,
                            modalWindowText: "Error.Try again later."
                        })
                    }
                })
                .then(response => {
                    console.log(response["response"])
                    this._asyncRequest = null;
                    if (response !== undefined && response.response === true) {
                        this.props.affiliateToggle();
                        /* fetch(userAPI, {
                             method: "GET",
                             headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
                             credentials: 'include',
                         })
                             .then(response => {
                                 if (response.ok) {
                                     return response.json();
                                 }
                             })
                             .then(response => {
                                 console.log(response["response"])
                                 if (response !== undefined) {
                                     this.props.dispatch({type: 'UPDATE_CURRENT_USER_DATA', data: response["response"]});
                                 }
                             })*/
                    }
                }).catch((e) => {
                    this.setState({
                        showModal: true,
                        modalWindowText: "Error.Try again later."
                    })
                })
        }

        this._asyncRequest = fetch(restAPI+"affiliate/periods", {
            method: "GET",
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
                            return {...prevState, UserData: response.response}
                        }
                    })
                }
            })

    }

    render() {
        return <Fragment>
            {this.state.showModal ?
                <AffiliateModal text={this.state.modalWindowText} closeHandler={this.toggleModalVisible}/> : null}
            <div>
                <button className="confirm-button button become-partner-button" onClick={this.becomePartnerHandler}>
                    <FormattedMessage
                        id="MainContainer.MatchContents.MainContent.Profile.Affiliate.Button.BecomePartner"
                        defaultMessage="Become partner"/>
                </button>
            </div>
        </Fragment>;


    }
}

export default BecomePartner
