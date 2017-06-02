# react-acceptance-testing

example test case [search-test.js](https://github.com/cowboyd/react-acceptance-testing/blob/master/tests/search-test.js)

Acceptance testing in react is a developing story. If you search the
internet, you'll find many ways to do it, but this one. It is based on
the idea that the resposibility of your acceptance tests is to measure
empirically whether or not your application works as advertized to its
users.

Based on that definition, that places some hard constraints on your
acceptance testing rig.

## Whole Applications

We want to know if the application as it will run, runs. Testing
components in isolation is a handy and worthwhile enterprise, but we want
to know if all of our components taken together with any other
external code will work the way we expect.

*Solution:* boot the whole application before every testcase.


## Real Browsers

Does your appication run in a browser? Then if a test is going to
measure whether it works or not, it also needs to run in a real
browser. It needs to run in the _real_ browsers that a _real_ user
might use, and it should dispatch _real_ UI events against a _real_
DOM.

This constraint rules some typical strategies right out:

[Jest][1] is a popular testing framework for React development, and it is
the default that gets bundled with `create-react-app`. For what it
does, it is excellent.  However,
[Jest does not currently support running in any other environment than node.js][2]
and the support it has for testing React applications involves
simulating the dom and stubbing core React functions. As a result it
isn't (in its present state) a sufficient tool for taking the kind of
measurments that we want to take.

[Nightmare][3] is a headless browser and the spiritual successor to
phantomjs. Some of the test rigs we found out there (and tried to
build ourselves) used Jest, Mocha or some node-based testing framework
in combination with Nightmare so that the application code was loaded
into a real dom. This is a step up, but users don't browse with
Nightmare. They use Chrome, Safari and $%*! _IE 8.1 on a Microsoft
Surface_. We want to the capability to run our test on any browser of
our choosing.

*Solution:* Karma. [Karma][4] is a battle test launcher whose only
responsibility is to bring up a multiplicity of browsers start your
test run in each, and then collect results.

[Testem][5] is another alternative that satisfies this niche

## Real Server

Does your app make requests to an API? Then your tests should hammer
the network too. Otherwise, you're measuring air. This setup includes
[Pretender][6] to simulate _real_ XMLHttpRequests to exercise your
app's transport and serialization layers. You can see how it specifies
which data will be returned by which endpoints.

```JavaScript
server.get('http://api.giphy.com/v1/gifs/search', (req) => {
  const data = Object.keys(GIF_FIXTURES).map((k) => GIF_FIXTURES[k]);
  return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ data })];
});
```

## Convergent Assertions

This setup embraces asynchrony by using "convergent assertions." Every
`it` block isn't just run once, but _multiple times_. That's because
in a stateful, reactive UI, sometimes the effects of an action take
time to be fully realized in the state of the DOM. Every assertion
will run until it either passes, or reaches a timeout period.

To ask not _"is the state currently X"_, but _"will the state
eventually converge to X"_ is simple, yet astoundingly robust method
for coping with the timing issues that arise when testing modern,
asynchronous applications.

For example, in the test which searches for gifs and asserts their
presence:

``` JavaScript
describe('entering text into the search and clicking submit', function() {
  beforeEach(function() {
    $('.spec-gif-search-input', $gifList).val('dog').trigger('change');
    $('.spec-gif-search-submit', $gifList).trigger('click');
  });
 it('populates the list with gifs', function(done) {
    expect($('.spec-gif', $gifList)).to.have.lengthOf(4);
  });
});
```

There is an actual network request happening between the form submit
and the assertion that 4 gifs are returned. However, we don't have to
account for this in our test case because the assertion is convergent
one: _"will there eventually be 4 gifs"_ vs _"are there 4 gifs at this
very moment"_

# Development

- `git clone git@github.com:cowboyd/react-acceptance-testing.git`
- `yarn install`

### run the test suite

- `yarn test`

### run the app

- `yarn start`

[1]: http://facebook.github.io/jest/
[2]: https://github.com/facebook/jest/issues/848
[3]: http://www.nightmarejs.org/
[4]: https://karma-runner.github.io/
[5]: https://github.com/testem/testem
[6]: https://github.com/pretenderjs/pretender
