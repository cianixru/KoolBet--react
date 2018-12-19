import React, {Fragment} from 'react';
import {connect} from "react-redux";
import AsyncSelect from 'react-select/lib/Async';
import  { components } from 'react-select';
import './style.css'
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import { Redirect } from 'react-router'
import {withRouter} from 'react-router-dom'

const SearchIcon = (props) => {
    return <span className="icon-search" {...props}>
    </span>;
}



const NewInput = (props) => {
    return (<input type="text" className="block-search__input" {...props}/>);

}

const NewControl = (props) => {
    return (
        <div className="block-search">
            <div className="block-search__inp-wrap"{...props}>

            </div>
        </div>
    );
};


const NewValueContainer = (props) => {
    return (
        <div {...props}></div>
    );
};

const NewIndicatorsContainer = (props) => {
    return (
        <div>
            <SearchIcon/>
        </div>
    );
};

const NewSingleValue = (props) => {
    return (
        <p className={"single"} {...props}/>
    );
};


class Search extends React.Component {
    state = {
        selectedOption: null,
        search:'',
        redirect: false
    }

    options = [];

    filterData = (inputValue) => {
        if (inputValue) {
            return this.options.filter(i =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        }
        return this.options;
    };

    loadOptions = (inputValue, callback) => {
        let source ='{"sport":[{"country":"Italy","tournamentName":"Lega Pro, Girone B","away":"UC Albinoleffe","matchName":"Rimini Calcio - UC Albinoleffe","tournamentId":"96343","sportName":"Soccer","outright":false,"matchId":"803498","startDate":"2018-12-08T13:30:00.000Z","home":"Rimini Calcio"},{"country":"Italy","tournamentName":"Lega Pro, Girone A","away":"Virtus Entella","matchName":"ASD Albissola 2010 - Virtus Entella","tournamentId":"96342","sportName":"Soccer","outright":false,"matchId":"803486","startDate":"2018-12-09T17:30:00.000Z","home":"ASD Albissola 2010"},{"country":"England Amateur","tournamentName":"Premier League","away":"Brighton & Hove Albion FC","matchName":"Burnley FC - Brighton & Hove Albion FC","tournamentId":"1971","sportName":"Soccer","outright":false,"matchId":"796296","startDate":"2018-12-08T15:00:00.000Z","home":"Burnley FC"},{"country":"Spain","tournamentName":"Segunda Division","away":"CA Osasuna","matchName":"Albacete Balompie - CA Osasuna","tournamentId":"2180","sportName":"Soccer","outright":false,"matchId":"798193","startDate":"2018-12-08T17:00:00.000Z","home":"Albacete Balompie"},{"country":"England Amateur","tournamentName":"League One","away":"Shrewsbury Town","matchName":"Burton Albion - Shrewsbury Town","tournamentId":"1959","sportName":"Soccer","outright":false,"matchId":"796325","startDate":"2018-12-08T15:00:00.000Z","home":"Burton Albion"},{"country":"England Amateur","tournamentName":"Premier League","away":"Crystal Palace","matchName":"Brighton & Hove Albion FC - Crystal Palace","tournamentId":"1971","sportName":"Soccer","outright":false,"matchId":"769044","startDate":"2018-12-04T19:45:00.000Z","home":"Brighton & Hove Albion FC"},{"country":"Germany","tournamentName":"BBL","away":"Fraport Skyliners","matchName":"Alba Berlin - Fraport Skyliners","tournamentId":"2109","sportName":"Basketball","outright":false,"matchId":"646738","startDate":"2018-12-07T19:30:00.000Z","home":"Alba Berlin"},{"country":"England Amateur","tournamentName":"Premier League","away":"Chelsea FC","matchName":"Brighton & Hove Albion FC - Chelsea FC","tournamentId":"1971","sportName":"Soccer","outright":false,"matchId":"854449","startDate":"2018-12-16T13:30:00.000Z","home":"Brighton & Hove Albion FC"},{"country":"Scotland","tournamentName":"Third Division","away":"Stirling Albion","matchName":"Queens Park FC - Stirling Albion","tournamentId":"2022","sportName":"Soccer","outright":false,"matchId":"796355","startDate":"2018-12-08T15:00:00.000Z","home":"Queens Park FC"},{"country":"Denmark","tournamentName":"Superisligaen","away":"Aalborg Pirates","matchName":"Rungsted Ishockey - Aalborg Pirates","tournamentId":"4324","sportName":"Ice Hockey","outright":false,"matchId":"768465","startDate":"2018-12-04T18:00:00.000Z","home":"Rungsted Ishockey"},{"country":"Denmark","tournamentName":"Superligaen","away":"AC Horsens","matchName":"Aalborg BK - AC Horsens","tournamentId":"2092","sportName":"Soccer","outright":false,"matchId":"802972","startDate":"2018-12-09T13:00:00.000Z","home":"Aalborg BK"},{"country":"England Amateur","tournamentName":"Championship","away":"ASTON VILLA FC","matchName":"West Bromwich Albion - ASTON VILLA FC","tournamentId":"1972","sportName":"Soccer","outright":false,"matchId":"790264","startDate":"2018-12-07T20:00:00.000Z","home":"West Bromwich Albion"},{"country":"England Amateur","tournamentName":"League Cup","away":"Burton Albion","matchName":"Middlesbrough FC - Burton Albion","tournamentId":"3587","sportName":"Soccer","outright":false,"matchId":"870417","startDate":"2018-12-18T19:45:00.000Z","home":"Middlesbrough FC"},{"country":"England Amateur","tournamentName":"Championship","away":"West Bromwich Albion","matchName":"Sheffield United - West Bromwich Albion","tournamentId":"1972","sportName":"Soccer","outright":false,"matchId":"847251","startDate":"2018-12-14T19:45:00.000Z","home":"Sheffield United"}]}'

        this.options = JSON.parse(source)["sport"].map(suggestion => {suggestion["value"]=suggestion["matchName"];suggestion["label"]=suggestion["matchName"];return suggestion}
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

    handleRedirect = ()=>{
        this.props.history.push("/search/"+this.state.search)
    }

    onSearchChange = (event)=>{
        this.setState({search: event.target.value});
    }

    render() {
        return (
            <Fragment>
                <div className="block-search">
                    <div className="block-search__inp-wrap">
                        <input type="text" placeholder="Search" className="block-search__input" onChange={this.onSearchChange}  value={this.state.search}/>

                            <span className="icon-search" onClick={this.handleRedirect}></span>
                        {this.state.redirect?<Redirect
                                to={{
                                    pathname: "/search/"+this.state.search,
                                }}
                            />
                            :null}
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            locale: state.intl.locale
        }
    }
}

export default (connect(mapStateToProps))(withRouter(Search))

/*

       <div className="block-search">
                <div className="block-search__inp-wrap">
                    <input type="text" placeholder="Search" className="block-search__input" />
                    <span className="icon-search"></span>
                </div>
            </div>

* */

/*

            <AsyncSelect
                    components={{
                        Input: NewInput,
                        DropdownIndicator: SearchIcon,
                        Control: NewControl,
                        IndicatorsContainer: NewIndicatorsContainer,
                        ValueContainer: NewValueContainer,
                        SingleValue:NewSingleValue
                    }}
                    placeholder={'Search'}
                    loadOptions={this.loadOptions}
                    onChange={this.handleChange()}

                />

 */