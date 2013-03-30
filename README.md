div.js
======

*div.js* is abstraction of div manipulation.

It employs method chaining pattern for object modification.

Usage
-----

load script and `div` object created globally:

```html
<script type="text/javascript" src="path/to/div.js"></script>
```

basic usage:

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
    .appendTo(document.body)
    .commit()
```

transitions:

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
    .appendTo(document.body)
    .commit()
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
