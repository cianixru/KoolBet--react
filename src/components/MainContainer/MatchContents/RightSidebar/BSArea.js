import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import BSForm from './BSForm';

class BSArea extends Component {
    render() {
        return (
            <div className="betslip-area__container">
                <div className="betslip-area__inner">
                    <div className="bs__header">
                        <div className="bs__title">Betslip</div>
                        <div className="left-col">
                            <div className="bs-type-switcher hide">
                                <button className="select-size-1" data-toggle="changeBsType">Single</button>
                                <ul className="select-size-1__container dropdown-pane bottom" id="changeBsType" data-dropdown data-close-on-click="true" data-v-offset="0">
                                    <li className="select__item active">Single</li>
                                    <li className="select__item">Multiple</li>
                                    <li className="select__item">System</li>
                                </ul>
                            </div>
                            <i className="bs-hide" data-toggle="betslipArea"></i>
                        </div>
                    </div>

                    <div className="bs-tabs">
                        <ul>
                            <li className="bs-tabs__item">Single</li>
                            <li className="bs-tabs__item">Multiple</li>
                            <li className="bs-tabs__item active">System</li>
                        </ul>
                    </div>

                    <div className="bs-checkboxes">
                        <input id="box1" type="checkbox" checked />
                        <label htmlFor="box1">Advanced</label>
                        <input id="box2" type="checkbox" />
                        <label htmlFor="box2">Same Stake</label>
                    </div>

                    <Scrollbars
                        renderTrackVertical={({ style, ...props }) => <div {...props} style={{...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3}} className="track-vertical"/>}
                        renderThumbVertical={({ style, ...props }) => <div {...props} style={{...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3}} className="track-vertical"/>}
                        renderView={({ style, ...props }) => <div {...props} style={{...style, paddingRight: 4}} className="view"/>}
                        hideTracksWhenNotNeeded={true}

                    >
                        <BSForm/>
                    </Scrollbars>
                    
                </div>
            </div>
        );
    }
}

export default BSArea;