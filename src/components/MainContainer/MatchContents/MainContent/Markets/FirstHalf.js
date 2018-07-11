import React, { Component } from 'react';

class FirstHalf extends Component {
    render() {
        return (
            <section>
                <div class="tournament-group-name__container">
                    <div class="tournament-group-name">1st Half</div>
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
                                        <div class="cell">1HT Draw no Bet</div>
                                    </div>
                                </div>
                                <div class="match-group">
                                    <div class="market-odds">
                                        <div class="cell">1HT Handicap (0:1)</div>
                                    </div>
                                </div>
                                <div class="match-group">
                                    <div class="market-odds">
                                        <div class="cell">1HT Double Chance</div>
                                    </div>
                                </div>
                                <div class="match-group">
                                    <div class="market-odds">
                                        <div class="cell">Who wins 1st half?</div>
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
                                <div class="match-group" group-label="1HT Draw no Bet">
                                    <div class="market-odds">
                                        <div class="cell">1</div>
                                        <div class="cell">2</div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="1HT Handicap (0:1)">
                                    <div class="market-odds">
                                        <div class="cell">1</div>
                                        <div class="cell">X</div>
                                        <div class="cell">2</div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="1HT Double Chance">
                                    <div class="market-odds">
                                        <div class="cell">1X</div>
                                        <div class="cell">12</div>
                                        <div class="cell">X2</div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="Who wins 1st half?">
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
                                <div class="match-group" group-label="1HT DRAW NO BET">
                                    <div class="market-odds">
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1">22.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="1HT HANDICAP (0:1)">
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
                                <div class="match-group" group-label="1HT DOUBLE CHANCE">
                                    <div class="market-odds">
                                        <div class="cell">
                                        </div>
                                        <div class="cell">

                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="WHO WINS 1ST HALF?">
                                    <div class="market-odds">
                                        <div class="cell">
                                            <div class="specialoddvalue-text btn-active" data-oddtag="1">42.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X">3.46</div>
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

export default FirstHalf;