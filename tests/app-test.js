import React from 'react';
import { expect } from 'chai';
import { render, unmountComponentAtNode } from 'react-dom';
import { $, assertUntilTimeout } from './test-helpers';

import App from '../src/app';

describe('Simple Giphy search', function() {
  let testContainer, $gifList;

  beforeEach(function() {
    testContainer = document.createElement('div');
    testContainer.id = '#testing';
    document.body.appendChild(testContainer);
    render(<App/>, testContainer);

    $gifList = $("#gif-list");
  });

  afterEach(function() {
    unmountComponentAtNode(testContainer);
    document.body.removeChild(testContainer);
    testContainer = null;
  });

  it('renders', function() {
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
      assertUntilTimeout(() => {
        expect($('.spec-gif', $gifList)).to.have.lengthOf(25);
        done();
      });
    });
  });
});
