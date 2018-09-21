import React from 'react';
import { connect } from "react-redux";

class CategoriesMenuVirtual extends React.PureComponent {

    changeVGSport = (sport) => {
        if (sport != this.props.state.sportId)
            this.props.dispatch({ type: 'CLEAR_CURRENT_VIRTUAL_TOURNAMENT_DATA' })
        this.props.dispatch({ type: 'ADD_VIRTUAL_SPORT_ID', payload: sport })
    }

    render() {
        return (
            <div className="categories-menu__container mini scroll" id="sportMenuContainer">
                <div className="categories-menu__inner">
                    <div className="header__sport-menu all-sport-menu" id="all-sport-menu">
                        <div className="sport-menu__title">Virtual Games</div>
                        <div className="sport-menu__collapse-mini" id="sportMenuMiniToggler"></div>
                    </div>

                    <ul className="sport-menu scroll-watcher">
                        {Array.isArray(this.props.state.sportList) ?
                            this.props.state.sportList.map((e, index) => {
                                let curSport = e;
                                
                                return (
                                    <li key={index} onClick={() => this.changeVGSport(e)} className={(this.props.state.sportId == e) ? 'active' : ''}>
                                        <a className="sport-menu__item">
                                            <i className={curSport}></i>
                                            <span className="title" title={curSport}>curSport</span>
                                        </a>
                                    </li>
                                )
                            })
                            : null
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            sportList: state.virtualSportList,
            sportId: state.virtualSportId,
        }
    }
}

export default connect(mapStateToProps)(CategoriesMenuVirtual)