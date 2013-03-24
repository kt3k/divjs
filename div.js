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
        var dom = window.document.createElement('div');

        this.dom = dom;
        this.met = {
            x: exports.x,
            y: exports.y,
            rot: exports.rot,
            scale: exports.scale,
            hue: exports.hue,
            sat: exports.sat,
            lum: exports.lum
        };

        this.prevMet = {};

        copyObject(this.met, this.prevMet);

        this.css(styles);
    };

    var pt = div.prototype;

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

    var copyObject = function (src, dest) {
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
        return this.met[key];
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

    pt.commit = function () {
        copyObject(this.met, this.prevMet);
        reflectToDom(this.dom, this.met);

        return this;
    };

    pt.css = function (styles) {
        Object.keys(styles || {}).forEach(function (key) {
            this.dom.style[key] = styles[key];
        }, this);

        return this;
    };

    pt.appendTo = function (parent) {
        parent.appendChild(this.dom);
        return this;
    };

    pt.getDiff = function () {
        return getDiff(this.met, this.prevMet);
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
