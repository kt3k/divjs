/**
 * transible.js v0.1
 * author: Yosiya Hinosawa
 */

window.transition = (function () {
    'use strict';

    var exports = function () {
        return new transition();
    };

    var transition = function () {
        this.queue = [];
    };

    var transitionPrototype = transition.prototype = exports.prototype = {constructor: exports};

    exports.DURATION = 500;
    exports.DELAY = 0;

    var createTransition = function () {
        return {
            duration: exports.DURATION,
            delay: exports.DURATION
        };
    };

    transitionPrototype.transitionCommit = function () {
        setTimeout();
    };

    transitionPrototype.transition = function () {
        this.queue.push(createTransition());
    };

    transitionPrototype.transitionExists = function () {
        return this.queue.length > 0;
    };

    transitionPrototype.tailTransition = function () {
        if (this.queue.length === 0) {
            throw Error('transition queue is empty.');
        }

        return this.queue[queue.length - 1];
    };

    transitionPrototype.headTransition = function () {
        if (this.queue.length === 0) {
            throw Error('transition queue is empty.');
        }

        return this.queue[0];
    };

    transitionPrototype.duration = function (duration) {
        //TODO: this.tailTransition();
    };

    transitionPrototype.delay = function (delay) {};

    return exports;
}());