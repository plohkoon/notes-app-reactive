//react and material ui imports
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
//personal imports
import NoteCard from './NoteCard.js';

export default class Content extends Component {
  //maps all the NoteCards with their respective note
  render() {
    return (
      <div>
        {this.props.notes.map(row => {
          return (
            <NoteCard
              key={row.note_id}
              note={row}
              getRows={this.props.getRows}
            />
          )
        })}
      </div>
    )
  }

}
