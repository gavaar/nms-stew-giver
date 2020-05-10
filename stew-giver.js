'use strict';
const robot = require('robotjs');
const DELAY_MULTIPLIER = 2250;

function StewGiver(afterFinishFn) {
  const obj = {};
  let stewCount = 0;

  function _openChat(delay = 0) {
    setTimeout(() => {
      robot.keyToggle('e', 'down');
      console.log('1: opening chat', delay);
    }, delay);
    setTimeout(() => robot.keyToggle('e', 'up'), delay + DELAY_MULTIPLIER);
  }
  function _waitForChat(delay = 0) {
    setTimeout(() => {
      robot.mouseToggle('down');
      console.log('2: waiting for him to speak', delay);
    }, delay);
    setTimeout(() => robot.mouseToggle('up'), delay + 0.8 * DELAY_MULTIPLIER);
  }
  function _giveStew(delay = 0) {
    setTimeout(() => {
      robot.mouseToggle();
      console.log('3: giving stew', delay);
    }, delay);
    setTimeout(() => robot.mouseToggle('up'), delay + 0.5 * DELAY_MULTIPLIER);
  }
  function _afterGiveDelay(count = 0, delay = 0) {
    setTimeout(() => {
      console.log(`\x1b[36m ${count} stews given \x1b[0m`, delay);
      console.log('4: closing chat', delay);
    }, delay);
  }

  function giveOneStew() {
    _openChat();
    _waitForChat(DELAY_MULTIPLIER);
    _giveStew(2 * DELAY_MULTIPLIER);
    stewCount += 1;
    _waitForChat(3 * DELAY_MULTIPLIER);
    _waitForChat(4 * DELAY_MULTIPLIER);
    _afterGiveDelay(stewCount, 4 * DELAY_MULTIPLIER);
  }

  obj.give = function (quantity = 1) {
    const interval = setInterval(() => {
      giveOneStew();
      console.log(
        `REMAINING: ${
          (6 * DELAY_MULTIPLIER * (quantity - stewCount)) / 60000
        } minutes remaining`
      );
      setTimeout(() => {
        if (stewCount >= quantity) {
          clearInterval(interval);
          afterFinishFn();
        }
      }, 5.9 * DELAY_MULTIPLIER);
    }, 6 * DELAY_MULTIPLIER);
    console.log(
      `Giving stew... this will take around ${
        (6 * DELAY_MULTIPLIER * quantity) / 60000
      } minutes`
    );
  };

  console.log('Stew Giver created, ready to act');
  return obj;
}

module.exports = StewGiver;
