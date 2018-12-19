import {PureComponent} from "react";
import {FormattedMessage} from "react-intl";
import React from "react";

import systemIcon from "../../../../../img/pay_logos/mtn-logo-small.png"
import {balanceAPI, deferredStakeCreate, getProfilePhone} from "../../../../../../config/constants";
import {readCookie} from "../../../../../Utils/Cookies";
import {HTTP_METHOD_GET, HTTP_METHOD_POST, superJsonRpcFetch} from "../../../../../../superFetch";

const STATE_NAME_SMALL = 'small';
const STATE_NAME_EDIT = 'edit';
const STATE_NAME_PENDING = 'pending';

const MIN_PAYMENT_SUM = 300; // TODO: remove hard-code and get data about payment system from gateway

export class QuickBetButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            stake: props.stake || null,
            odds: props.odds || [],
            // requestBodyFn: props.requestBodyFn || (() => {
            // }),

            // requestBody: props.requestBody || {},

            stateName: STATE_NAME_SMALL, // small | edit
            phone: '',
            balance: null,
        };

        console.log(props.odds);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let nextState = {};

        if (nextProps.stake !== prevState.stake) {
            nextState.stake = nextProps.stake;
        }
        if (nextProps.odds !== prevState.odds) {
            nextState.odds = nextProps.odds;
        }

        return nextState;
    };

    componentDidMount() {
        // if (this.props.state.isAuthenticated) {
            (async () => {
                let accessToken = readCookie('token');
                if (!accessToken) return;
                    // throw new Error("Unauthorized request");

                const getBalanceReq = await superJsonRpcFetch(accessToken, balanceAPI, HTTP_METHOD_GET);
                if (getBalanceReq === undefined) {
                    throw new Error("Get balance error");
                }
                // this.setState({balance: getBalanceReq.response.amount});
                console.log('balance was updated');
            })();
        // }
    }

    handleClick = () => {
        let accessToken = readCookie('token');
        if (!accessToken)
            throw new Error("Unauthorized request");
        if (STATE_NAME_SMALL === this.state.stateName) {
            (async () => {
                const getPhoneReq = await superJsonRpcFetch(accessToken, getProfilePhone, HTTP_METHOD_GET);
                if (getPhoneReq === undefined) {
                    throw new Error("Get profile error");
                }
                const getBalanceReq = await superJsonRpcFetch(accessToken, balanceAPI, HTTP_METHOD_GET);
                if (getBalanceReq === undefined) {
                    throw new Error("Get balance error");
                }
                this.setState({
                    phone: getPhoneReq.response,
                    balance: getBalanceReq.response.amount,
                    stateName: STATE_NAME_EDIT,
                });
            })();
        } else if (STATE_NAME_EDIT === this.state.stateName) {
            // const placeBetReqBody = this.state.requestBodyFn(0);  // TODO: will work only for multibet

            console.log(this.props.requestBody)

            let neededAmount = Math.ceil(this.state.stake - this.state.balance);
            if (neededAmount < MIN_PAYMENT_SUM)
                neededAmount = MIN_PAYMENT_SUM;

            superJsonRpcFetch(accessToken, deferredStakeCreate, HTTP_METHOD_POST, {
                stake: this.props.requestBody,
                deposit: {
                    "system": "MTN",
                    "phoneNumber": this.state.phone,
                    "amount": neededAmount,
                },
            }).then(response => {
                if (response !== undefined) {
                    this.setState({
                        phone: response.response,
                        stateName: STATE_NAME_PENDING,
                    });
                }
            });
        }
    };

    render() {

        if (STATE_NAME_PENDING === this.state.stateName) {
            return (
                <div onClick={this.handleClick} className={'button btn-place-bet'}
                     style={{"margin": "10px 0"}}>
                    wait for payment
                </div>
            );
        }

        const active =
            null !== this.state.stake
            && null !== this.state.balance
            && this.state.stake > this.state.balance;

        return (
            <div onClick={this.handleClick} className={'button btn-place-bet'}
                 style={{"margin": "10px 0", "display": (active ? "block" : "none")}}>
                <img src={systemIcon} style={{"width": "40px"}}/>
                {(STATE_NAME_EDIT === this.state.stateName)
                && <input placeholder={"+2371234567"} style={{"width": "90px"}}
                          defaultValue={this.state.phone}
                          onClick={(event) => {
                              event.stopPropagation();
                          }}/>
                }
                <span style={{"font-size": "10px"}}>
                <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BSForm.Button.QuickBet"}/>
                    </span>
            </div>
        );
    }
}
