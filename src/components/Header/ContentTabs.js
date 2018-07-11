import React from 'react';
import { connect } from "react-redux";

class ContentTabs extends React.Component {
    menuChange = (e,val) => {
        this.props.dispatch({ type: 'CP_TAB_CHANGE', payload: val })
    }

    render() {
        let Tabs = ['Sport', 'Live', 'Results'];
        return (
            <div class="header__menu">
                {
                    Tabs.map((val, index) => {
                        return (
                            <div
                                className={"menu__item" + ((index == this.props.state.currentPage) ? " active" : '')}
                                onClick={(e)=>this.menuChange( e, index)}
                            >
                                <a>
                                    {val}
                                </a>
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

export default connect(mapStateToProps)(ContentTabs)