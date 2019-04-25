//react and material ui imports
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//importing styles
import '../styles/contentStyles.css';
//ipcRenderer for query
const { ipcRenderer } = window.require('electron');

export default class AddCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newID: "",
      newNote: "",
      idErr: false,
      noteErr: false,
    }
  }
  //updates ID
  handleIDChange = ev => {
    this.setState({newID: ev.target.value});
    this.props.clearTimeout();
  }
  //updates notes
  handleNoteChange = ev => {
    //clears timeout as an interaction has happened
    this.props.clearTimeout();
    //checks to see if new character is is an enter
    let string = ev.target.value.replace('\n', '');
    if(string !== ev.target.value) {
      this.handleSubmit();
      return;
    }
    //else updates the state
    this.setState({newNote: ev.target.value});
  }
  //submits the add
  handleSubmit = () => {
    //prevents empty ID and shows error field if empty
    if(this.state.newID.trim() === '') {
      this.setState({
        newID: '',
        idErr: true,
      });
      return;
    }
    //prevents empty ID and shows error field if empty
    if(this.state.newNote.trim() === '') {
      this.setState({
        newNote: '',
        noteErr: true,
      });
      return;
    }
    console.log("Sending data");
    //sends values to be added as a JSON string to be parsed
    ipcRenderer.sendSync('addRow', JSON.stringify([this.props.date, this.state.newID.toUpperCase(), this.state.newNote]));
    this.setState({
      newID: "",
      newNote: "",
      idErr: false,
      noteErr: false,
    });
    //clears timeout and refocueses input
    this.props.clearTimeout();
    this.idInput.focus();
    //regetting rows after submit
    ipcRenderer.send('getRows', this.props.date);
  }
  //handles enter press in the new id
  handleEnter = ev => {
    if(ev.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <Card className='card noteEntry'>
        <CardContent>
          <TextField
            id="New ID"
            value={this.state.newID}
            onChange={this.handleIDChange}
            onKeyPress={this.handleEnter}
            placeholder="Unit Identifier"
            label="Identifier"
            variant="standard"
            autoFocus={true}
            ref="newID"
            inputRef={input => {
              this.idInput = input;
            }}
            required={true}
            error={this.state.newID === '' && this.state.idErr}
          />
          <TextField
            id="New Note"
            value={this.state.newNote}
            onChange={this.handleNoteChange}
            placeholder="Unit Notes"
            label="Unit Notes"
            variant="standard"
            fullWidth={true}
            multiline={true}
            rows={1}
            rowsMax={1}
            required={true}
            error={this.state.newNote === '' && this.state.noteErr}
          />
        </CardContent>
        <CardActions>
        <Button
          id="Note Submit"
          variant="contained"
          color="secondary"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
        </CardActions>
      </Card>
    )
  }

}
