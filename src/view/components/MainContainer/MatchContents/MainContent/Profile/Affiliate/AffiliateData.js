import React from "react";
import {Component, Fragment} from 'react';

import "./style.css"
import {readCookie} from 'view/Utils/Cookies';
import Moment from "moment";

class AffiliateData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preloader: false,
        };
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
       // console.log("AffiliateData updated")
    }*/

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {
            return false;
        } else {
            return true
        }
    }

    getMultipleName = () => {
        switch (this.props.multiple) {
            case 0:
                return "There are no data."
                break;
            case 1:
                return "There are no data for bets of type single."
                break;
            case 2:
                return "There are no data for bets of type x2"
                break;
            case 3:
                return "There are no data for bets of type x3"
                break;
            default:
                return "There are no data."
        }
    }

    prepareData = () => {

        let resultData = [];
        if(this.props.incomeDetailsData.year){
            if (  Array.isArray(this.props.incomeDetailsData.commissions.commission)) {
                this.props.incomeDetailsData.commissions.commission.forEach(
                    (e) => {
                        if (e.type === this.props.multiple && this.props.multiple !== 0)
                            resultData.push(e);
                        if (this.props.multiple === 0)
                            resultData.push(e);
                    })
            }

        }

        return resultData
    }

    prepareDate = () => {
        let date = '';
        if (this.props.incomeDetailsData.year) {
            if (this.props.incomeDetailsData.day !== null) {
                date = '(' + this.props.incomeDetailsData.day + '/' + this.props.incomeDetailsData.month + '/' + this.props.incomeDetailsData.year + ')'
            } else {
                date = '(' + this.props.incomeDetailsData.month + '/' + this.props.incomeDetailsData.year + ')'
            }
        }
        return date
    }

    drawData = (data) => {

        let resultData = [];
        data.forEach((e, index) => {
            resultData.push(<div key={index} className="affiliate-data__body_element">
                <div className="affiliate-data__body_element_betamount">{e.betamount}</div>
                <div>
                    <div className="affiliate-data__body_element_commission-per">Multiple x{e.type} ({parseFloat(e.value)}%)</div>
                    <div className="affiliate-data__body_element_commission-sum">
                        <span>{e.sum} EUR</span>
                    </div>
                </div>
            </div>)
        })
        return resultData
    }


    render() {
        let data = this.prepareData();
        return (
            <Fragment>
                <div className="affiliate-data__header">Income details&nbsp;{this.prepareDate()}</div>
                <div className="affiliate-data_warning">
                    {(this.props.year === '' && this.props.month === '')||((this.props.year !== '' || this.props.month !== '') && !this.props.incomeDetailsData.commissions && data.length===0 && this.props.multiple===0) ? "No data selected" : null}
                    {(this.props.year !== '' || this.props.month !== '') && this.props.incomeDetailsData.commissions && data.length===0 ? "There are no data for bets of selected type" : null}
                </div>

                <div className="affiliate-data__body">
                    {this.drawData(data)}
                </div>
                {this.props.incomeDetailsData.commissions ? <div className="affiliate-data__header">Unique
                    players: {this.props.incomeDetailsData.uniqueUsers}</div> : null}


            </Fragment>
        );

    }
}

export default AffiliateData
/*
  <div className="affiliate-data__body_element">
                            <div className="affiliate-data__body_element_betamount">3</div>
                            <div>
                                <div className="affiliate-data__body_element_commission-per">Multiple x2 (1.0%)</div>
                                <div className="affiliate-data__body_element_commission-sum">
                                    <span>0.13 EUR</span>
                                </div>
                            </div>
                        </div>

 */