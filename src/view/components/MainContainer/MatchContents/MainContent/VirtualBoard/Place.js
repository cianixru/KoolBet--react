import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from "react-intl";

class Place extends Component {
    state={
        img:[],
        silksNum:[],
    }


    prepareLastFiveData = (odd) => {
        let competitorData = this.props.matchData.matchtocompetitors.find(el => el.competitor.defaultName === odd.information);
        if (typeof competitorData !== 'undefined' &&  typeof competitorData.competitor.lastFive === 'string') {
            let lastFive = competitorData.competitor.lastFive.split('').map(function (current, index) {
                return <li className={"Form" + (index + 1)} key={index + 1}>&nbsp;{current}</li>;
            }, '');
            return lastFive;
        } else {
            return '';
        }
    }

    prepareRating = (odd) => {
        let competitorData = this.props.matchData.matchtocompetitors.find(el => el.competitor.defaultName === odd.information);
        let stars = [];
        let rating =0;
        if(typeof competitorData !== 'undefined'){
            rating = Math.round(parseFloat(competitorData.competitor.starRating)/20);
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

    getSilkNumbers = (pr) => {
        let valWin = pr.matchData.betdomains.find((val) => val.betdomainName === 'Win');
        let valPlace = pr.matchData.betdomains.find((val) => val.betdomainName === 'Place');
        let data = [];
        if(valWin && valPlace){

            valWin.odds.sort((a, b) => { return a.sort - b.sort }).map((odd, index) => {
                let competitorData = pr.matchData.matchtocompetitors.find(el => el.competitor.defaultName === odd.information);

                if(typeof competitorData !== 'undefined'){
                    console.log(competitorData.competitor)
                    if(this.props.state.virtualSportId==="PlatinumHounds"){
                        data.push(index+1);
                    }
                    if(this.props.state.virtualSportId==="DashingDerby"){
                        let id = parseInt(competitorData.competitor.kironCompetitorId.split("_")[1]);
                        id = Math.floor( ((id-1)/15))+1;
                        id = id<10?"0"+id:id;
                        data.push(id);
                        console.log(id)
                    }
                }
            });
            console.log(data)
        }

        return data;
    }

    importImages =  (silksNumbers,dir)=>{
        let context = this;
        let data = [];
        let prom = silksNumbers.map(async (odd, index) => {
            return await import(/* webpackMode: "lazy" */ `view/img/silks_${dir}/silk_${silksNumbers[index]}.png`).then(item=>{data.push(item.default);return item.default});
        });

        Promise.all(prom).then(values=>{
            context.setState({img:values,silksNum:silksNumbers})
        })

    }

    componentDidMount(){
        let silksNumbers = this.getSilkNumbers(this.props);
        this.state.img = [];
        let sportId = this.props.matchData.matchtocompetitors[0].competitor.sportId;
        let dir = this.props.state.virtualSportId!=="PlatinumHounds"?"horse":"dog";
        this.importImages(silksNumbers,dir);
    }


    componentWillReceiveProps(nextProps){
        let silksNumbers = this.getSilkNumbers(nextProps);
        if(silksNumbers!==this.state.silksNum){
            this.state.img =[];
            this.state.silksNum =[];
            let sportId = this.props.matchData.matchtocompetitors[0].competitor.sportId;
            let dir = this.props.state.virtualSportId!=="PlatinumHounds"?"horse":"dog";
            this.importImages(silksNumbers,dir)
        }
    }


    render(){
        let valWin, valPlace;

        if (this.props.matchData)
            valWin = this.props.matchData.betdomains.find((val) => val.betdomainName === 'Win');
        valPlace = this.props.matchData.betdomains.find((val) => val.betdomainName === 'Place');
        return (
            <Fragment>
                <div className="race-bet__table ">
                    <div className="row head">
                        <div className="a cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Place.Horse" defaultMessage="Horse"/></div>
                        </div>
                        <div className="cell place__cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Place.Win" defaultMessage="Win"/></div>
                        </div>
                        <div className="cell place__cell">
                            <div><FormattedMessage id="MainContainer.MatchContents.MainContent.VirtualBoard.Place.Place" defaultMessage="Place"/></div>
                        </div>
                    </div>

                    {valWin && valPlace
                        ? valWin.odds.sort((a, b) => { return a.sort - b.sort }).map((odd, index) => {
                            let oddPlace = valPlace.odds.find(e => e.information === odd.information);
                            return (
                                <div className="row" key={index}>
                                    <div className="a cell team--details__cell">
                                        <div className="number">{odd.sort}</div>
                                        <div className="silk">
                                            {<img src={this.state.img[index]} alt="Silk"/>}
                                        </div>
                                        <div className="team--name">
                                            <div className="name">{odd.information}</div>
                                            <div className="rating">
                                                <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 20" enableBackground="new 0 0 100 20" >
                                                    {this.prepareRating(odd)}
                                                </svg>
                                            </div>
                                            <div className="last5">
                                                <div className="inline">Last 5:</div>
                                                <ul className="inline last5__list">
                                                    {this.prepareLastFiveData(odd)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">
                                            <div
                                                className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === odd.oddId)) ? 'btn-active' : (this.props.closed) ? ' btn-unavailable' : '')}
                                                data-oddtag="1st"
                                                onClick={
                                                    this.props.closed
                                                        ? null
                                                        : () => this.props.handleOddClick(odd.oddId, valWin.betDomainId, this.props.matchData.matchId, this.props.matchData.tournamentId)}
                                            >
                                                {odd.value}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cell place__cell">
                                        <div className="button-bet">
                                            <div
                                                className={"specialoddvalue-text " + ((this.props.state.odds.length > 0 && this.props.state.odds.find(el => el.oddId === oddPlace.oddId)) ? 'btn-active' : (this.props.closed) ? ' btn-unavailable' : '')}
                                                data-oddtag="Place"
                                                onClick={
                                                    this.props.closed
                                                        ? null
                                                        : () => this.props.handleOddClick(oddPlace.oddId, valPlace.betDomainId, this.props.matchData.matchId, this.props.matchData.tournamentId)}
                                            >
                                                {oddPlace.value}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                    }
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        state: {
            virtualSportId:state.virtualSportId,
            tournamentId: state.virtualTournamentId,
            odds: state.virtualOdds,
        }
    }
}

export default connect(mapStateToProps)(Place);