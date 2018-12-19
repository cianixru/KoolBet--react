import React, { Fragment, Component } from 'react';
import TournamentList from './TournamentList';
import TournamentDetails from './TournamentDetails';


class VirtualBoard extends Component {

    render() {
        return (
            <Fragment>
                <TournamentList update={() => this.forceUpdate()} />
                <TournamentDetails />
            </Fragment>
        );
    }
}

export default VirtualBoard;