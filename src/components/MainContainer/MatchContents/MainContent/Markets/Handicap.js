import React, { Component } from 'react';

class Handicap extends Component {
    render() {
        return (
            <section>
                <div class="tournament-group-name__container">
                    <div class="tournament-group-name">Handicap</div>
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
                                        <div class="cell">Handicap (0:1)</div>
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
                                <div class="match-group" group-label="Who scores first">
                                    <div class="market-odds">
                                        <div class="cell">1</div>
                                        <div class="cell">X</div>
                                        <div class="cell">2</div>
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

export default Handicap;