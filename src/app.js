import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import GifList from './components/gif-list';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: []
    };
  }

  handleSearch(e) {
    let search = encodeURIComponent(e.target.search.value);

    e.preventDefault();

    fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=dc6zaTOxFJmzC`)
      .then((res) => res.json())
      .then(({ data }) => {
        this.setState({ gifs: data });
      });
  }

  render() {
    const {
      gifs
    } = this.state;

    return (
      <GifList onSearch={this.handleSearch.bind(this)} gifs={gifs}/>
    );
  }
}
