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
        this.props.selectededMarkets(this.state.markets, this.props.index);
    }

    componentDidUpdate(prevProps, prevState) {
        if (isWidthDown('sm', this.props.width) && this.state.userExpandMenu === false)
            this.setState({ open: false });

        if (isWidthUp('md', this.props.width) && this.state.userExpandMenu === false)
            this.setState({ open: true });

        if(this.state.markets !== prevState.markets)
            this.props.selectededMarkets(this.state.markets, this.props.index);
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
       // this.props.selectededMarkets(this.state.markets, this.props.index);
        let marketGroups = this.props.categories
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
                        :
                        <div className={"tournament-filter__breadcrumbs " + this.props.sport.replace(' ', '')}>
                            <i className={"cell icon-cell " + this.props.sport.replace(' ', '')}></i>
                            <div className="cell title-cell">
                                <span className="catName">{this.props.title} </span>&nbsp;{/*SOCCER / GERMANY / OBERLIGA HAMBURG*/}
                            </div>

                            <div className="cell controls-cell">
                                <div
                                    className="close icon-cell"
                                    title="Close"
                                    onClick={() => this.props.handleClose(this.props.index)}
                                ></div>
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
                            marketGroups.map((val, index) =>
                                // <Tooltip TransitionComponent={Zoom} title={val.txt}>
                                <div key={index} title={val.txt} className={"item" + (this.state.markets.includes(val.id) ? " active" : '')} onClick={() => this.marketChange(val.id)}>{val.txts}</div>
                                // </Tooltip>
                            )
                        }
                    </Collapse>
                }

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