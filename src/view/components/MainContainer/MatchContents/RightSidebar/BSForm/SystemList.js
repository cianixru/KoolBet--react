import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getSystemBetsCount, systemCombinations, systemTipSize} from './../BSLogic';
import Modal from '@material-ui/core/Modal';
import {Radio} from 'antd';
import './modal.css';
import './BSForm.css';

const SystemsRadioGroup = Radio.Group;

class SystemList extends PureComponent {
    state = {
        modalOpen: false,
        calcTrigger:false,
        combos:[]
    }

    static getDerivedStateFromProps(props, state) {

        if (props.state.betList.tournamentsCount.length - 1 < props.state.betList.systemRadioValue)
            props.dispatch({type: 'SYSTEM_RADIO_VALUE', payload: props.state.betList.tournamentsCount.length - 1})

        if (props.state.betList.bankersArray !== state.prevBankerArray) {
            if ((systemTipSize(props.state.betList.tournamentsCount) - props.state.betList.bankersArray.length) + 1 < props.state.betList.systemRadioValue && props.state.betList.systemRadioValue !== 2)
                props.dispatch({
                    type: 'SYSTEM_RADIO_VALUE',
                    payload: (systemTipSize(props.state.betList.tournamentsCount) - props.state.betList.bankersArray.length) + 1
                })
        }
        return {prevBankerArray: props.state.betList.bankersArray}
    }

    handleModalOpen = (sysNum) => {
        this.props.dispatch({type: 'SYSTEM_RADIO_VALUE', payload: sysNum})
        let systemCombos = systemCombinations(this.props.state.betList.lettersArr, this.props.state.betList.systemRadioValue, this.props.state.betList.bankersArray,this.props.state.betList.matchObj);

        this.setState({modalOpen: true,combos:systemCombos});

    };
    handleModalClose = () => {
        this.setState({modalOpen: false});
    };
    onChangeSystemRadio = (e) => {
        this.props.dispatch({type: 'SYSTEM_RADIO_VALUE', payload: e.target.value})
    }

    render() {
        let addLetter = '';
        if(Array.isArray(this.props.state.betList.bankersArray)){
            this.props.state.betList.bankersArray.map((el) => {
                let letterIndex = this.props.state.betList.matchObj.findIndex(e => {
                    return e.OddId === el
                });
                if (letterIndex != -1) {
                    addLetter = addLetter +this.props.state.betList.lettersArr[letterIndex].toUpperCase()
                }

            });
        }

        const {systemRadioValue, tournamentsCount} = this.props.state.betList;
        const {bankersArrayLength, coefsCalcArr, totalSystemCoef} = this.props;

         let tournamentsCountVal = tournamentsCount;
        let tournamentsCountLength = (systemTipSize(tournamentsCountVal) > 1) ? systemTipSize(tournamentsCountVal) - bankersArrayLength : systemTipSize(tournamentsCountVal);

        return (
            <SystemsRadioGroup
                onChange={this.onChangeSystemRadio}
                value={systemRadioValue}>
                <div className="systems-list">
                    <ul>
                        {[...Array(tournamentsCountLength)].map((number, index) =>
                            <li className="betslip-system__radio-item" key={index} onClick={  this.props.toggleTrigger}>
                                <Radio
                                    value={index + 2}
                             >
                                    System {(index + 2)}/{tournamentsCountVal.length - bankersArrayLength}
                                    <span className="betslip-system__radio-item-help">
                                        <div onClick={() => this.handleModalOpen(index + 2)}
                                             className="combinations-btn">{getSystemBetsCount(index + 2, tournamentsCountVal.length - bankersArrayLength)} bets</div>
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
                                <tbody>
                                {coefsCalcArr.map((value, index) =>
                                    <tr>
                                        <td>{(this.state.combos[index]+addLetter).split('').sort().toString().toString().replace(new RegExp(',', 'g'), '')}</td>
                                        <td>{value}</td>
                                    </tr>
                                )}
                                {(coefsCalcArr.length > 9) ? <tr>
                                    <td>...</td>
                                    <td></td>
                                </tr> : null}
                                <tr>
                                    <td>Total:</td>
                                    <td>
                                        {totalSystemCoef(coefsCalcArr)}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal>
                </div>
            </SystemsRadioGroup>
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