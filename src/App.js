//various react and material UI imports
import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Brightness3 from '@material-ui/icons/Brightness3';
import Brightness7 from '@material-ui/icons/Brightness7';

import Routes from './Components/Routes.js';
//importing styles
import './styles.css'

import { GeekTheme, DarkGeekTheme } from './theme.js';

class App extends Component {
  //constructor to set initial
  constructor(props) {
    super(props);
    //sets dark mode
    this.state = {
      dark: false,
    }
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
        <Routes />
        <Fab
          color="primary"
          className="toggleDark"
          onClick={this.toggleDark}
        >
          {this.state.dark ? <Brightness7 fontSize='large'/> : <Brightness3 fontSize='large'/>}
        </Fab>
      </MuiThemeProvider>
    );
  }
}

export default App;
