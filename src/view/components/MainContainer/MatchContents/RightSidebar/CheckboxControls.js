import React from 'react';
import { connect } from "react-redux";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class CheckboxControls extends React.Component {
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

        return (
            <div className="bs-checkboxes">
                <FormControlLabel
                    classes={{ root: classes.root }}
                    label='Advanced'
                    control={
                        <Checkbox
                            checked={this.props.state.betSlip.advanced}
                            onChange={this.handleChangeCheckbox('checkAdvanced')}
                            className={classes.size}
                        />
                    }
                />
                {this.props.state.betSlip.tab === 0
                    ? <FormControlLabel
                        classes={{ root: classes.root }}
                        label='Same Stake'
                        control={
                            <Checkbox
                                checked={this.props.state.betSlip.sameStake}
                                onChange={this.handleChangeCheckbox('checkSameStake')}
                                className={classes.size}
                            />
                        }
                    />
                    : null}
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

CheckboxControls.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CheckboxControls))