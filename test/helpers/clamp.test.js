'use strict';

var test = require('tape');
var clampDimension = require('../../lib/helpers').clampDimension;

test('helpers.clampDimension()', function(t) {
    function testcase(resizer, dimension, val, expected, msg) {
        var actual = clampDimension(resizer, dimension, val);
        t.equal(actual, expected, msg);
    }

    // Height too large
    testcase({
        x: 120,
        y: 400,
        maxWidth: 100,
        maxHeight: 200,
        minWidth: 1,
        minHeight: 1
    }, 'Height', null, 200, 'should clamp to maxHeight');

    // Height too small
    testcase({
        x: 120,
        y: 3,
        maxWidth: 100,
        maxHeight: 200,
        minWidth: 1,
        minHeight: 10
    }, 'Height', null, 10, 'should clamp to minHeight');

    // Width too large
    testcase({
        x: 120,
        y: 120,
        maxWidth: 100,
        maxHeight: 200,
        minWidth: 1,
        minHeight: 1
    }, 'Width', null, 100, 'should clamp to maxWidth');

    // Width too small
    testcase({
        x: 1,
        y: 120,
        maxWidth: 100,
        maxHeight: 200,
        minWidth: 20,
        minHeight: 1
    }, 'Width', null, 20, 'should clamp to minWidth');

    // Specified value, ignores actual value
    testcase({
        x: 20,
        y: 120,
        maxWidth: 100,
        maxHeight: 200,
        minWidth: 1,
        minHeight: 1
    }, 'Width', 120, 100, 'should clamp to maxWidth');

    // Specified value, ignores actual value
    testcase({
        x: 20,
        y: 120,
        maxWidth: 100,
        maxHeight: 200,
        minWidth: 1,
        minHeight: 1
    }, null, 120, 100, 'should clamp to maxWidth');

    t.end();
});
