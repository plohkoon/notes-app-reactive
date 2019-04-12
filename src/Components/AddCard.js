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
      newNote: ""
    }
  }
  //updates ID
  handleIDChange = ev => {
    this.setState({newID: ev.target.value});
  }
  //updates notes
  handleNoteChange = ev => {
    let string = ev.target.value.replace('\n', '');
    if(string !== ev.target.value) {
      this.handleSubmit();
      return;
    }
    this.setState({newNote: ev.target.value});
  }
  //submits the add
  handleSubmit = () => {
    //sends values to be added as a JSON string to be parsed
    ipcRenderer.sendSync('addRow', JSON.stringify([this.props.date, this.state.newID.toUpperCase(), this.state.newNote]));
    this.setState({
      newID: "",
      newNote: ""
    });
    this.props.getRows();
  }
  //handles enter press
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
