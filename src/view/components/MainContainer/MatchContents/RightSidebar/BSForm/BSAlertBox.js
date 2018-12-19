import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { FormattedMessage } from "react-intl";

let msg;
/*jshint ignore:start*/
/*eslint-disable*/
class BSAlertBox extends PureComponent {

    componentDidMount() {
        if (undefined === this.props.errorResponse.faultCode && this.props.errorResponse.code) {
            switch (this.props.errorResponse.code) {
                case 'not_enough_money':
                    msg = [
                        'Not enough funds to place bet. Please ',
                        <Link to={'/profile/mywallet'}>deposit</Link>,
                        ', first.'
                    ];
                    break;
                case 'enough_money_for_lower_rate':
                    msg = [
                        'Not enough funds to place bet. Please ',
                        <Link to={'/profile/mywallet'}>deposit</Link>,
                        ', or reduce your stake."'
                    ];
                    break;
            }
        }

        switch (this.props.errorResponse.faultCode) {
            case 154:
                msg = <FormattedMessage
                    id={"BSAlertMessage154"}
                    values={{
                        Link__firstDeposit: (
                            <Link to="/profile/mywallet">
                                <FormattedMessage id={"LinkText__firstDeposit"} />
                            </Link>
                        ),
                        Link__bonusConditions: (
                            <Link to="/profile/mywallet">
                                <FormattedMessage id={"LinkText__bonusConditions"} />
                            </Link>
                        ),
                    }}
                />
                break;
            case 156:
                msg = <FormattedMessage id="BSAlertMessage156" />
                break;
            case 159:
                msg = <Fragment>
                    <FormattedMessage id="BSAlertMessage159" /> {parseFloat(this.props.errorResponse.minBonusStake).toFixed(2)} <FormattedMessage id="Global.Currency" />.
                    <div className="confirm">
                        <div className="title">
                            <FormattedMessage id="BSAlertMessage159_2" /> {parseFloat(this.props.errorResponse.minBonusStake).toFixed(2)}?
                        </div>
                        <div>
                            <button onClick={() => this.props.setMinBonusStake(parseFloat(this.props.errorResponse.minBonusStake).toFixed(2))}>
                                <FormattedMessage id="LinkText__Yes" />
                            </button>
                            <button onClick={() => this.props.clearFaultCode()}>
                                <FormattedMessage id="LinkText__No" />
                            </button>
                        </div>
                    </div>
                </Fragment>
                break;
            case 217:
                msg = <Fragment>
                    <FormattedMessage id="BSAlertMessage217" />
                    <div className="confirm">
                        <div className="title">
                            <FormattedMessage id="BSAlertMessage217_2" />
                        </div>
                        <div>
                            <button onClick={() => this.props.placeBet()}><FormattedMessage id="LinkText__Yes" /></button>
                            <button onClick={() => this.props.clearFaultCode()}><FormattedMessage id="LinkText__No" /></button>
                        </div>
                    </div>
                </Fragment>
                break;
            case 229:
                msg = <FormattedMessage id="BSAlertMessage229" />
                break;
            default:
                break;
        }
    }

    render() {
        {
            (!this.props.isAuthenticated)
                ? msg = <FormattedMessage
                    id={"BSAlertPleaselogin"}
                    values={{
                        Link__login: (
                            <Link to="/login">
                                <FormattedMessage id={"LinkText__login"} />
                            </Link>
                        ),
                }}
            />
            : null
        }
        return (
            <div className="bs-message__wp">
                <div>
                    {this.props.errorResponse.faultCode && <div className="message-close icon" onClick={() => this.props.clearFaultCode()}></div>}
                    <i className="alert"></i>
                    {/* {this.errorMessage(this.props.faultCode)} */}
                    {msg}
                </div>
            </div>
        );
    }
}
/*eslint-enable*/
/*jshint ignore:end*/

export default BSAlertBox;