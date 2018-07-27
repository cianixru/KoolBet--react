import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import CategoriesFilter from './CategoriesFilter';
import Main from './Markets/Main';
import ExactGoals from './Markets/ExactGoals';
import Total from './Markets/Total';
import FirstHalf from './Markets/FirstHalf';
import DcCombo from './Markets/DcCombo';
import FirstHalfDcCombo from './Markets/FirstHalfDcCombo';
import FirstHalfCombo from './Markets/FirstHalfCombo';
import FirstHalfCorrectScore from './Markets/FirstHalfCorrectScore';
import FirstHalfTotals from './Markets/FirstHalfTotals';
import Handicap from './Markets/Handicap';
import SportTablesMainExtended from './Markets/SportTablesMainExtended';
import HalftimeFulltime from './Markets/HalftimeFulltime';
import HtHalves from './Markets/HtHalves';

export default class SportMatchBoard extends React.Component {
    componentDidMount() {
        document.title = "Sport";
        document.querySelector("meta[name='description']").setAttribute("content", "");
        document.querySelector("meta[name='keywords']").setAttribute("content", "");
    }

    render() {
        return (
            <div class="page-grid__item main scroll">
                <Scrollbars
                    renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                    renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                    renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4 }} className="view" />}
                    hideTracksWhenNotNeeded={true}
                >
                    <CategoriesFilter resize={this.props.resize} />
                    <Main />
                    <ExactGoals />
                    <Total />
                    <FirstHalf />
                    <DcCombo />
                    <FirstHalfDcCombo />
                    <FirstHalfCombo />
                    <FirstHalfCorrectScore />
                    <FirstHalfTotals />
                    <Handicap />
                    <SportTablesMainExtended />
                    <HalftimeFulltime />
                    <HtHalves />
                </Scrollbars>
            </div>
        )
    }
}