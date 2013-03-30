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
var rect = div()
    .css({
      position: 'absolute',
      left: '0px',
      top: '0px',
      width: '100px',
      height: '100px',
    })
    .setX(100)
    .setY(100)
    .setHue(60)
    .setSat(50)
    .setLum(50)
  .transition()
  .duration(500)
  .delay(500)
    .addX(100)
    .addY(200)
  .transition()
  .duration(200)
  .delay(300)
    .addHue(60)
  .transition()
    .addLum(-30)
  .transition()
    .addSat(-40)
  .transitionCommit();
```
