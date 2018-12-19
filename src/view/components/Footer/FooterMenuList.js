import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class FooterMenuList extends Component {
    state = {
        bottom: false,
        persistent: false
    };


    render() {
        return (
                <div className="footerInner">
                    <div className="footer__menu">
                        <div className="footer__menu-item">
                            <h2>Information</h2>
                            {console.log('this.props.bottom :', this.props.bottom)}
                            <ul onClick={
                                (this.props.bottomState) 
                                 ? () => this.props.setState({bottom: !this.props.bottomState, persistent: true})
                                 : null
                                }>
                                <li><NavLink to={"/pages/help/sports_betting"} activeClassName="active">Help</NavLink></li>
                                <li><NavLink to={"/pages/info/bonus"} activeClassName="active">Bonus</NavLink></li>
                                <li><NavLink to={"/pages/info/responsible-gaming-information"} activeClassName="active">Betting Rules (Responsible Gaming Policy)</NavLink></li>
                                <li><NavLink to={"/pages/info/sport-betting-rules-general"} activeClassName="active">Betting Rules (General)</NavLink></li>
                                <li><NavLink to={"/pages/info/sport-betting-rules-prematch"} activeClassName="active">Betting Rules (Pre-Match)</NavLink></li>
                                <li><NavLink to={"/pages/info/faq"} activeClassName="active">FAQ</NavLink></li>
                            </ul>

                        </div>
                        <div className="footer__menu-item">
                            <h2>Company</h2>
                            <ul onClick={
                                (this.props.bottomState) 
                                 ? () => this.props.setState({bottom: !this.props.bottomState, persistent: true})
                                 : null
                                }>
                                <li><NavLink to={"/pages/about/about-us"} activeClassName="active">About us</NavLink></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="https://www.koolbet237.com/pc/becomepartner">BECOME PARTNER</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer__sub-menu">
                        <div className="footer__sub-menu-item">
                            <img src="https://www.koolbet237.com/pc/resources/img/icons/mtn_logo.jpg" alt="" />
                            <img src="https://www.koolbet237.com/pc/resources/img/logo/logo-orange.png" alt="" />
                        </div>
                    </div>
                </div>
        );
    }
}

export default FooterMenuList; 