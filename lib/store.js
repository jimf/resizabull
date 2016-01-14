'use strict';

var assign = require('object-assign');
var resizeCursor = require('resize-cursors');
var helpers = require('./helpers');
var getCursorState = helpers.getCursorState;
var isResizing = helpers.isResizing;

function cursorStyle(state) {
    state = state || {};
    return resizeCursor({
        top: state.onTopEdge,
        right: state.onRightEdge,
        bottom: state.onBottomEdge,
        left: state.onLeftEdge
    });
}

function updateState(e, resizer) {
    var rect = resizer.el.getBoundingClientRect();
    assign(resizer, getCursorState(e, rect, resizer.threshold));
}

function updateResizerState(e) {
    return function(resizer) {
        updateState(e, resizer);
        resizer.onResize(resizer);
    };
}

function endResize(e) {
    return function(resizer) {
        updateState(e, resizer);
        resizer.grab = null;
        resizer.onResizeStop(resizer);
    };
}

function renderResizer(resizer) {
    var grab = resizer.grab;

    if (!(grab && isResizing(grab))) {
        resizer.el.style.cursor = cursorStyle(resizer) || '';
        return;
    }

    resizer.el.style.cursor = cursorStyle(grab);

    if (grab.onRightEdge) {
        resizer.el.style.width = helpers.clampWidth(resizer) + 'px';
    }

    if (grab.onBottomEdge) {
        resizer.el.style.height = helpers.clampHeight(resizer) + 'px';
    }
}

/**
 * Store constructor. A store is intended to be a singleton that manages any
 * number of resizabull instances, keeping the number of event listeners
 * attached to the DOM to a minimum.
 *
 * @param {object} options Configuration options
 */
function Store(options) {
    ['onMove', 'onUp', 'onTouchMove', 'onTouchEnd', 'render']
        .forEach(function(method) {
            this[method] = this[method].bind(this);
        }, this);

    this.window = options.window;
    this.document = options.document;
    this.resizers = [];
    this.shouldRedraw = false;
}

/**
 * Register a new resizabull instance with the store.
 *
 * @param {Resizer} resizer Resizer instance
 */
Store.prototype.add = function(resizer) {
    this.resizers.push(resizer);
};

/**
 * Unregister a given resizer from the store.
 *
 * @param {Resizer} resizer Resizer instance
 */
Store.prototype.remove = function(resizer) {
    var i = 0;
    while (i < this.resizers.length && this.resizers[i] !== resizer) {
        i += 1;
    }
    this.resizers.splice(i, 1);
};

/**
 * Attach event listeners to the DOM.
 */
Store.prototype.bindEvents = function() {
    this.document.addEventListener('mousemove', this.onMove);
    this.document.addEventListener('mouseup',   this.onUp);
    this.document.addEventListener('touchmove', this.onTouchMove);
    this.document.addEventListener('touchend',  this.onTouchEnd);
};

/**
 * Detach event listeners from the DOM.
 */
Store.prototype.unbindEvents = function() {
    this.document.removeEventListener('mousemove', this.onMove);
    this.document.removeEventListener('mouseup',   this.onUp);
    this.document.removeEventListener('touchmove', this.onTouchMove);
    this.document.removeEventListener('touchend',  this.onTouchEnd);
};

/**
 * Callback fired on mousemove. Updates state for all registered resizers.
 *
 * @param {MouseEvent} e Event that triggered this callback
 */
Store.prototype.onMove = function(e) {
    this.resizers.forEach(updateResizerState(e));
    this.shouldRedraw = true;
};

/**
 * Callback fired on mouseup. Updates state for all registered resizers.
 *
 * @param {MouseEvent} e Event that triggered this callback
 */
Store.prototype.onUp = function(e) {
    this.resizers.forEach(endResize(e));
};

/**
 * Callback fired on touchmove. Delegates to #onMove.
 *
 * @param {TouchEvent} e Event that triggered this callback
 */
Store.prototype.onTouchMove = function(e) {
    this.onMove(e.touches[0]);
};

/**
 * Callback fired on touchend. Delegates to #onUp.
 *
 * @param {TouchEvent} e Event that triggered this callback
 */
Store.prototype.onTouchEnd = function(e) {
    if (!e.touches.length) {
        this.onUp(e.changedTouches[0]);
    }
};

/**
 * Main animation loop. Uses rAF to update the UI for all registered resizers.
 */
Store.prototype.render = function() {
    if (this.resizers.length && this.shouldRedraw) {
        this.resizers.forEach(renderResizer);
        this.shouldRedraw = false;
    }

    this.window.requestAnimationFrame(this.render);
};

module.exports = Store;
