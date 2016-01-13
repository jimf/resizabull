'use strict';

var assign = require('object-assign');
var helpers = require('./helpers');
var getCursorState = helpers.getCursorState;
var getGrabState = helpers.getGrabState;
var isResizing = helpers.isResizing;
var defaultOptions = {
    threshold: 5
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
    this.threshold = Number(options.threshold);
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
};

Resizer.prototype.onTouchDown = function(e) {
    this.onDown(e.touches[0]);
};

module.exports = Resizer;
