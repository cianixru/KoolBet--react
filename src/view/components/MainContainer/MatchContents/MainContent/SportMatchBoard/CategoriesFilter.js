import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import withWidth from '@material-ui/core/withWidth';


class CategoriesFilter extends Component {
    initialState = true;  //(this.props.width === 'lg') ? false : true;
    state = { open: this.initialState, markets: ['BMG_MAIN'] };

    handleClick = (e, index) => {
        this.setState((prevState) => ({
            ...prevState, open: (!prevState.open)
        }));
    };

    marketChange = (val) => {
        this.state.markets.includes(val)
            ? this.setState(prevState => { return { ...prevState, markets: prevState.markets.filter(e => e != val) } })
            : this.setState(prevState => { prevState.markets.filter(e => e != val); return { ...prevState, markets: [...prevState.markets.filter(e => e != val), val] } })
    }

    render() {
        this.props.selectededMarkets(this.state.markets, this.props.index);
        let marketGroups = this.props.categories
        return (
            <section className="categories-filter">

                <div className="tournament-filter__header scroll-watcher">
                    <div className={"tournament-filter__breadcrumbs " + this.props.sport}>
                        <i className={"cell icon-cell " + this.props.sport}></i>
                        <div className="cell title-cell">
                            <span className="catName">{this.props.title} </span>&nbsp;{/*SOCCER / GERMANY / OBERLIGA HAMBURG*/}
                        </div>

                        <div className="cell controls-cell">
                            <div
                                className="close icon-cell"
                                title="Close"
                                onClick={() => this.props.handleClose(this.props.index)}
                            ></div>
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
                    collapsedHeight={(['xs', 'sm'].includes(this.props.width)) ? '32px' : '0'}
                >
                    {
                        marketGroups.map((val) =>
                            <div className={"item" + (this.state.markets.includes(val) ? " active" : '')} onClick={() => this.marketChange(val)}>{val}</div>
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

export default withWidth()(CategoriesFilter)