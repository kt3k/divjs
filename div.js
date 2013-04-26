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

        this.initTransition(this);

        this.prevMet = {};

        copyProps(this.met, this.prevMet);

        this.css(styles);
    };

    var exports = function (styles) {
        return new div(styles);
    };

    var divPrototype = div.prototype = exports.prototype = new window.Transitionable();

    divPrototype.constructor = div;

    var decorators = exports.decorators = {};

    var Transitionable = decorators.Transitionable = window.transition.Transitionable;

    // decorator
    var Chainable = decorators.Chainable = function (func) {
        return function () {
            func.apply(this, arguments);

            return this;
        };
    };

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

    exports.setBranchGenerator();

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

    divPrototype.addX = methodAdd('x');
    divPrototype.setX = methodSet('x');
    divPrototype.getX = methodGet('x');

    divPrototype.addY = methodAdd('y');
    divPrototype.setY = methodSet('y');
    divPrototype.getY = methodGet('y');

    divPrototype.addScale = methodAdd('scale');
    divPrototype.setScale = methodSet('scale');
    divPrototype.getScale = methodGet('scale');

    divPrototype.addRot = methodAdd('rot');
    divPrototype.setRot = methodSet('rot');
    divPrototype.getRot = methodGet('rot');

    divPrototype.addHue = methodAdd('hue');
    divPrototype.setHue = methodSet('hue');
    divPrototype.getHue = methodGet('hue');

    divPrototype.addSat = methodAdd('sat');
    divPrototype.setSat = methodSet('sat');
    divPrototype.getSat = methodGet('sat');

    divPrototype.addLum = methodAdd('lum');
    divPrototype.setLum = methodSet('lum');
    divPrototype.getLum = methodGet('lum');

    divPrototype.commit = function (met, styles) {
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
    }
    .E(Chainable);

    divPrototype.css = function (styles) {
        if (styles != null) {
            copyProps(styles, this.nextStyles);
        }
    }
    .E(Chainable);

    divPrototype.appendTo = function (parent) {
        parent.appendChild(this.dom);
    }
    .E(Chainable);

    divPrototype.prependTo = function (parent) {
        parent.insertBefore(this.dom, parent.firstChild);
    }
    .E(Chainable);

    divPrototype.remove = function () {
        if (this.dom.parentElement) {
            this.dom.parentElement.removeChild(this.dom);
        }
    }
    .E(Transitionable)
    .E(Chainable);

    divPrototype.getDiff = function () {
        return getDiff(this.met, this.prevMet);
    };

    // transition delegation
    divPrototype.getTransitionAddition = function () {
        var newMet = {};
        copyProps(this.met, newMet);
        this.met = newMet;

        var newStyle = this.nextStyles = {};

        return {
            met: newMet,
            styles: newStyle
        };
    };

    // transition delegation
    divPrototype.onTransitionStart = function (transition) {
        this.commit(transition.met, transition.styles);
    };

    // transition delegation
    divPrototype.onTransitionStop = function () {};

    // transition delegation
    divPrototype.onTransitionBeforeStart = function (transition) {
        this.setTransitionDuration(transition.duration);
    };

    divPrototype.setTransitionDuration = function (duration) {
        this.dom.style.webkitTransitionDuration = duration + 'ms';
        this.dom.style.transitionDuration = duration + 'ms';
    }
    .E(Chainable);

    return exports;
}(this));
