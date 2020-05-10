'use strict';
const CommandLine = require('./command-line');
const StewGiver = require('./stew-giver');

(function index() {
  function confirmer(answer) {
    console.log('=============================');
    cl.write(
      'Focus Iteration: Cronus and do nothing else, then press enter here',
      () => handler(answer)
    );
  }
  function handler(answer) {
    const giver = StewGiver(() => cl.close());
    setTimeout(() => giver.give(+answer), 2000);
  }

  const cl = new CommandLine();
  cl.write('How many stews are we going to give? ', confirmer);
})();
