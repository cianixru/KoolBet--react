import React, { Component } from 'react';

class SportTablesMainExtended extends Component {
    render() {
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">Main Extended</div>
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
                                        <div className="cell">Goal both teams</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Who scores first</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">Highest Scoring Half</div>
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
                                <div className="match-group" group-label="Goal both teams">
                                    <div className="market-odds">
                                        <div className="cell">YES</div>
                                        <div className="cell">NO</div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="Who scores first">
                                    <div className="market-odds">
                                        <div className="cell">1</div>
                                        <div className="cell">X</div>
                                        <div className="cell">2</div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="Total (2.5)">
                                    <div className="market-odds">
                                        <div className="cell">1ST HALF</div>
                                        <div className="cell">EQUAL</div>
                                        <div className="cell">2ND HALF</div>
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
                                <div className="match-group" group-label="Goal both teams">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1">22.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="Who scores first">
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
                                <div className="match-group" group-label="Highest Scoring Half">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text btn-active" data-oddtag="1">88.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2">3.46</div>
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

export default SportTablesMainExtended;