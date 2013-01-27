# spec of div.js

describe 'div', ->

  it 'is a function.', ->
    expect(typeof window.div).toBe 'function'

  describe 'instance of div', ->
    instance = window.div()

    it 'is a Object.', ->
      expect(typeof instance).toBe 'object'

    describe 'instance.dom', ->
      it 'is a HTMLDivElement.', ->
        expect(instance.dom instanceof document.createElement('div').constructor).toBe true

    describe 'instance.met', ->
      it 'is a Object.', ->
        expect(instance.met instanceof Object).toBe true

    describe 'instance.met.x', ->
      it 'is 0 by default.', ->
        expect(instance.met.x).toBe 0

      it 'is 30 when instance.addX(30).', ->
        instance.addX(30)
        expect(instance.met.x).toBe 30

      it 'is 45 when it.setX(45).', ->
        instance.setX(45)
        expect(instance.met.x).toBe 45

    describe 'instance.met.y', ->
      it 'is 0 by default.', ->
        expect(instance.met.y).toBe 0

    describe 'instance.met.scale', ->
      it 'is 100 by default', ->
        expect(instance.met.scale).toBe 100

    describe 'instance.met.hue', ->
      it 'is 0 by default', ->
        expect(instance.met.hue).toBe 0

    describe 'instance.met.sat', ->
      it 'is 0 by default', ->
        expect(instance.met.sat).toBe 0

    describe 'instance.met.lum', ->
      it 'is 100 by default', ->
        expect(instance.met.lum).toBe 100
