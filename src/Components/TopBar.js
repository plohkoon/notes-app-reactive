//react and material UI imports
import React, { Component } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//date import for date selector
import DateFnsUtils from '@date-io/date-fns';
//ipcRenderer for query
const { ipcRenderer } = window.require('electron');

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
  //updates ID
  handleIDChange = event => {
    this.setState({newID: event.target.value});
  }
  //updates notes
  handleNoteChange = event => {
    this.setState({newNote: event.target.value});
  }
  //submits the add
  handleSubmit = () => {
    //sends values to be added as a JSON string to be parsed
    ipcRenderer.send('addRow', JSON.stringify([this.props.date, this.state.newID, this.state.newNote]));
    //recieves the confirmation that the row was added
    ipcRenderer.on('rowAdded', (event, arg) => {
      //resets state of fields
      this.setState({
        newID: "",
        newNote: ""
      });
      //requeries the rows
      this.props.getRows();
    });
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppBar
          position="static"
        >
          <ToolBar>
            <TextField
              id="New ID"
              value={this.state.newID}
              onChange={this.handleIDChange}
              placeholder="Unit Identifier"
              label="Identifier"
              variant="filled"
            />
            <TextField
              id="New Note"
              value={this.state.newNote}
              onChange={this.handleNoteChange}
              placeholder="Unit Notes"
              label="identifier"
              variant="filled"
            />
            <Button
              id="Note Submit"
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            <Typography
              variant="title"
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
