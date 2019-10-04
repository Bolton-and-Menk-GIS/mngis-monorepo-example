const chai = require('chai');
const utils = require('../dist/cjs/utils');
require("regenerator-runtime/runtime")

// destructure to get desired functions
const { expect } = chai;

/*
 * to test this individually, run: 
 * `lerna run test --scope @mngis/utils`
 */

// getSeconds() unit-test
describe('#getSeconds()',function(){
  context('with correct time params',function(){
    it('should return correct time in seconds',function(){
      const time = utils.getSeconds({days: 1, hours: 3, minutes: 30});
      expect(time).to.equal(99000);
    })
  })
})

/**
 * we will use this function for unit tests
 * @param {Number} n - number to check if is even
 * @returns {Boolean}
 */
async function isEven(n) {
  await setTimeout(()=> null, 250);
  return !(n % 2)
}

// mapAsync
describe('#mapAsync()', function(){
  context('map on an array with an asynchronous function', function(){
    it('should create an array of booleans from an async function', async function(){
      const vals = [2, 4, 3, 7, 8, 9, 10, 11];

      const bools = await utils.mapAsync(vals, isEven);
      expect(bools).to.be.an('array').to.eql([true, true, false, false, true, false, true, false]);
    })
  })
})

// filterAsync
describe('#filterAsync', function(){
  context('filter an array with an asynchronous function', function(){
    it('should filter the array by even numbers using async isEven function', async function(){
      const vals = [2, 4, 3, 7, 8, 9, 10, 11];
      const evens = await utils.filterAsync(vals, isEven);
      expect(evens).to.be.an('array').to.eql([2, 4, 8, 10]);
    })
  })
})