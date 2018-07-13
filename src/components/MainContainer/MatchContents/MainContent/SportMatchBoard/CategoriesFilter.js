import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import withWidth from '@material-ui/core/withWidth';


class CategoriesFilter extends Component {
    initialState = (this.props.width == 'lg') ? false : true;
    state = { open: this.initialState, market: [0] };
    handleClick = (e, index) => {
        this.setState((prevState) => ({
            open: (!prevState.open)
        }));
    };

    marketChange = (e, index) => {
        this.setState((prevState) => ({
            market:
                (!this.state.market.includes(index))
                    ? [...prevState.market, index]
                    : [...prevState.market.filter(i => i != index)]
        }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width != this.props.width) {
            this.setState((prevState) => ({
                open: (['xs','sm'].includes(nextProps.width)) ? false : true
            }));
        }
    }

    render() {
        let marketGroups = ['Main', 'Main Ext', 'HT/FT', 'Total goals', 'Handicap', 'Exact goals', 'Correct score', '1st H', '1H Total', '1H Score', '1H C. Score', '1H Combo', '1H DC Combo', '2nd H', '2H Total', '2H Score', '2H Combo', 'HT', 'HT Halves', 'AT', 'AT Halves', 'BT Goals', 'Combo', 'Combo BT', '2H DC Combo', 'NB', 'DC', 'DC Combo', 'DC / BT Score', 'O / E', 'Corners', '1H Corners', 'Tot. Corners', 'Special']
        return (
            <section className="categories-filter">

                <div className="tournament-filter__header scroll-watcher">
                    <div className="tournament-filter__breadcrumbs soccer">
                        <i className="cell icon-cell soccer"></i>
                        <div className="cell title-cell">
                            <span className="catName">SOCCER</span>&nbsp;/ GERMANY / OBERLIGA HAMBURG
                        </div>

                        <div className="cell controls-cell">
                            <div className="close icon-cell" title="Close"></div>
                            <div className="reload icon-cell" title="Reload"></div>
                            <div
                                className={"hide-block icon-cell " + (this.state.open ? "" : "arr-up")}
                                id="colps1"
                                title="Show/Hide"
                                onClick={e => this.handleClick(e, 0)}
                            ></div>
                        </div>
                    </div>
                </div>

                <Collapse
                    in={this.state.open}
                    timeout={0}
                    classes={{ wrapperInner: 'tournament-odd-group' }}
                    id="odd-group-382"
                    collapsedHeight = { (['xs','sm'].includes(this.props.width)) ? '32px' : '0' }
                >
                    {
                        marketGroups.map((val, index) =>
                            <div className={"item" + (this.state.market.includes(index) ? " active" : '')} onClick={(e) => this.marketChange(e, index)}>{val}</div>
                        )
                    }
                </Collapse>

                <div className="btn-toggle-hide__container">
                    <div className={"btn-toggle-hide collapse-tournaments" + (this.state.open ? "" : "arr-up ")}
                        id="colps2"
                        title="Show/Hide"
                        onClick={e => this.handleClick(e, 0)}>
                    </div>
                </div>

            </section>
        );
    }
}

// export default CategoriesFilter;
export default withWidth()(CategoriesFilter);
