import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import Home from './routes/home';
import GifSearch from './routes/gif-search';

export default class App extends Component {
  render() {
    return (
      <Router ref={(ref) => this.router = ref}>
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
