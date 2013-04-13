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
            delay: exports.DURATION,
            callbacks: []
        };
    };

    // decorator
    var ThrowErrorWhenQueueEmpty = function (func) {
        return function () {
            if (this.queue.length === 0) {
                throw Error('transition queue is empty.');
            }

            func.apply(this, arguments);
        };
    };

    // decorator
    var Chainable = function (func) {
        return function () {
            func.apply(this, arguments);

            return this;
        };
    };

    Function.prototype.being = function (decorator) {
        return decorator(this);
    };

    transitionPrototype.transitionCommit = function () {
        setTimeout();
    }
    .being(Chainable);

    transitionPrototype.transition = function () {
        this.queue.push(createTransition());
    }
    .being(Chainable);

    transitionPrototype.transitionExists = function () {
        return this.queue.length > 0;
    };

    transitionPrototype.tailTransition = function () {
        return this.queue[this.queue.length - 1];
    }
    .being(ThrowErrorWhenQueueEmpty);

    transitionPrototype.headTransition = function () {
        return this.queue[0];
    }
    .being(ThrowErrorWhenQueueEmpty);

    transitionPrototype.duration = function (duration) {
        this.tailTransition().duration = duration;
    }
    .being(Chainable);

    transitionPrototype.delay = function (delay) {
        this.tailTransition().delay = delay;
    }
    .being(Chainable);

    transitionPrototype.callback = function (func) {
        this.tailTransition().callbacks.push(func);
    }
    .being(Chainable);

    delete Function.prototype.being;

    return exports;
}());
