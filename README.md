# react-acceptance-testing

Acceptance testing in react is a developing story. If you search the
internet, you'll find many ways to do it, but this one. It is based on
the idea that the resposibility of your acceptance tests is to measure
empirically whether or not your application works as advertized to its
users.

Based on that definition, that places some hard constraints on your
acceptance testing rig.

## Whole Applications

We want to know if the application as it will run, runs. Testing
components in isolation is a handy and worthwhile enterprise, we want
to know if all of our components taken together with any other
external code will work the way we expect. That's why we want to

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


To use:

- `git clone git@github.com:cowboyd/react-acceptance-testing.git`
- `yarn install`
- `yarn test` to run tests

[1]: http://facebook.github.io/jest/
[2]: https://github.com/facebook/jest/issues/848
[3]: http://www.nightmarejs.org/
[4]: https://karma-runner.github.io/
[5]: https://github.com/testem/testem
