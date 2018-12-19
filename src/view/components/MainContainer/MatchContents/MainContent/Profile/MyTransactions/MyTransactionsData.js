import React, { PureComponent, Fragment } from 'react';

// import MyBetsModal from './MyBetsModal';
import { FormattedMessage } from 'react-intl';

class MyTransactionsData extends PureComponent {
    state = {

    }

    render() {

        console.log('====> :', this.props.tickets);

        let data = this.props.tickets;



        if (data && data.history) {
            return (
                <Fragment>
                    <table className="responsive-table transitions__table">
                        <thead>
                            <tr>
                                <th>Ticket number</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.history.map((e, index) => {
                                    return <Fragment>
                                        <tr>
                                            <td data-label="Ticket number">{e.typeName}</td>
                                            <td data-label="Amount">{e.amount}</td>
                                            <td data-label="Date">{new Date(e.createdAt).toLocaleString()}</td>
                                        </tr>
                                    </Fragment>
                                }
                                )
                            }
                        </tbody>
                    </table>
                </Fragment>
            )
        }
        else return null
    }
}

export default MyTransactionsData;