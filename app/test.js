const assert = require('assert');

function add(a, b) {
  return a + b;
}

assert.strictEqual(add(2, 2), 4, 'basic sanity check failed');
console.log('All tests passed.');
