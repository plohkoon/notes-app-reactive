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
//styles import
import '../styles/topbarStyles.css';
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
  handleIDChange = ev => {
    this.setState({newID: ev.target.value});
  }
  //updates notes
  handleNoteChange = ev => {
    console.log(ev.target.value);
    let string = ev.target.value.replace('\n', '');
    if(string !== ev.target.value) {
      this.handleSubmit();
      return;
    }
    this.setState({newNote: ev.target.value});
  }
  //submits the add
  handleSubmit = () => {
    //sends values to be added as a JSON string to be parsed
    ipcRenderer.sendSync('addRow', JSON.stringify([this.props.date, this.state.newID.toUpperCase(), this.state.newNote]));
    this.setState({
      newID: "",
      newNote: ""
    });
    this.props.getRows();
  }
  //handles enter press
  handleEnter = ev => {
    if(ev.key === 'Enter') {
      this.handleSubmit();
    }
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
            <TextField
              id="New ID"
              value={this.state.newID}
              onChange={this.handleIDChange}
              onKeyPress={this.handleEnter}
              placeholder="Unit Identifier"
              label="Identifier"
              variant="standard"
            />
            <TextField
              id="New Note"
              value={this.state.newNote}
              onChange={this.handleNoteChange}
              placeholder="Unit Notes"
              label="Unit Notes"
              variant="standard"
              fullWidth={true}
              multiline={true}
              rows={1}
              rowsMax={1}
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
