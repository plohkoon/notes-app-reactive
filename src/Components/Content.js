//react and material ui imports
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NoteAdd from '@material-ui/icons/NoteAdd';
import CheckIcon from '@material-ui/icons/Check';
//personal imports
import NoteCard from './NoteCard.js';
//importing styles
import '../styles/contentStyles.css'

export default class Content extends Component {
  //maps all the NoteCards with their respective note
  render() {
    return (
      <div>
        <Fab
          color="primary"
          className={"addNote"}
          onClick={this.props.toggleAdding}
        >
          {this.props.addingNote ? <CheckIcon /> : <NoteAdd />}
        </Fab>
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
      </div>
    )
  }

}
