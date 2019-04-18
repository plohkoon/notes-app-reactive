//various react and material UI imports
import React, { Component } from 'react';
import { Route } from 'wouter';

import NotesApp from './NotesApp/NotesApp';
import ScopeApp from './ScopeApp/ScopeApp';
import SOPApp from './SOPApp/SOPApp';

export default class Router extends Component {

  render() {
    return (
      <div>
        <Route
          path='/'
        >
          <NotesApp />
        </Route>
        <Route
          path='/sow'
        >
          <ScopeApp />
        </Route>
        <Route path='/sop'>
          <SOPApp />
        </Route>
      </div>
    )
  }

}
