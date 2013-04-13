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

    var ThrowErrorWhenQueueEmpty = function (func) {
        return function () {
            if (this.queue.length === 0) {
                throw Error('transition queue is empty.');
            }

            func.apply(this, arguments);
        }
    };

    Function.prototype.being = function (decorator) {
        return decorate(this);
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
        return this.queue[queue.length - 1];
    }
    .being(ThrowErrorWhenQueueEmpty);

    transitionPrototype.headTransition = function () {
        return this.queue[0];
    }
    .being(ThrowErrorWhenQueueEmpty);

    transitionPrototype.duration = function (duration) {
    }
    .being(ThrowErrorWhenQueueEmpty);

    transitionPrototype.delay = function (delay) {}
    .being(ThrowErrorWhenQueueEmpty);

    return exports;
}());