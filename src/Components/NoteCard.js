//imports react components and material components
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//imports icons need for buttons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
//renderer to communicate with main process
const { ipcRenderer } = window.require('electron');

export default class NoteCard extends Component {
  //constructor to set basic state
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      note: this.props.note.note
    }
  }
  //returns a component, either a text field or just text depending on if editing
  getEdit = () => {
    //if editing returns text field with contents filled
    if(this.state.edit) {
      return(
        <TextField
          value={this.state.note}
          id="New Note"
          onChange={eve => this.setState({note: eve.target.value})}
          placeholder="Unit Notes"
          label="Note"
          variant="filled"
        />
      )
    }
    //if not editing just returns the text as an element
    else {
      return (
        <Typography
          variant="body1"
        >
          {this.state.note}
        </Typography>
      )
    }
  }
  //toggles the editing
  toggleEdit = () => {
    //if editing
    if(this.state.edit) {
      //packs the new values and sends it to the main process
      let arg=JSON.stringify([this.state.note, this.props.note.date, this.props.note.id]);
      ipcRenderer.sendSync('changeRow', arg);
      //toggles edit flag and regets rows
      this.setState({edit: !this.state.edit});
    }
    //else toggles editing on
    else {
      this.setState({edit: !this.state.edit});
    }
  }
  //sends the query to main process and rerenders row
  deleteRow = () => {
    let arg=JSON.stringify([this.props.note.date, this.props.note.id]);
    ipcRenderer.sendSync('deleteRow', arg);
    this.props.getRows();
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography
            variant="title"
          >
            {this.props.note.note_id}
          </Typography>
          {this.getEdit()}
        </CardContent>
        <CardActions>
          <Fab
            onClick={this.toggleEdit}
          >
            {this.state.edit ? <CheckIcon /> : <EditIcon />}
          </Fab>
          <Fab
            onClick={this.deleteRow}
          >
            <DeleteIcon />
          </Fab>
        </CardActions>
      </Card>
    )
  }

}
