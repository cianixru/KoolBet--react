import React, { PureComponent } from 'react';

import MyBetsModal from './MyBetsModal';
import { FormattedMessage } from 'react-intl';

class MyBetsCards extends PureComponent {
    state = {
        number: null,
        code: null,
    }

    showDetail = (number, code) => {
        this.setState({
            number: number,
            code: code,
        })
    }

    clearDetail = () => {
        this.setState({
            number: null,
            code: null,
        })
    }

    render() {
        //console.log(this.state);
        let data = this.props.tickets
        if (data && data.tickets)
            return (
                <div className="my-bets">
                    <div className="my-bets__title">
                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyBets.MyBetsCards.Caption" defaultMessage="Bets"/>
                    </div>
                    <div className="my-bets__cards">

                        {data.tickets.map((e, index) => {
                            if (e.ticketCategory.toLowerCase() === 'pendingforapproval')
                                e.ticketCategory = 'pending'

                            return <div onClick={() => this.showDetail(e.ticketNumber, e.checkSum)} key={index} className={"my-bets__item " + e.ticketCategory.toLowerCase()} data-open="exampleModal11">
                                <div className="ticket-number">
                                    <div className="ticket__label">
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyBets.MyBetsCards.Ticket.Label" defaultMessage="Ticket number"/>
                                </div>
                                    <div className="ticket-number__volue">
                                        {e.ticketNumber}
                                    </div>
                                </div>

                                <div className="last-date-list__wrapper">
                                    <div className="ticket__label">
                                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyBets.MyBetsCards.Ticket.Games.Title" defaultMessage="Games"/>:
                                </div>
                                    <ul className="last-date-list">
                                        <li>{new Date(e.createdAt).toLocaleString()}</li>
                                    </ul>
                                </div>
                                <div className="ticket-stake-info">
                                    <div className="ticket-odds">
                                        <div className="ticket__label">
                                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyBets.MyBetsCards.Ticket.Stake.Title" defaultMessage="Stake"/>
                                        </div>
                                        <div className="ticket-stake--volue">{e.totalStake}</div>
                                    </div>
                                    <div className="ticket-stake">
                                        <div className="ticket__label">
                                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyBets.MyBetsCards.Ticket.Odds.Title" defaultMessage="Odds"/>
                                        </div>
                                        <div className="ticket-stake--volue">{e.totalOdds}</div>
                                    </div>
                                </div>

                                <div className="ticket-detail">
                                    <div className={e.ticketCategory}>{e.ticketCategory}</div>
                                    <div className="detail-button">
                                        <span>
                                            <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyBets.MyBetsCards.Ticket.Detail.Title" defaultMessage="Detail"/>
                                        </span>
                                        <i className="detail-button__icon"></i>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    {(this.state.number && this.state.code) && <MyBetsModal number={this.state.number} code={this.state.code} close={this.clearDetail}/> }
                </div>
            );
        else return null
    }
}

export default MyBetsCards;