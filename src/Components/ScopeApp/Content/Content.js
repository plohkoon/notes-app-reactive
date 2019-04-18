import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Assignment from '@material-ui/icons/Assignment';

import './styles.css';

import ServiceStep from './ServiceStep/ServiceStep';

export default class Content extends Component {

  render() {
    return(
      <div className='content'>
        <Card className='sowCard'>
          <CardContent>
            <CardHeader
              avatar={
                <Assignment
                  textSize='large'
                 />
              }
              title={this.props.data.name}
              titleTypographyProps={{
                'variant': 'h4'
              }}
            />
            <Typography>
              {this.props.data.overview}
            </Typography>
            <ServiceStep
              title='Confirm'
              data={this.props.data.confirm}
            />
            <ServiceStep
              title='Arrive'
              data={this.props.data.arrive}
            />
            <ServiceStep
              title='Service'
              data={this.props.data.service}
            />
            <ServiceStep
              title='Tutorial'
              data={this.props.data.tutorial}
            />
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </div>
    )
  }

}
