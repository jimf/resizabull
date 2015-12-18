'use strict';

var test = require('tape');
var Resizer = require('../lib/resizer');
var createEl = require('./spec_util').createEl;

test('new resizer instance', function(t) {
    var el = createEl();
    var subject = new Resizer(el);

    t.equal(subject.el, el);
    t.equal(subject.treshold, 5);
    t.equal(subject.x, null);
    t.equal(subject.y, null);
    t.equal(subject.grab, null);
    t.equal(subject.isResizing, false);
    t.equal(subject.onTopEdge, false);
    t.equal(subject.onRightEdge, false);
    t.equal(subject.onBottomEdge, false);
    t.equal(subject.onLeftEdge, false);
    t.end();
});

test('options', function(t) {
    var el = createEl();
    var options = { treshold: '10' };
    var subject = new Resizer(el, options);

    t.equal(subject.treshold, Number(options.treshold));
    t.end();
});

test('bind events', function(t) {
    var subject = new Resizer(createEl());
    var el = subject.el;

    subject.bindEvents();

    t.ok(el.addEventListener.calledWith('mousedown', subject.onDown));
    t.ok(el.addEventListener.calledWith('touchdown', subject.onTouchDown));
    t.end();
});

test('unbind events', function(t) {
    var subject = new Resizer(createEl());
    var el = subject.el;

    subject.unbindEvents();

    t.ok(el.removeEventListener.calledWith('mousedown', subject.onDown));
    t.ok(el.removeEventListener.calledWith('touchdown', subject.onTouchDown));
    t.end();
});

test('onDown', function(t) {
    function testcase(opts, expected, msg) {
        opts = opts || {};

        var subject = new Resizer(createEl());
        var e = { clientX: opts.x || 0, clientY: opts.y || 0 };

        subject.onDown(e);

        t.equal(subject.isResizing, expected, msg);
        t.ok(subject.grab);
    }

    testcase({ x:  50, y:  50 }, false, 'isResizing false when not on edge');
    testcase({ x:  50, y:   0 }, true, 'isResizing true when on top edge');
    testcase({ x: 200, y:  50 }, true, 'isResizing true when on right edge');
    testcase({ x:  50, y: 200 }, true, 'isResizing true when on bottom edge');
    testcase({ x:   0, y:  50 }, true, 'isResizing true when on left edge');
    t.end();
});

test('onTouchDown', function(t) {
    function testcase(opts, expected, msg) {
        opts = opts || {};

        var subject = new Resizer(createEl());
        var e = {
            touches: [{ clientX: opts.x || 0, clientY: opts.y || 0 }]
        };

        subject.onTouchDown(e);

        t.equal(subject.isResizing, expected, msg);
    }

    testcase({ x:  50, y:  50 }, false, 'isResizing false when not on edge');
    testcase({ x:  50, y:   0 }, true, 'isResizing true when on top edge');
    testcase({ x: 200, y:  50 }, true, 'isResizing true when on right edge');
    testcase({ x:  50, y: 200 }, true, 'isResizing true when on bottom edge');
    testcase({ x:   0, y:  50 }, true, 'isResizing true when on left edge');
    t.end();
});
