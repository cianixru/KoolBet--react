import React, {PureComponent, Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import "./matchDetailHeader.css"

class MatchDetailsHeader extends PureComponent {

    prepareScores = (len) => {
        let scores = [];
        if (this.props.matchData.score.length > 0) {
            scores = this.props.matchData.score.split(" ")[1];
            scores = scores.slice(1, scores.length - 1).split("-");
        }
        while (scores.length < len) {
            scores.push("-:-")
        }
        return scores;
    }

    prepareTable = (len) => {
        let scores = this.prepareScores(len);
        let eList = ["1st", "2nd", "3rd"];
        if (eList.length < len) {
            while (eList.length < len) {
                eList.push((eList.length + 1) + "th")
            }
        }
        return <table>
            <thead>
            <tr>
                <th className="player-name">Match stats</th>
                {eList.map((e, i) => {
                    return i < len ? <th key={i}>{e}</th> : null
                })}
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="player-name">
                    {this.props.home}
                </td>
                {scores.map((e, i) => {
                    return i < len ? <td key={i}>{e.split(':')[0]}</td> : null
                })}
            </tr>
            <tr>
                <td className="player-name">
                    {this.props.away}
                </td>
                {scores.map((e, i) => {
                    return i < len ? <td key={i}>{e.split(':')[1]}</td> : null
                })}

            </tr>
            </tbody>
        </table>;
    }

    drawMatchStats = () => {
        let res = null;
        if (this.props.matchData.sportdescriptor && this.props.matchData.sportdescriptor === "soccer") {
            res =
                <table>
                    <thead>
                    <tr>
                        <th className="player-name">Match stats</th>
                        <th>
                            <div className="red-card" title="Red cards"></div>
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="player-name">
                            {this.props.home}
                        </td>
                        <td> {this.props.homeRedCards}</td>

                    </tr>
                    <tr>
                        <td className="player-name">
                            {this.props.away}
                        </td>
                        <td> {this.props.awayRedCards}</td>

                    </tr>
                    </tbody>
                </table>;
        }
        if (this.props.matchData.sportdescriptor && this.props.matchData.sportdescriptor === "basketball") {
            res = this.prepareTable(4);
        }
        if (this.props.matchData.sportdescriptor && this.props.matchData.sportdescriptor === "icehockey") {
            res = this.prepareTable(3);
        }
        if (this.props.matchData.sportdescriptor && this.props.matchData.sportdescriptor === "volleyball") {
            res = this.prepareTable(5);
        }
        if (this.props.matchData.sportdescriptor && this.props.matchData.sportdescriptor === "tennis") {
            res = this.prepareTable(5);
        }
        if (this.props.matchData.sportdescriptor && this.props.matchData.sportdescriptor === "handball") {
            res = this.prepareTable(2);
        }
        return res;
    }

    render() {
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        return (
            this.props.type === "sport" ? (<Fragment>

                    <div>
                        <div className="sport__title__wrapper">
                            <i className="sport__back-button back__icon" onClick={this.props.history.goBack}></i>
                            {this.props.type === 'live' && <span className="live-status">LIVE</span>}
                            <span className="sport__title">{this.props.title}</span>
                        </div>
                    </div>
                    <div className={"match-display__wrapper " + this.props.sport}>
                        <div className="match-display__inner">
                            <div className="event-info">
                                <div className="event-info__event-name">
                                    {this.props.home + '-' + this.props.away}
                                </div>
                                <div className="event-info__start-date">
                                    {new Date(this.props.startDate).toLocaleString('en-US', options)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>)
                :
                this.props.type === "live" ? (
                    <Fragment>
                        <div>
                            <div className="sport__title__wrapper">
                                <i className="sport__back-button back__icon" onClick={this.props.history.goBack}></i>
                                {this.props.type === 'live' && <span className="live-status">LIVE</span>}
                                <span className="sport__title">{this.props.home + ' - ' + this.props.away}</span>
                            </div>
                        </div>

                        <div className={"live-match-display__wrapper " + this.props.sport}>
                            <div className="live-match-display__inner">
                                <div className="live-match__player-name">
                                    <span className="player-name">{this.props.home}</span>
                                </div>
                                <div className="live-match__score-box">
                                    <div className="score-total">
                                        <div className="score-total__content-wrapper">
                                            <span className="player1">
                                                <span>{this.props.totalScore.split(':')[0]}</span>
                                            </span>
                                            <span className="divider">
                                                <span>:</span>
                                            </span>
                                            <span className="player2">
                                                <span>{this.props.totalScore.split(':')[1]}</span>
                                            </span>

                                        </div>
                                        {this.props.matchData.sportdescriptor === "soccer" && this.props.matchData.score.length > 0 ?
                                            <p className="score__small-label">
                                                {this.props.matchData.score.split(" ")[1].replace("-", ",")}
                                            </p> : null}

                                    </div>


                                </div>
                                <div className="live-match__player-name">
                                    <span className="player-name">{this.props.away}</span>
                                </div>
                            </div>

                            <div className="period_wrapper">
                                <div className="period">
                                    {this.props.periodInfo}
                                </div>
                            </div>


                            <div className="match-stats">
                                {this.drawMatchStats()}
                            </div>
                            {
                                //new Date(this.props.startDate).toLocaleString('en-US', options)
                            }
                        </div>
                    </Fragment>) : null

        );
    }
}

export default withRouter(MatchDetailsHeader);

/*import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'

class MatchDetailsHeader extends Component {

    drawMatchStats = () => {

        let res =
            <table>
                <thead>
                <tr>
                    <th className="player-name">Match stats</th>
                    <th>
                        <div className="red-card" title="Red cards"></div>
                    </th>
                    <th>
                        <div className="yellow-card" title="Yellow cards"></div>
                    </th>
                    <th>
                        <div className="penalties__icon" title="Penalties"></div>
                    </th>
                    <th>
                        <span className="corners" title="Corners">
                            <span></span>
                        </span>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="player-name">
                        {this.props.home}
                    </td>
                    <td> {this.props.homeRedCards}</td>
                    <td>3</td>
                    <td>3</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td className="player-name">
                        {this.props.away}
                    </td>
                    <td> {this.props.awayRedCards}</td>
                    <td>3</td>
                    <td>4</td>
                    <td>4</td>
                </tr>
                </tbody>
            </table>;
        return res;

    }

    render() {
    //    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <Fragment>
                <div>
                    <div className="sport__title__wrapper">
                        <i className="sport__back-button back__icon" onClick={this.props.history.goBack}></i>
                        {this.props.type === 'live' && <span className="live-status">LIVE</span>}
                        <span className="sport__title">{this.props.home + ' - ' + this.props.away}</span>
                    </div>
                </div>

                <div className={"live-match-display__wrapper " + this.props.sport}>
                    <div className="live-match-display__inner">
                        <div className="live-match__player-name">
                            <span className="player-name">{this.props.home}</span>
                        </div>
                        <div className="live-match__score-box">
                            <div className="score-total">
                                    <span className="player1">
                                        <span>{this.props.totalScore.split(':')[0]}</span>
                                    </span>
                                <span className="divider">
                                        <span>:</span>
                                    </span>
                                <span className="player2">
                                        <span>{this.props.totalScore.split(':')[1]}</span>
                                    </span>
                            </div>
                        </div>
                        <div className="live-match__player-name">
                            <span className="player-name">{this.props.away}</span>
                        </div>
                    </div>

                    <div className="period_wrapper">
                        <div className="period">
                            {this.props.periodInfo}
                        </div>
                    </div>


                    <div className="match-stats">
                        {this.drawMatchStats()}
                    </div>
                    {
                        //new Date(this.props.startDate).toLocaleString('en-US', options)
                    }
                </div>
            </Fragment>
        );
    }
}

export default withRouter(MatchDetailsHeader);
*/