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

const timeoutTime = 120000;

export default class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stats: {},
      addingNote: true,
      addingTimeout: setTimeout(() => {
                      this.setState({addingNote: false});
                    }, timeoutTime),
      notes: [],
    }
    //adds a listener for when stats gets updated
    ipcRenderer.on('sendStats', (event, arg) => {
      console.log(arg);
      this.setState({ stats: JSON.parse(arg) });
    });
    //when sendRows gets recieved sets the current state sets in constructor
    //so theres not a million listeners after a couple runs
    ipcRenderer.on('sendRows', (event, arg) => {
      console.log("recieved rows ", arg);
      this.setState({notes: arg});
    });
    //initial send for stats
    ipcRenderer.send('getStats');
    ipcRenderer.send('getRows', this.props.date);
  }
  //function to render the statCards with the different stats
  renderStats = () => {
    let compArr = [];
    //runs through and renders each stat on a card
    for(let prop in this.state.stats) {
      compArr.push(<StatCard
        key={prop}
        stat={prop}
        date={this.state.stats[prop]}
        curDate={this.props.date}
      />)
    }
    return compArr;
  }

  clearTimeout = () => {
    console.log("clearing timeout");
    clearTimeout(this.state.addingTimeout);
    this.setState({
      addingTimeout: setTimeout(() => {
                      this.setState({addingNote: false});
                    }, timeoutTime),
    });
  }
  //function to toggle the add note menu
  toggleAdding = () => {
    //if switching to adding note
    if(!this.state.addingNote) {
      //toggles the flag and adds the timeout
      this.setState({
        addingNote: !this.state.addingNote,
        addingTimeout: setTimeout(() => {
                        this.setState({addingNote: false});
                      }, timeoutTime),
      })
    }
    else {
      //else clears the timout if exists and toggles flag
      clearTimeout(this.state.addingTimeout)
      this.setState({addingNote: !this.state.addingNote})
    }
  }
  //maps all the NoteCards with their respective note
  render() {
    return (
      <TransitionGroup className='contentContainer'>
        <Fab
          color="primary"
          className={"addNote"}
          onClick={this.toggleAdding}
        >
          {this.state.addingNote ? <CheckIcon /> : <NoteAdd />}
        </Fab>
        {this.state.addingNote ?
          <CSSTransition
            key={"Card"}
            timeout={500}
            classNames="moveCard"
          >
            <AddCard
              date={this.props.date}
              clearTimeout={this.clearTimeout}
            />
          </CSSTransition>
          :
          ""
        }
        {this.state.notes.map(row => {
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
