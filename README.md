div.js
======

*div.js* is an abstraction of the manipulation of style.webkitTransform and style.backgroundColor of `div` elements.

It is a basic component of *Rectangular Programming* on browsers.

Usage
-----

```html
<script type="text/javascript" src="path/to/div.js"></script>
```

```javascript
var rect = div({
  position: 'absolute',
  left: '0px',
  top: '0px',
  width: '100px',
  height: '100px',
  webkitTransitionDuration: '500ms'
});

rect.setX(100);
rect.setY(100);
rect.setHue(60);
rect.setSat(50);
rect.setLum(50);

rect.commit();
```
