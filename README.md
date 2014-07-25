## This project is deprecated and will no longer be maintained

Instead, use the side-effect free SizeConstraint: https://github.com/IjzerenHein/famous-sizeconstraint

famous-sizemodifier
==========

SizeModifier modifies the size of renderables based on the following options:

|Option|Description|
|--------|-----------|
|```scale```|Scales the size proportionally to the parent-size.
|```min```|Sets the minimum-size.|
|```max```|Sets the maximum-size.|
|```ratio```|Aspect ratio to enforce.|

### Demos

- [Site demo](https://rawgit.com/IjzerenHein/famous-sizemodifier/master/examples/site/index.html) *(demonstrates maximum-width to create a site-layout with borders)*
- [Photo demo](https://rawgit.com/IjzerenHein/famous-sizemodifier/master/examples/photo/index.html) *(demonstrates aspect-ratio)*

## Getting started

Install using bower:

	bower install famous-sizemodifier

If necessary, add to the requirejs paths config:

```javascript
require.config({
    paths: {
        ...
        'famous-sizemodifier': 'bower_components/famous-sizemodifier/SizeModifier',
        ...
    }
});
```

**Create a surface with a maximum-width of 400px, and a minimum-height of 100px:**

```javascript
var SizeModifier = require('famous-sizemodifier');

var sizeModifier = new SizeModifier({
    max: [400, undefined],
    min: [undefined, 100]
});
var surface = new Surface({ properties: { backgroundColor: 'blue' }});
this.add(sizeModifier).add(surface);
```

**Create a surface which is 50% its parent size:**

*Note: this is different from Transform.scale, as it does not apply a scale-matrix, but it merely changes the size.*

```javascript
var sizeModifier = new SizeModifier({
    scale: [0.5, 0.5]
});
var surface = new Surface({ properties: { backgroundColor: 'blue' }});
this.add(sizeModifier).add(surface);
```

**Create a surface with an aspect ratio of 4/3:**

```javascript
var sizeModifier = new SizeModifier({
    ratio: 4/3
});
var surface = new Surface({ properties: { backgroundColor: 'blue' }});
this.add(sizeModifier).add(surface);
```

## API Reference

* [SizeModifier](docs/SizeModifier.md)

## Known Isues

Due to the way famo.us isolates modifiers and renderables, the size is modified one render-cycle later than would be expected. This is because of the way SizeModifier captures the size of the parent. In many cases this is not a problem, but when SizeModifier's are nested the delay accumulates and increases.

*This is definitely a bug, for which there is currently no solution (as far as I am aware of).
If you know of a solution, please let me know. - Hein*

## Contribute

Feel free to contribute to this project in any way. The easiest way to support this project is by giving it a star.

## Contact
- 	@IjzerenHein
- 	http://www.gloey.nl
- 	hrutjes@gmail.com

© 2014 - Hein Rutjes
