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
            x: 0,
            y: 0,
            rot: 0,
            scale: 100,
            hue: 0,
            sat: 0,
            lum: 100
        };
    };

    var reflectToDom = function (dom, met) {
        reflectTransformationToDom(dom, met);
        reflectBackgroundColorToDom(dom, met);
    };

    var reflectBackgroundColorToDom = function (dom, met) {
        dom.style.backgroundColor = (
            'hsl(' + met.hue + ',' + met.sat + '%,' + met.lum + '%)'
        );
    };

    var reflectTransformationToDom = function (dom, met) {
        dom.style.webkitTransform = (
            'translate(' + met.x + 'px,' + met.y + 'px)' +
            ' rotate(' + met.rot + 'deg)' +
            ' scale(' + met.scale / 100 + ')'
        );
    };

    var methodAdd = function (key) {
        return function (val) {
            this.met[key] += val;
            return this;
        };
    };

    var methodSet = function (key) {
        return function (val) {
            this.met[key] = val;
            return this;
        };
    };

    var methodGet = function (key) {
        return function () {
            return this.met[key];
        };
    };

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

    div.prototype.scale = function (scale) {
        this.mergeAdd({scale: scale});
        return this;
    };
    div.prototype.setScale = function (scale) {
        this.mergeSet({scale: scale});
        return this;
    };
    div.prototype.rotate = function (deg) {
        this.mergeAdd({rot: deg});
        return this;
    };
    div.prototype.setRotate = function (deg) {
        this.mergeSet({rot: deg});
    };
    div.prototype.translate = function (x, y) {
        this.mergeAdd({x: x, y: y});
        return this;
    };
    div.prototype.hsl = function (h, s, l) {
        this.mergeAdd({hue: h, sat: s, lum: l});
        return this;
    };
    div.prototype.mergeAdd = function (args) {
        var self = this;
        Object.keys(args).forEach(function (key) {
            self.met[key] += args[key] || 0;
        });
    };
    div.prototype.mergeSet = function (args) {
        var self = this;
        Object.keys(args).forEach(function (key) {
            self.met[key] = args[key] || 0;
        });
    };
    div.prototype.commit = function () {
        reflectToDom(this.dom, this.met);
    };

    var exports = function (styles) {
        return new div(styles);
    };

    exports.prototype = div.prototype;

    div.prototype.constructor = exports;

    return exports;
}(this));
