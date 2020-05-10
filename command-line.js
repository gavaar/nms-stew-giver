'use strict';
const readline = require('readline');

function CommandLine() {
  const obj = {};
  obj.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  obj.write = function (message, handleAnswerFn) {
    this.rl.question(message, (answer) => {
      handleAnswerFn(answer);
    });
  };
  obj.close = function () {
    console.log('bye!');
    this.rl.close();
  };

  return obj;
}

module.exports = CommandLine;
