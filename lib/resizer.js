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
    maxHeight: Infinity,
    maxWidth: Infinity,
    minHeight: 1,
    minWidth: 1
};
var initialState = {
    grab: null,          // Used to snapshot a mousedown event
    x: null,             // x-axis distance (px) from el left edge and cursor
    y: null,             // y-axis distance (px) from el top edge and cursor
    isResizing: false,   // Is the resizer el being resized?
    onTopEdge: false,    // Is the cursor currently over the top edge?
    onRightEdge: false,  // Is the cursor currently over the right edge?
    onBottomEdge: false, // Is the cursor currently over the bottom edge?
    onLeftEdge: false    // Is the cursor currently over the left edge?
};

/**
 * Resizer constructor. A resizer retains resizable state around a given DOM
 * element.
 *
 * @param {HTMLElement} el DOM element
 * @param {object} [options] Configuration options
 */
function Resizer(el, options) {
    options = assign({}, defaultOptions, options);

    ['onDown', 'onTouchDown'].forEach(function(methodName) {
        this[methodName] = this[methodName].bind(this);
    }, this);

    assign(this, initialState);

    Object.keys(defaultOptions).forEach(function(opt) {
        this[opt] = options[opt];
    }, this);

    this.el = el;
    this.threshold = Number(options.threshold);
}

/**
 * Attach event listeners to the DOM.
 */
Resizer.prototype.bindEvents = function() {
    this.el.addEventListener('mousedown', this.onDown);
    this.el.addEventListener('touchdown', this.onTouchDown);
};

/**
 * Detach event listeners from the DOM.
 */
Resizer.prototype.unbindEvents = function() {
    this.el.removeEventListener('mousedown', this.onDown);
    this.el.removeEventListener('touchdown', this.onTouchDown);
};

/**
 * Callback fired on mousedown. Updates isResizing state based on cursor
 * position.
 *
 * @param {MouseEvent} e Event that triggered this callback
 */
Resizer.prototype.onDown = function(e) {
    var rect = this.el.getBoundingClientRect();
    var state = getCursorState(e, rect, this.threshold);

    assign(this, state, { isResizing: isResizing(state) });
    this.grab = getGrabState(e, rect, this.threshold);

    this.onResizeStart(this);
};

/**
 * Callback fired on touchstart. Delegates to #onDown.
 *
 * @param {MouseEvent} e Event that triggered this callback
 */
Resizer.prototype.onTouchDown = function(e) {
    this.onDown(e.touches[0]);
};

module.exports = Resizer;
