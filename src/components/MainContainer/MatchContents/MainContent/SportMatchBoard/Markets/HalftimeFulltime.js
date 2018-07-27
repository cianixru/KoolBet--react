import React, { Component } from 'react';

class HalftimeFulltime extends Component {
    render() {
        return (
            <section>
                <div className="tournament-group-name__container">
                    <div className="tournament-group-name">Halftime / Fulltime</div>
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
                                        <div className="cell">Halftime/Fulltime</div>
                                    </div>
                                </div>
                                <div className="match-group">
                                    <div className="market-odds">
                                        <div className="cell">1st Team to score / Matchbet</div>
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
                                <div className="match-group" group-label="Halftime/Fulltime">
                                    <div className="market-odds">
                                        <div className="cell">1+1</div>
                                        <div className="cell">1+X</div>
                                        <div className="cell">1+2</div>
                                        <div className="cell">X+1</div>
                                        <div className="cell">X+X</div>
                                        <div className="cell">X+2</div>
                                        <div className="cell">2+1</div>
                                        <div className="cell">2+X</div>
                                        <div className="cell">2+2</div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="1st Team to score / Matchbet">
                                    <div className="market-odds">
                                        <div className="cell">1 / 1</div>
                                        <div className="cell">1 / X</div>
                                        <div className="cell">1 / 2</div>
                                        <div className="cell">2 / 1</div>
                                        <div className="cell">2 / X</div>
                                        <div className="cell">2 / 2</div>
                                        <div className="cell">NO GOAL</div>
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
                                            <div className="specialoddvalue-text" data-oddtag="1+1">22.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1+X">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1+2">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X+1">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X+X">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="X+2">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2+1">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2+X">2.13</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2+2">2.13</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="match-group" group-label="Who scores first">
                                    <div className="market-odds">
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1/1">2.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1/X">2.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="1/2">2.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2/1">2.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2/X">2.85</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="2/2">3.46</div>
                                        </div>
                                        <div className="cell">
                                            <div className="specialoddvalue-text" data-oddtag="NO GOAL">2.13</div>
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

export default HalftimeFulltime;