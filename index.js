'use strict';

var Store = require('./lib/store');
var Resizer = require('./lib/resizer');
var store = new Store({ window: window, document: document });

store.bindEvents();
store.render();

function resizabull(el, options) {
    var resizer = new Resizer(el, options);
    store.add(resizer);
    resizer.bindEvents();
    return resizer;
}

module.exports = resizabull;
