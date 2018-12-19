import React, {Fragment} from 'react';
import {connect} from "react-redux";
import withWidth from "@material-ui/core/withWidth/withWidth";
import {withRouter} from 'react-router-dom'
class SearchResult extends React.PureComponent {
    state = {
        searchResult: []
    }

    componentDidMount() {
       try{
           fetch('/hub/rest/liveSearch?query=' + this.props.search + '&language=' + this.props.state.locale)
               .then(
                   response => response.json()
               )
               .then(
                   json => {
                       this.setState({
                           searchResult: json["sport"]
                       })
                       return true
                   }).catch(()=>{return true})
       }catch{
return true
       }


    }


    findSportId = (sportName) => {
        let sportId = "0";
        for (let sport in this.props.state.sports) {
            if (this.props.state.sports[sport].name === sportName) {
                sportId = this.props.state.sports[sport].id;
                break;
            }
        }
        return sportId
    }

    findCountryId = (countryName, sportId) => {
        let countryId = "0";
        let sportCountries = [];
        for (let sport in this.props.state.sports) {
            if (this.props.state.sports[sport].id === sportId) {
                sportCountries = this.props.state.sports[sport].countries;
                break;
            }
        }
        for (let country in sportCountries) {
            if (sportCountries[country].name === countryName) {
                countryId = sportCountries[country].id;
            }
        }

        return countryId;
    }

    handleRedirect = (data)=>() =>{
        this.props.history.replace(data)
    }

    render() {

        return (
            <Fragment>
                <div className="tournament-filter__header scroll-watcher">

                    <h1 className="sport-header results">Search results</h1>

                    {this.state.searchResult.length !== 0 ? (<div className="results">
                            <div className="result__item">
                                <div className="result__group">
                                    <div className="league">
                                        <div className="cell">
                                            Search results
                                        </div>
                                        <div className="cell">

                                        </div>
                                    </div>
                                    {this.state.searchResult.map((element) => {
                                        let options = {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "numeric"
                                        };

                                        let sportId = this.findSportId(element.sportName);
                                        let countryId = this.findCountryId(element.country, sportId);
                                        return <div className="event__row" key={element.matchId}>
                                            <div
                                                className="time">{new Date(element.startDate).toLocaleDateString("en", options)}</div>
                                            <div className="time">{new Date(element.startDate).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</div>
                                            <div className="a">{element.matchName}</div>
                                            <div className="s score" >

                                                <button onClick={this.handleRedirect(`/sport/details/${sportId}-${countryId}-${element.tournamentId}-${element.matchId}`)}>More</button>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : <p>No results</p>}


                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            locale: state.intl.locale,
            sports: state.sportList.sports,
            tournamentId: state.tournamentId,
            currentTournamentData: state.currentTournamentData,
            topTournaments: state.sportList.top_tournaments,
            matchCategoriesSelected: state.matchCategoriesSelected,
            sportList: state.sportList,
            activeCategory: state.activeCategory,
            sportId: state.sportId,
            tournamentsData: state.tournamentsData,
            tournamentCounter: state.topTournament,
        }
    }
}

export default (connect(mapStateToProps))(withWidth()(withRouter(SearchResult)))


/*
  filterData = (inputValue) => {
        if (inputValue) {
            return this.options.filter(i =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        }
        return this.options;
    };

loadOptions = (inputValue, callback) => {
     let source = '{"sport":[{"country":"Italy","tournamentName":"Lega Pro, Girone B","away":"UC Albinoleffe","matchName":"Rimini Calcio - UC Albinoleffe","tournamentId":"96343","sportName":"Soccer","outright":false,"matchId":"803498","startDate":"2018-12-08T13:30:00.000Z","home":"Rimini Calcio"},{"country":"Italy","tournamentName":"Lega Pro, Girone A","away":"Virtus Entella","matchName":"ASD Albissola 2010 - Virtus Entella","tournamentId":"96342","sportName":"Soccer","outright":false,"matchId":"803486","startDate":"2018-12-09T17:30:00.000Z","home":"ASD Albissola 2010"},{"country":"England Amateur","tournamentName":"Premier League","away":"Brighton & Hove Albion FC","matchName":"Burnley FC - Brighton & Hove Albion FC","tournamentId":"1971","sportName":"Soccer","outright":false,"matchId":"796296","startDate":"2018-12-08T15:00:00.000Z","home":"Burnley FC"},{"country":"Spain","tournamentName":"Segunda Division","away":"CA Osasuna","matchName":"Albacete Balompie - CA Osasuna","tournamentId":"2180","sportName":"Soccer","outright":false,"matchId":"798193","startDate":"2018-12-08T17:00:00.000Z","home":"Albacete Balompie"},{"country":"England Amateur","tournamentName":"League One","away":"Shrewsbury Town","matchName":"Burton Albion - Shrewsbury Town","tournamentId":"1959","sportName":"Soccer","outright":false,"matchId":"796325","startDate":"2018-12-08T15:00:00.000Z","home":"Burton Albion"},{"country":"England Amateur","tournamentName":"Premier League","away":"Crystal Palace","matchName":"Brighton & Hove Albion FC - Crystal Palace","tournamentId":"1971","sportName":"Soccer","outright":false,"matchId":"769044","startDate":"2018-12-04T19:45:00.000Z","home":"Brighton & Hove Albion FC"},{"country":"Germany","tournamentName":"BBL","away":"Fraport Skyliners","matchName":"Alba Berlin - Fraport Skyliners","tournamentId":"2109","sportName":"Basketball","outright":false,"matchId":"646738","startDate":"2018-12-07T19:30:00.000Z","home":"Alba Berlin"},{"country":"England Amateur","tournamentName":"Premier League","away":"Chelsea FC","matchName":"Brighton & Hove Albion FC - Chelsea FC","tournamentId":"1971","sportName":"Soccer","outright":false,"matchId":"854449","startDate":"2018-12-16T13:30:00.000Z","home":"Brighton & Hove Albion FC"},{"country":"Scotland","tournamentName":"Third Division","away":"Stirling Albion","matchName":"Queens Park FC - Stirling Albion","tournamentId":"2022","sportName":"Soccer","outright":false,"matchId":"796355","startDate":"2018-12-08T15:00:00.000Z","home":"Queens Park FC"},{"country":"Denmark","tournamentName":"Superisligaen","away":"Aalborg Pirates","matchName":"Rungsted Ishockey - Aalborg Pirates","tournamentId":"4324","sportName":"Ice Hockey","outright":false,"matchId":"768465","startDate":"2018-12-04T18:00:00.000Z","home":"Rungsted Ishockey"},{"country":"Denmark","tournamentName":"Superligaen","away":"AC Horsens","matchName":"Aalborg BK - AC Horsens","tournamentId":"2092","sportName":"Soccer","outright":false,"matchId":"802972","startDate":"2018-12-09T13:00:00.000Z","home":"Aalborg BK"},{"country":"England Amateur","tournamentName":"Championship","away":"ASTON VILLA FC","matchName":"West Bromwich Albion - ASTON VILLA FC","tournamentId":"1972","sportName":"Soccer","outright":false,"matchId":"790264","startDate":"2018-12-07T20:00:00.000Z","home":"West Bromwich Albion"},{"country":"England Amateur","tournamentName":"League Cup","away":"Burton Albion","matchName":"Middlesbrough FC - Burton Albion","tournamentId":"3587","sportName":"Soccer","outright":false,"matchId":"870417","startDate":"2018-12-18T19:45:00.000Z","home":"Middlesbrough FC"},{"country":"England Amateur","tournamentName":"Championship","away":"West Bromwich Albion","matchName":"Sheffield United - West Bromwich Albion","tournamentId":"1972","sportName":"Soccer","outright":false,"matchId":"847251","startDate":"2018-12-14T19:45:00.000Z","home":"Sheffield United"}]}'

     this.options = JSON.parse(source)["sport"].map(suggestion => {
             suggestion["value"] = suggestion["matchName"];
             suggestion["label"] = suggestion["matchName"];
             return suggestion
         }
     );
     setTimeout(() => {
         callback(this.filterData(inputValue));
     }, 1000);
 };

 promiseOptions = inputValue => {
     return fetch('/hub/rest/liveSearch?query=' + inputValue + '&language=' + this.props.state.locale)
         .then(
             response => response.json()
         )
         .then(
             json => {
                 this.options = json["sport"].map(suggestion => {
                     suggestion["value"] = suggestion["matchName"];
                     suggestion["label"] = suggestion["matchName"];
                     return suggestion
                 });
                 return this.options
             })
         .then(
             () => {
                 return new Promise(resolve => {
                     setTimeout(() => {
                         resolve(this.filterData(inputValue));
                     }, 1000);
                 });
             })

 };
*/
