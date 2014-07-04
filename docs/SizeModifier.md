<a name="module_SizeModifier"></a>
##SizeModifier(options)

SizeModifier modifies the size of child renderables.

**Params**

- options `Object` - Options.
  - [scale] `Array.Number` | `function` | `Object` - Scale
  - [min] `Array.Number` | `function` | `Object` - Minimum-size
  - [max] `Array.Number` | `function` | `Object` - Maximum-size
  - [ratio] `Number` | `function` | `Object` - Aspect-ratio

  
**Symbols**

* [sizeModifier.maxFrom(max)](#module_SizeModifier#maxFrom)
* [sizeModifier.getMax()](#module_SizeModifier#getMax)
* [sizeModifier.minFrom(min)](#module_SizeModifier#minFrom)
* [sizeModifier.getMin()](#module_SizeModifier#getMin)
* [sizeModifier.ratioFrom(ratio)](#module_SizeModifier#ratioFrom)
* [sizeModifier.getRatio()](#module_SizeModifier#getRatio)
* [sizeModifier.scaleFrom(scale)](#module_SizeModifier#scaleFrom)
* [sizeModifier.getScale()](#module_SizeModifier#getScale)
* [sizeModifier.getSize()](#module_SizeModifier#getSize)
* [sizeModifier.calcSize(parentSize, [cachedSize])](#module_SizeModifier#calcSize)

<a name="module_SizeModifier#maxFrom"></a>
###sizeModifier.maxFrom(max)
Set the maximum-size.

**Params**

- max `Array.Number` | `function` | `Object` - Maximum-size

<a name="module_SizeModifier#getMax"></a>
###sizeModifier.getMax()
Get the maximum-size

**Returns**: `Array.Number` | `function` | `Object` - Maximum-size  
<a name="module_SizeModifier#minFrom"></a>
###sizeModifier.minFrom(min)
Set the minimum-size.

**Params**

- min `Array.Number` | `function` | `Object` - Minimum-size.

<a name="module_SizeModifier#getMin"></a>
###sizeModifier.getMin()
Get the minimum-size.

**Returns**: `Array.Number` | `function` | `Object` - Minimum-size  
<a name="module_SizeModifier#ratioFrom"></a>
###sizeModifier.ratioFrom(ratio)
Set the aspect-ratio (e.g. 4/3))

**Params**

- ratio `Number` | `function` | `Object` - Aspect-ratio

<a name="module_SizeModifier#getRatio"></a>
###sizeModifier.getRatio()
Get the aspect-ratio.

**Returns**: `Number` | `function` | `Object` - Aspect-ratio  
<a name="module_SizeModifier#scaleFrom"></a>
###sizeModifier.scaleFrom(scale)
Set the scale (e.g. [0.5, 0.5])

**Params**

- scale `Array.Number` | `function` | `Object` - Scale.

<a name="module_SizeModifier#getScale"></a>
###sizeModifier.getScale()
Get the scale restriction

**Returns**: `Array.Number` | `function` | `Object` - Scale  
<a name="module_SizeModifier#getSize"></a>
###sizeModifier.getSize()
Get the current size.

**Returns**: `Array.Number` - [width, height]  
<a name="module_SizeModifier#calcSize"></a>
###sizeModifier.calcSize(parentSize, [cachedSize])
Calculates the modified size based on the parent-size.

**Params**

- parentSize `Array.Number` - Size of the parent
- [cachedSize] `Array.Number` - Cached size-array to re-use

**Returns**: `Array.Number` - [width, height]  
