//various react and material UI imports
import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
//my component imports
import TopBar from './TopBar/TopBar.js';
import Content from './Content/Content.js';
//gets the ipcRenderer for requests the electron main process
const { ipcRenderer } = window.require('electron');

export default class NotesApp extends Component {
  //constructor to set initial
  constructor(props) {
    super(props);
    //sets initial date and notes
    this.state = {
      currentDate: this.getDate(),
    }
  }
  //A simple function to get todays date in the proper format
  //pulled from initial notes app
  getDate = (date) => {

      let day, month, year;

      date = date ? date : new Date();
      day = ("0" + (date.getDate())).slice(-2);
      month = ("0" + (date.getMonth() + 1)).slice(-2);
      year = date.getFullYear();

      return year + "-" + month + "-" + day;

  }
  //changes the date state and than regets rows
  onDateChange = (date) => {
    this.setState({currentDate: this.getDate(date)});
    ipcRenderer.send('getRows', this.state.currentDate);
  }

  render() {
    return (
      <div>
        <TopBar
          date={this.state.currentDate}
          dateChange={this.onDateChange}
        />
        <Content
          date={this.state.currentDate}
          notes={this.state.currentNotes}
          getRows={this.getRows}
        />
      </div>
    );
  }
}
