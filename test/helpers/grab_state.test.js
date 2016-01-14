'use strict';

var test = require('tape');
var getGrabState = require('../../lib/helpers').getGrabState;

test('getCursorState', function(t) {
    function testcase(cursor, expected) {
        cursor = cursor || {};
        cursor.clientX = cursor.x || 0;
        cursor.clientY = cursor.y || 0;

        var rect = { width: 200, height: 200, top: 0, left: 0 };
        var threshold = 5;
        var actual = getGrabState(cursor, rect, threshold);

        t.deepEqual(actual, expected);
    }

    testcase(null, {
        x: 0,
        y: 0,
        clientX: 0,
        clientY: 0,
        width: 200,
        height: 200,
        onTopEdge: true,
        onRightEdge: false,
        onBottomEdge: false,
        onLeftEdge: true
    });

    testcase({ x: 50, y: 50 }, {
        x: 50,
        y: 50,
        clientX: 50,
        clientY: 50,
        width: 200,
        height: 200,
        onTopEdge: false,
        onRightEdge: false,
        onBottomEdge: false,
        onLeftEdge: false
    });

    t.end();
});
