import React from 'react';

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

    render() {
        return (
            <div>
                <CategoriesFilter  resize={this.props.resize}/>
                <Main/>
                <ExactGoals/>
                <Total/>
                <FirstHalf/>
                <DcCombo/>
                <FirstHalfDcCombo/>
                <FirstHalfCombo/>
                <FirstHalfCorrectScore/>
                <FirstHalfTotals/>
                <Handicap/>
                <SportTablesMainExtended/>
                <HalftimeFulltime/>
                <HtHalves/>
            </div>
 
        )
    }
}