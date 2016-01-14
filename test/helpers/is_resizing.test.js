'use strict';

var test = require('tape');
var isResizing = require('../../lib/helpers').isResizing;

test('isResizing', function(t) {
    function testcase(opts, expected) {
        opts = opts || {};
        var state = {
            onTopEdge:    Boolean(opts.onTopEdge),
            onRightEdge:  Boolean(opts.onRightEdge),
            onBottomEdge: Boolean(opts.onBottomEdge),
            onLeftEdge:   Boolean(opts.onLeftEdge)
        };

        t.equal(isResizing(state), expected);
    }

    testcase(null, false);
    testcase({ onTopEdge:    true }, true);
    testcase({ onRightEdge:  true }, true);
    testcase({ onBottomEdge: true }, true);
    testcase({ onLeftEdge:   true }, true);
    t.end();
});
