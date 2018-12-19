import React from "react";

import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

import {readCookie} from "../../../../../../Utils/Cookies";
import {profileUpdateAPI, userAPI} from "../../../../../../../config/constants";
import {
    AbstractPaymentDialog,
    STATE_NAME_DEFINE_AMOUNT,
    STATE_NAME_SUCCESS,
    STATE_NAME_WAIT
} from "./AbstractPaymentDialog";

const STATE_NAME_EDIT_PROFILE = "editProfile";
const STATE_NAME_POPUP_AFTER = "afterPaymentPopup";

export const SUCCESS_TEXT_WITHDRAW = "Withdraw is completed successfully!";

class DialogWithdraw extends AbstractPaymentDialog {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open || false,
            settings: props.settings || {title: ''},
            stateName: STATE_NAME_DEFINE_AMOUNT, // defineAmount || showAttentionBefore || editProfile || waitDecision || afterPaymentPopup
            profileData: {},
            inputs: {},

            status: 'open',
            statusText: 'Waiting...',
            localCode: '',
            pendingStart: null,

            onClose: props.onClose || null,
        };

        if (props.settings.editProfile !== undefined && props.settings.editProfile) {
            this.state.stateName = STATE_NAME_EDIT_PROFILE;
        }
    }

    static getDerivedStateFromProps(props, state) {
        let nextState = {};
        // console.log(props, state);

        if (props.open !== state.open) {
            nextState = {
                ...nextState,
                open: props.open,
                settings: props.settings,
            };
            if (props.settings.editProfile !== undefined && props.settings.editProfile) {
                nextState.stateName = STATE_NAME_EDIT_PROFILE;
            }
        }
        return nextState;
    }

    updateProfileAction = (profileData) => {
        let accessToken = readCookie('token');
        if (!accessToken) throw new Error("Unauthorized request");

        if (Object.keys(profileData).length > 0) {
            fetch(profileUpdateAPI, {
                method: "POST",
                headers: {"Content-type": "application/json", "Authorization": accessToken},
                body: JSON.stringify(profileData)
            }).then(response => {
                if (response.ok) return response.json();
            }).then(response => {
                console.log(response.response);
                this.setState({stateName: "defineAmount"});
            })
        }
    };

    changeProfileData = (type, value) => {
        this.setState({
            profileData: {
                ...this.state.profileData,
                [type.toLowerCase()]: value
            }
        })
    };

    changeInput = (type, value) => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [type.toLowerCase()]: value
            }
        })
    };

    handleAction = () => {
        this.paymentRequest('withdraw', this.state.settings, this.state.inputs, (localCode) => {
            if (this.state.settings.afterInstruction && this.state.settings.afterInstruction.wait) {
                this.callPaymentStatusChecker();
            } else {
                this.setState({stateName: "afterPaymentPopup"});
            }
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            settings: {title: ''},
            stateName: STATE_NAME_DEFINE_AMOUNT,
            profileData: {},
            inputs: {},
            status: 'open',
            statusText: 'Waiting...',
            localCode: '',
        });
        this.state.onClose.call(this);
    };

    componentDidUpdate(prevProps, prevState) {
        if (Object.keys(this.state.profileData).length === 0
            && this.state.open && this.state.stateName === "editProfile"
        ) {
            this.setState({open: false});
            let accessToken = readCookie('token');
            if (!accessToken) throw new Error("Unauthorized request");
            fetch(userAPI, {
                method: "GET",
                headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
                credentials: 'include',
            }).then(response => {
                if (response.ok) return response.json();
            }).then(response => {
                this.setState({
                    open: true,
                    profileData: response.response,
                    inputs: {
                        ...this.state.inputs,
                        phone: response.response.phone
                    },
                });
            });
        }
    }

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
                        <DialogContentText>{SUCCESS_TEXT_WITHDRAW}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({open: false})
                        }} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>
            );
        }

        let contentPanel = null;
        let submitButton = null;
        switch (this.state.stateName) {
            case STATE_NAME_EDIT_PROFILE:
                contentPanel =
                    <DialogContent>
                        <DialogContentText>Confirm Phone number</DialogContentText>
                        <TextField key={"ep_last_name"} id="last_name" label="Last name" type="string"
                                   style={{display: 'flex'}}
                                   value={this.state.profileData.lastName || ''}
                                   onChange={(e) => this.changeProfileData('lastName', e.target.value)}/>
                        <TextField key={"ep_first_name"} id="first_name" label="First name" type="string"
                                   style={{display: 'flex'}}
                                   value={this.state.profileData.firstName || ''}
                                   onChange={(e) => this.changeProfileData('firstName', e.target.value)}/>
                        <TextField key={"ep_phone_number"} id="phone_number" label="Your phone number" type="string"
                                   style={{display: 'flex'}}
                                   value={this.state.profileData.phone || ''}
                                   onChange={(e) => this.changeProfileData('phone', e.target.value)}/>
                    </DialogContent>;
                submitButton =
                    <Button color="primary"
                            onClick={() => this.updateProfileAction(this.state.profileData)}>
                        Update
                    </Button>;
                break;
            case STATE_NAME_DEFINE_AMOUNT:
                contentPanel =
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField autoFocus id="name" label="Amount" type="string" style={{display: 'flex'}}
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
                                null
                        }
                    </DialogContent>;

                submitButton =
                    <Button
                        onClick={() => this.handleAction(this.state.settings, this.state.inputs)}
                        color="primary">
                        Withdraw
                    </Button>;
                break;
            case STATE_NAME_WAIT:
                contentPanel = this.buildWaitDecisionWidget('withdraw');
                break;
            case STATE_NAME_POPUP_AFTER:
                contentPanel =
                    <DialogContent>
                        <DialogContentText>
                            {this.state.settings.afterInstruction.label}
                        </DialogContentText>
                    </DialogContent>;
                break;
            default:
                throw new Error("Unexpected stateName \"" + this.state.stateName + "\"");
        }

        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{this.state.settings.title}</DialogTitle>
                {contentPanel}
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        {null === submitButton ? "Ok" : "Cancel"}
                    </Button>
                    {submitButton}
                </DialogActions>
            </Dialog>
        );
    };
}

export default DialogWithdraw;