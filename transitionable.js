/**
 * transible.js v0.1
 * author: Yosiya Hinosawa
 */

window.transible = (function () {
    'use strict';

    var exports = function () {
        return new transible();
    };

    var transible = function () {
        this.queue = [];
    };

    var transiblePrototype = transible.prototype = exports.prototype = {constructor: exports};

    exports.DURATION = 500;
    exports.DELAY = 0;

    var createTransition = function () {
        return {
            duration: exports.DURATION,
            delay: exports.DURATION
        };
    };

    transiblePrototype.transitionCommit = function () {
        setTimeout();
    };

    transiblePrototype.transition = function () {
        this.queue.push(createTransition());
    };

    transiblePrototype.transitionExists = function () {
        return this.queue.length > 0;
    };

    transiblePrototype.duration = function (duration) {
        //TODO: this.tailTransition();
    };

    transiblePrototype.delay = function (delay) {};

    return exports;
}());