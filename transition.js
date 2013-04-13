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

    // decorator
    var ToDoNothingWhenEmpty = function (func) {
        return function () {
            if (this.queue.length === 0) {
                return;
            }

            return func.apply(this, arguments);
        };
    };

    // decorator
    var ToDoNothingWhenLocked = function (func) {
        return function () {
            if (this.__locked__) {
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

    // export decorator
    exports.Transitionable = function (func) {
        return function () {
            var self = this;
            var args = arguments;

            if (!this.getTransition().transitionExists()) {
                return func.apply(this, arguments);
            } else {
                this.getTransition().callback(function () {
                    func.apply(self, args);
                });

                return this;
            }
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

    transitionPrototype.commit = function () {
        this.__lock__ = true;

        var transition = this.queue.shift();

        var self = this;

        setTimeout(function () {
            self.onStart(transition);
        }, transition.delay);

        setTimeout(function () {
            self.__lock__ = false;

            self.onStop(transition);

            self.commit();

            transition.callbacks.forEach(function (func) {
                func(transition);
            });
        }, transition.delay + transition.duration);
    }
    .E(ToDoNothingWhenLocked)
    .E(ToDoNothingWhenEmpty)
    .E(Chainable);

    transitionPrototype.onStart = function () {
    };

    transitionPrototype.onStop = function () {
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
