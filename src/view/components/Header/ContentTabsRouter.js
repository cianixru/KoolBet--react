import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { NavLink, withRouter } from 'react-router-dom'
import messages from "./messages.lang";
import {FormattedMessage} from "react-intl";

let Tabs = ['sport', 'live', 'results', 'virtual'];

const ContentTabs = ({ history, location }) => (
    <Hidden smDown>
        <div className="header__menu">
            {
                Tabs.map((val, index) => {
                    return (
                        <div className="menu__item" key={index}>
                            <NavLink to={"/" + val} activeClassName="active">
                                <FormattedMessage {...messages[val]} />
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    </Hidden>
)
export default withRouter(ContentTabs)