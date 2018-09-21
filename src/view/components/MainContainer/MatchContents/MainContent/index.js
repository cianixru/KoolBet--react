import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class MainContent extends Component {
    render() {
        return (
            <div className={"page-grid__item main scroll" + ((this.props.path.includes('/profile')) ? ' profile' : '')} >
                <Scrollbars
                    renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                    renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                    renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4 }} className="view" />}
                    hideTracksWhenNotNeeded={true}
                >
                    {this.props.children}
                </Scrollbars>
            </div>
        );
    }
}

export default MainContent;