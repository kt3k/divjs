# spec of div.js

describe 'div', ->

  it 'is a function', ->
    expect(typeof window.div).toBe 'function'

  describe 'instance of div', ->
    instance = window.div()

    it 'is a Object', ->
      expect(typeof instance).toBe 'object'

    it 'is instanceof div', ->
      expect(instance instanceof div).toBe true

    describe 'instance.dom', ->
      it 'is a HTMLDivElement', ->
        expect(instance.dom instanceof document.createElement('div').constructor).toBe true

    describe 'instance.getX()', ->
      it 'is 0 by default', ->
        expect(instance.getX()).toBe 0

      it 'is 30 when instance.addX(30)', ->
        instance.addX 30
        expect(instance.getX()).toBe 30

      it 'is 45 when it.setX(45)', ->
        instance.setX 45
        expect(instance.getX()).toBe 45

    describe 'instance.getY()', ->
      it 'is 0 by default', ->
        expect(instance.getY()).toBe 0

      it 'is 37 when instance.addY(37)', ->
        instance.addY 37
        expect(instance.getY()).toBe 37

      it 'is 91 when instance.setY(91)', ->
        instance.setY 91
        expect(instance.getY()).toBe 91

      it 'then is 99 when instance.addY(8)', ->
        instance.addY 8
        expect(instance.getY()).toBe 99

    describe 'instance.getScale()', ->
      it 'is 100 by default', ->
        expect(instance.getScale()).toBe 100

      it 'is 77 when instance.setScale(77)', ->
        instance.setScale 77
        expect(instance.getScale()).toBe 77

      it 'is 89 when instance.addScale(12)', ->
        instance.addScale 12
        expect(instance.getScale()).toBe 89

      it 'is 97 when instance.setScale(97)', ->
        instance.setScale 97
        expect(instance.getScale()).toBe 97

    describe 'instance.getRot()', ->
      it 'is 0 by default', ->
        expect(instance.getRot()).toBe 0

      it 'is 100 when instance.setRot(100)', ->
        instance.setRot 100
        expect(instance.getRot()).toBe 100

      it 'is 200 when instnace.addRot(100)', ->
        instance.addRot 100
        expect(instance.getRot()).toBe 200

    describe 'instance.getHue()', ->
      it 'is 0 by default', ->
        expect(instance.getHue()).toBe 0

      it 'is 25 when instance.setHue(25)', ->
        instance.setHue 25
        expect(instance.getHue()).toBe 25

      it 'is 75 when instance.addHue(50)', ->
        instance.addHue 50
        expect(instance.getHue()).toBe 75

      it 'is 50 when instance.addHue(-25)', ->
        instance.addHue -25
        expect(instance.getHue()).toBe 50

    describe 'instance.getSat()', ->
      it 'is 0 by default', ->
        expect(instance.getSat()).toBe 0

      it 'is 88 when instance.setSat(88)', ->
        instance.setSat 88
        expect(instance.getSat()).toBe 88

      it 'is 95 when instance.addSat(7)', ->
        instance.addSat 7
        expect(instance.getSat()).toBe 95

      it 'is 76 when instance.addSat(-19)', ->
        instance.addSat -19
        expect(instance.getSat()).toBe 76

    describe 'instance.getLum()', ->
      it 'is 100 by default', ->
        expect(instance.getLum()).toBe 100

      it 'is 87 when instance.setLum(87)', ->
        instance.setLum 87
        expect(instance.getLum()).toBe 87

      it 'is 97 when instance.addLum(10)', ->
        instance.addLum 10
        expect(instance.getLum()).toBe 97

      it 'is 28 when instance.addLum(-69)', ->
        instance.addLum -69
        expect(instance.getLum()).toBe 28

    describe 'set method', ->
      it 'returns instance itself', ->
        expect(instance.setX 0).toBe instance
        expect(instance.setY 0).toBe instance
        expect(instance.setScale 0).toBe instance
        expect(instance.setRot 0).toBe instance
        expect(instance.setHue 0).toBe instance
        expect(instance.setSat 0).toBe instance
        expect(instance.setLum 0).toBe instance

    describe 'add method', ->
      it 'returns instance itself', ->
        expect(instance.addX 0).toBe instance
        expect(instance.addY 0).toBe instance
        expect(instance.addScale 0).toBe instance
        expect(instance.addRot 0).toBe instance
        expect(instance.addHue 0).toBe instance
        expect(instance.addSat 0).toBe instance
        expect(instance.addLum 0).toBe instance

    describe 'instance.commit()', ->

      it 'returns instance itself', ->

        expect(instance.commit()).toBe instance

      describe 'instance.dom.style.webkitTransform', ->

        it 'is "translate({x}px, {y}px) rotate({rot}deg) scale({scale/100})" according to current x, y, rot and scale', ->

          instance.setX(45).setY(99).setRot(200).setScale(97).commit()

          expect(instance.dom.style.webkitTransform).toBe 'translate(45px, 99px) rotate(200deg) scale(0.97)'

      describe 'instance.dom.style.backgroundColor', ->

        it 'is "rgb(R, G, B)" according to current hue, sat and lum', ->

          instance.setHue(50).setSat(76).setLum(28).commit()

          expect(instance.dom.style.backgroundColor).toBe 'rgb(126, 107, 17)'

    describe 'instance.css(style)', ->
      it 'sets arbitrary style to instance.dom', ->
        instance.css(fontSize: 'x-small')
        expect(instance.dom.style.fontSize).toBe 'x-small'

      it 'does nothing (not raise error) if undefined or null passed as argument', ->
        instance.css()
        expect(1).toBe 1

      it 'returns instance itself', ->
        expect(instance.css()).toBe instance

    describe 'instance.appendTo(parent)', ->

      afterEach ->
        parent = instance.dom.parentElement
        if parent
          parent.removeChild(instance.dom)

      it 'appends instance.dom to parent', ->
        instance.appendTo(document.body)
        expect(instance.dom.parentElement).toBe document.body

      it 'returns instance itself', ->
        expect(instance.appendTo(document.body)).toBe instance

  describe 'div.webkitTransform', ->
    it 'returns "translate({x}px,{y}px) rotate({rot}deg) scale({scale/100})"', ->
      expect(window.div.webkitTransform({x: 1, y: 2, rot: 3, scale:4})).toBe 'translate(1px,2px) rotate(3deg) scale(0.04)'

  describe 'div.backgroundColor', ->
    it 'return "hsl(45,60%,75%)"', ->
      expect(window.div.backgroundColor({hue: 45, sat: 60, lum: 75})).toBe 'hsl(45,60%,75%)'
