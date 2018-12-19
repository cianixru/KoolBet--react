import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class VerifyEmailMessageBox extends Component {
    state = {

    }
    urlParse = () => {
        let params = new URLSearchParams(this.props.location.search);
        let bookCodeUrl = params.get("booking_code");
        if(bookCodeUrl)
            this.makeRequest(bookCodeUrl);
    }


    render() {
        return (
                <div className="registration__wrapper">
                    <div className="registration-form complete">
                        <div className="complete-msg grid-container--nowrap">
                            <div className="cell s">
                                <i className="complete__icon"></i>
                            </div>
                            <div className="cell a">
                                <h3>Registration complete!</h3>
                                <div>
                                    Thank you for registration with Koolbet237.com. To activate your access please follow instructions in your email box.
                                </div>
                                <Link to="/" className="button go2main">Go to main</Link>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps,
)(VerifyEmailMessageBox);