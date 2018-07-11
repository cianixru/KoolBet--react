import React, { Component } from 'react';

class FirstHalfCombo extends Component {
    render() {
        return (
            <section>
                <div class="tournament-group-name__container">
                    <div class="tournament-group-name">1st Half Combo</div>
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
                                        <div class="cell">1HT Matchbet + Both Teams Score</div>
                                    </div>
                                </div>
                                <div class="match-group">
                                    <div class="market-odds">
                                        <div class="cell">1HT Matchbet + Total (1.5)</div>
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
                                <div class="match-group" group-label="1HT Matchbet + Both Teams Score">
                                    <div class="market-odds">
                                        <div class="cell">1/YES</div>
                                        <div class="cell">X/YES</div>
                                        <div class="cell">2/YES</div>
                                        <div class="cell">1/NO</div>
                                        <div class="cell">X/NO</div>
                                        <div class="cell">2/NO</div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="1HT Matchbet + Total (1.5)">
                                    <div class="market-odds">
                                        <div class="cell">1/UNDER</div>
                                        <div class="cell">X/UNDER</div>
                                        <div class="cell">2/UNDER</div>
                                        <div class="cell">1/OVER</div>
                                        <div class="cell">X/OVER</div>
                                        <div class="cell">2/OVER</div>
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
                            <div>16:00 PM</div>
                        </div>
                        <div class="cell-s match-team-value">
                            <div>FC LORI VANADZOR - Gandzasar Kapan FC 2</div>
                        </div>
                        <div class="cell-a match-specialoddvalue-value">
                            <div>
                                <div class="match-group" group-label="1HT Matchbet + Both Teams Score">
                                    <div class="market-odds">
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1/YES">22.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X/YES">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2/YES">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1/NO">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X/NO">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2/NO">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="1HT Matchbet + Total (1.5)">
                                    <div class="market-odds">
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1/UNDER">22.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X/UNDER">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2/UNDER">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1/OVER">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X/OVER">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2/OVER">2.13</div>
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

export default FirstHalfCombo;