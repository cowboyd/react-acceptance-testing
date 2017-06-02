import jQuery from 'jquery';
import sinonChai from 'sinon-chai';
import jqueryChai from 'chai-jquery';
import chai from 'chai';

// would love to say
// import { it as originalIt } from 'mocha';
// but that makes mocha think we're in node-land.
let originalIt = window.it;

chai.use(sinonChai);
chai.use((chai, utils) => jqueryChai(chai, utils, jQuery));

export { default as $ } from 'jquery';


export function it(...args) {
  if (args.length <= 1) {
    return originalIt(...args);
  } else {
    let [name, callback] = args;
    return originalIt(name, function(done) {
      assertUntilTimeout(() => {
        callback.call(this);
        done();
      });
    });
  }
}

// helper to loop over assertions until the test timeout
function assertUntilTimeout(fn) {
  (function loop() {
    try { fn(); } catch(e) {
      requestAnimationFrame(loop);
    }
  })();
}
