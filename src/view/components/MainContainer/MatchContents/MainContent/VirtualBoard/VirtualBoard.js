import React, { Component, Fragment } from 'react';
import TournamentList from './TournamentList';
import TournamentDetails from './TournamentDetails';


class VirtualBoard extends Component {

    render() {
        return (
            <Fragment>
                <TournamentList />
                <TournamentDetails />
            </Fragment>
        );
    }
}

export default VirtualBoard;