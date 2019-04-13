//react and material ui imports
import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import NoteAdd from '@material-ui/icons/NoteAdd';
import CheckIcon from '@material-ui/icons/Check';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
//personal imports
import NoteCard from './NoteCard.js';
import AddCard from './AddCard.js';
import StatCard from './StatCard.js';
//importing styles
import '../styles/contentStyles.css'
//ipcRenderer for electron cuminication
const { ipcRenderer } = window.require('electron');

export default class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stats: {},
    }
    //adds a listener for when stats gets updated
    ipcRenderer.on('sendStats', (event, arg) => {
      console.log(arg);
      this.setState({ stats: JSON.parse(arg) });
    });
    //initial send for stats
    ipcRenderer.send('getStats');
  }
  //function to render the statCards with the different stats
  renderStats = () => {
    let compArr = [];
    //runs through and renders each stat on a card
    for(let prop in this.state.stats) {
      console.log(JSON.stringify({ [prop]: this.state.stats[prop]}))
      compArr.push(<StatCard
        key={prop}
        stat={prop}
        date={this.state.stats[prop]}
        curDate={this.props.date}
      />)
    }
    return compArr;
  }
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
        <div
          className='statDiv'
        >
          {this.renderStats()}
        </div>
      </TransitionGroup>
    )
  }

}
