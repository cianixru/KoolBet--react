import React, { Component } from 'react';

class FormList extends Component {
    render() {
        // console.log('this.props.signUpFieldsList :', JSON.stringify(this.props.signUpFieldsList))
        // const FieldsList = this.props.signUpFieldsList.map((item, index) => {
        //     return 1;
        // })
        return (
            <div>
            {this.props.signUpFieldsList.map((value, index) =>
                <div>1</div>
            )}
            </div>
        );
    }
}

export default FormList;