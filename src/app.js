import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { Router } from 'react-router';
import {
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import Home from './routes/home';
import GifSearch from './routes/gif-search';

export default class App extends Component {
  constructor(props) {
    super(props);

    // use in-memory history for testing
    this.history = props.test ?
      createMemoryHistory() :
      createBrowserHistory();
  }

  render() {
    return (
      <Router
          ref={(ref) => this.router = ref}
          history={this.history}>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>

          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/search" exact component={GifSearch}/>
            <Route render={() => <Redirect to="/"/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
