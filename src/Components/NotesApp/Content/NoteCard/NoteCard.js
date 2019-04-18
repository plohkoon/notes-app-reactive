//imports react components and material components
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//imports icons need for buttons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
//import styles
import './styles.css';
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
          onChange={this.handleChange}
          placeholder="Unit Notes"
          label="Note"
          variant="filled"
          multiline={true}
          fullWidth={true}
        />
      )
    }
    //if not editing just returns the text as an element
    else {
      return (
        <div>
        <Typography
          variant="caption"
        >
          Note
        </Typography>
        <Typography
        >
          {this.state.note}
        </Typography>
        </div>
      )
    }
  }
  //handle text field change
  handleChange = ev => {
    let string = ev.target.value.replace('\n', '');
    if(string !== ev.target.value) {
      this.toggleEdit();
      return;
    }
    this.setState({note: ev.target.value})
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
    ipcRenderer.send('getRows', this.props.note.date);
  }

  render() {
    return (
      <Card className='card'>
        <CardContent>
          <Typography
            variant="h6"
          >
            {this.props.note.note_id}
          </Typography>
          {this.getEdit()}
        </CardContent>
        <CardActions>
          <Button
            onClick={this.toggleEdit}
            color="primary"
            variant="contained"
          >
            {this.state.edit ? <CheckIcon /> : <EditIcon />}
          </Button>
          <Button
            onClick={this.deleteRow}
            color="secondary"
            variant="contained"
          >
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    )
  }

}
