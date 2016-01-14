'use strict';

var Store = require('./lib/store');
var Resizer = require('./lib/resizer');
var store = new Store({ window: window, document: document });

store.bindEvents();
store.render();

/**
 * Public-facing resizabull factory method. Instantiates a resizer, registers
 * it with the store, binds events, and returns the instance.
 *
 * @param {HTMLElement} el Element to make resizable
 * @param {object} [options] Configuration options
 */
function resizabull(el, options) {
    var resizer = new Resizer(el, options);
    store.add(resizer);
    resizer.bindEvents();
    return resizer;
}

module.exports = resizabull;
