import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import BSForm from './BSForm';

class BSArea extends Component {
    render() {
        return (
            <div class="betslip-area__container">
                <div class="betslip-area__inner">
                    <div class="bs__header">
                        <div class="bs__title">Betslip</div>
                        <div class="left-col">
                            <div class="bs-type-switcher hide">
                                <button class="select-size-1" data-toggle="changeBsType">Single</button>
                                <ul class="select-size-1__container dropdown-pane bottom" id="changeBsType" data-dropdown data-close-on-click="true" data-v-offset="0">
                                    <li class="select__item active">Single</li>
                                    <li class="select__item">Multiple</li>
                                    <li class="select__item">System</li>
                                </ul>
                            </div>
                            <i class="bs-hide" data-toggle="betslipArea"></i>
                        </div>
                    </div>

                    <div class="bs-tabs">
                        <ul>
                            <li class="bs-tabs__item">Single</li>
                            <li class="bs-tabs__item">Multiple</li>
                            <li class="bs-tabs__item active">System</li>
                        </ul>
                    </div>

                    <div class="bs-checkboxes">
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