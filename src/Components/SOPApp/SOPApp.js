import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'wouter';

import TopBar from './TopBar/TopBar';

export default class ScopeApp extends Component {

  render() {
    return(
      <div>
        <TopBar />
      </div>
    )
  }

}
