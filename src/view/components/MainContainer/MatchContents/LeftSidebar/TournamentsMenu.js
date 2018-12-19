import React from 'react';
import {connect} from "react-redux";
import messages from "./messages.lang";
import {FormattedMessage} from 'react-intl';

class TournamentsMenu extends React.PureComponent {

    state = {
        tournaments: [],
        tournamentsSelected: {},
        img: []
    }
    tournaments = [];

    changeCategory = (e, val) => {
        let tournament = {};
        if (this.state.tournamentsSelected !== val) {
            tournament = val;
        } else {
            if (Array.isArray(this.props.state.topTournaments)) {
                let tournament = this.props.state.topTournaments.sort(function (a, b) {
                    return a["sort"] - b["sort"];
                }).slice(0, 1)[0];
            }
        }

        if (this.props.state.tournamentCounter.currentTournamentCounter !== 0)
            this.props.dispatch({type: 'TOURNAMENT_COUNTER_CLEAR'});

        if (tournament.id)
            this.props.dispatch({type: 'TOP_TOURNAMENT_ID', payload: tournament.id});

        this.setState({tournamentsSelected: tournament});

    }

    static getDerivedStateFromProps(props, state) {
        if (JSON.stringify(props.state.sportList) !== JSON.stringify(state.prevSportList)) {
            return {tournaments: props.state.sportList.top_tournaments, prevSportList: props.state.sportList}
        }
        return null
    }

    componentDidMount() {
        /*    if (Array.isArray(this.props.state.topTournaments) && this.props.state.tournamentCounter.currentTournamentCounter === 0) {
                let tournament = this.props.state.topTournaments.sort(function (a, b) {
                    return a["sort"] - b["sort"];
                }).slice(0, 1)[0];
                console.log(tournament)
                this.setState({tournamentsSelected: tournament});
            }*/

            this.importImages();

    }

    importImages = () => {
        let context = this;
        let data = [];

        if(Array.isArray(this.props.state.topTournaments)){
            let prom = this.props.state.topTournaments.sort(function (a, b) {
                return a["sort"] - b["sort"];
            }).slice(0, 8).map(
                async (e) => {

                    try {
                        return await import(/* webpackMode: "lazy" */ `view/img/top-tournament/${e.name.toLowerCase().replace(" ", "-")}-logo.png`)
                            .then(item => {

                                data.push(item.default);
                                return item.default
                            })
                    } catch {
                        return await import(/* webpackMode: "lazy" */ `view/img/top-tournament/default-logo.png`)
                            .then(item => {
                                data.push(item.default);
                                return item.default
                            })
                    }
                    ;
                }
            )

            Promise.all(prom).then(values => {
                context.setState({img: values})
            })
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.img === []) {
            this.importImages();
        }
        if (
            (Array.isArray(this.props.state.topTournaments) &&
                this.props.state.tournamentCounter.currentTournamentCounter === 0 &&
                prevProps.state.tournamentCounter.currentTournamentCounter !== 0)
        ) {
            let tournament = this.props.state.topTournaments.sort(function (a, b) {
                return a["sort"] - b["sort"];
            }).slice(0, 1)[0];
            this.setState({tournamentsSelected: tournament});
        }

        if (
            (this.props.state.tournamentCounter.currentTournamentCounter === 0) &&
            (this.props.state.tournamentCounter.currentTopTournament) &&
            (this.props.state.tournamentCounter.currentTopTournament != prevProps.state.tournamentCounter.currentTopTournament)
        ) {

            for (let i = 0; i < this.props.state.topTournaments.length; i++) {
                if (this.props.state.topTournaments.id === this.props.state.tournamentCounter.currentTopTournament) {
                    this.setState({tournamentsSelected: this.props.state.topTournaments[i]});
                    break;
                }

            }
        }


        if (
            (this.props.state.tournamentCounter.currentTournamentCounter !== 0 && prevProps.state.tournamentCounter.currentTournamentCounter === 0)
        ) {
            this.setState({tournamentsSelected: {}});
        }

        if (
            (this.props.state.tournamentCounter.currentTournamentCounter === 0 && prevProps.state.tournamentCounter.currentTournamentCounter !== 0)
        ) {
            this.setState({tournamentsSelected: this.props.state.topTournaments[this.props.state.tournamentCounter.currentTopTournament]});
        }

        if(this.state.img.length==0){
            this.importImages();
        }
    }

    findCount = (topTournament) => {
        let count = 0;
        if (topTournament) {
            for (let country in topTournament.sports[0].countries) {
                for (let e in topTournament.sports[0].countries[country]) {
                    count = count + topTournament.sports[0].countries[country][e].length;
                }
            }
        }
        return count;
    }

    render() {
        // console.log(this.state)
        let topTournaments = this.props.state.topTournaments;
        return (
            <div className="top-tournaments">
                <div className="header__sport-menu tournaments-menu__title" id="tournaments-menu__title">
                    <i className="arr-down"></i>
                    <div className="sport-menu__title">
                        <FormattedMessage id={"MainContainer.MatchContents.LeftSidebar.TournamentsMenu.Caption"}
                                          defaultMessage={"TOP TOURNAMENTS"}/>
                    </div>
                </div>
                <ul className="sport-menu scroll-watcher tournaments-menu" id="tournaments-menu">
                    {

                        (Array.isArray(topTournaments) && this.state.tournamentsSelected) ? (
                            topTournaments.sort(function (a, b) {
                                return a["sort"] - b["sort"];
                            }).slice(0, 8).map((val, index) => {

                                return (
                                    <li
                                        onClick={e => this.changeCategory(e, val)}
                                        key={index}
                                        className={(this.state.tournamentsSelected.name === val.name) ? 'active' : ''}
                                    >
                                        <a className="sport-menu__item">
                                            <i className="soccer">
                                                <img src={this.state.img[index]} alt="Icon"/>
                                            </i>
                                            <span className="title" title={val.name}>
                                                {val.name}
                                            </span>
                                            <span className="count">{this.findCount(val)}</span>
                                        </a>
                                    </li>)
                            })
                        ) : null

                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            tournamentCounter: state.topTournament,
            topTournaments: state.sportList.top_tournaments,
            sportList: state.sportList,
        }
    }
}

export default connect(mapStateToProps)(TournamentsMenu)

/*

<li
                                    // onClick={e => this.changeCategory(e, val.title)}
                                    key={index}
                                    className={(this.props.state.TournamentsSelected === val.title) ? 'active' : ''}
                                >
                                    <a className="sport-menu__item">
                                        <i className="soccer"></i>
                                        <span className="title" title={val.title}>
                                        <FormattedMessage {...messages[val.title]}/>
                                    </span>
                                        <span className="count">{val.count}</span>
                                    </a>
                                </li>

* */

/*

 <li
                                        // onClick={e => this.changeCategory(e, val.title)}
                                        key={index}
                                        className={(this.state.tournamentsSelected === val.title) ? 'active' : ''}
                                    >
                                        <a className="sport-menu__item">
                                            <i className="soccer"></i>
                                            <span className="title" title={val.title}>
                                        <FormattedMessage {...messages[val.title]}/>
                                    </span>
                                            <span className="count">{val.count}</span>
                                        </a>
                                    </li>

*/
//this.props.state.tournamentCounter.currentTournamentCounter