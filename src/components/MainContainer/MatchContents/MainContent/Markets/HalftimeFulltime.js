import React, { Component } from 'react';

class HalftimeFulltime extends Component {
    render() {
        return (
            <section>
                <div class="tournament-group-name__container">
                    <div class="tournament-group-name">Halftime / Fulltime</div>
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
                                        <div class="cell">Halftime/Fulltime</div>
                                    </div>
                                </div>
                                <div class="match-group">
                                    <div class="market-odds">
                                        <div class="cell">1st Team to score / Matchbet</div>
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
                                <div class="match-group" group-label="Halftime/Fulltime">
                                    <div class="market-odds">
                                        <div class="cell">1+1</div>
                                        <div class="cell">1+X</div>
                                        <div class="cell">1+2</div>
                                        <div class="cell">X+1</div>
                                        <div class="cell">X+X</div>
                                        <div class="cell">X+2</div>
                                        <div class="cell">2+1</div>
                                        <div class="cell">2+X</div>
                                        <div class="cell">2+2</div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="1st Team to score / Matchbet">
                                    <div class="market-odds">
                                        <div class="cell">1 / 1</div>
                                        <div class="cell">1 / X</div>
                                        <div class="cell">1 / 2</div>
                                        <div class="cell">2 / 1</div>
                                        <div class="cell">2 / X</div>
                                        <div class="cell">2 / 2</div>
                                        <div class="cell">NO GOAL</div>
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
                                            <div class="specialoddvalue-text" data-oddtag="1+1">22.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1+X">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1+2">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X+1">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X+X">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="X+2">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2+1">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2+X">2.13</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2+2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="match-group" group-label="Who scores first">
                                    <div class="market-odds">
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1/1">2.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1/X">2.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="1/2">2.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2/1">2.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2/X">2.85</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="2/2">3.46</div>
                                        </div>
                                        <div class="cell">
                                            <div class="specialoddvalue-text" data-oddtag="NO GOAL">2.13</div>
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

export default HalftimeFulltime;