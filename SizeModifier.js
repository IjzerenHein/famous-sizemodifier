/* 
 * Copyright (c) 2014 Gloey Apps
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*jslint browser:true, nomen:true, vars:true, plusplus:true*/
/*global define*/

/**
 * @module
 */
define(function (require, exports, module) {
    'use strict';

    // import dependencies
    var Entity = require('famous/core/Entity');

    /**
     * SizeModifier modifies the size of child renderables.
     *
     * @class 
     * @param {Object} options Options.
     * @param {Array.Number|Function|Object} [options.scale] Scale
     * @param {Array.Number|Function|Object} [options.min] Minimum-size
     * @param {Array.Number|Function|Object} [options.max] Maximum-size
     * @param {Number|Function|Object} [options.ratio] Aspect-ratio
     * @alias module:SizeModifier
     */
    var SizeModifier = function (options) {

        // setup modify output structure.
        // The returned entity is needed so that out 'commit' is called.s
        this._output = [
            Entity.register(this),
            { size: null, target: null }
        ];
                
        if (options.min) { this.minFrom(options.min); }
        if (options.max) { this.maxFrom(options.max); }
        if (options.ratio) { this.ratioFrom(options.ratio); }
        if (options.scale) { this.ratioFrom(options.scale); }
    };

    /**
     * Set the maximum-size.
     *
     * @param {Array.Number|Function|Object} max Maximum-size
     */
    SizeModifier.prototype.maxFrom = function (max) {
        if (!max) {
            this._maxGetter = null;
            this._max = null;
        } else if (max instanceof Function) {
            this._maxGetter = max;
        } else if (max instanceof Object && max.getMax) {
            this._maxGetter = max.getMax.bind(max);
        } else {
            this._maxGetter = null;
            this._max = max;
        }
        return this;
    };
    
    /**
     * Get the maximum-size
     *
     * @return {Array.Number|Function|Object} Maximum-size
     */
    SizeModifier.prototype.getMax = function () {
        return this._maxGetter || this._max;
    };
    
    /**
     * Set the minimum-size.
     *
     * @param {Array.Number|Function|Object} min Minimum-size.
     */
    SizeModifier.prototype.minFrom = function (min) {
        if (!min) {
            this._minGetter = null;
            this._min = null;
        } else if (min instanceof Function) {
            this._minGetter = min;
        } else if (min instanceof Object && min.getMin) {
            this._minGetter = min.getMin.bind(min);
        } else {
            this._minGetter = null;
            this._min = min;
        }
        return this;
    };
    
    /**
     * Get the minimum-size.
     *
     * @return {Array.Number|Function|Object} Minimum-size
     */
    SizeModifier.prototype.getMin = function () {
        return this._minGetter || this._min;
    };
    
    /**
     * Set the aspect-ratio (e.g. 4/3))
     *
     * @param {Number|Function|Object} ratio Aspect-ratio
     */
    SizeModifier.prototype.ratioFrom = function (ratio) {
        if (!ratio) {
            this._ratioGetter = null;
            this._ratio = null;
        } else if (ratio instanceof Function) {
            this._ratioGetter = ratio;
        } else if (ratio instanceof Object && ratio.getRatio) {
            this._ratioGetter = ratio.getRatio.bind(ratio);
        } else {
            this._ratioGetter = null;
            this._ratio = ratio;
        }
        return this;
    };
    
    /**
     * Get the aspect-ratio.
     *
     * @return {Number|Function|Object} Aspect-ratio
     */
    SizeModifier.prototype.getRatio = function () {
        return this._ratioGetter || this._ratio;
    };

    /**
     * Set the scale (e.g. [0.5, 0.5])
     *
     * @param {Array.Number|Function|Object} scale Scale.
     */
    SizeModifier.prototype.scaleFrom = function (scale) {
        if (!scale) {
            this._scaleGetter = null;
            this._scale = null;
        } else if (scale instanceof Function) {
            this._scaleGetter = scale;
        } else if (scale instanceof Object && scale.getRatio) {
            this._scaleGetter = scale.getScale.bind(scale);
        } else {
            this._scaleGetter = null;
            this._scale = scale;
        }
        return this;
    };
    
    /**
     * Get the scale restriction
     *
     * @return {Array.Number|Function|Object} Scale
     */
    SizeModifier.prototype.getScale = function () {
        return this._scaleGetter || this._scale;
    };
    
    /**
     * Get the current size.
     *
     * @return {Array.Number} [width, height]
     */
    SizeModifier.prototype.getSize = function () {
        return this._output[1].size;
    };
    
    /**
     * Calculates the modified size based on the parent-size.
     *
     * @param {Array.Number} parentSize Size of the parent
     * @param {Array.Number} [cachedSize] Cached size-array to re-use
     * @return {Array.Number} [width, height]
     */
    SizeModifier.prototype.calcSize = function (parentSize, cachedSize) {

        // Get options
        var scale = this._scaleGetter ? this._scaleGetter() : this._scale;
        var max = this._maxGetter ? this._maxGetter() : this._max;
        var min = this._minGetter ? this._minGetter() : this._min;
        var ratio = this._ratioGetter ? this._ratioGetter() : this._ratio;
        if (!scale && !max && !min && !ratio) { return null; }
                
        // init
        var size = cachedSize || [0, 0];
        size[0] = parentSize[0];
        size[1] = parentSize[1];
        
        // apply scale
        if (scale) {
            size[0] = size[0] * (scale[0] !== undefined) ? scale[0] : 1;
            size[1] = size[1] * (scale[1] !== undefined) ? scale[1] : 1;
        }
        
        // apply max
        if (max) {
            size[0] = Math.min(size[0], max[0] !== undefined ? max[0] : size[0]);
            size[1] = Math.min(size[1], max[1] !== undefined ? max[1] : size[1]);
        }
        
        // apply min
        if (min) {
            size[0] = Math.max(size[0], min[0] !== undefined ? min[0] : size[0]);
            size[1] = Math.max(size[1], min[1] !== undefined ? min[1] : size[1]);
        }
    
        // apply ratio
        if (ratio) {
            if (ratio < (size[0] / size[1])) {
                size[0] = size[1] * ratio;
            } else {
                size[1] = size[0] / ratio;
            }
        }
        
        return size;
    };
    
    /**
     * In commit we 'catch' the parent-size and calculate the size. It is then 
     * used in the next render cycle.
     *
     * @private
     * @ignore
     * @method commit
     * @param {Context} context commit context
     */
    SizeModifier.prototype.commit = function (context) {
        if (!this._parentSize) {
            this._parentSize = [context.size[0], context.size[1]];
        } else {
            this._parentSize[0] = context.size[0];
            this._parentSize[1] = context.size[1];
        }
        this._output[1].size = this.calcSize(this._parentSize, this._output[1].size);
    };
    
    /**
     * Return render spec for this Modifier, applying to the provided
     *    target component.  This is similar to render() for Surfaces.
     *
     * @private
     * @ignore
     *
     * @param {Object} target (already rendered) render spec to
     *    which to apply the transform.
     * @return {Object} render spec for this Modifier, including the
     *    provided target
     */
    SizeModifier.prototype.modify = function modify(target) {
        this._output[1].target = target;
        return this._output;
    };
    
    module.exports = SizeModifier;
});
