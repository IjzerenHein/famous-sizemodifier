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
    var Transform = require('famous/core/Transform');
    var RenderNode = require('famous/core/RenderNode');

    /**
     * SizeModifier restricts the size based on: maximum, minumum and aspect-ratio
     *
     * @class 
     * @param {Object} options Options.
     * @param {Array.Number|Function|Object} [options.size] .
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
    };

    /**
     * Set the maximum-size restriction
     *
     * @param {Array.Number|Function|Object} size Size.
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
     * Get the maximum-size restriction
     *
     * @return {Array.Number} Size
     */
    SizeModifier.prototype.getMax = function () {
        return this._maxGetter || this._max;
    };
    
    /**
     * Set the minimum-size restriction
     *
     * @param {Array.Number|Function|Object} size Size.
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
     * Get the minimum-size restriction
     *
     * @return {Array.Number} Size
     */
    SizeModifier.prototype.getMin = function () {
        return this._minGetter || this._min;
    };
    
    /**
     * Set the ratio restriction
     *
     * @param {Array.Number|Function|Object} ratio.
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
     * Get the ratio restriction
     *
     * @return {Array.Number} Size
     */
    SizeModifier.prototype.getRatio = function () {
        return this._ratioGetter || this._ratio;
    };

    /**
     * Return size of contained element.
     *
     * @method getSize
     * @return {Array.Number} [width, height]
     */
    SizeModifier.prototype.getSize = function getSize() {
        return this._output[1].size;
    };
    
    /**
     * Calculates the restricted size based on the parent-size
     */
    SizeModifier.prototype._updateSize = function () {
                
        // prepare
        if (!this._output[1].size) { this._output[1].size = [0, 0]; }
        var size = this._output[1].size;
        size[0] = this._parentSize[0];
        size[1] = this._parentSize[1];
        
        // apply max
        var max = this._maxGetter ? this._maxGetter() : this._max;
        if (max) {
            size[0] = Math.min(size[0], max[0] !== undefined ? max[0] : size[0]);
            size[1] = Math.min(size[1], max[1] !== undefined ? max[1] : size[1]);
        }
        
        // apply min
        var min = this._minGetter ? this._minGetter() : this._min;
        if (min) {
            size[0] = Math.max(size[0], min[0] !== undefined ? min[0] : size[0]);
            size[1] = Math.max(size[1], min[1] !== undefined ? min[1] : size[1]);
        }
    
        // apply ratio
        var ratio = this._ratioGetter ? this._ratioGetter() : this._ratio;
        if (ratio) {
            // todo
        }
    };
    
    /**
     * In commit we 'catch' the parent-size and calculate the size. It is then 
    * used in the next render cycle.
     *
     * @private
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
        this._updateSize();
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
