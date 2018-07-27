import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from "react-redux";

import SportMatchBoard from './SportMatchBoard';
import LiveMatchBoard from './LiveMatchBoard';
import ResultsBoard from './ResultsBoard';


// import MatchBoard from './MatchBoard';

class MainContent extends React.Component {

    reRender = () => {
        this.forceUpdate()
    }

    render() {
        const SwitchMatchBoard = (page) => {
            switch (page) {
                case '/sport':
                    return <SportMatchBoard resize={setTimeout(this.reRender, 0)} />
                    break;

                case '/live':
                    return <LiveMatchBoard resize={setTimeout(this.reRender, 0)} />
                    break;

                case 2:
                    return <ResultsBoard resize={setTimeout(this.reRender, 0)} />
                    break;

                default:
                    return <SportMatchBoard  resize={setTimeout(this.reRender, 0)} />
                    break;
            }
        }
        return (
            <div className="page-grid__item main scroll">
                <Scrollbars
                    renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                    renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                    renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4 }} className="view" />}
                    hideTracksWhenNotNeeded={true}
                >
                {SwitchMatchBoard(this.props.location.pathname)}
                </Scrollbars>
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

export default connect(mapStateToProps)(MainContent)