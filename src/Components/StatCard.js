//react and material ui imports
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//importing styles
import '../styles/contentStyles.css';
//icont imports
import Refresh from '@material-ui/icons/Refresh';
//ipcRenderer for query
const { ipcRenderer } = window.require('electron');

export default class StatCard extends Component {
  //gets the difference between the viewed date and the stat date
  dateDiff = () => {
    //converts string to date objects
    const   originDate = new Date(this.props.date),
            currentDate = new Date(this.props.curDate),

            originTime = originDate.getTime(),
            currentTime = currentDate.getTime(),
            //gets the difference between times and then converts it to days
            diffTime = currentTime - originTime,
            diffDay = Math.round(diffTime / (1000 * 60 * 60 * 24));
    //if the day is after last track returns it
    if(diffDay >= 0) {
        return diffDay.toString();
    }
    else {
        return "n/a";
    }
  }
  //handles the reset button, resets the stats
  handleReset = () => {
    let payLoad = JSON.stringify({ [this.props.stat]: this.props.curDate});
    ipcRenderer.send('setStats', payLoad);
  }

  render() {
    let stat = this.props.stat;
    return (
      <Card
        className='statCard'
      >
        <CardContent>
          <Typography
            variant="h6"
          >
            Days Since {stat ? stat.toUpperCase() : 'n/a'}
          </Typography>
          <Typography

          >
            {this.dateDiff()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='secondary'
            onClick={this.handleReset}
          >
            <Refresh />
          </Button>
        </CardActions>
      </Card>
    )
  }

}
