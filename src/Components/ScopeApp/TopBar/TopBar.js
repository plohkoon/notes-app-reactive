//react and material UI imports
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from 'wouter';
//styles import
import './styles.css';

import logo from './Geek.png';

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
                <span className="scopeText">Scope </span>
                <span className="workText">of Work</span>
              </Typography>
              <Link href='/' >
                <Button
                  color='secondary'
                  variant='contained'
                >
                  Notes
                </Button>
              </Link>
              <Link href='/sop' >
                <Button
                  color='secondary'
                  variant='contained'
                >
                  SOP Pages
                </Button>
              </Link>
            </div>
          </ToolBar>
        </AppBar>
    )
  }
}
