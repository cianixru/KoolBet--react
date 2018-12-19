import React from 'react';
import { connect } from "react-redux";
import Hidden from '@material-ui/core/Hidden';

class CategoriesMenuLive extends React.PureComponent {

    componentDidMount() {
        // this.props.dispatch({ type: 'CLEAR_SPORT_ID' })
    }

    componentWillUnmount() {
        // this.props.dispatch({ type: 'CLEAR_SPORT_ID' })
    }

    handleMenuChoose = (sport) => {
        if (sport === this.props.state.sportId)
            this.props.dispatch({ type: 'CLEAR_SPORT_ID' })
        else
            this.props.dispatch({ type: 'ADD_SPORT_ID', payload: sport })
    }

    render() {

        return (
            <Hidden mdDown>
                <div className="categories-menu__container mini scroll" id="sportMenuContainer">
                <div className="categories-menu__inner sport-categories">
                    <div className="header__sport-menu all-sport-menu" id="all-sport-menu">
                        <div className="sport-menu__title">
                            <FormattedMessage id="MainContainer.MatchContents.LeftSidebar.CategoriesMenuLive.Title" defaultMessage="Live"/>
                        </div>
                        <div className="sport-menu__collapse-mini" id="sportMenuMiniToggler"></div>
                    </div>

                    <ul className="sport-menu scroll-watcher">

                        {/* {console.log(this.props.state.liveMenu)} */}
                        {this.props.state.liveMenu.map((menuItem, index) => {
                            return (
                                <li key={index}>
                                    <a className="sport-menu__item" onClick={() => this.handleMenuChoose(menuItem.sportname)}>
                                        <i className={menuItem.sportname.replace(' ', '')}></i>
                                        <span className="title" title="Soccer">{menuItem.sportname}</span>
                                        <span className="count">85</span>
                                    </a>
                                    {/* <ul className="sport-submenu__events-menu">
                                            <li>
                                                <a className="icon active-tournament">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="icon">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="icon">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                        </ul> */}
                                </li>

                            )
                        })}
                    </ul>
                </div>
            </div>
            </Hidden>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            sportId: state.sportId,
            liveMatches: state.liveMatches,
            liveMenu: state.liveMenu,
        }
    }
}

export default connect(mapStateToProps)(CategoriesMenuLive)
