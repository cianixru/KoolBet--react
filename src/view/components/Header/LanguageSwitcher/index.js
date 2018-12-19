import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { updateIntl   } from 'react-intl-redux';

import { availableLanguages } from 'config/constants';

class LanguageSwitcher extends Component {
    
    render() {
        return (
            <Fragment>
                    
                    <select onChange={(e)=>{this.props.updateIntl(e, this.props.intl.locale)}} value={this.props.intl.locale} style={{marginBottom: 0}}>
                        {Object.keys(availableLanguages).map((key) => {
                            return (
                                <option value={availableLanguages[key].code} key={availableLanguages[key].code}>{availableLanguages[key].label}
                                </option>)
                        })}

                    </select>
                        <span className="icon-arrow"></span>

            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        updateIntl: (e, currentLocale) =>
        {
            const newLocale = e.target.value;
            if (newLocale !== currentLocale)
            {
                Promise.all([
                    import("./../../../../translations/dictionaries/" + newLocale + ".json")
                ]).then(([loadedDictionary, localeData]) =>
                {
                    dispatch(updateIntl({
                        locale  : newLocale,
                        formats : {},
                        messages: loadedDictionary
                    }));
                });
            }
        }
    }
};

function mapStateToProps(state) {
    return {
        intl : {
            locale: state.intl.locale,
            messages: state.intl.messages,
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher)
