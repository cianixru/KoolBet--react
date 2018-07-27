import React from 'react';
import { connect } from "react-redux";

class Search extends React.Component {


    render() {
        return (
            <div className="block-search">
                <div className="block-search__inp-wrap">
                    <input type="text" placeholder="Search" className="block-search__input" />
                    <span className="icon-search"></span>
                </div>
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

export default connect(mapStateToProps)(Search)