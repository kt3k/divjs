(function() {

  describe('div', function() {
    it('is function', function() {
      return expect(typeof window.div).toBe('function');
    });
    it('its instance is a Object', function() {
      return expect(typeof div()).toBe('object');
    });
    describe('div.dom', function() {
      return it('is a HTMLDivElement', function() {
        return expect(div().dom instanceof document.createElement('div').constructor).toBe(true);
      });
    });
    describe('div.met', function() {
      return it('is a Object', function() {
        return expect(div().met instanceof Object).toBe(true);
      });
    });
    describe('div.met.x', function() {
      return it('is 0 by default', function() {
        return expect(div().met.x).toBe(0);
      });
    });
    describe('div.met.y', function() {
      return it('is 0 by default', function() {
        return expect(div().met.x).toBe(0);
      });
    });
    describe('div.met.scale', function() {
      return it('is 100 by default', function() {
        return expect(div().met.scale).toBe(100);
      });
    });
    describe('div.met.hue', function() {
      return it('is 0 by default', function() {
        return expect(div().met.hue).toBe(0);
      });
    });
    describe('div.met.sat', function() {
      return it('is 0 by default', function() {
        return expect(div().met.sat).toBe(0);
      });
    });
    return describe('div.met.lum', function() {
      return it('is 100 by default', function() {
        return expect(div().met.lum).toBe(100);
      });
    });
  });

}).call(this);
