import React from 'react';

import CategoriesMenu from './CategoriesMenu';
import { myStyle } from './styles';

class LeftSidebar extends React.Component {
    render() {
        return (
            <div className="page-grid__item categories-menu" id="categoriesMenu" data-off-canvas data-transition-time="1">
                <CategoriesMenu myStyle={myStyle} />
            </div>
        )
    }
}

export default LeftSidebar