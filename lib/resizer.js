'use strict';

var assign = require('object-assign');
var helpers = require('./helpers');
var getCursorState = helpers.getCursorState;
var getGrabState = helpers.getGrabState;
var isResizing = helpers.isResizing;
var noop = function() {};
var defaultOptions = {
    onResizeStart: noop,
    onResize: noop,
    onResizeStop: noop,
    threshold: 5,
    maxDims: {
        x: Number.MAX_SAFE_INTEGER,
        y: Number.MAX_SAFE_INTEGER
    },
    minDims: {
        x: 0,
        y: 0
    }
};
var initialState = {
    grab: null,
    x: null,
    y: null,
    isResizing: false,
    onTopEdge: false,
    onRightEdge: false,
    onBottomEdge: false,
    onLeftEdge: false
};

function Resizer(el, options) {
    options = assign({}, defaultOptions, options);

    ['onDown', 'onTouchDown'].forEach(function(methodName) {
        this[methodName] = this[methodName].bind(this);
    }, this);

    assign(this, initialState);

    this.el = el;
    this.maxDims = options.maxDims;
    this.minDims = options.minDims;
    this.threshold = Number(options.threshold);
    ['onResizeStart', 'onResize', 'onResizeStop'].forEach(function(opt) {
        this[opt] = options[opt];
    }, this);
}

Resizer.prototype.bindEvents = function() {
    this.el.addEventListener('mousedown', this.onDown);
    this.el.addEventListener('touchdown', this.onTouchDown);
};

Resizer.prototype.unbindEvents = function() {
    this.el.removeEventListener('mousedown', this.onDown);
    this.el.removeEventListener('touchdown', this.onTouchDown);
};

Resizer.prototype.onDown = function(e) {
    var rect = this.el.getBoundingClientRect();
    var state = getCursorState(e, rect, this.threshold);

    assign(this, state, { isResizing: isResizing(state) });
    this.grab = getGrabState(e, rect, this.threshold);

    this.onResizeStart(this);
};

Resizer.prototype.onTouchDown = function(e) {
    this.onDown(e.touches[0]);
};

module.exports = Resizer;
