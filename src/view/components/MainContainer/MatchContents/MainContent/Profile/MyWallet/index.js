import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Logo imgs
import reqDeposit from 'view/img/pay_logos/request_deposit.png';
import mtnLogo from 'view/img/pay_logos/mtn-logo.jpg';
import omLogo from 'view/img/pay_logos/om_logo.png';
import ppLogo from 'view/img/pay_logos/pp_logo.png';
import paystack from 'view/img/pay_logos/paystack.png';
import interswitch from 'view/img/pay_logos/interswitch.png';
import reqWithdraw from 'view/img/pay_logos/request_withdraw.png';


let depositVariants = [
    {
        title: 'Request Deposit',
        src: reqDeposit
    },
    {
        title: 'MTN',
        src: mtnLogo
    },
    {
        title: 'Orange Money',
        src: omLogo
    },
    {
        title: 'PayPal',
        src: ppLogo
    },
    {
        title: 'Paystack',
        src: paystack
    },
    {
        title: 'Interswitch',
        src: interswitch
    },
];

let withdrawVariants = [

    {
        title: 'Request Withdraw',
        src: reqWithdraw
    },
    {
        title: 'Orange Money',
        src: omLogo
    },

];

const styles = theme => ({
    amount: {
        '& input': {
            background: 'none!important',
            border: 'none!important',
        }
    },
    cell: {
        userSelect: 'none',
    },
})



class MyWallet extends Component {
    state = {
        open: false,
        title: '',
        type: '',
    };

    handleClickOpen = (title, type) => {
        this.setState({ open: true, title: title, type: type });
    };

    handleClose = () => {
        this.setState({ open: false, title: '', type: '' });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="profile">
                <div className="profile__container">
                    <div className="profile__main">
                        <div className="header-nav--small h2--small">
                            <i className="back__icon"></i>
                            <span>My wallet</span>
                        </div>
                        <div className="profile__wrapper">
                            <div className="profile__inner">
                                <div className="payment-systems">
                                    <h2>Add funds</h2>
                                    <div className="row">
                                        {depositVariants.map((e, index) => {
                                            return <div className={"cell " + classes.cell} key={index} onClick={() => this.handleClickOpen(e.title, 'deposit')}>
                                                <div className="pay-system__card">
                                                    <img src={e.src} className="pay-system-card__logo"></img>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <h2>Withdraw money</h2>
                                    <div className="row">
                                        {withdrawVariants.map((e, index) => {
                                            return <div className={"cell " + classes.cell} key={index} onClick={() => this.handleClickOpen(e.title, 'withdraw')}>
                                                <div className="pay-system__card">
                                                    <img src={e.src} className="pay-system-card__logo"></img>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>

                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="form-dialog-title"
                            >
                                <DialogTitle id="form-dialog-title">{this.state.title}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>

                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        // margin="dense"
                                        id="name"
                                        label="Amount"
                                        type="number"
                                        InputProps={{
                                            className: classes.amount
                                        }}

                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleClose} color="primary">
                                        {this.state.type}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(MyWallet);