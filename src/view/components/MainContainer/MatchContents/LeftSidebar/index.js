import React from 'react';

export default class LeftSidebar extends React.Component {
  render() {
    return (
      <div className={"page-grid__item categories-menu " + ((this.props.path.includes('/profile') || this.props.path.includes('/pages') ) ? ' profile__sidebar' : '')} id="categoriesMenu">
        {this.props.children}
      </div>
    )
  }
}
