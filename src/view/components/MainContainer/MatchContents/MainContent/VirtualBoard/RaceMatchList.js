import React, { Component, Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Win from './Win';
import Place from './Place';
import Forecast from './Forecast';
import Tricast from './Tricast';


export default class RaceMatchList extends Component {

    state = { tab: 0 }

    handleTabChange = (e, tab) => {
        this.setState({ tab });
    }

    render() {
        let getTab = () => {
            switch (this.state.tab) {
                case 0: {
                    return <Win handleOddClick={this.props.handleOddClick} matchData={this.props.matchData} />
                }
                case 1: {
                    return <Place handleOddClick={this.props.handleOddClick} matchData={this.props.matchData} />
                }
                case 2: {
                    return <Forecast handleOddClick={this.props.handleOddClick} matchData={this.props.matchData} />
                }
                case 3: {
                    return <Tricast handleOddClick={this.props.handleOddClick} matchData={this.props.matchData} />
                }
                default:
                    null
                    break;
            }
        }

        return (
            <Fragment>
                <Tabs className="race-bet__tab" value={this.state.tab} centered onChange={this.handleTabChange}>
                    <Tab label="Win" />
                    <Tab label="Place" />
                    <Tab label="Forecast" />
                    <Tab label="Tricast" />
                </Tabs>


                {getTab()}

            </Fragment>
        );
    }
}
