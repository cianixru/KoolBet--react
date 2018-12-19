import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withRouter } from 'react-router-dom'

class BottomNavBar extends PureComponent {

  handleRedirect = (link) => () => this.props.history.push(link);

  handleChange = (event, value) => this.props.dispatch({ type: 'BN_ACTION', payload: value });

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <BottomNavigation
          value={this.props.state.bottomNavigation.bnAction}
          onChange={this.handleChange}
          showLabels
          className={"footer-menu__container " + (classes.root)}
        >
          <BottomNavigationAction onClick={this.handleRedirect('/sport')} label="ALL SPORTS" className="footer-menu__item icon-btn categories" classes={{ selected: this.props.classes.selected }} />
          <BottomNavigationAction onClick={this.handleRedirect('/live')} label="LIVE" className="footer-menu__item icon-btn live" classes={{ selected: this.props.classes.selected }} />

          <BottomNavigationAction label="BETSLIP" style={{'&:after': {content: this.props.state.betList.tipSize, }   }} className="footer-menu__item icon-btn betslip" classes={{ selected: this.props.classes.selected }} />
          {/* <span className="button-counter__wrapper">
            <div className="button-counter" label="1  ">
              <span>{this.props.state.betList.tipSize}</span>
            </div>
          </span> */}
          <BottomNavigationAction onClick={this.handleRedirect('/virtual')} label="VIRTUAL GAMES" className="footer-menu__item icon-btn virtual" classes={{ selected: this.props.classes.selected }} />
          <BottomNavigationAction label="COUPON CHECK" className="footer-menu__item icon-btn coupon" classes={{ selected: this.props.classes.selected }} />
        </BottomNavigation>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: {
      bottomNavigation: state.bottomNavigation,
      betList: state.betList,
    }
  }
}

const styles = theme => ({
  root: {
    height: 50,
    backgroundColor: 'inherit',
  },
  selected: {
    color: '#ffbf00!important',
    '&:before': {
      color: '#ffbf00!important',
    }
  }

});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(BottomNavBar)))
