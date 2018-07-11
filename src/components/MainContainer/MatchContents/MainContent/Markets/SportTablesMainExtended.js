import React, { Component } from 'react';

class SportTablesMainExtended extends Component {
    render() {
        return (
            <section>
                <div class="tournament-group-name__container">
                    <div class="tournament-group-name">Main Extended</div>
                </div>

                <div class="sport-table">
                    <div class="row head">
                        <div class="cell-s match-start-time-value">
                            <div></div>
                        </div>
                        <div class="cell-s match-team-value">
                            <div></div>
                        </div>
                        <div class="cell-a match-specialoddvalue-value">
                            <div>
                                <div class="match-group">
                                    <div class="market-odds">
                                        <div class="cell">Goal both teams</div>
                                    </div>
                                </div>
                                <div class="match-group">
                                    <div class="market-odds">
                                        <div class="cell">Who scores first</div>
                                    </div>
                                </div>
                                <div class="match-group">
                                    <div class="market-odds">
                                        <div class="cell">Highest Scoring Half</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cell-s go-to-all-markets">
                            <div></div>
                        </div>
                    </div>

                    <div class="row subhead">
                        <div class="cell-s match-start-time-value">
                            <div>TIME</div>
                        </div>
                        <div class="cell-s match-team-value">
                            <div>TABLE EVENTS</div>
                        </div>
                        <div class="cell-a match-specialoddvalue-value">
                            <div>
                                <div class="match-group" group-label="Goal both teams">
                                    <div class="market-odds">
                                        <div class="cell">YES</div>
                                        <div class="cell">NO</div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="Who scores first">
                                    <div class="market-odds">
                                        <div class="cell">1</div>
                                        <div class="cell">X</div>
                                        <div class="cell">2</div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="Total (2.5)">
                                    <div class="market-odds">
                                        <div class="cell">1ST HALF</div>
                                        <div class="cell">EQUAL</div>
                                        <div class="cell">2ND HALF</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cell-s go-to-all-markets">
                            <div></div>
                        </div>
                    </div>
                    <div class="row date">
                        <div class="date-value">MAY 19TH</div>
                    </div>
                    <div class="row">
                        <div class="cell-s match-start-time-value">
                            <div>6:00 PM</div>
                        </div>
                        <div class="cell-s match-team-value">
                            <div>USM EL Harrach - JS Saoura</div>
                        </div>
                        <div class="cell-a match-specialoddvalue-value">
                            <div>
                                <div class="match-group" group-label="Goal both teams">
                                    <div class="market-odds">
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1">22.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="Who scores first">
                                    <div class="market-odds">
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1">2.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X">3.46</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="Highest Scoring Half">
                                    <div class="market-odds">
                                        <div class="cell">
                                            <div class="specialoddvalue-text btn-active" data-oddtag="1">88.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2">3.46</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2">3.46</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cell-s go-to-all-markets">
                            <div class="go-to-all-markets__button active">+85</div>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}

export default SportTablesMainExtended;