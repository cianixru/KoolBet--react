import React, { Component } from 'react';
import { connect } from "react-redux";
import withWidth from '@material-ui/core/withWidth';

import LeftSidebar from './LeftSidebar/index';
import RightSidebar from './RightSidebar/index';
import MainContent from './MainContent/index';

class MatchContents extends Component {
    render() {
        return (
            <div className="page-grid">

            <LeftSidebar />

            {((this.props.width === "sm" || this.props.width === "xs") && this.props.state.currentPage === 0) ? '' : <MainContent />}

            <RightSidebar />

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            currentPage: state.currentPage
        }
    }
}

export default connect(mapStateToProps)(withWidth()(MatchContents))