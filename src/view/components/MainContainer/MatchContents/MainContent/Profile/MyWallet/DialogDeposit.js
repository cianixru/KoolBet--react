import React from "react";

import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

import {
    AbstractPaymentDialog,
    STATE_NAME_ATTENTION_BEFORE,
    STATE_NAME_DEFINE_AMOUNT,
    STATE_NAME_SUCCESS,
    STATE_NAME_WAIT
} from "./AbstractPaymentDialog";

export const WAIT_FOR_DEPOSIT_TEXT = "Please approve payment on your mobile device";

export const SUCCESS_TEXT_DEPOSIT = "Deposit is completed successfully!";

class DialogDeposit extends AbstractPaymentDialog {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open || false,

            stateName: STATE_NAME_DEFINE_AMOUNT,

            settings: props.settings || {},
            inputs: {},

            statusText: 'Waiting...',
            localCode: null,
            pendingStart: null,

            onClose: props.onClose || null,
        };
    }

    static getDerivedStateFromProps(props, state) {
        let nextState = {};
        if (props.open !== state.open) {
            nextState = {
                open: props.open,
                settings: props.settings,
            };
        }
        return nextState;
    }

    changeInput = (type, value) => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [type.toLowerCase()]: value
            }
        })
    };

    submitAmountFormAction = () => {
        if (this.state.settings.beforeInstruction) {
            this.setState({
                stateName: STATE_NAME_ATTENTION_BEFORE
            })
        } else {
            this.paymentRequest('deposit', this.state.settings, this.state.inputs, () => {
                this.callPaymentStatusChecker();
            });
        }
    };

    submitAttentionBeforePopupAction = () => {
        this.paymentRequest('deposit', this.state.settings, this.state.inputs, () => {
            this.callPaymentStatusChecker();
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            stateName: STATE_NAME_DEFINE_AMOUNT,
            settings: {},
            inputs: {},
            statusText: 'Waiting...',
            localCode: null,
            pendingStart: null,
        });
        this.state.onClose.call(this);
    };

    render() {

        if (STATE_NAME_SUCCESS === this.state.stateName) {
            return (
                <Dialog
                    open={true}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.state.settings.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{SUCCESS_TEXT_DEPOSIT}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({open: false})
                        }} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>
            );
        }

        if (this.state.stateName === STATE_NAME_ATTENTION_BEFORE) {

            return (
                <Dialog
                    open={true}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.state.settings.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.state.settings.beforeInstruction.label}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({open: false})
                        }} color="primary">Cancel</Button>
                        <Button onClick={() => this.submitAttentionBeforePopupAction()}
                                color="primary">Continue</Button>
                    </DialogActions>
                </Dialog>
            );
        } else if (this.state.stateName === STATE_NAME_WAIT) {
            return (
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    {this.buildWaitDecisionWidget('deposit', WAIT_FOR_DEPOSIT_TEXT)}
                </Dialog>
            );
        } else {
            return (
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.state.settings.title}</DialogTitle>
                    {
                        (this.state.stateName === STATE_NAME_DEFINE_AMOUNT)
                            ?
                            <DialogContent>
                                <DialogContentText>

                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    // margin="dense"
                                    id="name"
                                    label="Amount"
                                    type="string"
                                    style={{display: 'flex'}}
                                    onChange={(e) => this.changeInput('amount', e.target.value)}
                                />

                                {
                                    (this.state.settings.fields && this.state.settings.fields.length > 0)
                                        ?
                                        this.state.settings.fields.map((field, index) => {
                                            return <TextField
                                                key={index}
                                                id={field}
                                                label={field}
                                                type="string"
                                                style={{display: 'flex'}}
                                                onChange={(e) => this.changeInput(field, e.target.value)}
                                            />
                                        })
                                        :
                                        (this.state.stateName === STATE_NAME_WAIT)
                                            ?
                                            <DialogContent>
                                                <DialogContentText>
                                                    Please approve payment on your mobile phone
                                                </DialogContentText>
                                            </DialogContent>
                                            : null
                                }


                            </DialogContent>
                            :
                            <DialogContent><DialogContentText>{this.state.statusText}</DialogContentText></DialogContent>
                    }
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={() => this.submitAmountFormAction()} color="primary">Deposit</Button>
                    </DialogActions>
                </Dialog>
            );

        }
    }
}

export default DialogDeposit;