//react and material ui imports
import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import NoteAdd from '@material-ui/icons/NoteAdd';
import CheckIcon from '@material-ui/icons/Check';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
//personal imports
import NoteCard from './NoteCard.js';
import AddCard from './AddCard.js';
//importing styles
import '../styles/contentStyles.css'

export default class Content extends Component {
  //maps all the NoteCards with their respective note
  render() {
    return (
      <TransitionGroup className='contentContainer'>
        <Fab
          color="primary"
          className={"addNote"}
          onClick={this.props.toggleAdding}
        >
          {this.props.addingNote ? <CheckIcon /> : <NoteAdd />}
        </Fab>
        {this.props.addingNote ?
          <CSSTransition
            key={"Card"}
            timeout={500}
            classNames="moveCard"
          >
            <AddCard
              getRows={this.props.getRows}
              date={this.props.date}
              clearTimeout={this.props.clearTimeout}
            />
          </CSSTransition>
          :
          ""
        }
          {this.props.notes.map(row => {
            return (
              <CSSTransition
                key={row.id}
                timeout={500}
                classNames="moveCard"
              >
                <NoteCard
                  key={row.id}
                  note={row}
                  getRows={this.props.getRows}
                />
              </CSSTransition>
            )
          })}
      </TransitionGroup>
    )
  }

}
