import React, { Component } from 'react';

class ExactGoals extends Component {
    render() {
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">Exact number of goals</div>
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
                                        <div className="cell">Total Goals</div>
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
                                <div className="match-group" group-label="Who scores first">
                                    <div className="market-odds">
                                        <div className="cell">0</div>
                                        <div className="cell">1</div>
                                        <div className="cell">2</div>
                                        <div className="cell">3</div>
                                        <div className="cell">4</div>
                                        <div className="cell">5</div>
                                        <div className="cell">6+</div>
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
                            <div>CA Brown de Adrogue - CA Sarmiento</div>
                        </div>
                        <div className="cell-a match-specialoddvalue-value">
                            <div>
                                <div className="match-group" group-label="Who scores first">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="0">2.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1">3.46</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="3">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="4">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="5">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="6+">2.13</div>
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

export default ExactGoals;