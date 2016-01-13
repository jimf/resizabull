'use strict';

var assign = require('object-assign');

/**
 * Return state given mouse coords and an element rectangle.
 *
 * @param {object} cursor Cursor position with clientX/clientY
 * @param {object} rect Rectangle of an element
 * @param {number} threshold Threshold in pixels
 * @return {object}
 */
exports.getCursorState = function(cursor, rect, threshold) {
    var x = cursor.clientX - rect.left;
    var y = cursor.clientY - rect.top;

    return {
        x: x,
        y: y,
        onTopEdge: y <= threshold,
        onRightEdge: x >= rect.width - threshold,
        onBottomEdge: y >= rect.height - threshold,
        onLeftEdge: x <= threshold
    };
};

/**
 * Return whether cursor state is in resizing state.
 *
 * @param {object} cursorState State of cursor
 * @return {boolean}
 */
exports.isResizing = function(cursorState) {
    return cursorState.onTopEdge ||
        cursorState.onRightEdge  ||
        cursorState.onBottomEdge ||
        cursorState.onLeftEdge;
};

/**
 * Return a snapshot of a mousedown event.
 *
 * @param {object} cursor Cursor position with clientX/clientY
 * @param {object} rect Rectangle of an element
 * @param {number} threshold Threshold in pixels
 * @return {object}
 */
exports.getGrabState = function(cursor, rect, threshold) {
    var cursorState = exports.getCursorState(cursor, rect, threshold);

    return assign(
        {
            clientX: cursor.clientX,
            clientY: cursor.clientY,
            width: rect.width,
            height: rect.height
        },
        cursorState
    );
};

/**
 * Force the given dimension or value into the range specified
 * by the resizer's `maxDims` and `minDims`.
 *
 * @param {Object} resizer Resizer object
 * @param {String} [dimension='x'] 'x' or 'y' dimension
 * @param {Number} [val=resizer[x|y]] Value to apply the clamp to.
 * @return {Number} Clamped value
 */
exports.clamp = function(resizer, dimension, val) {
    var xy = dimension || 'x',
        value = val || resizer[xy];

    if (resizer.maxDims && value > resizer.maxDims[xy]) {
        return resizer.maxDims[xy];
    } else if (resizer.minDims && value < resizer.minDims[xy]) {
        return resizer.minDims[xy];
    }
    return value;
};