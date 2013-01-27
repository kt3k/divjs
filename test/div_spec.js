(function() {

  describe('div', function() {
    it('is a function.', function() {
      return expect(typeof window.div).toBe('function');
    });
    return describe('instance of div', function() {
      var instance;
      instance = window.div();
      it('is a Object.', function() {
        return expect(typeof instance).toBe('object');
      });
      describe('instance.dom', function() {
        return it('is a HTMLDivElement.', function() {
          return expect(instance.dom instanceof document.createElement('div').constructor).toBe(true);
        });
      });
      describe('instance.met', function() {
        return it('is a Object.', function() {
          return expect(instance.met instanceof Object).toBe(true);
        });
      });
      describe('instance.met.x', function() {
        it('is 0 by default.', function() {
          return expect(instance.met.x).toBe(0);
        });
        it('is 30 when instance.addX(30).', function() {
          instance.addX(30);
          return expect(instance.met.x).toBe(30);
        });
        return it('is 45 when it.setX(45).', function() {
          instance.setX(45);
          return expect(instance.met.x).toBe(45);
        });
      });
      describe('instance.met.y', function() {
        return it('is 0 by default.', function() {
          return expect(instance.met.y).toBe(0);
        });
      });
      describe('instance.met.scale', function() {
        return it('is 100 by default', function() {
          return expect(instance.met.scale).toBe(100);
        });
      });
      describe('instance.met.hue', function() {
        return it('is 0 by default', function() {
          return expect(instance.met.hue).toBe(0);
        });
      });
      describe('instance.met.sat', function() {
        return it('is 0 by default', function() {
          return expect(instance.met.sat).toBe(0);
        });
      });
      return describe('instance.met.lum', function() {
        return it('is 100 by default', function() {
          return expect(instance.met.lum).toBe(100);
        });
      });
    });
  });

}).call(this);
