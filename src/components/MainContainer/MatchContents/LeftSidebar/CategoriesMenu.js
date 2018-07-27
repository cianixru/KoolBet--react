import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from "react-redux";


import Search from './Search';
import TournamentsMenu from './TournamentsMenu';
import SportCategories from './SportCategories';


class CategoriesMenu extends React.Component {

    changeCategory = (e, val) => {
        this.props.state.matchCategoriesSelected.includes(val) ?
            this.onCategoryRemove(val) :
            this.onCategoryAdd(val)
    }

    onCategoryAdd = (category) => {
        this.props.dispatch({ type: 'ADD_CATEGORY', payload: category })
    }

    onCategoryRemove = (category) => {
        this.props.dispatch({ type: 'DELETE_CATEGORY', payload: category })
    }

    reRender = () => {
        this.forceUpdate()
    }

    render() {

        return (
                <div className="categories-menu__container scroll">
                    <Scrollbars
                        ref='catScrollbar'
                        renderTrackVertical={({ style, ...props }) => <div {...props} style={{ ...style, width: 4, right: 0, bottom: 2, top: 2, borderRadius: 3 }} className="track-vertical" />}
                        renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3 }} className="track-vertical" />}
                        renderView={({ style, ...props }) => <div {...props} style={{ ...style, paddingRight: 4 }} className="view" />}
                        hideTracksWhenNotNeeded={true}
                        universal={true}
                    >

                        <div className="categories-menu__inner">

                            <Search />

                            <TournamentsMenu />

                            <SportCategories resize={setTimeout(this.reRender, 0)} />

                        </div>

                    </Scrollbars>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            currentPage: state.currentPage,
            matchCategoriesSelected: state.matchCategoriesSelected,
        }
    }
}


export default connect(mapStateToProps)(CategoriesMenu)

// if (categoriesList != null) {
//     list = categoriesList.map((val, index) =>
//         <div classNameName="menu-category" key={index + '-' + val}>
//             <input
//                 type="checkbox"
//                 name="category"
//                 id={'cat-' + index}
//                 onChange={(e) => this.changeCategory(e, val)}
//                 checked={this.props.state.matchCategoriesSelected.includes(val) ? true : false}
//             />
//             <label htmlFor={'cat-' + index}>{val}</label>
//         </div>
//     )
// }