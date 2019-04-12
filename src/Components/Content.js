//react and material ui imports
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
//personal imports
import NoteCard from './NoteCard.js';
//importing styles
import '../styles/contentStyles.css'

export default class Content extends Component {
  //maps all the NoteCards with their respective note
  render() {
    return (
      <div className='contentContainer'>
        {this.props.notes.map(row => {
          return (
            <NoteCard
              key={row.id}
              note={row}
              getRows={this.props.getRows}
            />
          )
        })}
      </div>
    )
  }

}
