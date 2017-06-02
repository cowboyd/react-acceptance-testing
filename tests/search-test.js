import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Pretender from 'pretender';
import { expect } from 'chai';
import { $, it, visit } from './test-helpers';
import {  GIF_FIXTURES } from './fixtures';

import App from '../src/app';

/**
 * This testcase mounts the react applications, stubs out the networks
 * enters in some search text into the input field and clicks the search
 * button. When the network request comes back, the results displayed.
 */
describe('Simple Giphy search', function() {
  let $gifList;

  let container, server;

  beforeEach(function() {
    // set up our container where we mount our app
    container = document.createElement('div');
    container.id = '#testing';
    document.body.appendChild(container);

    // setup pretender before we mount the app
    server = new Pretender();

    server.get('http://api.giphy.com/v1/gifs/search', (req) => {
      const data = Object.keys(GIF_FIXTURES).map((k) => GIF_FIXTURES[k]);
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ data })];
    });

    // mount the app with props.test === true
    this.app = render(<App test/>, container);
  });

  afterEach(function() {
    // unmount the app and destroy our container
    unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;

    // pretender teardown
    server.shutdown();
  });

  beforeEach(function() {
    $gifList = $("#gif-list");
  });

  it('renders the search page', function() {
    expect($gifList).to.have.lengthOf(1);
  });

  it('has a search field and an empty list', function() {
    expect($gifList).to.have.descendants('.spec-gif-search-input');
    expect($gifList).to.have.descendants('.spec-gif-list:empty');
  });

  describe('entering text into the search and clicking submit', function() {
    beforeEach(function() {
      $('.spec-gif-search-input', $gifList).val('dog').trigger('change');

      // jQuery.trigger('submit') && form.submit() do not dispatch the event.
      // Dispatching the event ourselves causes FireFox to ignore e.preventDefault()
      // $('.spec-gif-search-form')[0].dispatchEvent(new Event('submit'));
      $('.spec-gif-search-submit', $gifList).trigger('click');
    });

    it('populates the list with gifs', function(done) {
      expect($('.spec-gif', $gifList)).to.have.lengthOf(4);
    });
  });
});
