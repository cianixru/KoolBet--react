import React, { Component } from 'react';

class FirstHalf extends Component {
    render() {
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">1st Half</div>
                </div>

                <div className="sport-table">
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
                                        <div className="cell">1HT Draw no Bet</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">1HT Handicap (0:1)</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">1HT Double Chance</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Who wins 1st half?</div>
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
                                <div className="match-group" group-label="1HT Draw no Bet">
                                    <div className="market-odds">
                                        <div className="cell">1</div>
                                        <div className="cell">2</div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="1HT Handicap (0:1)">
                                    <div className="market-odds">
                                        <div className="cell">1</div>
                                        <div className="cell">X</div>
                                        <div className="cell">2</div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="1HT Double Chance">
                                    <div className="market-odds">
                                        <div className="cell">1X</div>
                                        <div className="cell">12</div>
                                        <div className="cell">X2</div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="Who wins 1st half?">
                                    <div className="market-odds">
                                        <div className="cell">1</div>
                                        <div className="cell">X</div>
                                        <div className="cell">2</div>
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
                                <div className="match-group" group-label="1HT DRAW NO BET">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1">22.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="1HT HANDICAP (0:1)">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1">2.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X">3.46</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="1HT DOUBLE CHANCE">
                                    <div className="market-odds">
                                        <div className="cell">
                                        </div>
                                        <div className="cell">

                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="WHO WINS 1ST HALF?">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text btn-active" data-oddtag="1">42.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X">3.46</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2">3.46</div>
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

export default FirstHalf;