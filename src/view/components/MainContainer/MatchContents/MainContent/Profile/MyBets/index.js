import React, { Fragment, PureComponent } from 'react';
import { readCookie } from 'view/Utils/Cookies';
import moment from 'moment';

import { ticketsAPI } from "config/constants";

import MyBetsFilter from './MyBetsFilter';
import MyBetsCards from './MyBetsCards';

class MyBets extends PureComponent {
    state = {}

    componentDidMount() {
        this._asyncRequest = this.fetchTickets()
    }


    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
            this.fetchTickets()
        }
    }

    filter = e => {
        this.setState(prevState => { return { ...prevState, from: e.from, to: e.to, ticketState: e.ticketState } })
    }

    fetchTickets = () => {
        if (this.state.from && this.state.to) {
            let getParams = {
                from: moment(this.state.from).format('YYYY-MM-DD HH:mm:ss'),// date (format "yyyy-MM-dd HH:mm:ss"),
                till: moment(this.state.to).format('YYYY-MM-DD HH:mm:ss'),// date (format "yyyy-MM-dd HH:mm:ss"),            
                category: this.state.ticketState || 'All',// string enum { All, Won, Lost, Canceled, Open, PendingForApproval },            
                sortingField: 'DateCreated',// string enum { TicketNumber, DateCreated },            
                sortingValue: 'Desc',// string enum { Asc, Desc },            
                offset: 0, // number,            
                limit: 100, // number,
            };
            getParams = '?' + Object.keys(getParams).map(e => e + '=' + getParams[e]).join('&');
            let accessToken = readCookie('token');
            if (accessToken) {
                fetch(ticketsAPI + getParams, {
                    method: "GET",
                    headers: { "Content-type": "application/json", "Authorization": "Bearer " + accessToken },
                    credentials: 'include',

                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then(response => {
                        this._asyncRequest = null;
                        if (response !== undefined) {
                            this.setState(prevState => {
                                if (JSON.stringify(response.response) !== JSON.stringify(prevState.UserData)) {
                                    return { ...prevState, tickets: response.response }
                                }
                            })
                        }
                    })
            }
        }
    }


    render() {

        return (
            <Fragment>
                <MyBetsFilter filter={e => this.filter(e)} />
                <MyBetsCards tickets={this.state.tickets} />
            </Fragment>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         state: {
//             balance: state.balance,
//         }
//     }
// }

export default MyBets //connect(mapStateToProps)



