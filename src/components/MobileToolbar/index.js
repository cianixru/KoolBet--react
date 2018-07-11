import React from 'react';
// import { connect } from "react-redux";

export default class MobileToolbar extends React.Component {

    render() {
        return (

            <div class="footer-menu__container">
                <div class="footer-menu__item categories icon-btn active">
                    <span class="footer-menu__label">All sports</span>
                </div>
                <div class="footer-menu__item live icon-btn">
                    <span class="footer-menu__label">LIVE</span>
                </div>
                <div class="footer-menu__item betslip icon-btn" data-toggle="betslipArea">
                    <span class="footer-menu__label">Betslip</span>
                    <div class="button-counter">
                        <span>2</span>
                    </div>
                </div>
                <div class="footer-menu__item virtual icon-btn">
                    <span class="footer-menu__label">Virtual games</span>
                </div>
                <div class="footer-menu__item coupon icon-btn" data-toggle="betslipArea">
                    <span class="footer-menu__label">Coupon check</span>
                </div>
            </div>


        )
    }
}