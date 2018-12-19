import React, { PureComponent } from 'react';
import Collapse from '@material-ui/core/Collapse';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
// import Tooltip from '@material-ui/core/Tooltip'; //TODO: tooltips add native scroll 
// import Zoom from '@material-ui/core/Zoom';


class CategoriesFilter extends PureComponent {
    state = {
        open: false,
        markets: this.props.initialSelect || ['BMG_MAIN'],
        userExpandMenu: false,
    };

    componentDidMount() {
        if (isWidthUp('md', this.props.width) && this.state.userExpandMenu === false) {
            this.setState({ open: true });
        }
    }

    componentDidUpdate() {
        if (isWidthDown('sm', this.props.width) && this.state.userExpandMenu === false)
            this.setState({ open: false });

        if (isWidthUp('md', this.props.width) && this.state.userExpandMenu === false)
            this.setState({ open: true });
    }

    handleClick = (e, index) => {
        this.setState({ open: !this.state.open, userExpandMenu: true });
    };

    marketChange = (val) => {
        this.state.markets.includes(val)
            ? this.setState(prevState => { return { ...prevState, markets: prevState.markets.filter(e => e !== val) } })
            : this.setState(prevState => { prevState.markets.filter(e => e !== val); return { ...prevState, markets: [...prevState.markets.filter(e => e !== val), val] } })
    }

    render() {
        this.props.selectededMarkets(this.state.markets, this.props.index);
        let marketGroups = this.props.categories
        return (
            <section className="categories-filter">
                <Collapse
                    in={this.state.open}
                    timeout={0}
                    classes={{ wrapperInner: 'tournament-odd-group' }}
                    id="odd-group-382"
                    collapsedHeight={(['xs', 'sm'].includes(this.props.width)) ? '32px' : '0'}
                >
                    {
                        marketGroups.map((val, index) =>
                            // <Tooltip TransitionComponent={Zoom} title={val.txt}>
                            <div key={index} title={val.txt} className={"item" + (this.state.markets.includes(val.id) ? " active" : '')} onClick={() => this.marketChange(val.id)}>{val.txts}</div>
                            // </Tooltip>
                        )
                    }
                </Collapse>

                <div className="btn-toggle-hide__container a2">
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