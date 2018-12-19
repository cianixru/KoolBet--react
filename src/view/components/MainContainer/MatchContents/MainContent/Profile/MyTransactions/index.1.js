import React, {Fragment, PureComponent} from "react"
import {FormattedMessage} from "react-intl";

import {readCookie} from "../../../../../../Utils/Cookies";
import {getHistoryAPI} from "../../../../../../../config/constants";

import './styles.css';

class MyTransactions extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {

        this.setState({ open: false });
        let accessToken = readCookie('token');
        if (!accessToken) throw new Error("Unauthorized request");
        fetch(getHistoryAPI + "?from=2018-10-01 00:00:00&till=2019-01-01 00:00:00&type=13", 
            {
            method: "GET",
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
            credentials: 'include',
        }).then(response => {
            console.log('response :', response);
            if (response.ok)
            return response.json();
        }).then(response => {
            this.setState({
                data: true,
                profileData: response.response,
                inputs: {
                    ...this.state.inputs,
                    phone: response.response.phone
                },
            });
        });
    }


    // componentDidUpdate(prevProps, prevState) {
    //     this.setState({ open: false });
    //     let accessToken = readCookie('token');
    //     if (!accessToken) throw new Error("Unauthorized request");
    //     fetch(getHistoryAPI, {
    //         method: "GET",
    //         headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
    //         credentials: 'include',
    //     }).then(response => {
    //         console.log('response :', response);
    //         if (response.ok)
    //         return response.json();
    //     }).then(response => {
    //         this.setState({
    //             data: true,
    //             profileData: response.response,
    //             inputs: {
    //                 ...this.state.inputs,
    //                 phone: response.response.phone
    //             },
    //         });
    //     });
    // }

    render() {
        return (
            <Fragment>
                <div className="payment-systems">
                    <h2>
                        <FormattedMessage id="MainContainer.MatchContents.MainContent.Profile.MyTransactions.Caption"
                                          defaultMessage="My transactions"/>
                    </h2>


                    111
                </div>
            </Fragment>
        );
    }
}

export default MyTransactions;