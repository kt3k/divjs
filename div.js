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

        Object.keys(styles || {}).forEach(function (key) {
            dom.style[key] = styles[key];
        });

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
    };

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

    var method = function (func) {
        return function (key) {
            return function (val) {
                return func.call(this, key, val);
            };
        };
    };

    var methodAdd = method(function (key, val) {
        this.met[key] += val;
    });

    var methodSet = method(function (key, val) {
        this.met[key] = val;
    });

    var methodGet = method(function (key) {
        return this.met[key];
    });

    div.prototype.addX = methodAdd('x');
    div.prototype.setX = methodSet('x');
    div.prototype.getX = methodGet('x');

    div.prototype.addY = methodAdd('y');
    div.prototype.setY = methodSet('y');
    div.prototype.getY = methodGet('y');

    div.prototype.addScale = methodAdd('scale');
    div.prototype.setScale = methodSet('scale');
    div.prototype.getScale = methodGet('scale');

    div.prototype.addRot = methodAdd('rot');
    div.prototype.setRot = methodSet('rot');
    div.prototype.getRot = methodGet('rot');

    div.prototype.addHue = methodAdd('hue');
    div.prototype.setHue = methodSet('hue');
    div.prototype.getHue = methodGet('hue');

    div.prototype.addSat = methodAdd('sat');
    div.prototype.setSat = methodSet('sat');
    div.prototype.getSat = methodGet('sat');

    div.prototype.addLum = methodAdd('lum');
    div.prototype.setLum = methodSet('lum');
    div.prototype.getLum = methodGet('lum');

    div.prototype.commit = function () {
        reflectToDom(this.dom, this.met);
    };

    var exports = function (styles) {
        return new div(styles);
    };

    exports.prototype = div.prototype;

    div.prototype.constructor = exports;

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
