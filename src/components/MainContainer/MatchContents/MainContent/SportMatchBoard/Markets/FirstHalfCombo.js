import React, { Component } from 'react';

class FirstHalfCombo extends Component {
    render() {
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">1st Half Combo</div>
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
                                        <div className="cell">1HT Matchbet + Both Teams Score</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">1HT Matchbet + Total (1.5)</div>
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
                                <div className="match-group" group-label="1HT Matchbet + Both Teams Score">
                                    <div className="market-odds">
                                        <div className="cell">1/YES</div>
                                        <div className="cell">X/YES</div>
                                        <div className="cell">2/YES</div>
                                        <div className="cell">1/NO</div>
                                        <div className="cell">X/NO</div>
                                        <div className="cell">2/NO</div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="1HT Matchbet + Total (1.5)">
                                    <div className="market-odds">
                                        <div className="cell">1/UNDER</div>
                                        <div className="cell">X/UNDER</div>
                                        <div className="cell">2/UNDER</div>
                                        <div className="cell">1/OVER</div>
                                        <div className="cell">X/OVER</div>
                                        <div className="cell">2/OVER</div>
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
                            <div>16:00 PM</div>
                        </div>
                        <div className="cell-s match-team-value">
                            <div>FC LORI VANADZOR - Gandzasar Kapan FC 2</div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                <div className="match-group" group-label="1HT Matchbet + Both Teams Score">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1/YES">22.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X/YES">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2/YES">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1/NO">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X/NO">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2/NO">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="1HT Matchbet + Total (1.5)">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1/UNDER">22.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X/UNDER">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2/UNDER">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1/OVER">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X/OVER">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2/OVER">2.13</div>
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

export default FirstHalfCombo;