import React from 'react';

import { connect } from "react-redux";

class MobileToolbar extends React.Component {

    menuChange = (val) => {
        this.props.dispatch({ type: 'PAGE_CHANGE', payload: val })
    }

    notAuthPageSwith = () => {
        this.props.dispatch({ type: 'NOT_AUTH'})
    }

    render() {
        let ToolbarTabs = [
            ['All sports', 'categories', 'sports'],
            ['Live', 'live', 'live'],
            ['Betslip', 'betslip'],
            ['Virtual games', 'virtual', 'virtual'],
            ['Coupon check', 'coupon']
        ];

        return (
            <div className="footer-menu__container">
                {
                    ToolbarTabs.map((val, index) => {
                        return (
                            <div
                                className={"footer-menu__item icon-btn" + ((index === this.props.state.currentPage) ? " active" : '') + " " + val[1]}
                                onClick={() => this.menuChange(index)}
                            >
                                <span className="footer-menu__label">{val[0]}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            currentPage: state.currentPage
        }
    }
}

export default connect(mapStateToProps)(MobileToolbar)