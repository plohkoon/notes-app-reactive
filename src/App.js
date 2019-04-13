//various react and material UI imports
import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//my component imports
import TopBar from './Components/TopBar.js';
import Content from './Components/Content.js';

import { GeekTheme } from './styles/theme.js';
import { DarkGeekTheme } from './styles/darkTheme.js';
//gets the ipcRenderer for requests the electron main process
const { ipcRenderer } = window.require('electron');

class App extends Component {
  //constructor to set initial
  constructor(props) {
    super(props);
    //sets initial date and notes
    this.state = {
      currentDate: this.getDate(),
      dark: false,
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

  toggleDark = () => {
    this.setState({dark: !this.state.dark});
  }

  render() {
    return (
      <MuiThemeProvider
        theme={this.state.dark ? DarkGeekTheme : GeekTheme}
      >
        <CssBaseline />
        <TopBar
          date={this.state.currentDate}
          dateChange={this.onDateChange}
        />
        <Content
          date={this.state.currentDate}
          notes={this.state.currentNotes}
          getRows={this.getRows}
          toggleDark={this.toggleDark}
          dark={this.state.dark}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
