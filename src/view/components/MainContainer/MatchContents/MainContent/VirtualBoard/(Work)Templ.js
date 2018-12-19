import React, { Component, Fragment } from 'react';
import {FormattedMessage} from "react-intl";

class Win extends Component {
    render() {
        return (
            <Fragment>
                <div className="race-bet__table " key={index}>
                    <div className="row head">
                        <div className="a cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.WorkTempl.Horse" defaultMessage="Horse"/></div>
                        </div>
                        <div className="cell place__cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.WorkTempl.1st" defaultMessage="1st"/></div>
                        </div>
                    </div>

                    {val.odds.map((e, index) => {

                        return (
                            <div className="row" key={index}>
                                <div className="a cell team--details__cell">
                                    <div className="number">10</div>
                                    {/* <div className="silk">
                                                            <img src="http://demo.playbetman.com/Content/Images/HorseSilks/silk_02.png" alt="Silk" />
                                                        </div> */}
                                    <div className="team--name">
                                        <div className="name"><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.WorkTempl.FirstBase" defaultMessage="First Base"/></div>
                                    </div>
                                </div>
                                <div className="cell place__cell">
                                    <div className="button-bet">
                                        <div className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === e.oddId)) ? 'btn-active' : '')}
                                            data-oddtag="1st"
                                            onClick={() => this.props.handleOddClick(e.oddId, val.betDomainId, this.props.matchData.matchId)}
                                        >
                                            {e.value}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="cell place__cell">
                                                <div className="button-bet">
                                                    <div className="specialoddvalue-text btn-unavailable" data-oddtag="2nd"></div>
                                                </div>
                                            </div>
                                            <div className="cell place__cell">
                                                <div className="button-bet">
                                                    <div className="specialoddvalue-text btn-unavailable" data-oddtag="3rd"></div>
                                                </div>
                                            </div>
                                            <div className="cell place__cell">
                                                <div className="button-bet">
                                                    <div className="specialoddvalue-text btn-unavailable">Any</div>
                                                </div>
                                            </div> */}
                            </div>
                        )
                    })}


                </div>
            </Fragment>
        );
    }
}

export default Win;