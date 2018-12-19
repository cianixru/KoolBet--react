import React, { PureComponent } from 'react';
import Collapse from '@material-ui/core/Collapse';
// import Tooltip from '@material-ui/core/Tooltip';
// import Zoom from '@material-ui/core/Zoom';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

class CategoriesFilter extends PureComponent {
    state = {
        open: false,
        markets: this.props.initialSelect,
        userExpandMenu: false,
    };

    componentDidMount() {
        if (isWidthUp('md', this.props.width) && this.state.userExpandMenu === false) {
            this.setState({ open: true });
        }
        this.props.selectededMarkets(this.state.markets);
    }

    componentDidUpdate(prevProps, prevState) {
        if (isWidthDown('sm', this.props.width) && this.state.userExpandMenu === false)
            this.setState({ open: false });

        if (isWidthUp('md', this.props.width) && this.state.userExpandMenu === false)
            this.setState({ open: true });

        if(this.state.markets !== prevState.markets)
            this.props.selectededMarkets(this.state.markets);
    }

    handleClick = (e, index) => {
        this.setState({ open: !this.state.open, userExpandMenu: true });
    };

    marketChange = (val) => {
        this.state.markets.includes(val)
            ? this.setState(prevState => { return { ...prevState, markets: prevState.markets.filter(e => e !== val) } })
            : this.setState(prevState => { prevState.markets.filter(e => e !== val); return { ...prevState, markets: [...prevState.markets.filter(e => e !== val), val] } })
    };

    render() {
        // this.props.selectededMarkets(this.state.markets);
        let marketGroups = this.props.categories;
        return (
            <section className="categories-filter">

                <div className="tournament-filter__header scroll-watcher">

                    {(isWidthDown('sm', this.props.width))
                        ?
                        <div className="sport__title__wrapper">
                            <i className="sport__back-button back__icon" onClick={() => this.props.handleClose(this.props.index)}></i>
                            <span className="sport__title">{this.props.title}</span>
                        </div>
                        :
                        <div className={"tournament-filter__breadcrumbs " + this.props.sport.replace(' ', '')}>
                            <i className={"cell icon-cell " + this.props.sport}></i>
                            <div className="cell title-cell">
                                <span className="catName">{this.props.title} </span>
                            </div>

                            <div className="cell controls-cell">
                                <div className="reload icon-cell hide" title="Reload"></div>
                                <div
                                    className={"hide-block icon-cell " + (this.state.open ? "" : "arr-up")}
                                    id="colps1"
                                    title="Show/Hide"
                                    onClick={e => this.handleClick(e, 0)}
                                ></div>
                            </div>
                        </div>
                    }

                </div>

                {!this.props.isOutright &&
                <Collapse
                    in={this.state.open}
                    timeout={0}
                    classes={{ wrapperInner: 'tournament-odd-group' }}
                    id="odd-group-382"
                    collapsedHeight={(['xs', 'sm'].includes(this.props.width)) ? '32px' : '0'}
                >
                    {
                        marketGroups.sort((a, b) => {
                            if (a.id > b.id)
                                return 1;
                            if (a.id < b.id)
                                return -1;
                            return 0;
                            // (a, b) => (a.sort - b.sort)
                        }).map((val, index) =>
                            <div key={index} title={val.txt}
                                 className={"item" + (this.state.markets.includes(val.id) ? " active" : '')}
                                 onClick={() => this.marketChange(val.id)}>{val.txts}</div>
                        )
                    }
                </Collapse>
                }
            </section>
        );
    }
}

export default withWidth()(CategoriesFilter)