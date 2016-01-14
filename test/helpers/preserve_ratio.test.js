'use strict';

var test = require('tape');
var helpers = require('../../lib/helpers');
var preserveWidthRatio = helpers.preserveWidthRatio;
var preserveHeightRatio = helpers.preserveHeightRatio;

test('helpers.preserveHeightRatio()', function(t) {
    function testcase(resizer, expected, msg) {
        var actual = preserveHeightRatio(resizer);
        t.equal(actual, expected, msg);
    }

    testcase({ x: 120, y: 100, aspectRatio: (4/3) }, 90,
        'should return a value based on width');

    testcase({ x: 120, y: 100, aspectRatio: false }, 100,
        'should return y');
    t.end();
});

test('helpers.preserveWidthRatio()', function(t) {
    function testcase(resizer, expected, msg) {
        var actual = preserveWidthRatio(resizer);
        t.equal(actual, expected, msg);
    }

    testcase({ x: 100, y: 120, aspectRatio: (4/3) }, 160,
        'should return a value based on height');

     testcase({ x: 120, y: 100, aspectRatio: false }, 120,
        'should return x');
    t.end();
});
