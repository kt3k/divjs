/**
 * transition.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.transition = (function () {
    'use strict';

    var exports = function (delegate) {
        return new transition(delegate);
    };

    var transition = function (delegate) {
        this.queue = [];
        this.delegate = delegate;
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

    transitionPrototype.createTransition = function (params) {
        var transition = {
            duration: this.defaultDuration,
            delay: this.defaultDelay,
            callbacks: []
        };

        Object.keys(params).forEach(function (key) {
            transition[key] = params[key];
        });

        return transition;
    };

    transitionPrototype.commit = function () {
        this.__lock__ = true;

        var transition = this.queue.shift();

        var self = this;

        this.delegate.onTransitionBeforeStart(transition);

        this.__start__ = setTimeout(function () {
            self.delegate.onTransitionStart(transition);
        }, transition.delay);

        this.__stop__ = setTimeout(function () {
            self.__lock__ = false;

            self.delegate.onTransitionStop(transition);

            self.commit();

            transition.callbacks.forEach(function (func) {
                func(transition);
            });
        }, transition.delay + transition.duration);
    }
    .E(ToDoNothingWhenLocked)
    .E(ToDoNothingWhenEmpty)
    .E(Chainable);

    transitionPrototype.transition = function () {
        var params = this.delegate.getTransitionAddition();

        this.queue.push(this.createTransition(params));
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

    transitionPrototype.cancel = function () {
        clearInterval(this.__start__);
        clearInterval(this.__stop__);
        this.queue = [];
        this.__lock__ = false;
    };

    delete Function.prototype.E;

    return exports;
}());

// abstract class
window.Transitionable = (function () {
    'use strict';

    var exports = function () {};

    var transitionablePrototype = exports.prototype;

    Function.prototype.E = function (decorator) { return decorator(this); };

    var Chainable = function (f) {
        return function () {
            f.apply(this, arguments);

            return this;
        };
    };

    transitionablePrototype.initTransition = function (delegate) {
        this.__transition__ = window.transition(delegate);
    };

    transitionablePrototype.getTransition = function () {
        return this.__transition__;
    };

    transitionablePrototype.duration = function (duration) {
        this.getTransition().duration(duration);
    }
    .E(Chainable);

    transitionablePrototype.delay = function (delay) {
        this.getTransition().delay(delay);
    }
    .E(Chainable);

    transitionablePrototype.callback = function (callback) {
        this.getTransition().callback(callback);
    }
    .E(Chainable);

    transitionablePrototype.transitionCommit = function () {
        var self = this;
        setTimeout(function () {
            self.getTransition().commit();
        });
    }
    .E(Chainable);

    transitionablePrototype.transitionCancel = function () {
        this.getTransition().cancel();
    }
    .E(Chainable);

    transitionablePrototype.transition = function () {
        this.getTransition().transition();
    }
    .E(Chainable);

    transitionablePrototype.getTransitionAddition = function () {
        return {};
    };

    transitionablePrototype.onTransitionBeforeStart = function () {};

    transitionablePrototype.onTransitionStart = function () {};

    transitionablePrototype.onTransitionStop = function () {};

    return exports;
}());
