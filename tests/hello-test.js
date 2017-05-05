import { expect } from 'chai';
import { App } from '../src/app';

describe('Something Wonderful', function() {
  beforeEach(function() {
    this.foo = 'bar';
  });
  it('is truly wonderful', function() {
    expect(this.foo).to.equal('bar');
  });
});
