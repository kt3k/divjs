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
    var ToThrowErrorWhenEmpty = function (func) {
        return function () {
            if (this.queue.length === 0) {
                throw Error('transition queue is empty.');
            }

            return func.apply(this, arguments);
        };
    };

    var ToDoNothingWhenEmpty = function (func) {
        return function () {
            if (this.queue.length === 0) {
                return;
            }

            return func.apply(this, arguments);
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
        var transition = this.queue.shift();

        var self = this;

        setTimeout(function () {
            self.onStart(transition);
        }, transition.delay);

        setTimeout(function () {
            self.onStop(transition);
        }, transition.delay + transition.duration);
    }
    .E(ToDoNothingWhenEmpty)
    .E(Chainable);

    transitionPrototype.onStart = function () {
    };

    transitionPrototype.onStop = function (transition) {
        this.callbacks.forEach(function (func) {
            func(transition);
        });
    };

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
    .E(ToThrowErrorWhenEmpty);

    transitionPrototype.headTransition = function () {
        return this.queue[0];
    }
    .E(ToThrowErrorWhenEmpty);

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
