import React from 'react';
import { connect } from "react-redux";

import FormContent from './FormContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

class BetSlip extends React.Component {

    menuChange = (e, val) => {
        this.props.dispatch({ type: 'BS_TAB_CHANGE', payload: val })
    }

    onMatchClear = () => {
        this.props.dispatch({ type: 'CLEAR_PRE_MATCH_LIST' })
        this.props.dispatch({ type: 'CLEAR_LIVE_MATCH_LIST' })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="betslip">
                    <Tabs
                        value={this.props.state.bsTabs}
                        onChange={this.menuChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Single" />
                        <Tab label="Multiple" />
                        <Tab label="System" />
                    </Tabs>

                    <div className="bs-board">
                        <form>
                            <FormContent />
                            <Button variant="raised" className="red-button" onClick={this.onMatchClear}>
                                Clear
                            </Button>
                            <Button variant="raised" className="green-button">
                                Save
                            </Button>
                            <Button variant="raised" className="green-button">
                                Place Bet
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            bsTabs: state.bsTabs
        }
    }
}

export default connect(mapStateToProps)(BetSlip)