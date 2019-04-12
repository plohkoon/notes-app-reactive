//react and material ui imports
import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import NoteAdd from '@material-ui/icons/NoteAdd';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
//personal imports
import NoteCard from './NoteCard.js';
import AddCard from './AddCard.js';
//importing styles
import '../styles/contentStyles.css'

export default class Content extends Component {
  //maps all the NoteCards with their respective note
  render() {
    return (
      <div className='contentContainer'>
        <Fab
          color="primary"
          className={"addNote"}
          onClick={this.props.toggleAdding}
        >
          {this.props.addingNote ? <CheckIcon /> : <NoteAdd />}
        </Fab>
        {this.props.addingNote ?
          <AddCard

          />
          :
          ""
        }
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
