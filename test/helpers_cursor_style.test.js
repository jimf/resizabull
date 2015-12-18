'use strict';

var test = require('tape');
var subject = require('../lib/helpers').cursorStyle;

function mapState(top, right, bottom, left) {
    return {
        onTopEdge: top,
        onRightEdge: right,
        onBottomEdge: bottom,
        onLeftEdge: left
    };
}

test('state to cursor style', function(t) {
    var T = true;
    var F = false;
    var cases = [
        { input: mapState(F, F, F, F), expected: 'default' },
        { input: mapState(F, F, F, T), expected: 'ew-resize' },
        { input: mapState(F, F, T, F), expected: 'ns-resize' },
        { input: mapState(F, F, T, T), expected: 'nesw-resize' },
        { input: mapState(F, T, F, F), expected: 'ew-resize' },
        { input: mapState(F, T, F, T), expected: undefined },
        { input: mapState(F, T, T, F), expected: 'nwse-resize' },
        { input: mapState(F, T, T, T), expected: undefined },
        { input: mapState(T, F, F, F), expected: 'ns-resize' },
        { input: mapState(T, F, F, T), expected: 'nwse-resize' },
        { input: mapState(T, F, T, F), expected: undefined },
        { input: mapState(T, F, T, T), expected: undefined },
        { input: mapState(T, T, F, F), expected: 'nesw-resize' },
        { input: mapState(T, T, F, T), expected: undefined },
        { input: mapState(T, T, T, F), expected: undefined },
        { input: mapState(T, T, T, T), expected: undefined }
    ];

    t.plan(cases.length);
    cases.forEach(function(testcase) {
        t.equal(subject(testcase.input), testcase.expected);
    });
    t.end();
});
