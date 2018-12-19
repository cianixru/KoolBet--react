import React, { PureComponent } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import withWidth, { isWidthUp,isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';

import Search from './Search';
import TournamentsMenu from './TournamentsMenu';
import SportCategories from './SportCategories';


const styles = {
    drawerPaper: {
        width: '100%',
        background: 'transparent',
        marginBottom: 50,
        overflow: 'hidden'
    },
};


class CategoriesMenu extends PureComponent {
    state = {
        openMenuState: []
    };

    changeCategory = (e, val) => {
        this.props.state.matchCategoriesSelected.includes(val) ?
            this.onCategoryRemove(val) :
            this.onCategoryAdd(val)
    }

    onCategoryAdd = (category) => {
        this.props.dispatch({ type: 'ADD_CATEGORY', payload: category })
    }

    onCategoryRemove = (category) => {
        this.props.dispatch({ type: 'DELETE_CATEGORY', payload: category })
    }

    reRender = () => {
        this.forceUpdate()
    }
    currentMenuState = (val) => {
        if (val !== this.state.openMenuState)
            this.setState({ openMenuState: val });
    }

    render() {
        const isAuthenticated = this.props.state.isAuthenticated;
        let marginTop = isWidthDown('md', this.props.width)?(!isAuthenticated?50:0):0;

        const catMenu = (

            <div className="categories-menu__container" >
                <Scrollbars
                    ref='catScrollbar'
                    renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                    renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                    renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4, top:marginTop }} className="view sportMenuPadding" />}
                    hideTracksWhenNotNeeded={true}
                    universal={true}
                >

                    <div className="categories-menu__inner">

                        {
                            <Search /> }

                        { isWidthDown('md', this.props.width)? <TournamentsMenu />:null }

                        <SportCategories isAuthenticated={isAuthenticated} resize={() => {
                            setTimeout(this.reRender(), 0)
                        }} currentMenuStateOut={this.state.openMenuState} currentMenuState={(val) => this.currentMenuState(val)} />

                    </div>

                </Scrollbars>
            </div>
        )

        return (
            isWidthUp('md', this.props.width)
                ?
                catMenu
                :
                <Drawer hideBackdrop
                        anchor="right"
                        open={this.props.state.currentTournamentData.length < 1}
                        className={"drilldown" + (!isAuthenticated) ? " notauth" : ""}
                        classes={{ paper: this.props.classes.drawerPaper }}
                        style={{zIndex: 10, marginTop: 50}} >
                    {catMenu}
                </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            isAuthenticated: state.isAuthenticated,
            matchCategoriesSelected: state.matchCategoriesSelected,
            sportList: state.sportList,
            sportId: state.sportId,
            currentTournamentData: state.currentTournamentData,
        }
    }
}

export default connect(mapStateToProps)(withWidth()(withStyles(styles)(CategoriesMenu)))

// if (categoriesList !== null) {
//     list = categoriesList.map((val, index) =>
//         <div classNameName="menu-category" key={index + '-' + val}>
//             <input
//                 type="checkbox"
//                 name="category"
//                 id={'cat-' + index}
//                 onChange={(e) => this.changeCategory(e, val)}
//                 checked={this.props.state.matchCategoriesSelected.includes(val) ? true : false}
//             />
//             <label htmlFor={'cat-' + index}>{val}</label>
//         </div>
//     )
// }