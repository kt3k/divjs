/**
 * div.js 1.0.0
 * author: Yosiya Hinosawa ( @kt3k )
 * license: MIT License ( http://opensource.org/licenses/MIT )
 */
this.div = (function (window) {
    'use strict';

    var div = function (styles) {
        var dom = window.document.createElement('div');
        this.dom = dom;
        this.style = dom.style;
        Object.keys(styles || {}).forEach(function (key) {
            dom.style[key] = styles[key];
        });
        this.met = {
            x: 0,
            y: 0,
            rot: 0,
            scale: 1.0,
            hue: 0,
            sat: 0,
            lum: 100
        };
    };

    div.prototype.constructor = div;

    div.prototype.setColor = function () {
        this.style.backgroundColor = (
            'hsl(' + this.met.hue + ',' + this.met.sat + '%,' + this.met.lum + '%)'
        );
    };
    div.prototype.setMetrics = function () {
        this.style.webkitTransform = (
            'translate(' + this.met.x + 'px,' + this.met.y + 'px)' +
            ' rotate(' + this.met.rot + 'deg)' +
            ' scale(' + this.met.scale + ')'
        );
    };
    div.prototype.scale = function (ratio) {
        this.mergeAdd({scale: ratio});
        return this;
    };
    div.prototype.rotate = function (deg) {
        this.mergeAdd({rot: deg});
        return this;
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
    div.prototype.commit = function () {
        this.setMetrics();
        this.setColor();
    };

    var exports = function (styles) {
        return new div(styles);
    };

    return exports;
}(this));
