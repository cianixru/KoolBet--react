import React from 'react';

import CategoriesMenu from './CategoriesMenu';
import CategoriesMenuLive from './CategoriesMenuLive';
import { connect } from "react-redux";
import { myStyle } from './styles';



class LeftSidebar extends React.Component {
  render() {
    const getLeftMenu = (page) => {
      switch (page) {
        case 0:
          return <CategoriesMenu myStyle={myStyle} />
          break;

        case 1:
          return <CategoriesMenuLive />
          break;

        case 2:
          return ''
          break;

        default:
          return <CategoriesMenu />
          break;
      }
    }
    return (
      <div className="page-grid__item categories-menu" id="categoriesMenu" data-off-canvas data-transition-time="1">
        {getLeftMenu(this.props.state.currentPage)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: {
      currentPage: state.currentPage,
    }
  }
}

export default connect(mapStateToProps)(LeftSidebar)