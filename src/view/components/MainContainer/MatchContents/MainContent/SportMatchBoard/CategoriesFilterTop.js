import React, { PureComponent } from 'react';
import Collapse from '@material-ui/core/Collapse';
// import Tooltip from '@material-ui/core/Tooltip';
// import Zoom from '@material-ui/core/Zoom';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

class CategoriesFilterTop extends PureComponent {
    state = {
        open: false,
        markets: this.props.initialSelect,
        userExpandMenu: false,
    };


    render() {
        return (
            <section className="categories-filter">

                <div className="tournament-filter__header scroll-watcher">

                    {(isWidthDown('sm', this.props.width))
                        ?
                        <div className="sport__title__wrapper">
                            <i className="sport__back-button back__icon" onClick={() => this.props.handleClose(this.props.index)}></i>
                            {this.props.type === 'live' && <span className="live-status">LIVE</span>}
                            <span className="sport__title">{this.props.title}</span>
                        </div>
                        :null

                    }

                </div>
                    

            </section>
        );
    }
}

export default withWidth()(CategoriesFilterTop)