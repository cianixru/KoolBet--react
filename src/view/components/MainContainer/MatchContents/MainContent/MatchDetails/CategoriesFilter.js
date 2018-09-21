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

            {this.props.title}

                <div className="tournament-odd-group">
                    {
                        marketGroups.map((val) =>
                            <div className={"item" + (this.state.markets.includes(val) ? " active" : '')} onClick={() => this.marketChange(val)}>{val}</div>
                        )
                    }
                </div>

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