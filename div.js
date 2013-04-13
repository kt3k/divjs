/**
 * div.js 1.0.1
 * author: Yosiya Hinosawa ( @kt3k )
 * license: MIT License ( http://opensource.org/licenses/MIT )
 */

 /**
  * metrics
  * =======
  * x: (-Infinity, Infinity)
  * y: (-Infinity, Infinity)
  * rot: (-Infinity, Infinity)
  * scale: [0 --> Infinity)
  * hue: [-Infinity, Infinity]
  * sat: [0, 100]
  * lum: [0, 100]
  */

this.div = (function (window) {
    'use strict';

    var div = function (styles) {

        this.dom = window.document.createElement('div');

        this.met = {
            x: exports.x,
            y: exports.y,
            rot: exports.rot,
            scale: exports.scale,
            hue: exports.hue,
            sat: exports.sat,
            lum: exports.lum
        };
        this.nextStyles = {};
        this.transitionQueue = [];

        this.transObj = window.transition(this);

        this.prevMet = {};

        copyProps(this.met, this.prevMet);

        this.css(styles);
    };

    var pt = div.prototype;
/*
    var callIfFunction = function (func, obj, args) {
        if (typeof func === 'function') {
            func.apply(obj, args);
        }
    };
*/
    var reflectToDom = function (dom, met) {
        reflectTransformationToDom(dom, met);
        reflectBackgroundColorToDom(dom, met);
    };

    var reflectBackgroundColorToDom = function (dom, met) {
        dom.style.backgroundColor = exports.backgroundColor(met);
    };

    var reflectTransformationToDom = function (dom, met) {
        dom.style.webkitTransform = exports.webkitTransform(met);
    };

    var copyProps = function (src, dest) {
        Object.keys(src).forEach(function (key) {
            dest[key] = src[key];
        });
    };

    var getDiff = function (x, y) {
        var res = {};

        Object.keys(x).forEach(function (key) {
            if (x[key] !== y[key]) {
                res[key] = x[key] - y[key];
            }
        });

        return res;
    };

    var method = function (func) {
        return function (key) {
            return function (val) {
                return func.call(this, key, val);
            };
        };
    };

    var methodAdd = method(function (key, val) {
        this.met[key] += val;
        return this;
    });

    var methodSet = method(function (key, val) {
        this.met[key] = val;
        return this;
    });

    var methodGet = method(function (key) {
        return this.prevMet[key];
    });

    pt.addX = methodAdd('x');
    pt.setX = methodSet('x');
    pt.getX = methodGet('x');

    pt.addY = methodAdd('y');
    pt.setY = methodSet('y');
    pt.getY = methodGet('y');

    pt.addScale = methodAdd('scale');
    pt.setScale = methodSet('scale');
    pt.getScale = methodGet('scale');

    pt.addRot = methodAdd('rot');
    pt.setRot = methodSet('rot');
    pt.getRot = methodGet('rot');

    pt.addHue = methodAdd('hue');
    pt.setHue = methodSet('hue');
    pt.getHue = methodGet('hue');

    pt.addSat = methodAdd('sat');
    pt.setSat = methodSet('sat');
    pt.getSat = methodGet('sat');

    pt.addLum = methodAdd('lum');
    pt.setLum = methodSet('lum');
    pt.getLum = methodGet('lum');

    pt.commit = function (met, styles) {
        if (met) {
            this.met = met;
        }
        if (styles) {
            this.nextStyles = styles;
        }

        copyProps(this.met, this.prevMet);

        reflectToDom(this.dom, this.met);

        copyProps(this.nextStyles, this.dom.style);

        this.nextStyle = {};

        return this;
    };

    pt.css = function (styles) {
        if (styles != null) {
            copyProps(styles, this.nextStyles);
        }

        return this;
    };
/*
    var bufferable = function (func) {
        return function () {
            var self = this;
            var args = arguments;

            if (this.transitionQueueEmpty()) {
                return func.apply(self, args);
            } else {
                this.callback(function () {
                    return func.apply(self, args);
                });

                return this;
            }
        };
    };
*/
    pt.appendTo = function (parent) {
        parent.appendChild(this.dom);

        return this;
    };

    pt.remove = function () {
        if (this.dom.parentElement) {
            this.dom.parentElement.removeChild(this.dom);
        }

        return this;
    };
    pt.remove = window.transition.Transitionable(pt.remove);

    pt.getDiff = function () {
        return getDiff(this.met, this.prevMet);
    };

    pt.getTransition = function () {
        return this.transObj;
    };

    pt.transition = function (args) {
        args || (args = {});
        var newMet = {};
        copyProps(this.met, newMet);

        var newStyle = {};

        var options = {
            met: newMet,
            styles: newStyle
        };

        this.getTransition().transition(options);

        this.met = newMet;
        this.nextStyles = newStyle;

        return this;
    };

    pt.transitionCommit = function () {
        this.getTransition().commit();
/*
        if (this.transitionQueueEmpty()) {
            return;
        }

        var transition = this.transitionQueue.shift();
        this.dom.style.webkitTransitionDuration = transition.duration + 'ms';

        var that = this;
        window.setTimeout(function () {
            that.commit(transition.met, transition.styles);
        }, transition.delay);

        window.setTimeout(function () {
            that.transitionCommit();

            transition.callbacks.forEach(function (callback) {
                callIfFunction(callback);
            });
        }, transition.delay + transition.duration);
*/

        return this;
    };

    pt.onTransitionStart = function (transition) {
        this.commit(transition.met, transition.styles);
    };

    pt.onTransitionStop = function () {};

    pt.onTransitionBeforeStart = function (transition) {
        this.dom.style.webkitTransitionDuration = transition.duration + 'ms';
    };

    pt.duration = function (duration) {
        this.getTransition().duration(duration);

        return this;
    };

    pt.delay = function (delay) {
        this.getTransition().delay(delay);

        return this;
    };

    pt.callback = function (callback) {
        this.getTransition().callback(callback);

        return this;
    };

    var exports = function (styles) {
        return new div(styles);
    };

    pt.constructor = exports;

    exports.prototype = pt;

    exports.x = 0;
    exports.y = 0;
    exports.rot = 0;
    exports.scale = 100;
    exports.hue = 0;
    exports.sat = 0;
    exports.lum = 100;

    exports.webkitTransform = function (met) {
        return (
            'translate(' + met.x + 'px,' + met.y + 'px)' +
            ' rotate(' + met.rot + 'deg)' +
            ' scale(' + met.scale / 100 + ')'
        );
    };

    exports.backgroundColor = function (met) {
        return 'hsl(' + met.hue + ',' + met.sat + '%,' + met.lum + '%)';
    };

    return exports;
}(this));
