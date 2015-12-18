'use strict';

var assign = require('object-assign');

/**
 * Return state given mouse coords and an element rectangle.
 *
 * @param {object} cursor Cursor position with clientX/clientY
 * @param {object} rect Rectangle of an element
 * @param {number} threshold Treshold in pixels
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

exports.getGrabState = function(cursor, rect, treshold) {
    var cursorState = exports.getCursorState(cursor, rect, treshold);

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
 * Return a cursor style given positional state.
 *
 * @param {object} state Cursor position state relative to an element
 * @return {string|undefined}
 */
exports.cursorStyle = function(state) {
    /*jshint maxcomplexity:10*/
    /*jshint bitwise:false*/
    var NONE   = 0;
    var TOP    = 1;
    var RIGHT  = 2;
    var BOTTOM = 4;
    var LEFT   = 8;

    var top    = state.onTopEdge    << 0;
    var right  = state.onRightEdge  << 1;
    var bottom = state.onBottomEdge << 2;
    var left   = state.onLeftEdge   << 3;

    switch (top | right | bottom | left) {
        case NONE:
            return 'default';

        case RIGHT:
        case LEFT:
            return 'ew-resize';

        case TOP:
        case BOTTOM:
            return 'ns-resize';

        case TOP | RIGHT:
        case BOTTOM | LEFT:
            return 'nesw-resize';

        case TOP | LEFT:
        case BOTTOM | RIGHT:
            return 'nwse-resize';
    }
};

// exports.dimensions = function(cursor, )

//     if ((state.onRightEdge && state.onBottomEdge) ||
//         (state.onLeftEdge && state.onTopEdge)) {
//         return 'nwse-resize';
//     } else if ((state.onRightEdge && state.onTopEdge) ||
//                (state.onBottomEdge && state.onLeftEdge)) {
//         return 'nesw-resize';
//     } else if (state.onRightEdge || state.onLeftEdge) {
//         return 'ew-resize';
//     } else if (state.onBottomEdge || state.onTopEdge) {
//         return 'ns-resize';
//     }

//     return 'default';
