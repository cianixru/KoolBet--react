import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from "react-intl";
/*jshint ignore:start*/
/*eslint-disable*/

class Forecast extends Component {
    state={
        img:[],
        silksNum:[],
    }


    prepareLastFiveData = (competitor) => {
        if (typeof competitor !== 'undefined'    &&  typeof competitor.lastFive === 'string') {
            let lastFive = competitor.lastFive.split('').map(function (current, index) {
                return <li className={"Form" + (index + 1)} key={index + 1}>&nbsp;{current}</li>;
            }, '');
            return lastFive;
        } else {
            return '';
        }
    }

    getSilkNumbers = (pr) => {
        let valWin = this.props.matchData;
        console.log(this.props)
        let data = [];
        valWin.matchtocompetitors.sort((a, b) => { return a.homeTeam - b.homeTeam }).map((competitor, index) => {
            let competitorData = competitor;
            if(typeof this.props.state.virtualSportId !== 'undefined'){
                if(this.props.state.virtualSportId==="PlatinumHounds"){
                    data.push(index+1);
                }
                if(this.props.state.virtualSportId==="DashingDerby"){
                    let id = parseInt(competitorData.competitor.kironCompetitorId.split("_")[1]);
                    id = Math.floor( ((id-1)/15))+1;
                    id = id<10?"0"+id:id;
                    data.push(id);
                }
            }
        });
        return data;
    }

    importImages =  (silksNumbers,dir)=>{
        let st = this;
        let data = [];
        let prom = [];
        prom = silksNumbers.map(async (odd, index) => {
            return await import(/* webpackMode: "lazy" */  `view/img/silks_${dir}/silk_${silksNumbers[index]}.png`).then(item=>{data.push(item.default);return item.default});
        });

        Promise.all(prom).then(values => {
            st.setState({img:values,silksNum:silksNumbers})
        });
    }

    componentDidMount() {
        let silksNumbers = this.getSilkNumbers(this.props);
        this.state.img = [];
        let sportId = this.props.matchData.matchtocompetitors[0].competitor.sportId;

        let dir = this.props.state.virtualSportId!=="PlatinumHounds"?"horse":"dog";
        this.importImages(silksNumbers,dir);
    }

    static getDerivedStateFromProps(props, state) {

        if (props.matchData && !state[props.matchData.matchId])
            return { ...state, [props.matchData.matchId]: { first: '', second: '', any: [], toPlace: {} } }


        return null
    }

    componentDidUpdate(prevProps, prevState ) {
        if(this.props.matchData.matchId!==prevProps.matchData.matchId){
            let silksNumbers = this.getSilkNumbers(this.props);
            this.state.img =[];
            this.state.silksNum =[];
            let sportId = this.props.matchData.matchtocompetitors[0].competitor.sportId;
            let dir = this.props.state.virtualSportId!=="PlatinumHounds"?"horse":"dog";
            this.importImages(silksNumbers,dir)
        }

        let currentState, oddId = '', betDomainId = '', matchId = '', tournamentId = '', val = ''
        if (this.props.matchData) {
            matchId = this.props.matchData.matchId
            tournamentId = this.props.matchData.tournamentId
            currentState = this.state[matchId]
        }

        if (currentState.first && currentState.second) {
            if (this.props.matchData) {
                let ForecastArray = this.props.matchData.betdomains.find((val) => val.betdomainName === 'Forecast');
                let ForecastOdd = ForecastArray.odds.find(e => e.oddTag === (currentState.first + '-' + currentState.second))
                betDomainId = ForecastArray.betDomainId
                oddId = ForecastOdd.oddId;
                val = ForecastOdd.value
            }
            this.setState(prevState => {
                if (prevState[matchId] && prevState[matchId].toPlace.oddId !== oddId)
                    return {
                        ...prevState, [matchId]: { ...prevState[matchId], toPlace: { oddId: oddId, betDomainId: betDomainId, matchId: matchId, tournamentId: tournamentId, val: val } }
                    }
            })
        }

        else if (currentState.any.length === 3) {
            this.setState(prevState => {
                if (this.props.matchData) {
                    let reverseForecastArray = this.props.matchData.betdomains.find((val) => val.betdomainName === 'ReverseForecast');
                    let reverseForecastOdd = reverseForecastArray.odds.find(e => e.oddTag === (currentState.any.sort().join('-')))
                    betDomainId = reverseForecastArray.betDomainId
                    oddId = reverseForecastOdd.oddId;
                    val = reverseForecastOdd.value
                }
                betDomainId = this.props.matchData.betdomains.find(e => e.betdomainName === 'ReverseForecast').betDomainId
                if (prevState[matchId] && prevState[matchId].toPlace.oddId !== oddId)
                    return {
                        ...prevState, [matchId]: { ...prevState[matchId], toPlace: { oddId: oddId, betDomainId: betDomainId, matchId: matchId, tournamentId: tournamentId, val: val } }
                    }
            })
        }

        else {
            this.setState(prevState => {
                if (prevState[matchId] && Object.keys(prevState[matchId].toPlace).length !== 0)
                    return { ...prevState, [matchId]: { ...prevState[matchId], toPlace: {} } }
            });
        }

    }

    handleOddClick = ({ oddId, betDomainId, matchId, tournamentId }) => {
        this.props.handleOddClick(oddId, betDomainId, matchId, tournamentId)
    }

    handleClickPlace = (type, index) => {
        index = index + 1
        let matchId = this.props.matchData.matchId;
        switch (type) {
            case 'first':
                this.setState(prevState => {
                    if (prevState[matchId].first !== index)
                        return { ...prevState, [matchId]: { ...prevState[matchId], first: index } }
                    else
                        return { ...prevState, [matchId]: { ...prevState[matchId], first: '' } }
                })
                break;

            case 'second':
                this.setState(prevState => {
                    if (prevState[matchId].second !== index)
                        return { ...prevState, [matchId]: { ...prevState[matchId], second: index } }
                    else
                        return { ...prevState, [matchId]: { ...prevState[matchId], second: '' } }
                })
                break;

            case 'any':
                this.setState(prevState => {
                    if (prevState[matchId].any.includes(index))
                        return { ...prevState, [matchId]: { ...prevState[matchId], any: [...this.state[matchId].any.filter(e => e !== index)] } }
                    else
                        return { ...prevState, [matchId]: { ...prevState[matchId], any: [...this.state[matchId].any, index] } }
                })
                break;

            default:
                break;
        }
    };

    prepareRating = (competitor) => {
        let stars = [];
        let rating =0;
        if(typeof competitor !== 'undefined'){
            rating = Math.round(parseFloat(competitor.starRating)/20);
        }else{
            let rating = 0;
        }
        for (let i=1;i<=5;i++){
            stars.push(<g key={"g"+i}>
                <polygon fill={i<=rating?"gold":"#fff"} points={(10+(i-1)*20)+",0.6 "+(13.1+(i-1)*20)+",6.8 "+(20+(i-1)*20)+",7.8 "+(15+(i-1)*20)+",12.7 "+(16.1+(i-1)*20)+",19.5 "+(10+(i-1)*20)+",16.3 "+(3.8+(i-1)*20)+",19.5  "+(5+(i-1)*20)+"  ,12.7  "+((i-1)*20)+"  ,7.8  "+(6.9+(i-1)*20)+"  ,6.8 	"}></polygon>
            </g>)
        }
        return  stars;
    }

    render() {
        let val, currentState;
        if (this.props.matchData) {
            val = this.props.matchData;
            currentState = this.state[this.props.matchData.matchId]
        }

        return (
            <Fragment>

                <div className="race-bet__table ">
                    <div className="row head">
                        <div className="a cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Forecast.Horse" defaultMessage="Horse"/></div>
                        </div>
                        <div className="cell place__cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Forecast.2nd" defaultMessage="2nd"/></div>
                        </div>
                        <div className="cell place__cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Forecast.3rd" defaultMessage="3rd"/></div>
                        </div>
                        <div className="cell place__cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Forecast.Any" defaultMessage="Any"/></div>
                        </div>
                    </div>

                    {val
                        ? val.matchtocompetitors.sort((a, b) => { return a.homeTeam - b.homeTeam }).map((competitor, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="a cell team--details__cell">
                                        <div className="number">{competitor.homeTeam}</div>
                                        <div className="silk">
                                            {<img src={this.state.img[index]} alt="Silk"/>}
                                        </div>
                                        <div className="team--name">
                                            <div className="name">{competitor.competitor.defaultName}</div>
                                            <div className="rating">
                                                <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 20" enableBackground="new 0 0 100 20" >
                                                    {this.prepareRating(competitor.competitor)}
                                                </svg>
                                            </div>
                                            <div className="last5">
                                                <div className="inline">Last 5:</div>
                                                <ul className="inline last5__list">
                                                    {this.prepareLastFiveData(competitor.competitor)}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">

                                            <div
                                                className={"specialoddvalue-text "
                                                + ((currentState.first === index + 1) ? 'btn-active ' : (currentState.first !== '') ? 'shading ' : '')
                                                + ((currentState.any.length > 0 || currentState.second === index + 1 || this.props.closed) ? 'btn-unavailable' : '')
                                                }
                                                data-oddtag="Place"
                                                onClick={() => {
                                                    (currentState.any.length > 0 || currentState.second === index + 1 || this.props.closed)
                                                        ? null
                                                        : this.handleClickPlace('first', index)
                                                }}
                                            >
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Forecast.Button.1st" defaultMessage="1st"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">
                                            <div
                                                className={"specialoddvalue-text "
                                                + ((currentState.second === index + 1) ? 'btn-active' : (currentState.second !== '') ? 'shading ' : '')
                                                + ((currentState.any.length > 0 || currentState.first === index + 1 || this.props.closed) ? 'btn-unavailable' : '')
                                                }
                                                data-oddtag="Place"
                                                onClick={() => {
                                                    (currentState.any.length > 0 || currentState.first === index + 1 || this.props.closed)
                                                        ? null
                                                        : this.handleClickPlace('second', index)
                                                }}
                                            >
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Forecast.Button.2nd" defaultMessage="2nd"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">
                                            <div
                                                className={"specialoddvalue-text "
                                                + (currentState.any.includes(index + 1)
                                                    ? 'btn-active ' :
                                                    ((currentState.first !== '' || currentState.second !== '' || currentState.any.length > 1 || this.props.closed) ? 'btn-unavailable' : ''))
                                                }
                                                data-oddtag="Place"
                                                onClick={() => {
                                                    (currentState.first !== '' || currentState.second !== '' || (currentState.any.length > 1 && !currentState.any.includes(index + 1)) || this.props.closed)
                                                        ? null
                                                        : this.handleClickPlace('any', index)
                                                }}
                                            >
                                                <FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Forecast.Button.Any" defaultMessage="Any"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                    }

                    {currentState.toPlace.hasOwnProperty('oddId') && currentState.toPlace.oddId !== '' ?
                        <div className="place-bets__w">
                            <button
                                type="button"
                                className="place-bets__button button"
                                onClick={() => this.handleOddClick(currentState.toPlace)}
                            >
                                <span className="odd--value">{currentState.toPlace.val}</span>
                                {this.props.state.odds.some(e => e.oddId === currentState.toPlace.oddId)
                                    ? 'Remove from '
                                    : 'Add to '
                                }<FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Forecast.Button.BetSlip" defaultMessage="bet slip"/>
                                <i></i>
                            </button>
                        </div>
                        : null
                    }
                </div>
            </Fragment>
        );
    }
}
/*eslint-enable*/
/*jshint ignore:end*/

function mapStateToProps(state, ownProps) {
    console.log(state)
    return {
        ...ownProps,
        state: {
            virtualSportId:state.virtualSportId,
            tournamentId: state.virtualTournamentId,
            odds: state.virtualOdds,
        }
    }
}

export default connect(mapStateToProps)(Forecast);