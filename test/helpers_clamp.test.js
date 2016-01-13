'use strict';

var test = require('tape');
var clamp = require('../lib/helpers').clamp;

test('clamp', function(t) {
    function testcase(resizer, dimension, val, expected) {
        var actual = clamp(resizer, dimension, val);
        t.equal(actual, expected);
    }

    // Y too large
    testcase({
        x: 120,
        y: 400,
        maxDims: {
            x: 100,
            y: 200
        },
        minDims: {
            x: 0,
            y: 0
        }
    }, 'y', null, 200);

     // Y too small
    testcase({
        x: 120,
        y: 3,
        maxDims: {
            x: 100,
            y: 200
        },
        minDims: {
            x: 0,
            y: 10
        }
    }, 'y', null, 10);

    // X too large
    testcase({
        x: 120,
        y: 120,
        maxDims: {
            x: 100,
            y: 200
        },
        minDims: {
            x: 0,
            y: 0
        }
    }, 'x', null, 100);

    // X too small
    testcase({
        x: 1,
        y: 120,
        maxDims: {
            x: 100,
            y: 200
        },
        minDims: {
            x: 20,
            y: 0
        }
    }, 'x', null, 20);

    // Specified value, ignores actual value
    testcase({
        x: 20,
        y: 120,
        maxDims: {
            x: 100,
            y: 200
        },
        minDims: {
            x: 0,
            y: 0
        }
    }, 'x', 120, 100);

    t.end();
});
