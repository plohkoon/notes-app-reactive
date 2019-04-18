import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';

export default class ServiceStep extends Component {

  renderList = list => {
    return (
      <List>
      {list.map((item, index) => {
        return (
          <ListItem
            key={index}
          >
            <ListItemIcon>
              <RadioButtonUnchecked
                fontSize='small'
              />
            </ListItemIcon>
            <ListItemText>
              {item}
            </ListItemText>
          </ListItem>
        )
      })}
      </List>
    )
  }

  render() {
    return (
      <div>
        <Typography
          variant='h6'
        >
          {this.props.title}
        </Typography>
        {this.renderList(this.props.data.all)}
        <Typography
          variant='caption'
        >
          In-Home
        </Typography>
        {this.renderList(this.props.data.inhome)}
      </div>
    )
  }

}
