'use strict';

var assign = require('object-assign');
var helpers = require('./helpers');
var getCursorState = helpers.getCursorState;
var getGrabState = helpers.getGrabState;
var isResizing = helpers.isResizing;

function Resizer(el, options) {
    this.onDown = this.onDown.bind(this);
    this.onTouchDown = this.onTouchDown.bind(this);

    options = options || {};

    this.el = el;
    this.threshold = Number(options.threshold || 5);
    this.grab = null;
    this.x = null;
    this.y = null;
    this.isResizing = false;
    this.onTopEdge = false;
    this.onRightEdge = false;
    this.onBottomEdge = false;
    this.onLeftEdge = false;
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
