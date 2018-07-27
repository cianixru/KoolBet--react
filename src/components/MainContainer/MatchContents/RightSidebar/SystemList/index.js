import React from 'react';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import './modal.css';

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}


class SystemList extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (

            <div className="systems-list">
                <ul data-scrollbar>
                    <li className="betslip-system__radio-item">
                        <label className="radio-label">
                            <input name="SystemBets" type="radio" checked value="2/3" />
                            <span>
                                <span className="betslip-system__radio-item-help">
                                    <div data-toggle="modal" onClick={this.handleOpen} data-target="#systemModal" className="combinations-btn">3 bets</div>
                                </span>
                                <span className="betslip-system__radio-item-text">
                                    <span>System
                                <span className="bet-slip-menu-item-submenu-systemX">2</span>/<span className="bet-slip-menu-item-submenu-system">3</span>
                                    </span>
                                </span>
                            </span>
                        </label>
                    </li>

                </ul>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className="modalWindow">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Combinations</th>
                                        <th>Odds</th>
                                        <th>Poss. Win</th>
                                    </tr>
                                </thead>
                                <tbody><tr><td>ABC</td><td>4.05</td><td>0.00 XAF</td></tr><tr><td>ABD</td><td>42.65</td><td>0.00 XAF</td></tr><tr><td>ABE</td><td>7.00</td><td>0.00 XAF</td></tr><tr><td>ACD</td><td>16.09</td><td>0.00 XAF</td></tr><tr><td>ACE</td><td>2.64</td><td>0.00 XAF</td></tr><tr><td>ADE</td><td>27.81</td><td>0.00 XAF</td></tr><tr><td>BCD</td><td>30.51</td><td>0.00 XAF</td></tr><tr><td>BCE</td><td>5.01</td><td>0.00 XAF</td></tr><tr><td>BDE</td><td>52.72</td><td>0.00 XAF</td></tr><tr><td>CDE</td><td>19.89</td><td>0.00 XAF</td></tr><tr><td>...</td><td> </td><td></td></tr><tr><td>Total:</td><td id="systemTotalOddsModal">1322.69</td><td id="systemTotalPossModal">0.82 XAF</td></tr></tbody>
                            </table>
                    </div>
                </Modal>
            </div>
        );
    }
}

SystemList.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.


export default SystemList;


















/* 





class SystemList extends React.Component {

    state = { visible: false }

    showModal = () => {
      this.setState({
        visible: true,
      });
    }
  
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  
    render() {
  
        return (
            <div className="systems-list">

        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          
        >
          <p>Some contents...</p>
        </Modal>


                <ul data-scrollbar>
                    <li className="betslip-system__radio-item">
                        <label className="radio-label">
                            <input name="SystemBets" type="radio" checked value="2/3" />
                            <span>
                                <span className="betslip-system__radio-item-help">
                                    <div data-toggle="modal" data-target="#systemModal" className="combinations-btn">3 bets</div>
                                </span>
                                <span className="betslip-system__radio-item-text">
                                    <span>System
                                    <span className="bet-slip-menu-item-submenu-systemX">2</span>/<span className="bet-slip-menu-item-submenu-system">3</span>
                                    </span>
                                </span>
                            </span>
                        </label>
                    </li>
                    <li className="betslip-system__radio-item">
                        <label className="radio-label">
                            <input name="SystemBets" type="radio" checked value="2/3" />
                            <span>
                                <span className="betslip-system__radio-item-help">
                                    <div data-toggle="modal" data-target="#systemModal" className="combinations-btn">3 bets</div>
                                </span>
                                <span className="betslip-system__radio-item-text">
                                    <span>System
                                    <span className="bet-slip-menu-item-submenu-systemX">2</span>/<span className="bet-slip-menu-item-submenu-system">3</span>
                                    </span>
                                </span>
                            </span>
                        </label>
                    </li>
                    <li className="betslip-system__radio-item">
                        <label className="radio-label">
                            <input name="SystemBets" type="radio" checked value="2/3" />
                            <span>
                                <span className="betslip-system__radio-item-help">
                                    <div data-toggle="modal" data-target="#systemModal" className="combinations-btn">3 bets</div>
                                </span>
                                <span className="betslip-system__radio-item-text">
                                    <span>System
                                    <span className="bet-slip-menu-item-submenu-systemX">2</span>/<span className="bet-slip-menu-item-submenu-system">3</span>
                                    </span>
                                </span>
                            </span>
                        </label>
                    </li>

                </ul>
            </div>
        )
    }
}

export default SystemList;
// export default connect(mapStateToProps)(SystemList)



 */