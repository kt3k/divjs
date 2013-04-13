/**
 * transible.js v0.1
 * author: Yosiya Hinosawa
 */

window.mobile = (function () {
    'use strict';

    var exports = function () {
        return new mobile();
    };

    var mobile = function () {
        this.queue = [];
    };

    var mobilePrototype = mobile.prototype = exports.prototype = {constructor: exports};

    exports.DURATION = 500;
    exports.DELAY = 0;

    var createTransition = function () {
        return {
            duration: exports.DURATION,
            delay: exports.DURATION
        };
    };

    mobilePrototype.transitionCommit = function () {
        setTimeout();
    };

    mobilePrototype.transition = function () {
        this.queue.push(createTransition());
    };

    mobilePrototype.transitionExists = function () {
        return this.queue.length > 0;
    };

    mobilePrototype.duration = function (duration) {
        //TODO: this.tailTransition();
    };

    mobilePrototype.delay = function (delay) {};

    return exports;
}());