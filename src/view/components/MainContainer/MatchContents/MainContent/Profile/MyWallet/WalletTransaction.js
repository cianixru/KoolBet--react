import React, {PureComponent, Fragment} from 'react';
import {FormattedMessage} from "react-intl";

import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

import {readCookie} from "../../../../../../Utils/Cookies";
import {paymentStatusAPI} from "../../../../../../../config/constants";

class WalletTransaction extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            transactionCode: props.code || null,
            transactionData: null,
        };

        this.loadTransactionData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.transactionCode !== this.state.transactionCode)
            this.loadTransactionData();
    }

    render() {
        return (
            <Fragment>
                <div className="payment-systems">
                    <h2>
                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.WalletTransaction.Caption"
                                          defaultMessage="Transaction"/>&nbsp;{this.state.transactionCode}
                    </h2>

                    {(this.state.transactionData !== null)
                        ?
                        <Table className={'transaction-table'} style={{'color': 'white!important'}}>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Created at</TableCell>
                                    <TableCell>{this.state.transactionData.createdAt.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Update last at</TableCell>
                                    <TableCell>{this.state.transactionData.updatedAt.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Type</TableCell>
                                    <TableCell>{this.state.transactionData.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">System</TableCell>
                                    <TableCell>{this.state.transactionData.system}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Status</TableCell>
                                    <TableCell>{this.state.transactionData.status}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Amount</TableCell>
                                    <TableCell>{this.state.transactionData.amount}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Phone</TableCell>
                                    <TableCell>{this.state.transactionData.phoneNumber}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        :
                        <div>Data loading...</div>
                    }
                </div>
            </Fragment>
        );
    }

    loadTransactionData() {
        if (!this.state.transactionCode) return;

        let accessToken = readCookie('token');
        if (!accessToken)
            throw new Error("Unauthorized request");
        fetch(paymentStatusAPI + this.state.transactionCode, {
            method: "GET",
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
            credentials: 'include',
        }).then(response => {
            if (response.ok) return response.json();
        }).then(response => {
            let data = response.response;
            data.createdAt = new Date(data.createdAt);
            data.updatedAt = new Date(data.updatedAt);
            this.setState({
                transactionData: data,
            });
        });
    }
}

export default WalletTransaction;