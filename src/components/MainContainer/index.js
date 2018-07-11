import React from 'react';
import RegPage from './RegPage';
import LoginPage from './LoginPage';
import MatchContents from './MatchContents';

import { connect } from "react-redux";

class MainContainer extends React.Component {

    render() {
        let switcher;
         switch (this.props.state.authorisePage) {
            case 'regPage':
            switcher = <RegPage />
                break;
            case 'loginPage':
            switcher = <LoginPage />
                break;
            default:
                switcher = <MatchContents />
                break;
        }
        return (
            <div className="page__container">
              {switcher}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        state:{
            authorisePage: state.authorisePage
        }
    }
  }
  
export default connect(mapStateToProps)(MainContainer)