(function() {

  describe('div', function() {
    it('is a function', function() {
      return expect(typeof window.div).toBe('function');
    });
    describe('instance of div', function() {
      var instance;
      instance = window.div();
      it('is a Object', function() {
        return expect(typeof instance).toBe('object');
      });
      it('is instanceof div', function() {
        return expect(instance instanceof div).toBe(true);
      });
      describe('instance.dom', function() {
        return it('is a HTMLDivElement', function() {
          return expect(instance.dom instanceof document.createElement('div').constructor).toBe(true);
        });
      });
      describe('instance.getX()', function() {
        it('is 0 by default', function() {
          return expect(instance.getX()).toBe(0);
        });
        it('is 30 when instance.addX(30)', function() {
          instance.addX(30);
          return expect(instance.getX()).toBe(30);
        });
        return it('is 45 when it.setX(45)', function() {
          instance.setX(45);
          return expect(instance.getX()).toBe(45);
        });
      });
      describe('instance.getY()', function() {
        it('is 0 by default', function() {
          return expect(instance.getY()).toBe(0);
        });
        it('is 37 when instance.addY(37)', function() {
          instance.addY(37);
          return expect(instance.getY()).toBe(37);
        });
        it('is 91 when instance.setY(91)', function() {
          instance.setY(91);
          return expect(instance.getY()).toBe(91);
        });
        return it('then is 99 when instance.addY(8)', function() {
          instance.addY(8);
          return expect(instance.getY()).toBe(99);
        });
      });
      describe('instance.getScale()', function() {
        it('is 100 by default', function() {
          return expect(instance.getScale()).toBe(100);
        });
        it('is 77 when instance.setScale(77)', function() {
          instance.setScale(77);
          return expect(instance.getScale()).toBe(77);
        });
        it('is 89 when instance.addScale(12)', function() {
          instance.addScale(12);
          return expect(instance.getScale()).toBe(89);
        });
        return it('is 97 when instance.setScale(97)', function() {
          instance.setScale(97);
          return expect(instance.getScale()).toBe(97);
        });
      });
      describe('instance.getRot()', function() {
        it('is 0 by default', function() {
          return expect(instance.getRot()).toBe(0);
        });
        it('is 100 when instance.setRot(100)', function() {
          instance.setRot(100);
          return expect(instance.getRot()).toBe(100);
        });
        return it('is 200 when instnace.addRot(100)', function() {
          instance.addRot(100);
          return expect(instance.getRot()).toBe(200);
        });
      });
      describe('instance.getHue()', function() {
        it('is 0 by default', function() {
          return expect(instance.getHue()).toBe(0);
        });
        it('is 25 when instance.setHue(25)', function() {
          instance.setHue(25);
          return expect(instance.getHue()).toBe(25);
        });
        it('is 75 when instance.addHue(50)', function() {
          instance.addHue(50);
          return expect(instance.getHue()).toBe(75);
        });
        return it('is 50 when instance.addHue(-25)', function() {
          instance.addHue(-25);
          return expect(instance.getHue()).toBe(50);
        });
      });
      describe('instance.getSat()', function() {
        it('is 0 by default', function() {
          return expect(instance.getSat()).toBe(0);
        });
        it('is 88 when instance.setSat(88)', function() {
          instance.setSat(88);
          return expect(instance.getSat()).toBe(88);
        });
        it('is 95 when instance.addSat(7)', function() {
          instance.addSat(7);
          return expect(instance.getSat()).toBe(95);
        });
        return it('is 76 when instance.addSat(-19)', function() {
          instance.addSat(-19);
          return expect(instance.getSat()).toBe(76);
        });
      });
      describe('instance.getLum()', function() {
        it('is 100 by default', function() {
          return expect(instance.getLum()).toBe(100);
        });
        it('is 87 when instance.setLum(87)', function() {
          instance.setLum(87);
          return expect(instance.getLum()).toBe(87);
        });
        it('is 97 when instance.addLum(10)', function() {
          instance.addLum(10);
          return expect(instance.getLum()).toBe(97);
        });
        return it('is 28 when instance.addLum(-69)', function() {
          instance.addLum(-69);
          return expect(instance.getLum()).toBe(28);
        });
      });
      describe('set method', function() {
        return it('returns instance itself', function() {
          expect(instance.setX(0)).toBe(instance);
          expect(instance.setY(0)).toBe(instance);
          expect(instance.setScale(0)).toBe(instance);
          expect(instance.setRot(0)).toBe(instance);
          expect(instance.setHue(0)).toBe(instance);
          expect(instance.setSat(0)).toBe(instance);
          return expect(instance.setLum(0)).toBe(instance);
        });
      });
      describe('add method', function() {
        return it('returns instance itself', function() {
          expect(instance.addX(0)).toBe(instance);
          expect(instance.addY(0)).toBe(instance);
          expect(instance.addScale(0)).toBe(instance);
          expect(instance.addRot(0)).toBe(instance);
          expect(instance.addHue(0)).toBe(instance);
          expect(instance.addSat(0)).toBe(instance);
          return expect(instance.addLum(0)).toBe(instance);
        });
      });
      describe('instance.commit() makes', function() {
        describe('instance.dom.style.webkitTransform', function() {
          return it('is "translate({x}px, {y}px) rotate({rot}deg) scale({scale/100})" according to current x, y, rot and scale', function() {
            instance.setX(45).setY(99).setRot(200).setScale(97).commit();
            return expect(instance.dom.style.webkitTransform).toBe('translate(45px, 99px) rotate(200deg) scale(0.97)');
          });
        });
        return describe('instance.dom.style.backgroundColor', function() {
          return it('is "rgb(R, G, B)" according to current hue, sat and lum', function() {
            instance.setHue(50).setSat(76).setLum(28).commit();
            return expect(instance.dom.style.backgroundColor).toBe('rgb(126, 107, 17)');
          });
        });
      });
      return describe('instance.css(style)', function() {
        it('sets arbitrary style to instance.dom', function() {
          instance.css({
            fontSize: 'x-small'
          });
          return expect(instance.dom.style.fontSize).toBe('x-small');
        });
        it('does nothing (not raise error) if undefined or null passed as argument', function() {
          instance.css();
          return expect(1).toBe(1);
        });
        return it('returns instance itself', function() {
          return expect(instance.css()).toBe(instance);
        });
      });
    });
    describe('div.webkitTransform', function() {
      return it('returns "translate({x}px,{y}px) rotate({rot}deg) scale({scale/100})"', function() {
        return expect(window.div.webkitTransform({
          x: 1,
          y: 2,
          rot: 3,
          scale: 4
        })).toBe('translate(1px,2px) rotate(3deg) scale(0.04)');
      });
    });
    return describe('div.backgroundColor', function() {
      return it('return "hsl(45,60%,75%)"', function() {
        return expect(window.div.backgroundColor({
          hue: 45,
          sat: 60,
          lum: 75
        })).toBe('hsl(45,60%,75%)');
      });
    });
  });

}).call(this);
