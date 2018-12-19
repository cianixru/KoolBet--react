import {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {balanceAPI,restAPI} from "config/constants";

import React from "react";
import {FormattedMessage} from "react-intl";
import BecomePartner from "./BecomePartner";
import AffiliateChartContainer from "./AffiliateChartContainer";
import "./style.css"
import {readCookie} from 'view/Utils/Cookies';

import MonthData from "./month.json"
import YearData from "./year.json"

class Affiliate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            affiliate: false,
            year: '',
            month: '',
            item: '',
            preloader: false,
            data: [],
            multiple: 0,
            incomeDetailsData:{}
        };
    }

    toggleAffiliate = () => {
        this.setState(prevState => {
            return {affiliate: !prevState.affiliate}
        })
    }

    setYear = (value) => {
        this.setState({
            year: value,
            month: '',
            incomeDetailsData:{}
        });
    }

    updateMultiple = (value) => {
        this.setState({
            multiple: value
        });
    }

    setMonth = (value, valueString) => {
        this.setState({
            month: valueString,
            year: '',
            incomeDetailsData:{}
        });
    }

    getPointDataOnClick = (e) => {
        if (Array.isArray(e) && e.length > 0){
            this.setState({
                incomeDetailsData:this.state.data[e[0]._index],
                item:e[0]._index
            })
        }

    }

    affiliateCheck = () => {
        let accessToken = readCookie('token');

        //TODO: Add check isAffiliate (this.props.UserData.affiliate)
        if (accessToken) {
            fetch(restAPI+"affiliate/statistics?from=2018-01-01&till=2018-01-02&granularity=day", {
                method: "GET",
                headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
            })
                .then(response => {
                    if (response.ok) {
                        this.setState(prevState => {
                            return {affiliate: !prevState.affiliate}
                        })
                        return response.json();
                    } else {
                        throw Error("No affiliate");
                    }
                    return null;
                })
                .catch((e) => {
                    console.log(e);
                    return null;
                })
        }
    }

    componentDidMount() {
        this.affiliateCheck();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("Update");

        if(this.state.month !== prevState.month || this.state.year !== prevState.year){
            this.setState(
                prevState => {
                    return {
                        preloader:!prevState.preloader}
                }
            )
        }

        let granularity = "day";
        let query =""

        if (this.state.month !== "" && this.state.month !== prevState.month && this.state.month) {
            granularity = "day";
            //console.log(this.state.month)
             query = "affiliate/statistics?from="+this.state.month.split("-")[0]+"-01-01&till="+(new Date(this.state.month.split("-")[0],0,0).getFullYear()+2)+"-01-01&granularity="+granularity
        }
        if (this.state.year !== "" && this.state.year !== prevState.year) {
            granularity = "month";
            query = "affiliate/statistics?from="+this.state.year+"-01-01&till="+(new Date(this.state.year,0,0).getFullYear()+2)+"-01-01&granularity="+granularity;
            //console.log(query)
        }

        if((this.state.month !== "" && this.state.month !== prevState.month)||(this.state.year !== "" && this.state.year !== prevState.year)){
            let accessToken = readCookie('token');

            //TODO: Add check isAffiliate (this.props.UserData.affiliate)
            if (accessToken) {
                fetch(restAPI+query, {
                    method: "GET",
                    headers: {"Content-type": "application/json", "Authorization": "Bearer " + accessToken},
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw Error("No affiliate");
                        }
                        return null;
                    })
                    .then(response => {
                        if(response.response.length>1){
                            if(response.response[0].day===null){
                                let dataY = [];
                                response.response.forEach((e)=>{
                                    if(e.year===this.state.year){
                                        dataY.push(e);
                                    }
                                })

                                this.setState(
                                    prevState => {
                                        return {
                                            preloader:!prevState.preloader,
                                            data:dataY}
                                    }
                                    )
                            }else{
                                let dataY = [];
                                let month = this.state.month.split("-")[1]
                                response.response.forEach((e)=>{
                                    if(e.month==month){
                                        dataY.push(e);
                                    }
                                })

                                this.setState(
                                    prevState => {
                                        return {
                                            preloader:!prevState.preloader,
                                            data:dataY}
                                    }
                                )
                            }

                        }else{
                            this.setState({data:[]})
                        }

                        return null;
                    })
                    .catch((e) => {
                        console.log(e);
                        return null;
                    })
            }
        }

        /*if (this.state.month !== "" && this.state.month !== prevState.month) {

            this.setState({data: MonthData.response})
        }
        if (this.state.year !== "" && this.state.year !== prevState.year) {
            this.setState({data: YearData.response})
        }*/
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {
            return false;
        } else {
            return true
        }
    }

    render() {
        return (
            <Fragment>
                <div className="payment-systems">
                    <h2>
                        <FormattedMessage
                            id="MainContainer.MatchContents.MainContent.Profile.Affiliate.Affiliate.Caption"
                            defaultMessage="Affiliate"/>
                    </h2>
                </div>
                {(this.props.state.userData.affiliate !== undefined) && (this.props.state.userData.affiliate === false && this.state.affiliate === false) ?
                    <BecomePartner affiliateToggle={this.toggleAffiliate}/> :
                    <AffiliateChartContainer
                        year={this.state.year}
                        month={this.state.month}
                        setYear={this.setYear}
                        setMonth={this.setMonth}
                        currency={this.props.state.userData.currency}
                        preloader={this.state.preloader}
                        multiple={this.state.multiple}
                        updateMultiple={this.updateMultiple}
                        data={this.state.data}
                        getPointDataOnClick={this.getPointDataOnClick}
                        incomeDetailsData={this.state.incomeDetailsData}
                        item={this.state.item}
                    />
                }
            </Fragment>
        )
            ;

    }
}


function mapStateToProps(state) {
    return {
        state: {
            userData: state.userData.currentUserData
        }
    }
}

export default connect(mapStateToProps)(Affiliate)
