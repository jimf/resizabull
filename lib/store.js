'use strict';

var resizeCursor = require('resize-cursors');
var assign = require('object-assign');
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
        resizer.el.style.cursor = '';
        return;
    }

    resizer.el.style.cursor = cursorStyle(grab);

    // TODO: min/max
    if (grab.onRightEdge) {
        resizer.el.style.width = resizer.x + 'px';
    }

    if (grab.onBottomEdge) {
        resizer.el.style.height = resizer.y + 'px';
    }
}

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

Store.prototype.add = function(resizer) {
    this.resizers.push(resizer);
};

Store.prototype.remove = function(resizer) {
    var i = 0;
    while (i < this.resizers.length && this.resizers[i] !== resizer) {
        i += 1;
    }
    this.resizers.splice(i, 1);
};

Store.prototype.bindEvents = function() {
    this.document.addEventListener('mousemove', this.onMove);
    this.document.addEventListener('mouseup',   this.onUp);
    this.document.addEventListener('touchmove', this.onTouchMove);
    this.document.addEventListener('touchend',  this.onTouchEnd);
};

Store.prototype.unbindEvents = function() {
    this.document.removeEventListener('mousemove', this.onMove);
    this.document.removeEventListener('mouseup',   this.onUp);
    this.document.removeEventListener('touchmove', this.onTouchMove);
    this.document.removeEventListener('touchend',  this.onTouchEnd);
};

Store.prototype.onMove = function(e) {
    this.resizers.forEach(updateResizerState(e));
    this.shouldRedraw = true;
};

Store.prototype.onUp = function(e) {
    this.resizers.forEach(endResize(e));
};

Store.prototype.onTouchMove = function(e) {
    this.onMove(e.touches[0]);
};

Store.prototype.onTouchEnd = function(e) {
    if (!e.touches.length) {
        this.onUp(e.changedTouches[0]);
    }
};

Store.prototype.render = function() {
    if (this.resizers.length && this.shouldRedraw) {
        this.resizers.forEach(renderResizer);
        this.shouldRender = false;
    }

    this.window.requestAnimationFrame(this.render);
};

module.exports = Store;
