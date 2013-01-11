div.js
======

```html
<script type="text/javascript" src="path/to/div.js"></script>
```

```javascript
var rect = div({
  position: 'absolute',
  left: '0px',
  top: '0px',
  webkitTransitionDuration: '500ms'
});

rect.translate(100, 100);
rect.rotate(90);
rect.hsl(60, 50, 50);
```
