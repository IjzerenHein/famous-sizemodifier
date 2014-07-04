famous-sizemodifier
==========

Size-modifier sets the maximum-size, minimum-size and the aspect-ratio for renderables.

### Demos

- [Site demo (demonstrates maximum-width to create a site-layout which shows as full-screen on mobile)](https://rawgit.com/IjzerenHein/famous-sizemodifier/master/examples/site/index.html)
- [Photo demo (demonstrates aspect-ratio)](https://rawgit.com/IjzerenHein/famous-sizemodifier/master/examples/photo/index.html)

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

Create a surface with a maximum-width of 400px.

```javascript
var SizeModifier = require('famous-sizemodifier');

var sizeModifier = new SizeModifier({
    max: [100, undefined]
});
var surface = new Surface({
    properties: {
        backgroundColor: 'blue'
    }
});
this.add(sizeModifier).add(surface);
```

## Documentation

// TODO

## Contribute

Feel free to contribute to this project in any way. The easiest way to support this project is by giving it a star.

## Contact
- 	@IjzerenHein
- 	http://www.gloey.nl
- 	hrutjes@gmail.com

© 2014 - Hein Rutjes