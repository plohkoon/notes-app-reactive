//react and material UI imports
import React, { Component } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//date import for date selector
import DateFnsUtils from '@date-io/date-fns';
//styles import
import '../styles/topbarStyles.css';

export default class TopBar extends Component {
//ionitializes state and props
  constructor(props) {
    super(props);
    this.state = {
      newID: "",
      newNote: ""
    }
  }
  //shifts date to prevent off by one error in date selector
  getShiftedDate = () => {
    let date = new Date(this.props.date);
    date.setDate(date.getDate() + 1);
    return date;
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppBar
          position="sticky"
        >
          <ToolBar
            className="topBar"
          >
            <Typography
              variant="h4"
            >
              Geek Squad Closing Note
            </Typography>
            <DatePicker
              value={this.getShiftedDate()}
              onChange={this.props.dateChange}
            />
          </ToolBar>
        </AppBar>
      </MuiPickersUtilsProvider>
    )
  }

}
