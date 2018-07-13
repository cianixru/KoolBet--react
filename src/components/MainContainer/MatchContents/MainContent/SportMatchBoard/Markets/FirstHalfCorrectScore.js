import React, { Component } from 'react';

class FirstHalfCorrectScore extends Component {
    render() {
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">1st Half Correct Score</div>
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
                                        <div className="cell">1HT Correct Score</div>
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
                                <div className="match-group" group-label="1HT Correct Score">
                                    <div className="market-odds">
                                        <div className="cell">1:0</div>
                                        <div className="cell">0:0</div>
                                        <div className="cell">0:1</div>
                                        <div className="cell">2:1</div>
                                        <div className="cell">1:1</div>
                                        <div className="cell">1:2</div>
                                        <div className="cell">2:0</div>
                                        <div className="cell">2:2</div>
                                        <div className="cell">0:2</div>
                                        <div className="cell">Other</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cell-s go-to-all-markets">
                            <div></div>
                        </div>
                    </div>
                    <div className="row date">
                        <div className="date-value">May 25th</div>
                    </div>
                    <div className="row">
                        <div className="cell-s match-start-time-value">
                            <div>11:00 PM</div>
                        </div>
                        <div className="cell-s match-team-value">
                            <div>FC LORI VANADZOR - Gandzasar Kapan FC 2</div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                <div className="match-group" group-label="Who scores first">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1:0">3.26</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="0:0">3.46</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="0:1">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2:1">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1:1">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1:2">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2:0">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2:2">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="0:2">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="Other">5.27</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cell-s go-to-all-markets">
                            <div className="go-to-all-markets__button active">+79</div>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}

export default FirstHalfCorrectScore;