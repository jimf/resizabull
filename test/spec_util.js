'use strict';

var sinon = require('sinon');

exports.createEl = function(opts) {
    opts = opts || {};

    return {
        addEventListener: sinon.stub(),
        removeEventListener: sinon.stub(),
        getBoundingClientRect: function() {
            return {
                width: opts.w || 200,
                height: opts.h || 200,
                top: opts.t || 0,
                left: opts.l || 0,
                aspectRatio: true
            };
        }
    };
};
