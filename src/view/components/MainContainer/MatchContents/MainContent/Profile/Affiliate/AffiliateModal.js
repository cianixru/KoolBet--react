import React, {Component, Fragment} from 'react';

import Dialog from '@material-ui/core/Dialog';
import {withStyles} from '@material-ui/core/styles';
import {readCookie} from 'view/Utils/Cookies';
import {getTicketAPI} from "config/constants";
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

const styles = theme => ({
    drawerPaper: {
        width: '100%',
        boxShadow: 'none',
        background: 'transparent',
        margin: '0!important',
        // marginBottom: 50,       
        overflow: 'hidden',
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            padding: 20,
        },
    },
});

class AffiliateModal extends Component {
    state = {
        open: false,
    };

    componentDidMount() {
        this.setState({open: true})
    }


    closeModal = () => {
        this.setState({open: false}, () => {
            setTimeout(this.props.close, 1000)
        });
        this.props.closeHandler();
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        return (<Fragment>
            <Dialog
                classes={{paper: this.props.classes.drawerPaper}}
                fullScreen
                open={this.state.open}
                onClose={this.closeModal}
                scroll="body"
            >
                <div className="reveal"
                     style={{
                         top: 0 + 'px !important',
                         display: 'block',
                         border: 0,
                         borderColor: '#333',
                         width: isWidthUp('md', this.props.width)?'50%':'100%',
                         height: 'auto',
                         padding: 15,
                         background: '#2a2b3a'
                     }}
                >
                    {/* overflowY: 'auto', */}
                    <button className="close-button" aria-label="Close Accessible Modal" type="button"
                            onClick={this.closeModal}>
                        <span>&times;</span>
                    </button>
                    <div className="mybet__header">
                        <div className="cell">
                            {this.props.text}
                        </div>
                    </div>

                </div>
            </Dialog>
        </Fragment>)

    }
}

export default withStyles(styles)(withWidth()(AffiliateModal));