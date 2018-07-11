import React from 'react';
import { connect } from "react-redux";

class CategoriesMenuLive extends React.Component {
    render() {
        return (
            <div class="categories-menu__container mini scroll" id="sportMenuContainer">
                <div class="categories-menu__inner">
                    <div class="header__sport-menu all-sport-menu" id="all-sport-menu">
                        <div class="sport-menu__title">Live</div>
                        <div class="sport-menu__collapse-mini" id="sportMenuMiniToggler"></div>
                    </div>

                    <ul class="sport-menu scroll-watcher">
                        <li>
                            <a class="sport-menu__item">
                                <i class="soccer"></i>
                                <span class="title" title="Soccer">Soccer</span>
                                <span class="count">85</span>
                            </a>
                            <ul class="sport-submenu__events-menu">
                                <li>
                                    <a class="icon active-tournament">
                                        <span class="title">Challenger</span>
                                        <span class="count">2</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="icon">
                                        <span class="title">Challenger</span>
                                        <span class="count">2</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="icon">
                                        <span class="title">Challenger</span>
                                        <span class="count">2</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="american_football"></i>
                                <span class="title">American football</span>
                                <span class="count">72</span>
                            </a>
                            <ul class="sport-submenu__events-menu">
                                <li>
                                    <a class="icon active-tournament">
                                        <span class="title">Brasileiro Serie B</span>
                                        <span class="count">2</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="icon">
                                        <span class="title">Brasileiro Serie B</span>
                                        <span class="count">2</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="icon">
                                        <span class="title">Brasileiro Serie B</span>
                                        <span class="count">2</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="baseball"></i>
                                <span class="title">Baseball</span>
                                <span class="count">11</span>
                            </a>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="basketball"></i>
                                <span class="title">Basketball</span>
                                <span class="count">2</span>
                            </a>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="darts"></i>
                                <span class="title">Darts</span>
                                <span class="count">3</span>
                            </a>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="handball"></i>
                                <span class="title">Handball</span>
                                <span class="count">15</span>
                            </a>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="ice_hockey"></i>
                                <span class="title">Ice hockey</span>
                                <span class="count">20</span>
                            </a>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="rugby"></i>
                                <span class="title">Rugby</span>
                                <span class="count">14</span>
                            </a>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="snooker"></i>
                                <span class="title">Snooker</span>
                                <span class="count">7</span>
                            </a>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="tennis"></i>
                                <span class="title">Tennis</span>
                                <span class="count">21</span>
                            </a>
                        </li>
                        <li>
                            <a class="sport-menu__item">
                                <i class="volleyball"></i>
                                <span class="title">Volleyball</span>
                                <span class="count">51</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            matchCategories: state.matchCategories,
            liveCategories: state.liveCategories,
            currentPage: state.currentPage,
            matchCategoriesSelected: state.matchCategoriesSelected,
        }
    }
}

export default connect(mapStateToProps)(CategoriesMenuLive)