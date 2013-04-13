/**
 * transition.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
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

    Function.prototype.E = function (decorator) {
        return decorator(this);
    };

    transitionPrototype.defaultDuration = 500;
    transitionPrototype.defaultDelay = 0;

    transitionPrototype.createTransition = function () {
        return {
            duration: this.defaultDuration,
            delay: this.defaultDelay,
            callbacks: []
        };
    };

    transitionPrototype.transitionCommit = function () {
        setTimeout();
    }
    .E(Chainable);

    transitionPrototype.transition = function () {
        this.queue.push(this.createTransition());
    }
    .E(Chainable);

    transitionPrototype.transitionExists = function () {
        return this.queue.length > 0;
    };

    transitionPrototype.tailTransition = function () {
        return this.queue[this.queue.length - 1];
    }
    .E(ThrowErrorWhenQueueEmpty);

    transitionPrototype.headTransition = function () {
        return this.queue[0];
    }
    .E(ThrowErrorWhenQueueEmpty);

    transitionPrototype.duration = function (duration) {
        this.tailTransition().duration = duration;
    }
    .E(Chainable);

    transitionPrototype.delay = function (delay) {
        this.tailTransition().delay = delay;
    }
    .E(Chainable);

    transitionPrototype.callback = function (func) {
        this.tailTransition().callbacks.push(func);
    }
    .E(Chainable);

    delete Function.prototype.E;

    return exports;
}());
