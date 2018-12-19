import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

class StreemVideo extends PureComponent {
    state = {
        streemVideoState:
            (typeof this.props.state.vgConfig.streemVideo === "undefined")
                ? isWidthUp('md', this.props.width)
                : this.props.state.vgConfig.streemVideo
    };

    toggleStreemVideo = (streemVideoState) => {
        this.setState({ streemVideoState: !streemVideoState });
        this.props.dispatch({ type: 'VG_STREEM_VIDEO', payload: !streemVideoState })
    };

    streemContent = (sportId) => {
        let streemUrl = {
            Soccer: "https://kiron.streamamg.com/kironbetmanonline/football-e7j61alkwq0hz3jgcpl3.html",
            EnglishFastLeagueFootball: "https://kiron.streamamg.com/047/FastLeague-dup28o3kt7dn7fakbu7i.html",
            PlatinumHounds: "https://kiron.streamamg.com/047/dogs-4bq30vx64wrltwamlwwm.html",
            DashingDerby: "https://kiron.streamamg.com/047/horses-8s6vma17ijbyxaay17k6.html",
        }
        return <iframe title="streemContent" src={streemUrl[sportId]}></iframe>
    }

    render() {
        const { sportId, sportName, curData } = this.props;
        const { streemVideoState } = this.state;
        return (
            <Fragment>
                <section className="categories-filter">
                    <div className="tournament-filter__header scroll-watcher">
                        <div className={"tournament-filter__breadcrumbs " + sportId.replace(' ', '')}>
                            <i className={"cell icon-cell " + sportId}></i>
                            <div className="cell title-cell">
                                {(curData && curData.tournament) ? curData.tournament.defaultName : (sportName) ? sportName : null}
                            </div>
                            <div className="cell controls-cell">
                                <div className={"hide-viewer icon-cell " + (streemVideoState ? "active" : "")} id="colps1" title="Show/Hide live video" onClick={() => this.toggleStreemVideo(streemVideoState)}></div>
                            </div>
                        </div>
                    </div>
                </section>
                {(streemVideoState)
                    ? <section className="viewer-panel">
                        {this.streemContent(sportId)}
                    </section>
                    : ""}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            vgConfig: state.vgConfig,
        }
    }
}

export default connect(mapStateToProps)(withWidth()(StreemVideo));