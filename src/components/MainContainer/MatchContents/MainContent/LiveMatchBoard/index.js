import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class LiveMatchBoard extends Component {
    render() {
        return (
            <div class="page-grid__item main scroll">
                <Scrollbars
                    renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                    renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                    renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4 }} className="view" />}
                    hideTracksWhenNotNeeded={true}
                >

                    <div className="sportmenu--live">
                        <ul className="sportmenu-list--live">
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="all_sports"></i>
                                    <span className="title" title="All Sports">All Sports</span>
                                    <span className="count">71</span>
                                </a>
                            </li>
                            <li className="tab active">
                                <a className="sportmenu--live__item">
                                    <i className="soccer"></i>
                                    <span className="title" title="Soccer">Soccer</span>
                                    <span className="count">6</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="american_football"></i>
                                    <span className="title" title="American football">American football</span>
                                    <span className="count">8</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="baseball"></i>
                                    <span className="title" title="Baseball">Baseball</span>
                                    <span className="count">23</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="basketball"></i>
                                    <span className="title" title="Basketball">Basketball</span>
                                    <span className="count">12</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="darts"></i>
                                    <span className="title" title="Darts">Darts</span>
                                    <span className="count">4</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="handball"></i>
                                    <span className="title" title="Handball">Handball</span>
                                    <span className="count">32</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="ice_hockey"></i>
                                    <span className="title" title="Ice hockey">Ice hockey</span>
                                    <span className="count">31</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="rugby"></i>
                                    <span className="title" title="Rugby">Rugby</span>
                                    <span className="count">12</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="snooker"></i>
                                    <span className="title" title="Snooker">Snooker</span>
                                    <span className="count">4</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="tennis"></i>
                                    <span className="title" title="Tennis">Tennis</span>
                                    <span className="count">6</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="volleyball"></i>
                                    <span className="title" title="Volleyball">Volleyball</span>
                                    <span className="count">8</span>
                                </a>
                            </li>
                            <li className="tab">
                                <a className="sportmenu--live__item">
                                    <i className="motorsport"></i>
                                    <span className="title" title="Motorsport">Motorsport</span>
                                    <span className="count">23</span>
                                </a>
                            </li>
                        </ul>
                        <div className="sub-tabs--live">
                            <div className="item active">International</div>
                            <div className="item">Iceland</div>
                            <div className="item">Italy</div>
                            <div className="item">Oman</div>
                        </div>
                    </div>


                    <section>
                        <div className="category-live__container">
                            <div className="tournament-group__header cp scroll-watcher" data-toggle="odd-group-382 colps1">
                                <div className="tournament__title soccer">
                                    <i className="cell icon-cell soccer"></i>
                                    <div className="cell title-cell">SOCCER</div>
                                    <div className="cell controls-cell">
                                        <div className="count">1</div>
                                        <div className="hide-block live icon-cell" id="colps1" data-toggler=".expanded" title="Show/Hide"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="odd-group-382" data-toggler=".collapse-tournaments">
                                <div className="tournament-group-name__container">
                                    <div className="tournament-live-group-name">
                                        <i className="tournament-live__icon"></i>
                                        Primera Division, Apertura</div>
                                </div>
                                <div className="sport-table live-table">
                                    <div className="live-event-details__wrap">
                                        <div className="coll-s">

                                            <div className="match-info">
                                                <div className="cell-left">
                                                    <div className="match-info__wrap">
                                                        <div className="match-info__time red">
                                                            <span>Set Started</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="cell-right">

                                                    <div className="scoreboard__table">
                                                        <div className="scoreboard__row--team">
                                                            <div className="scoreboard__item scoreboard__item--team">
                                                                <div className="scoreboard__item--team--name" title="France">France</div>
                                                                <div className="scoreboard__item--team--cards">
                                                                    <div className="red-card"></div>
                                                                    <div className="yellow-card"></div>
                                                                </div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--total">
                                                                <div>15</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>2</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>3</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                        <div className="scoreboard__row--team">
                                                            <div className="scoreboard__item scoreboard__item--team">
                                                                <div className="scoreboard__item--team--name" title="New Zealand">New Zealand</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--total">
                                                                <div>15</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>2</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>3</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--set">
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="coll-a">

                                            <div className="row head">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">Which team will win the match, including overtime?</div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">Total for whole Match, including overtime (169.5)</div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">Total for period 2 (37.5)</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row subhead">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">1</div>
                                                                <div className="cell">2</div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">UNDER</div>
                                                                <div className="cell">OVER</div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">UNDER</div>
                                                                <div className="cell">OVER</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row odds">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group" group-label="Which team will win the match, including overtime?">
                                                            <div className="market-odds">
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="1">
                                                                        <span className="odd--up">2.85</span>
                                                                    </div>

                                                                </div>
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="2">
                                                                        <span>1.12</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group" group-label="Total for whole Match, including overtime (169.5)">
                                                            <div className="market-odds">
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="UNDER">
                                                                        <span className="odd--down">1.12</span>
                                                                    </div>
                                                                </div>
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="OVER">
                                                                        <span>2.85</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group" group-label="Total for period 2 (37.5)">
                                                            <div className="market-odds">
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="UNDER">
                                                                        <span className="odd--down">1.12</span>
                                                                    </div>
                                                                </div>
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="OVER">
                                                                        <span>2.85</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="cell-s go-to-all-markets">
                                            <div className="go-to-all-markets__button active">
                                                <span className="hide-for-large">Show more</span>
                                                +85
                        </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="category-live__container">
                            <div className="tournament-group__header cp scroll-watcher" data-toggle="odd-group-383 colps2">
                                <div className="tournament__title rugby">
                                    <i className="cell icon-cell rugby"></i>
                                    <div className="cell title-cell">
                                        RUGBY
                </div>
                                    <div className="cell controls-cell">
                                        <div className="count">2</div>
                                        <div className="hide-block live icon-cell" id="colps2" data-toggler=".expanded" title="Show/Hide"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="odd-group-383" data-toggler=".collapse-tournaments">
                                <div className="tournament-group-name__container">
                                    <div className="tournament-live-group-name">
                                        <i className="tournament-live__icon"></i>
                                        International Friendlies</div>
                                </div>
                                <div className="sport-table live-table">
                                    <div className="live-event-details__wrap">
                                        <div className="coll-s">

                                            <div className="match-info">
                                                <div className="cell-left">
                                                    <div className="match-info__wrap">
                                                        <div className="match-info__time green">
                                                            <span>3 min</span>
                                                            <span>1st Period</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="cell-space">
                                                </div>
                                                <div className="cell-right">
                                                    <div className="scoreboard__table">
                                                        <div className="scoreboard__row--team">
                                                            <div className="scoreboard__item scoreboard__item--team">
                                                                <div className="scoreboard__item--team--name" title="France">France</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--total">
                                                                <div>15</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>2</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>3</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                        <div className="scoreboard__row--team">
                                                            <div className="scoreboard__item scoreboard__item--team">
                                                                <div className="scoreboard__item--team--name" title="New Zealand">New Zealand</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--total">
                                                                <div>15</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>2</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>3</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                        <div className="coll-a">



                                            <div className="row head">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">Both halves over&nbsp;1.5</div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">Both halves under&nbsp;1.5</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row subhead">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">YES</div>
                                                                <div className="cell">NO</div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">YES</div>
                                                                <div className="cell">NO</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row odds">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group" group-label="BOTH HALVES OVER 1.5">
                                                            <div className="market-odds">
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="YES">
                                                                        <span className="odd--up">2.85</span>
                                                                    </div>

                                                                </div>
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="NO">
                                                                        <span>1.12</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group" group-label="BOTH HALVES UNDER 1.5">
                                                            <div className="market-odds">
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="YES">
                                                                        <span className="odd--down">1.12</span>
                                                                    </div>
                                                                </div>
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="NO">
                                                                        <span>2.85</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="cell-s go-to-all-markets">
                                            <div className="go-to-all-markets__button active">
                                                <span className="hide-for-large">Show more</span>
                                                +65
                        </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="tournament-group-name__container">
                                    <div className="tournament-live-group-name">
                                        <i className="tournament-live__icon"></i>
                                        International Friendlies</div>
                                </div>
                                <div className="sport-table live-table">
                                    <div className="live-event-details__wrap">
                                        <div className="coll-s">

                                            <div className="match-info">
                                                <div className="cell-left">
                                                    <div className="match-info__wrap">
                                                        <div className="match-info__time green">
                                                            <span>3 min</span>
                                                            <span>1st Period</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="cell-space">
                                                </div>
                                                <div className="cell-right">

                                                    <div className="scoreboard__table">
                                                        <div className="scoreboard__row--team">
                                                            <div className="scoreboard__item scoreboard__item--team">
                                                                <div className="scoreboard__item--team--name" title="France">France</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--total">
                                                                <div>15</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>2</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>3</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                        <div className="scoreboard__row--team">
                                                            <div className="scoreboard__item scoreboard__item--team">
                                                                <div className="scoreboard__item--team--name" title="New Zealand">New Zealand</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item--total">
                                                                <div>15</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>2</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>3</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>4</div>
                                                            </div>
                                                            <div className="scoreboard__item scoreboard__item-set">
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                        <div className="coll-a">



                                            <div className="row head">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">Both halves over&nbsp;1.5</div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">Both halves under&nbsp;1.5</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row subhead">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">YES</div>
                                                                <div className="cell">NO</div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group">
                                                            <div className="market-odds">
                                                                <div className="cell">YES</div>
                                                                <div className="cell">NO</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row odds">
                                                <div className="cell-a match-specialoddvalue-value">
                                                    <div>
                                                        <div className="match-group" group-label="BOTH HALVES OVER 1.5">
                                                            <div className="market-odds">
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="YES">
                                                                        <span className="odd--up">2.85</span>
                                                                    </div>

                                                                </div>
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="NO">
                                                                        <span>1.12</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="match-group" group-label="BOTH HALVES UNDER 1.5">
                                                            <div className="market-odds">
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="YES">
                                                                        <span className="odd--down">1.12</span>
                                                                    </div>
                                                                </div>
                                                                <div className="cell">
                                                                    <div className="specialoddvalue-text" data-oddtag="NO">
                                                                        <span>2.85</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="cell-s go-to-all-markets">
                                            <div className="go-to-all-markets__button active">
                                                <span className="hide-for-large">Show more</span>
                                                +65
                        </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="starting-soon__header">
                        <i className="starting-soon__icon"></i>
                        <div className="starting-soon__title">Starting soon</div>
                    </div>


                    <section>
                        <div className="category-live__container">
                            <div className="tournament-group__header cp scroll-watcher" data-toggle="odd-group-384 colps3">
                                <div className="tournament__title soccer">
                                    <i className="cell icon-cell soccer"></i>
                                    <div className="cell title-cell">SOCCER</div>
                                    <div className="cell controls-cell">
                                        <div className="count">1</div>
                                        <div className="hide-block live icon-cell" id="colps3" data-toggler=".expanded" title="Show/Hide"></div>
                                    </div>
                                </div>
                            </div>

                            <div id="odd-group-384" data-toggler=".collapse-tournaments">
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
                                                        <div className="cell">Match Bet</div>
                                                    </div>
                                                </div>
                                                <div className="match-group">
                                                    <div className="market-odds">
                                                        <div className="cell">Draw No Bet</div>
                                                    </div>
                                                </div>
                                                <div className="match-group">
                                                    <div className="market-odds">
                                                        <div className="cell">Double Chance</div>
                                                    </div>
                                                </div>
                                                <div className="match-group">
                                                    <div className="market-odds">
                                                        <div className="cell">Total (2.5)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cell-s go-to-all-markets">
                                            <div></div>
                                        </div>
                                    </div>

                                    <div className="row subhead">
                                        <div className="cell-s match-start-time-value live-time__title">
                                            <div>TIME</div>
                                        </div>
                                        <div className="cell-s match-team-value">
                                            <div>TABLE EVENTS</div>
                                        </div>
                                        <div className="cell-a match-specialoddvalue-value">
                                            <div>
                                                <div className="match-group" group-label="Match Bet">
                                                    <div className="market-odds">
                                                        <div className="cell">1</div>
                                                        <div className="cell">X</div>
                                                        <div className="cell">2</div>
                                                    </div>
                                                </div>
                                                <div className="match-group" group-label="Draw No Bet">
                                                    <div className="market-odds">
                                                        <div className="cell">1</div>
                                                        <div className="cell">2</div>
                                                    </div>
                                                </div>
                                                <div className="match-group" group-label="Double Chance">
                                                    <div className="market-odds">
                                                        <div className="cell">1</div>
                                                        <div className="cell">X</div>
                                                        <div className="cell">2</div>
                                                    </div>
                                                </div>
                                                <div className="match-group" group-label="Total (2.5)">
                                                    <div className="market-odds">
                                                        <div className="cell">1</div>
                                                        <div className="cell">2</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cell-s go-to-all-markets">
                                            <div></div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="cell-s match-start-time-value live-time">
                                            <div>Starting in 35mins</div>
                                        </div>
                                        <div className="cell-s match-team-value">
                                            <div>USM EL Harrach - JS Saoura</div>
                                        </div>
                                        <div className="cell-a match-specialoddvalue-value">
                                            <div>
                                                <div className="match-group" group-label="Match Bet">
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
                                                <div className="match-group" group-label="Draw No Bet">
                                                    <div className="market-odds">
                                                        <div className="cell">
                                                            <div className="specialoddvalue-text" data-oddtag="1">2.85</div>
                                                        </div>
                                                        <div className="cell">
                                                            <div className="specialoddvalue-text" data-oddtag="2">3.46</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="match-group" group-label="Double Chance">
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
                                                <div className="match-group" group-label="Draw No Bet">
                                                    <div className="market-odds">
                                                        <div className="cell">
                                                            <div className="specialoddvalue-text" data-oddtag="1">2.85</div>
                                                        </div>
                                                        <div className="cell">
                                                            <div className="specialoddvalue-text" data-oddtag="2">3.46</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cell-s go-to-all-markets">
                                            <div className="go-to-all-markets__button">+85</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </Scrollbars>
            </div>
        );
    }
}

export default LiveMatchBoard;