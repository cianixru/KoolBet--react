import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSystemBetsCount, tournamentsCount, systemTipSize } from './../BSLogic';
import Modal from '@material-ui/core/Modal';
import ModalSystemRows from './ModalSystemRows';
import { Radio } from 'antd';
import './modal.css';
import './BSForm.css';

const SystemGroup = Radio.Group;

class SystemList extends Component {
    state = {
        modalOpen: false,
    }
    static getDerivedStateFromProps(props, state) {

        if (props.state.betList.bankersArray !== state.prevBankerArray) {
            if ((systemTipSize(tournamentsCount(props.state.odds, props.TournamentsObj)) - props.state.betList.bankersArray.length) + 1 < props.state.betList.systemRadioValue && props.state.betList.systemRadioValue !== 2)
                props.dispatch({ type: 'SYSTEM_RADIO_VALUE', payload: (systemTipSize(tournamentsCount(props.state.odds, props.TournamentsObj, props.TournamentsObj)) - props.state.betList.bankersArray.length) + 1 })
        }

        return { ...state, prevBankerArray: props.state.betList.bankersArray }
    }
    handleModalOpen = (sysNum) => {
        this.props.dispatch({ type: 'SYSTEM_RADIO_VALUE', payload: sysNum })
        this.setState({ modalOpen: true });
    };
    handleModalClose = () => {
        this.setState({ modalOpen: false });
    };
    onChangeSystemRadio = (e) => {
        this.props.dispatch({ type: 'SYSTEM_RADIO_VALUE', payload: e.target.value })
    }

    render() {

        let tournamentsCountVal = tournamentsCount(this.props.state.odds, this.props.TournamentsObj);
        let tournamentsCountLength = (systemTipSize(tournamentsCountVal) > 1) ? systemTipSize(tournamentsCountVal) - this.props.bankersArrayLength : systemTipSize(tournamentsCountVal);

        // const SystemListItem = (props) => {
        //     return (
        //         <li class="betslip-system__radio-item">
        //             <Radio value={props.index + 1}>System {(props.index + 1)}/{props.tournamentsCount.length - props.bankersArrayLength}
        //                 <span class="betslip-system__radio-item-help">
        //                     <div onClick={() => this.handleModalOpen(props.index + 1)} className="combinations-btn">{getSystemBetsCount(props.index + 1, props.tournamentsCount.length - props.bankersArrayLength)} bets</div>
        //                 </span>
        //             </Radio>
        //         </li>
        //     )
        // }

        return (
            <SystemGroup
                onChange={this.onChangeSystemRadio}
                value={
                    this.props.state.betList.systemRadioValue
                }>
                <div className="systems-list">
                    <ul>
                        {/* <SystemListItem key={index + 1} index={index + 1} systemTipSize={tournamentsCountLength} tournamentsCount={tournamentsCountVal} bankersArrayLength={this.props.bankersArrayLength} /> */}
                        {[...Array(tournamentsCountLength)].map((number, index) =>
                            <li class="betslip-system__radio-item">
                                <Radio value={index + 2}>System {(index + 2)}/{tournamentsCountVal.length - this.props.bankersArrayLength}
                                    <span class="betslip-system__radio-item-help">
                                        <div onClick={() => this.handleModalOpen(index + 2)} className="combinations-btn">{getSystemBetsCount(index + 2, tournamentsCountVal.length - this.props.bankersArrayLength)} bets</div>
                                    </span>
                                </Radio>
                            </li>
                        )}
                        
                    </ul>
                    <Modal open={this.state.modalOpen} onClose={this.handleModalClose}>
                        <div className="modalWindow">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Combinations</th>
                                        <th>Odds</th>
                                    </tr>
                                </thead>
                                <ModalSystemRows coefsCalcArr={this.props.coefsCalcArr} systemCombos={this.props.systemCombos} totalSystemCoef={this.props.totalSystemCoef(this.props.coefsCalcArr)} />
                            </table>
                        </div>
                    </Modal>
                </div>
            </SystemGroup>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        state: {
            betList: state.betList,
            odds: state.odds,
            tournamentsData: state.tournamentsData,
        }
    }
}
export default connect(mapStateToProps)(SystemList);