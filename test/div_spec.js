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
          instance.commit();
          return expect(instance.getX()).toBe(30);
        });
        return it('is 45 when it.setX(45)', function() {
          instance.setX(45);
          instance.commit();
          return expect(instance.getX()).toBe(45);
        });
      });
      describe('instance.getY()', function() {
        it('is 0 by default', function() {
          return expect(instance.getY()).toBe(0);
        });
        it('is 37 when instance.addY(37)', function() {
          instance.addY(37);
          instance.commit();
          return expect(instance.getY()).toBe(37);
        });
        it('is 91 when instance.setY(91)', function() {
          instance.setY(91);
          instance.commit();
          return expect(instance.getY()).toBe(91);
        });
        return it('then is 99 when instance.addY(8)', function() {
          instance.addY(8);
          instance.commit();
          return expect(instance.getY()).toBe(99);
        });
      });
      describe('instance.getScale()', function() {
        it('is 100 by default', function() {
          return expect(instance.getScale()).toBe(100);
        });
        it('is 77 when instance.setScale(77)', function() {
          instance.setScale(77);
          instance.commit();
          return expect(instance.getScale()).toBe(77);
        });
        it('is 89 when instance.addScale(12)', function() {
          instance.addScale(12);
          instance.commit();
          return expect(instance.getScale()).toBe(89);
        });
        return it('is 97 when instance.setScale(97)', function() {
          instance.setScale(97);
          instance.commit();
          return expect(instance.getScale()).toBe(97);
        });
      });
      describe('instance.getRot()', function() {
        it('is 0 by default', function() {
          return expect(instance.getRot()).toBe(0);
        });
        it('is 100 when instance.setRot(100)', function() {
          instance.setRot(100);
          instance.commit();
          return expect(instance.getRot()).toBe(100);
        });
        return it('is 200 when instnace.addRot(100)', function() {
          instance.addRot(100);
          instance.commit();
          return expect(instance.getRot()).toBe(200);
        });
      });
      describe('instance.getHue()', function() {
        it('is 0 by default', function() {
          return expect(instance.getHue()).toBe(0);
        });
        it('is 25 when instance.setHue(25)', function() {
          instance.setHue(25);
          instance.commit();
          return expect(instance.getHue()).toBe(25);
        });
        it('is 75 when instance.addHue(50)', function() {
          instance.addHue(50);
          instance.commit();
          return expect(instance.getHue()).toBe(75);
        });
        return it('is 50 when instance.addHue(-25)', function() {
          instance.addHue(-25);
          instance.commit();
          return expect(instance.getHue()).toBe(50);
        });
      });
      describe('instance.getSat()', function() {
        it('is 0 by default', function() {
          return expect(instance.getSat()).toBe(0);
        });
        it('is 88 when instance.setSat(88)', function() {
          instance.setSat(88);
          instance.commit();
          return expect(instance.getSat()).toBe(88);
        });
        it('is 95 when instance.addSat(7)', function() {
          instance.addSat(7);
          instance.commit();
          return expect(instance.getSat()).toBe(95);
        });
        return it('is 76 when instance.addSat(-19)', function() {
          instance.addSat(-19);
          instance.commit();
          return expect(instance.getSat()).toBe(76);
        });
      });
      describe('instance.getLum()', function() {
        it('is 100 by default', function() {
          return expect(instance.getLum()).toBe(100);
        });
        it('is 87 when instance.setLum(87)', function() {
          instance.setLum(87);
          instance.commit();
          return expect(instance.getLum()).toBe(87);
        });
        it('is 97 when instance.addLum(10)', function() {
          instance.addLum(10);
          instance.commit();
          return expect(instance.getLum()).toBe(97);
        });
        return it('is 28 when instance.addLum(-69)', function() {
          instance.addLum(-69);
          instance.commit();
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
      describe('instance.commit()', function() {
        it('returns instance itself', function() {
          return expect(instance.commit()).toBe(instance);
        });
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
      describe('instance.css(style)', function() {
        it('sets arbitrary style to instance.dom when commited', function() {
          instance.css({
            fontSize: 'x-small'
          });
          instance.commit();
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
      describe('instance.appendTo(parent)', function() {
        afterEach(function() {
          var parent;
          parent = instance.dom.parentElement;
          if (parent) {
            return parent.removeChild(instance.dom);
          }
        });
        it('appends instance.dom to parent', function() {
          instance.appendTo(document.body);
          return expect(instance.dom.parentElement).toBe(document.body);
        });
        return it('returns instance itself', function() {
          return expect(instance.appendTo(document.body)).toBe(instance);
        });
      });
      describe('instacne.remove()', function() {
        it('removes it\'s dom from parent element if it exists', function() {
          instance.appendTo(document.body);
          instance.remove();
          return expect(instance.dom.parentElement).toBe(null);
        });
        return it('returns instance itself', function() {
          instance.appendTo(document.body);
          return expect(instance.remove()).toBe(instance);
        });
      });
      return describe('instance.transition()', function() {
        it('returns instance itself', function() {
          var done;
          done = 0;
          expect(instance.transition()).toBe(instance);
          instance.transitionCommit();
          setTimeout(function() {
            return done = 1;
          }, 501);
          return waitsFor(function() {
            return done;
          });
        });
        describe('transition().setRot(900)', function() {
          return it('set met.rot 900 after (epsilon)ms', function() {
            var done;
            done = 0;
            instance.setRot(0).commit().transition().setRot(900).transitionCommit();
            expect(instance.getRot()).toBe(0);
            setTimeout(function() {
              expect(instance.getRot()).toBe(900);
              return done = 1;
            });
            return waitsFor(function() {
              return done;
            });
          });
        });
        describe('transition().delay(500).setRot(700)', function() {
          return it('set met.rot 700 after 500ms', function() {
            var done;
            done = 0;
            instance.setRot(0).commit().transition().delay(500).setRot(700).transitionCommit();
            setTimeout(function() {
              return expect(instance.getRot()).toBe(0);
            }, 499);
            setTimeout(function() {
              expect(instance.getRot()).toBe(700);
              return done = 1;
            }, 501);
            return waitsFor(function() {
              return done;
            });
          });
        });
        describe('transition().duration(200)', function() {
          return it('set instance.dom.style.webkitTransitionDuration 200ms after (epsilon)ms', function() {
            var done;
            done = 0;
            instance.setRot(0).commit().transition().duration(200).transitionCommit();
            setTimeout(function() {
              expect(instance.dom.style.webkitTransitionDuration).toBe('200ms');
              return done = 1;
            });
            return waitsFor(function() {
              return done;
            });
          });
        });
        describe('transition().callback(func)', function() {
          return it('fires func after (delay + durartion) ms', function() {
            var called, done;
            done = 0;
            called = false;
            instance.transition().duration(100).delay(100).callback(function() {
              return called = true;
            }).transitionCommit();
            setTimeout(function() {
              return expect(called).toBe(false);
            }, 199);
            setTimeout(function() {
              return expect(called).toBe(true);
            }, 201);
            setTimeout(function() {
              return done = 1;
            }, 250);
            return waitsFor(function() {
              return done;
            });
          });
        });
        return describe('instance.transition().callback(f).callback(g)', function() {
          return it('calls f then call g after (delay + duration) ms', function() {
            var done, fCalled, gCalled;
            done = 0;
            fCalled = false;
            gCalled = false;
            instance.transition().duration(50).delay(50).callback(function() {
              return fCalled = true;
            }).callback(function() {
              return gCalled = true;
            }).transitionCommit();
            setTimeout(function() {
              expect(fCalled).toBe(false);
              return expect(gCalled).toBe(false);
            }, 99);
            setTimeout(function() {
              expect(fCalled).toBe(true);
              return expect(gCalled).toBe(true);
            }, 101);
            setTimeout(function() {
              return done = 1;
            }, 150);
            return waitsFor(function() {
              return done;
            });
          });
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
