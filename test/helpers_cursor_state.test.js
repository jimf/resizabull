'use strict';

var test = require('tape');
var getCursorState = require('../lib/helpers').getCursorState;

function subject(cursor) {
    return getCursorState(
        cursor,
        { width: 200, height: 200, top: 10, left: 10 },
        5
    );
}

function cursor(x, y) {
    return { clientX: x, clientY: y };
}

test('onTopEdge', function(t) {
    var cases = [
        { input:    cursor(10, 10),
          expected: 'ok',
          msg:      'true when cursor is on top edge' },

        { input:    cursor(10, 15),
          expected: 'ok',
          msg:      'true when cursor is below top edge within threshold' },

        { input:    cursor(10, 9),
          expected: 'ok',
          msg:      'true when cursor is above top edge' },

        { input:    cursor(10, 16),
          expected: 'notOk',
          msg:      'false when cursor is below top edge beyond threshold' }
    ];

    cases.forEach(function(testcase) {
        var actual = subject(testcase.input);

        t.equal(actual.x, testcase.input.clientX - 10);
        t.equal(actual.y, testcase.input.clientY - 10);
        t[testcase.expected](actual.onTopEdge, testcase.msg);
    });
    t.end();
});

test('onRightEdge', function(t) {
    var cases = [
        { input:    cursor(210, 10),
          expected: 'ok',
          msg:      'true when cursor is on right edge' },

        { input:    cursor(205, 10),
          expected: 'ok',
          msg:      'true when cursor is left of right edge within threshold' },

        { input:    cursor(211, 10),
          expected: 'ok',
          msg:      'true when cursor is right of right edge' },

        { input:    cursor(204, 10),
          expected: 'notOk',
          msg:      'false when cursor is left of right edge beyond threshold' }
    ];

    cases.forEach(function(testcase) {
        var actual = subject(testcase.input);

        t.equal(actual.x, testcase.input.clientX - 10);
        t.equal(actual.y, testcase.input.clientY - 10);
        t[testcase.expected](actual.onRightEdge, testcase.msg);
    });
    t.end();
});

test('onBottomEdge', function(t) {
    var cases = [
        { input:    cursor(10, 210),
          expected: 'ok',
          msg:      'true when cursor is on bottom edge' },

        { input:    cursor(10, 205),
          expected: 'ok',
          msg:      'true when cursor is above bottom edge within threshold' },

        { input:    cursor(10, 211),
          expected: 'ok',
          msg:      'true when cursor is below bottom edge' },

        { input:    cursor(10, 204),
          expected: 'notOk',
          msg:      'false when cursor is above bottom edge beyond threshold' }
    ];

    cases.forEach(function(testcase) {
        var actual = subject(testcase.input);

        t.equal(actual.x, testcase.input.clientX - 10);
        t.equal(actual.y, testcase.input.clientY - 10);
        t[testcase.expected](actual.onBottomEdge, testcase.msg);
    });
    t.end();
});

test('onLeftEdge', function(t) {
    var cases = [
        { input:    cursor(10, 10),
          expected: 'ok',
          msg:      'true when cursor is on left edge' },

        { input:    cursor(15, 10),
          expected: 'ok',
          msg:      'true when cursor is right of left edge within threshold' },

        { input:    cursor(9, 10),
          expected: 'ok',
          msg:      'true when cursor is left of left edge' },

        { input:    cursor(16, 10),
          expected: 'notOk',
          msg:      'false when cursor is right of left edge beyond threshold' }
    ];

    cases.forEach(function(testcase) {
        var actual = subject(testcase.input);

        t.equal(actual.x, testcase.input.clientX - 10);
        t.equal(actual.y, testcase.input.clientY - 10);
        t[testcase.expected](actual.onLeftEdge, testcase.msg);
    });
    t.end();
});
