import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { NavLink, withRouter } from 'react-router-dom'

let Tabs = ['sport', 'live', 'results'];

const ContentTabs = ({ history, location }) => (
    <Hidden smDown>
        <div className="header__menu">
            {
                Tabs.map((val, index) => {
                    return (
                        <div className="menu__item" key={index}>
                            <NavLink to={"/" + val} activeClassName="active">
                                {val} 
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    </Hidden>
)
export default withRouter(ContentTabs)