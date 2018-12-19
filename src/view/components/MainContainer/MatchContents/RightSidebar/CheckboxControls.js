import React, { Component } from 'react';
import { connect } from "react-redux";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import {FormattedMessage} from "react-intl";

class CheckboxControls extends Component {
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
        switch (name) {
            case ('checkAdvanced'):
                this.props.dispatch({ type: 'CHECK_ADVANCED', payload: !this.props.state.betSlip.advanced })
                break;
            case ('checkSameStake'):
                this.props.dispatch({ type: 'CHECK_SAMESTAKE', payload: !this.props.state.betSlip.sameStake })
                break;
            default:
                break;
        }
    };

    render() {
        const { classes } = this.props;
        const { advanced, sameStake, currentTab } = this.props.state.betSlip;
        
        return (
            <div className="bs-checkboxes">
                <FormControlLabel
                    classes={{ root: classes.root }}
                    label={<FormattedMessage id="MainContainer.MatchContents.RightSidebar.CheckboxControls.Advanced" defaultMessage="Advanced"/>}
                    control={
                        <Checkbox
                            checked={advanced}
                            onChange={this.handleChangeCheckbox('checkAdvanced')}
                            className={classes.size}
                        />
                    }
                />
                {currentTab === 0 &&
                    <FormControlLabel
                        classes={{ root: classes.root }}
                        label="Same Stake"
                        control={
                            <Checkbox
                                checked={sameStake}
                                onChange={this.handleChangeCheckbox('checkSameStake')}
                                className={classes.size}
                            />
                        }
                    />
                }
            </div>
        )
    }
}

const styles = ({
    root: {
        margin: 0,
    },
    size: {
        width: 'auto',
        height: 24,
    },
})

function mapStateToProps(state) {
    return {
        state: {
            betSlip: state.betSlip,
        }
    }
}

export default connect(mapStateToProps)(withStyles(styles)(CheckboxControls))