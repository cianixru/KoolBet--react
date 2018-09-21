
import React, { Component, Fragment } from 'react';

class ModalSystemRows extends Component {
    render() {
        return (
            <tbody>
                {this.props.coefsCalcArr.map((value, index) =>
                    <SystemRow value={value} index={index} systemCombos={this.props.systemCombos} totalSystemCoef={this.props.totalSystemCoef} />
                )}
                {
                    <Fragment>
                        {(this.props.coefsCalcArr.length > 9) ? <tr><td>...</td><td></td></tr> : null}
                        <tr>
                            <td>Total: </td>
                            <td>
                                {this.props.totalSystemCoef}
                            </td>
                        </tr>
                    </Fragment>
                }
            </tbody>
        );
    }
}

export default ModalSystemRows;

const SystemRow = (props) => {
    return (
        <Fragment>
            <tr>
                <td>{props.systemCombos[props.index]}</td>
                <td>{props.value}</td>
            </tr>
        </Fragment>
    )
}