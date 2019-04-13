//various react and material UI imports
import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
//my component imports
import TopBar from './Components/TopBar.js';
import Content from './Components/Content.js';

import { GeekTheme } from './styles/theme.js';
//gets the ipcRenderer for requests the electron main process
const { ipcRenderer } = window.require('electron');

const timeoutTime = 120000;

class App extends Component {
  //constructor to set initial
  constructor(props) {
    super(props);
    //sets initial date and notes
    this.state = {
      currentDate: this.getDate(),
      currentNotes: [],
      stats: {},
      addingNote: true,
      addingTimeout: setTimeout(() => {
                      this.setState({addingNote: false});
                    }, timeoutTime),
    }


    //when sendRows gets recieved sets the current state sets in constructor
    //so theres not a million listeners after a couple runs
    ipcRenderer.on('sendRows', (event, arg) => {
      console.log(arg);
      this.setState({currentNotes: arg});
    });
    ipcRenderer.on('sendStats', (event, arg) => {
      console.log(arg);
      this.setState({ stats: JSON.parse(arg) });
      console.log(this.state.stats.dataWipe);
    });
    ipcRenderer.send('getStats');
    //gets rows
    this.getRows();

  }

  clearTimeout = () => {
    console.log("clearing timeout");
    clearTimeout(this.state.addingTimeout);
    this.setState({
      addingTimeout: setTimeout(() => {
                      this.setState({addingNote: false});
                    }, timeoutTime),
    });
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
    this.getRows();
  }

  getRows = () => {
    //sends a getRows query
    ipcRenderer.send('getRows', this.state.currentDate);
  }
  //function to toggle the add note menu
  toggleAdding = () => {
    //if switching to adding note
    if(!this.state.addingNote) {
      //toggles the flag and adds the timeout
      this.setState({
        addingNote: !this.state.addingNote,
        addingTimeout: setTimeout(() => {
                        this.setState({addingNote: false});
                      }, timeoutTime),
      })
    }
    else {
      //else clears the timout if exists and toggles flag
      clearTimeout(this.state.addingTimeout)
      this.setState({addingNote: !this.state.addingNote})
    }
  }

  render() {
    return (
      <MuiThemeProvider
        theme={GeekTheme}
      >
        <div>
          <TopBar
            date={this.state.currentDate}
            dateChange={this.onDateChange}
          />
          <Content
            date={this.state.currentDate}
            notes={this.state.currentNotes}
            getRows={this.getRows}
            addingNote={this.state.addingNote}
            toggleAdding={this.toggleAdding}
            clearTimeout={this.clearTimeout}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
