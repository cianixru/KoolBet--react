import React, { PureComponent } from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%!important',
    height: '100%',
    '&>div': {
      width: '100%!important',
      height: 3,
      left: 0,
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#ff7b7b',
      '&>div': {
        width: '100%!important',
        backgroundColor: 'red'
      }
    }
  },
};

class LinearDeterminate extends PureComponent {
  state = {
    ProgressLine: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { ProgressLine } = this.state;
    if (ProgressLine === 100) {
      this.props.clearSelectRemovedOddId('RemovedBetMarketId',false);  
      this.props.clearSelectRemovedOddId('SelectRemovedOddId',false);
    } else {
      this.setState({ ProgressLine: Math.min(ProgressLine + 1, 100) });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={this.state.ProgressLine}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LinearDeterminate);