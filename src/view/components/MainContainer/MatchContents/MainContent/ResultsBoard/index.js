import React, { Component, Fragment } from 'react';

import FilterBar from './FilterBar';

class ResultsBoard extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="sport-header results">Results</h1>
                <FilterBar />

                <div className="results">
                    <div className="result__item">
                        <div className="result__group">
                            <h3 className="date">Monday, June 18, 2018</h3>
                            <div className="league">
                                <div className="cell">
                                    <i className="soccer league__icon"></i>
                                    Brasileiro Serie C, Group A
                                </div>
                                <div className="cell">
                                    Result
                                </div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:0</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:0</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:0</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:0</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:0</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:0</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">4:0 (2:0)</div>
                            </div>
                            <div className="league">
                                <div className="cell">
                                    <i className="volleyball league__icon"></i>
                                    Brasileiro Serie C, Group A
                                </div>
                                <div className="cell">
                                    Result
                                </div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:1 (1:0-0:1)</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:1 (1:0-0:1)</div>
                            </div>
                        </div>
                    </div>


                    <div className="result__item">
                        <div className="result__group">
                            <h3 className="date">Monday, June 18, 2018</h3>
                            <div className="league">
                                <div className="cell">
                                    <i className="soccer league__icon"></i>
                                    Brasileiro Serie C, Group A
                                </div>
                                <div className="cell">
                                    Result
                                </div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s  score">1:1 (1:0-0:1)</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s  score">1:1 (1:0-0:1)</div>
                            </div>
                            <div className="league">
                                <div className="cell">
                                    <i className="soccer league__icon"></i>
                                    Brasileiro Serie C, Group A
                                </div>
                                <div className="cell">
                                    Result
                                </div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:0</div>
                            </div>
                            <div className="event__row">
                                <div className="time">3:45 AM</div>
                                <div className="a">Sampaio Correa MA - ABC RN</div>
                                <div className="s score">1:0</div>
                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}

export default ResultsBoard;