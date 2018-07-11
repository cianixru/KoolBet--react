import React, { Component } from 'react';
import LeftSidebar from './LeftSidebar/index';
import RightSidebar from './RightSidebar/index';
import MainContent from './MainContent/index';

class MatchContents extends Component {
    state = {
        mobileToggle: true,
    }
    render() {
        return (
            <div className="page-grid">

                {/* {( this.state.mobileToggle ) ? '1' : '2' } */}

                <LeftSidebar />

                <MainContent />

                <RightSidebar />

            </div>
        );
    }
}

export default MatchContents;
