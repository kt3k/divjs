# spec of div.js

describe 'div', ->

  it 'is function', ->
    expect(typeof window.div).toBe 'function'

  it 'its instance is a Object', ->
    expect(typeof div()).toBe 'object'

  describe 'div.dom', ->

    it 'is a HTMLDivElement', ->
      expect(div().dom instanceof document.createElement('div').constructor).toBe true

  describe 'div.met', ->
    it 'is a Object', ->
      expect(div().met instanceof Object).toBe true

  describe 'div.met.x', ->
    it 'is 0 by default', ->
      expect(div().met.x).toBe 0

  describe 'div.met.y', ->
    it 'is 0 by default', ->
      expect(div().met.x).toBe 0

  describe 'div.met.scale', ->
    it 'is 100 by default', ->
      expect(div().met.scale).toBe 100

  describe 'div.met.hue', ->
    it 'is 0 by default', ->
      expect(div().met.hue).toBe 0

  describe 'div.met.sat', ->
    it 'is 0 by default', ->
      expect(div().met.sat).toBe 0

  describe 'div.met.lum', ->
    it 'is 100 by default', ->
      expect(div().met.lum).toBe 100
