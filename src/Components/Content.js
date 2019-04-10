import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const { ipcRenderer } = window.require('electron');

export default class Content extends Component {

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.notes)}</p>
      </div>
    )
  }

}
