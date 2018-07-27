import React from 'react';
import { connect } from "react-redux";

class FormContent extends React.Component {
    render() {
        return (
            <fieldset>
                {/* {this.props.state.bsTabs} */}
                <input type="checkbox" name="advanced" id="advanced" />
                <label htmlFor="advanced">Advanced</label>
                {this.props.state.bsTabs === 0
                    ? <span>
                        <input type="checkbox" name="same_stake" id="same_stake" />
                        <label htmlFor="same_stake">Same Stake</label>
                    </span>
                    : null}
                <MatchList {...this.props} />
            </fieldset>
        )
    }
}

class MatchList extends React.Component {

    onMatchRemove = (match) => {
        if (this.props.state.preMatches.includes(match)) {
            this.props.dispatch({ type: 'DELETE_PRE_MATCH', payload: match })
        } else if (this.props.state.liveMatches.includes(match)) {
            this.props.dispatch({ type: 'DELETE_LIVE_MATCH', payload: match })
        }
    }


    render() {

        let matches = this.props.state.liveMatches.concat(this.props.state.preMatches)

        return (
            <div>
                <ul id="bet_matches">
                    {matches.map((val, index) =>
                        <li key={index + '-' + val} onClick={e => this.onMatchRemove(val)}>
                            {val}
                            {this.props.state.liveMatches.includes(val) ? ' live! ' : ''}
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        state: {
            tableMatches: state.tableMatches,
            preMatches: state.preMatches,
            liveMatches: state.liveMatches,
            bsTabs: state.bsTabs
        }
    }
}

export default connect(mapStateToProps)(FormContent)