'use strict';

var test = require('tape');
var helpers = require('../../lib/helpers');
var clampWidth = helpers.clampWidth;
var clampHeight = helpers.clampHeight;

test('helpers.clampWidth()', function(t) {
    function testcase(resizer, expected, msg) {
        var actual = clampWidth(resizer);
        t.equal(actual, expected, msg);
    }

    testcase({ x: 120, minWidth: 1, maxWidth: 100 }, 100,
             'should clamp width value when > maxWidth');

    testcase({ x: 1, minWidth: 20, maxWidth: 100 }, 20,
             'should clamp width value when < minWidth');

    testcase({ x: 20, minWidth: 1, maxWidth: 100 }, 20,
             'should use width value when between min and max');

    t.end();
});

test('helpers.clampHeight()', function(t) {
    function testcase(resizer, expected, msg) {
        var actual = clampHeight(resizer);
        t.equal(actual, expected, msg);
    }

    testcase({ y: 120, minHeight: 1, maxHeight: 100 }, 100,
             'should clamp width value when > maxHeight');

    testcase({ y: 1, minHeight: 20, maxHeight: 100 }, 20,
             'should clamp width value when < minHeight');

    testcase({ y: 20, minHeight: 1, maxHeight: 100 }, 20,
             'should use width value when between min and max');

    t.end();
});
