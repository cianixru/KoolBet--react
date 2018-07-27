import React from 'react';
// import BetSlip from './BetSlip';
import BSArea from './BSArea';
// import { connect } from "react-redux";

export default class RightSidebar extends React.Component {

    render() {
        return (
            <div className="page-grid__item betslip-area" id="betslipArea">
                <BSArea />
            </div>
        )
    }
}

// function mapStateToProps (state) {
//     return {
//         state:{
//         }
//     }
//   }

// export default connect(mapStateToProps)(RightSidebar)