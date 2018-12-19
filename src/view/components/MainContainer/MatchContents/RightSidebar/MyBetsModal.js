import React, { PureComponent, Fragment } from 'react';

import Dialog from '@material-ui/core/Dialog';
// import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

import { readCookie } from 'view/Utils/Cookies';
import { getTicketAPI } from "config/constants";

import { withRouter } from 'react-router-dom';

// function Transition(props) {
//     return <Slide direction="up" {...props} />;
// }
const styles = theme => ({
    drawerPaper: {
        width: '100%',
        boxShadow: 'none',
        background: 'transparent',
        margin: '0!important',
        // marginBottom: 50,       
        overflow: 'hidden',
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            padding: 20,
        },
    },
});

class MyBetsModal extends PureComponent {
    state = { open: true }


    componentDidMount() {
        // this.fetchTicket()
        this.setState({ ticketData: this.props.bokingResponse })
    }

    fetchTicket = () => {
        if (this.props.number && this.props.code) {
            let getParams = {
                number: this.props.number, // number,            
                code: this.props.code, // number,
            };
            getParams = '?' + Object.keys(getParams).map(e => e + '=' + getParams[e]).join('&');
            let accessToken = readCookie('token');
            if (accessToken) {
                fetch(getTicketAPI + getParams, {
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
                            this.setState(prevState => {
                                if (JSON.stringify(response.response) !== JSON.stringify(prevState.UserData)) {
                                    return { ...prevState, ticketData: response.response }
                                }
                            })
                        }
                    })
            }
        }
    }

    closeModal = () => {
        this.setState({ open: false });
        this.props.history.push(this.props.history.location.pathname)
        this.props.setState({ bokingResponse: null })
    }

    render() {

        // if(this.props.bokingResponse)

        if (this.props.bokingResponse) {
            let ticket = this.props.bokingResponse;
            let betData = ticket.bets.betWS[0]
            let betType;
            let tickets = betData.bankTips.tipWS
            switch (betData.betType) {
                case 'sng':
                    betType = 'Single'
                    break;
                case 'cmb':
                    betType = 'Combo'
                    break;
                case 'sys':
                    betType = 'System'
                    break;
                default:
                    break;
            }
            return (
                <Fragment>
                    <Dialog
                        classes={{ paper: this.props.classes.drawerPaper }}
                        fullScreen
                        open={this.state.open}
                        onClose={this.closeModal}
                        scroll="body"
                    // TransitionComponent={Transition}
                    >
                        <div className="reveal"
                            style={{
                                top: 0 + 'px !important',
                                display: 'block',
                                border: 0,
                                borderColor: '#333',
                                width: '100%',
                                height: 'auto',
                                padding: 15,
                                background: '#2a2b3a'
                            }}
                        >
                            {/* overflowY: 'auto', */}
                            <button className="close-button" aria-label="Close" type="button" onClick={this.closeModal}>
                                <span>&times;</span>
                            </button>

                            <div className="mybet__header">
                                <div className="cell">
                                    <br /> Ticket number: {ticket.ticketNbr}
                                </div>
                                <div className="cell">
                                    Accepted at: {new Date(ticket.acceptedTime).toLocaleString()}
                                    <br /> Paid out at: {ticket.paid ? 'paid' : 'not paid'}
                                </div>
                            </div>

                            <table className="mybets__responsive-table" style={{ "marginBottom": "30px" }}>
                                <thead>
                                    <tr>
                                        <th>Total stake</th>
                                        <th>Rows</th>
                                        <th>Ticket type</th>
                                        <th>Possible win</th>
                                        <th>Payment amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-label="Total stake">{ticket.stake}</td>
                                        <td data-label="Rows">{betData.rows}</td>
                                        <td data-label="Ticket type">{betType}</td>
                                        <td data-label="Possible win">{betData.maxWin}</td>
                                        <td data-label="Payment amount">{ticket.wonAmount}</td>
                                    </tr>
                                </tbody>
                            </table>




                            <table className="mybets__responsive-table">
                                <thead>
                                    <tr>
                                        <th>State</th>
                                        <th>Date</th>
                                        <th>Event name</th>
                                        <th>Result</th>
                                        <th>Market</th>
                                        <th>Outcame</th>
                                        <th>Odds</th>
                                        <th>Correct outcome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((e, index) => {
                                        let status
                                        if (!e.calculated) {
                                            status = 'Opened'
                                        }
                                        else if (e.won) {
                                            status = 'Won'
                                        }
                                        else {
                                            status = 'Lost'
                                        }
                                        return <tr key={index}>
                                            <td data-label="State">{status}</td>
                                            <td data-label="Date">5/10/2018, 7:09 PM</td>
                                            <td data-label="Event name">{e.tipDetailsWS.eventName}</td>
                                            <td data-label="Result">{e.tipDetailsWS.result ? e.tipDetailsWS.result : ' '}</td>
                                            <td data-label="Market">{e.tipDetailsWS.betDomainName}</td>
                                            <td data-label="Outcame">{e.tipDetailsWS.tip}</td>
                                            <td data-label="Odds">{e.odd}</td>
                                            <td data-label="Correct outcome">{e.tipDetailsWS.winnerTip}</td>
                                        </tr>
                                    }
                                    )}
                                </tbody>
                            </table>

                            {
                                (this.props.bokingResponse.bets.betWS[0].bankTips.tipWS.every((e) => e.tipDetailsWS.marketStatus === 0))
                                &&
                                <div className="rebet_wp">
                                    <div className="button rebet" onClick={() => this.props.rebet()}>Rebet</div>
                                </div>
                            }
                        </div>
                    </Dialog>
                </Fragment>
            );
        }
        else
            return null
    }
}

export default withRouter(withStyles(styles)(MyBetsModal));