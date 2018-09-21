import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

class TournamentList extends Component {
    constructor(props) {
        super(props);
        this.state = false;
    }
    toggleStreemVideo() {
        this.setState({ streemVideoState: !this.state.streemVideoState });
    };

    render() {
        let curData;
        if (Object.keys(this.props.state.currentTournamentData).length !== 0)
            curData = this.props.state.currentTournamentData;
        if (this.props.state.currentTournamentData[0] && this.props.state.currentTournamentData[0].hasOwnProperty('value'))
            curData = null;


        return (
            <Fragment>
                <section className="categories-filter">

                    <div className="tournament-filter__header scroll-watcher">
                        <div className={"tournament-filter__breadcrumbs " + this.props.state.sportId}>
                            <i className={"cell icon-cell " + this.props.state.sportId}></i>
                            <div className="cell title-cell">
                                <span className="catName">{this.props.state.sportId}</span> / {(curData && curData.tournament) ? curData.tournament.defaultName : null}
                            </div>
                            <div className="cell controls-cell">
                                <div className={"hide-viewer icon-cell " + (this.state.streemVideoState ? "active" : "")} id="colps1" title="Show/Hide live video" onClick={this.toggleStreemVideo.bind(this)}></div>
                            </div>
                        </div>
                    </div>

                </section>

                {
                    (this.state.streemVideoState)
                        ? <section className="viewer-panel">
                            <iframe frameborder="0" style={{ width: '100%', height: 360 }} src="https://kiron.streamamg.com/kironbetmanonline/football-e7j61alkwq0hz3jgcpl3.html" width="640" height="360" ></iframe>
                        </section>
                        : ""
                }
                <section className="timeline__wp">

                    <nav className="timeline">
                        <ul className="nav-tabs">
                            {Object.keys(this.props.state.tournamentList).map((key, index) => {
                                let start = new Date(this.props.state.tournamentList[key].first)
                                if (Date.now() < this.props.state.tournamentList[key].second) {
                                    return (
                                        <li
                                            key={index}
                                            className={"nav-tabs__item" + (this.props.state.tournamentId === key ? (" active") : '')}
                                            onClick={() => this.props.onTournamentChoose(key)}
                                        >
                                            <div>
                                                {start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </nav>

                    <header className="vg-meeting--info">
                        <div className="vg-meeting--details">
                            <time className="vg-meeting--time">
                                {(this.props.state.tournamentId && this.props.state.tournamentList[this.props.state.tournamentId])
                                    ? new Date(this.props.state.tournamentList[this.props.state.tournamentId].first).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                                    : null
                                }
                            </time>
                            <h1 className="vg-meeting--title">
                                {(curData && curData.tournament)
                                    ? curData.tournament.defaultName
                                    : null
                                }
                            </h1>
                            <div className="vg-meeting--id">ID:
                                {(curData && curData.tournament)
                                    ? curData.tournament.tournamentId
                                    : null
                                }
                            </div>
                        </div>
                    </header>
                </section>
            </Fragment >
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            sportId: state.virtualSportId,
            tournamentList: state.virtualTournamentList,
            tournamentId: state.virtualTournamentId,
            currentTournamentData: state.virtualCurrentTournamentData,
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTournamentChoose: (tournamentId) => {
            dispatch({ type: 'ADD_VIRTUAL_TOURNAMENT_ID', payload: tournamentId });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentList);
