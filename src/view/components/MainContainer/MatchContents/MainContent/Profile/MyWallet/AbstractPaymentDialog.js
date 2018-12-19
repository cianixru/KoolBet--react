import React, {PureComponent} from "react";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Countdown from "react-countdown-now";

import {depositAPI, paymentStatusAPI, withdrawAPI} from "../../../../../../../config/constants";
import {readCookie} from "../../../../../../Utils/Cookies";

import waitForDepositImg from "../../../../../../img/pay_logos/deposit-image.jpg";

const CHECK_STATUS_INTERVAL = 3 * 1000;

export const STATE_NAME_OPEN = "open";
export const STATE_NAME_DEFINE_AMOUNT = 'defineAmount';
export const STATE_NAME_ATTENTION_BEFORE = 'showAttentionBefore';
export const STATE_NAME_WAIT = "waitDecision";
export const STATE_NAME_SUCCESS = "finishedWithSuccess";

const defaultSuccessCb = (localCode) => {
    this.setState({
        stateName: STATE_NAME_WAIT,
        localCode: localCode,
    });
};

export class AbstractPaymentDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open || false,
            stateName: STATE_NAME_OPEN,
            statusText: 'Waiting...',
            localCode: '',
            pendingStart: null,
        };
    }

    paymentRequest = (type, settings, inputs, successCb = defaultSuccessCb) => {
        let paymentUrl;
        switch (type.toLowerCase()) {
            case 'deposit':
                paymentUrl = depositAPI;
                break;
            case 'withdraw':
                paymentUrl = withdrawAPI;
                break;
            default:
                throw new Error("Unexpected payment transaction type: " + type);
        }

        let accessToken = readCookie('token');
        if (!accessToken)
            throw new Error("Unauthorized request");

        fetch(paymentUrl, {
            method: "POST",
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
            credentials: 'include',
            body: JSON.stringify({
                "system": settings.system,
                "phoneNumber": inputs.phone,
                "amount": inputs.amount
            })
        }).then(response => {
            if (response.ok) return response.json();
        }).then(response => {
            if (response !== undefined) {
                this.setState({
                    localCode: response.response.localCode,
                    stateName: STATE_NAME_WAIT,
                });
                successCb(
                    response.response.localCode
                );
                this.callPaymentStatusChecker();
            }
        });
    };

    buildWaitDecisionWidget = (type, text = null) => {
        if (type !== 'deposit' && type !== 'withdraw') {
            throw new Error("Unexpected payment transaction type: " + type);
        }

        return (
            <DialogContent>
                {
                    (text)
                        ?
                        <DialogContentText>{text}</DialogContentText>
                        :
                        null
                }
                <DialogContentText>
                    {
                        (!this.state.pendingStart)
                            ?
                            this.state.statusText
                            :
                            <Countdown
                                date={this.state.pendingStart + 1000 * 60 * 5}
                                renderer={
                                    ({total, days, hours, minutes, seconds, milliseconds, completed}) => {
                                        if (completed) {
                                            setTimeout(() => this.handleClose(), 3000);
                                            return ('Time Out')
                                        }
                                        return minutes + ':' + seconds
                                    }
                                }
                            />
                    }
                </DialogContentText>
                {
                    (type === 'deposit')
                        ?
                        <img src={waitForDepositImg} style={{"width": "337px"}} alt={'Deposit image'}/>
                        :
                        null
                }
            </DialogContent>
        );
    };

    callPaymentStatusChecker = () => {
        if (this.state.stateName !== STATE_NAME_WAIT || undefined === this.state.localCode) {
            return;
        }

        let accessToken = readCookie('token');
        if (!accessToken)
            throw new Error("Unauthorized request");
        fetch(paymentStatusAPI + this.state.localCode,
            {
                method: "GET",
                headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
                credentials: 'include',
            })
            .then(response => {
                if (response.ok) return response.json();
            })
            .then(response => {
                if (undefined === response || !response.response) {
                    return;
                }
                switch (response.response.status) {
                    case 'Pending':
                        setTimeout(() => this.callPaymentStatusChecker(), CHECK_STATUS_INTERVAL);
                        if (!this.state.pendingStart)
                            this.setState({pendingStart: Date.now()});
                        break;
                    case 'Applied':
                    case 'Complete':
                        console.log('success');
                        this.setState({stateName: STATE_NAME_SUCCESS, statusText: 'Success'});
                        setTimeout(() => this.handleClose(), CHECK_STATUS_INTERVAL);
                        break;
                    case 'Failed':
                        console.log('Failed');
                        this.setState({statusText: 'Failed'});
                        setTimeout(() => this.handleClose(), CHECK_STATUS_INTERVAL);
                        break;
                    case 'Abandoned':
                        console.log('Abandoned');
                        this.setState({statusText: 'Abandoned'});
                        setTimeout(() => this.handleClose(), CHECK_STATUS_INTERVAL);
                        break;
                    case 'Canceled':
                        console.log('Canceled');
                        setTimeout(() => this.handleClose(), CHECK_STATUS_INTERVAL);
                        break;
                    case 'Redirect':
                        if (response.response.redirectUrl)
                            window.location.href = response.response.redirectUrl;
                        break;
                    default:
                        setTimeout(() => this.callPaymentStatusChecker(), CHECK_STATUS_INTERVAL);
                        break;
                }
            })
    };
}

