import React, { PureComponent, Fragment } from 'react';

import { Link } from 'react-router-dom'
import { FormattedMessage } from "react-intl";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import Menu from '@material-ui/core/Menu';

class BetSlipMessageBox extends PureComponent {
    state = {
        response: {},
        anchorEl: null,
    }
    static getDerivedStateFromProps(props, state) {
        if (props.betDoneInfo !== state.response) {
            return {
                response: props.betDoneInfo,
            }
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    messageBody = (requestMethod, response, anchorEl, shareUrl) => {

        if (requestMethod === "place") {
            return <Fragment>
                <div className="betslip--panel">
                    <div className="bs__title"><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.Title"} defaultMessage={"Betslip"} /></div>

                    <div className="slipMessgeContent center">
                        <h3><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.MessgeContent.Title"} defaultMessage={"Your bet is accepted."} /></h3>
                        <p><FormattedMessage
                            id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.MessgeContent.Text"}
                            defaultMessage={"You can always check status of your bet in {linkMybets}. You can place bet by using the link"}
                            values={{
                                linkMybets: (
                                    <Link to="/profile/mybets">
                                        <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.MyBets"} defaultMessage={"My bets"} />
                                    </Link>
                                )
                            }}
                        /></p>
                        <a href={shareUrl + "?coupon_code=" + response.ticketCode} className="code">{response.ticketCode}</a><i className="shareLink share__icon"
                            anchorEl aria-owns={anchorEl ? 'share-buttons' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        ></i>
                        <Menu
                            id="share-buttons"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            className="share-buttons"
                        >
                            <li>
                                <FacebookShareButton url={shareUrl + "?coupon_code=" + response.ticketCode}>
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                            </li>
                            <li>
                                <TwitterShareButton url={shareUrl + "?coupon_code=" + response.ticketCode}>
                                    <TwitterIcon size={32} round={true} />
                                </TwitterShareButton>
                            </li>
                            <li>
                                <WhatsappShareButton url={shareUrl + "?coupon_code=" + response.ticketCode}>
                                    <WhatsappIcon size={32} round={true} />
                                </WhatsappShareButton>
                            </li>
                        </Menu>
                    </div>
                    <div className="bs-btn-block slipMessgeFooter type2">
                        <div className="cell">
                            <button className="button bs-btn--print"><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.Button.Print"} defaultMessage={"Print"} /></button>
                        </div>
                        <div className="cell">
                            <button className="button bs-btn--continue" onClick={() => this.props.setBetDoneState({ betDone: false })}><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.Button.Continue"} defaultMessage={"Continue"} /></button>
                        </div>
                    </div>
                </div>
            </Fragment>
        }

        if (requestMethod === "save") {
            return <Fragment>
                <div className="betslip--panel">
                    <div className="bs__title"><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.Title"} /></div>

                    <div className="slipMessgeContent center">
                        <h3><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.MessgeContent.SaveTitle"} /></h3>
                        <p><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.MessgeContent.SaveText"} /></p>
                        <span className="code">{response.ticketNewCode}</span><i className="shareLink share__icon"
                            anchorEl aria-owns={anchorEl ? 'share-buttons' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        ></i>
                        <Menu
                            id="share-buttons"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            className="share-buttons"
                        >
                            <li>
                                <FacebookShareButton url={shareUrl + "?booking_code=" + response.ticketNewCode}>
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                            </li>
                            <li>
                                <TwitterShareButton url={shareUrl + "?booking_code=" + response.ticketNewCode}>
                                    <TwitterIcon size={32} round={true} />
                                </TwitterShareButton>
                            </li>
                            <li>
                                <WhatsappShareButton url={shareUrl + "?booking_code=" + response.ticketNewCode}>
                                    <WhatsappIcon size={32} round={true} />
                                </WhatsappShareButton>
                            </li>
                        </Menu>
                        <p>
                            <FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.MessgeContent.SaveText2"} />
                        </p>

                    </div>
                    <div className="bs-btn-block slipMessgeFooter type2">
                        <div className="cell">
                            <button className="button bs-btn--print"><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.Button.Print"} /></button>
                        </div>
                        <div className="cell">
                            <button className="button bs-btn--continue" onClick={() => this.props.setBetDoneState({ betDone: false })}><FormattedMessage id={"MainContainer.MatchContents.RightSidebar.BetSlipMessageBox.Button.Continue"} /></button>
                        </div>
                    </div>
                </div>
            </Fragment>
        }
    }

    render() {
        const { anchorEl } = this.state;
        const { requestMethod } = this.props;
        const shareUrl = document.location.href;
        return this.messageBody(requestMethod, this.state.response, anchorEl, shareUrl);
    }
}

export default BetSlipMessageBox;