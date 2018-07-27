import React, { Component } from 'react';

class HtHalves extends Component {
    render() {
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">Home Team Halves</div>
                </div>

                <div className="sport-table x-size">
                    <div className="row head">
                        <div className="cell-s match-start-time-value">
                            <div></div>
                        </div>
                        <div className="cell-s match-team-value">
                            <div></div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Highest scoring half, home team</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Home team clean sheet, 1HT</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Home team clean sheet, 2HT</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Home team score both halves</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Home team win both halves</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Home team win either half</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Home team Under/Over (0.5), 2HT</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Home team Under/Over (1.5), 2HT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cell-s go-to-all-markets">
                            <div></div>
                        </div>
                    </div>

                    <div className="row subhead">
                        <div className="cell-s match-start-time-value">
                            <div>TIME</div>
                        </div>
                        <div className="cell-s match-team-value">
                            <div>TABLE EVENTS</div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">1ST</div>
                                        <div className="cell">2ND</div>
                                        <div className="cell" title="EQUAL">EQ</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">YES</div>
                                        <div className="cell">NO</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">YES</div>
                                        <div className="cell">NO</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">YES</div>
                                        <div className="cell">NO</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">YES</div>
                                        <div className="cell">NO</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">YES</div>
                                        <div className="cell">NO</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">UNDER</div>
                                        <div className="cell">OVER</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">UNDER</div>
                                        <div className="cell">OVER</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cell-s go-to-all-markets">
                            <div></div>
                        </div>
                    </div>

                    <div className="row date">
                        <div className="date-value">MAY 19TH</div>
                    </div>

                    <div className="row">
                        <div className="cell-s match-start-time-value">
                            <div>6:00 PM</div>
                        </div>
                        <div className="cell-s match-team-value">
                            <div>USM EL Harrach - JS Saoura</div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                <div className="match-group" group-label="HIGHEST SCORING HALF, HOME TEAM">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="YES">3.46</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="YES">3.46</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="NO">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="HOME TEAM CLEAN SHEET, 1HT">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="YES">2.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="NO">3.46</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="HOME TEAM CLEAN SHEET, 2HT">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="UNDER">3.46</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="OVER">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="HOME TEAM SCORE BOTH HALVES">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="UNDER">88.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="OVER">3.46</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="HOME TEAM WIN BOTH HALVES">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="UNDER">8.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="OVER">3.46</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="HOME TEAM WIN EITHER HALF">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="UNDER">8.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="OVER">3.46</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="HOME TEAM UNDER/OVER (0.5), 2HT">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="UNDER">8.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="OVER">3.46</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="HOME TEAM UNDER/OVER (1.5), 2HT">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="UNDER">88.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="OVER">3.46</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cell-s go-to-all-markets">
                            <div className="go-to-all-markets__button active">+85</div>
                        </div>
                    </div>


                </div>
            </section>
        );
    }
}

export default HtHalves;