import React from "react";
import {Component, Fragment} from 'react';

import "./style.css"
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import {readCookie} from 'view/Utils/Cookies';
import AffiliateChartControl from "./AffiliateChartControl";
import AffiliateChart from "./AffiliateChart";
import AffiliateData from "./AffiliateData";

class AffiliateChartContainer extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(JSON.stringify(nextProps)===JSON.stringify(this.props) && JSON.stringify(nextState)===JSON.stringify(this.state)){
            return false;
        }else{
            return true
        }
    }
    render() {
        return(
            this.props.preloader?
                <Fragment>
                    <div className="loading loading__custom"/>
                </Fragment>
                :
                <Fragment>
                    <div className={"affiliate-chart__container"+ (!isWidthUp('md', this.props.width)?"__small":"")}>
                        <div  className={"affiliate-chart__left"+ (!isWidthUp('md', this.props.width)?"__small":"")}>
                            <div className={"affilate-chart__item"+ (!isWidthUp('md', this.props.width)?"__small":"")}>
                                <AffiliateChartControl
                                    setYear={this.props.setYear}
                                    setMonth={this.props.setMonth}
                                    year={this.props.year}
                                    month={this.props.month}
                                    multiple={this.props.multiple}
                                    updateMultiple={this.props.updateMultiple}
                                />
                            </div>
                            <div  className={"affilate-chart__item-margin affilate-chart__item"+ (!isWidthUp('md', this.props.width)?"__small":"")}>
                                <AffiliateChart
                                    currency={this.props.currency}
                                    data={this.props.data}
                                    year={this.props.year}
                                    multiple={this.props.multiple}
                                    getPointDataOnClick={this.props.getPointDataOnClick}
                                />
                            </div>
                        </div>
                        <div  className={"affiliate-chart__right"+ (!isWidthUp('md', this.props.width)?"__small":"")}>
                            <AffiliateData
                                incomeDetailsData={this.props.incomeDetailsData}
                                multiple={this.props.multiple}
                                data={this.props.data}
                                year={this.props.year}
                                month={this.props.month}
                                item={this.props.item}
                            />
                        </div>
                    </div>
                </Fragment>
        );

    }
}

export default withWidth()(AffiliateChartContainer)
