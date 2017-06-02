import { expect } from 'chai';
import {
  $,
  setupAcceptanceTestingForApp,
  assertUntilTimeout,
  visit
} from './test-helpers';
import {
  GIF_FIXTURES
} from './fixtures';

import App from '../src/app';

describe('Simple Giphy search', function() {
  let $gifList;

  setupAcceptanceTestingForApp(App);

  beforeEach(function() {
    visit('/search');

    this.server.get('http://api.giphy.com/v1/gifs/search', (req) => {
      const data = Object.keys(GIF_FIXTURES).map((k) => GIF_FIXTURES[k]);
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ data })];
    });

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
      assertUntilTimeout(() => {
        expect($('.spec-gif', $gifList)).to.have.lengthOf(4);
        done();
      });
    });
  });
});
