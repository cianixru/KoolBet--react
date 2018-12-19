import React, {Fragment, PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';

import {depositVariants, withdrawVariants} from "./const";
import DialogWithdraw from "./DialogWithdraw";
import DialogDeposit from "./DialogDeposit";


const styles = theme => ({
    amount: {
        marginBottom: '2em',
        '& input': {
            background: 'none!important',
            border: 'none!important',
        }
    },
    cell: {
        userSelect: 'none',
    },
    waitingtext: {
        color: '#000',
    }
});

export class MyWallet extends PureComponent {
    state = {
        open: false,
        dialogSettings: {},
        title: '',
        system: '',
        type: '',
        fields: [],
        inputs: {},
        status: 'open',
        localCode: '',
        pendingStart: null,
    };

    handleClickOpenDialog = (type, dialogSettings) => {
        this.setState({
            open: true,
            type: type,
            dialogSettings: dialogSettings,
        });
    };


    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div className="payment-systems">
                    <h2>
                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyWallet.AddFunds.Caption"
                                          defaultMessage="Add funds"/>
                    </h2>
                    <div className="row system-d">
                        {depositVariants.map((e, index) => {
                            return <div className={"cell " + classes.cell} key={index}
                                        onClick={() => this.handleClickOpenDialog('deposit', e)}>
                                <div className="pay-system__card">
                                    <img src={e.src} className="pay-system-card__logo" alt=""/>
                                </div>
                            </div>
                        })}
                    </div>
                    <h2>
                        <FormattedMessage
                            id="MainContainer.MatchContents.MainContent.Profile.MyWallet.WithdrawMoney.Caption"
                            defaultMessage="Withdraw money"/>
                    </h2>
                    <div className="row system-w">
                        {withdrawVariants.map((e, index) => {
                            return <div className={"cell " + classes.cell} key={index}
                                        onClick={() => this.handleClickOpenDialog('withdraw', e)}>
                                <div className="pay-system__card">
                                    <img src={e.src} className="pay-system-card__logo" alt=""/>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <DialogDeposit open={this.state.open && this.state.type === 'deposit'}
                               settings={this.state.dialogSettings}
                               onClose={() => {
                                   this.setState({type: '', open: false});
                               }}
                />

                <DialogWithdraw open={this.state.open && this.state.type === 'withdraw'}
                                settings={this.state.dialogSettings}
                                onClose={() => {
                                    this.setState({type: '', open: false});
                                }}
                />

            </Fragment>
        );
    }
}

export default withStyles(styles)(MyWallet);
