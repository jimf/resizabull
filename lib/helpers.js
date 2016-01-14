'use strict';

var assign = require('object-assign'),
    clamp = require('clamp');

/**
 * Clamps the width of a resizer between a min and max.
 *
 * @param {Resizer} resizer Resizer instance
 * @return {number} Clamped width value
 */
exports.clampWidth = function(resizer) {
    return clamp(resizer.x, resizer.minWidth, resizer.maxWidth);
};

/**
 * Clamps the height of a resizer between a min and max.
 *
 * @param {Resizer} resizer Resizer instance
 * @return {number} Clamped height value
 */
exports.clampHeight = function(resizer) {
    return clamp(resizer.y, resizer.minHeight, resizer.maxHeight);
};

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
