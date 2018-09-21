import { Component } from 'react';
import { readCookie } from './Cookies';

import { balanceAPI } from "config/constants";

export default class GetBalance extends Component {
    state = { balance: '0' }

    componentDidMount() {
        let accessToken = readCookie('token');
        if (accessToken) {
            fetch(balanceAPI, {
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
                    if (response !== undefined) {
                        this.setState(prevState => {
                            if (prevState.balance !== response) {
                                return { balance: response.response }
                            }
                        })
                    }
                })
        }
    }

    render() {
        return this.state.balance + '$';
    }
}