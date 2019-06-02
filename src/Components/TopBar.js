//react and material UI imports
import React, { Component } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//date import for date selector
import DateFnsUtils from '@date-io/date-fns';
//styles import
import '../styles/topbarStyles.css';

import logo from '../resources/Geek.png';

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
            <div className="logoHeader">
              <img src={logo} alt="Geek Squad" className="logo"/>
              <Typography
                variant="h4"
              >
                <span className="geekText">Geek </span>
                <span className="squadText">Squad </span>
                <span className="closingText">Closing </span>
                <span className="notesText">Notes</span>
              </Typography>
            </div>
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
