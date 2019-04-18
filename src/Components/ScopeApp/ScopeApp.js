import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';

import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import TopBar from './TopBar/TopBar';
import Content from './Content/Content';

import {scopeData} from './scopeData';

import './styles.css';

export default class ScopeApp extends Component {

  render() {
    return(
      <div>
        <TopBar />
        <Content
          data={scopeData[1]}
        />
        <div className='controlButtons'>
          <Fab
            className='directBut'
            color='primary'
          >
            <ArrowBackIos />
          </Fab>
          <Fab
            className='directBut'
            color='primary'
          >
            <ArrowForwardIos />
          </Fab>
        </div>
      </div>
    )
  }

}
