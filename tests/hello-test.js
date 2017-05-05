import React from 'react';
import { expect } from 'chai';
import App from '../src/app';
import { render } from 'react-dom';

describe('Our shitty little app', function() {
  beforeEach(function() {
    let div = document.createElement('div');
    div.id = '#testing';
    document.body.appendChild(div);
    render(<App/>, div);
  });
  it('is truly wonderful', function() {
    let app = document.getElementById("hello-world");
    expect(app).to.not.equal(null);
    expect(app).to.not.equal(undefined);
    expect(app.innerText).to.equal("Hello World");
  });
});
