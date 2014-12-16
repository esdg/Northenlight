/**************************************************************************

Northenlight library
 
Author  : esdg
Version : 0.0.2
Git     : https://github.com/esdg/Northenlight/

Copyright (c) 2015 Mid or Feed Studio

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Free to use under terms of MIT license
***************************************************************************/

(function(window, document, undefined) {
	'use strict';
    
    
	var northenlight = {
		get: function() {
			return _instance;
		},
		//Main entry point.
		init: function(options) {
			return _instance || new Northenlight(options);
		},
		VERSION: '0.0.2'
	};
    
	/* Global const */
    var attributesNames = {
        _CANVAS_ATTR_PREFIX_ : 'nl-canvas',
        _VALIGN_ATTR_PREFIX_ : 'nl-valign',
        _HALIGN_ATTR_PREFIX_ : 'nl-halign'            
    }  
    var stackMode = {
        _CANVASMODE_HSTACK_ : 'h-stack',
        _CANVASMODE_VSTACK_ : 'v-stack'
    }
    var vAlignMode = {
        _VALIGNMODE_TOP_    : 'top',
        _VALIGNMODE_BOTTOM_ : 'bottom',
        _VALIGNMODE_MIDDLE_ : 'middle'
    }
    var hAlignMode = {
        _HALIGNMODE_LEFT_   : 'left',
        _HALIGNMODE_RIGHT_  : 'right',
        _HALIGNMODE_CENTER_ : 'center'
    } 
    
    
	/* Global vars */
    var _instance;
    
	/* Expose northenlight as either a global variable or a require.js module */
	if(typeof define === 'function' && define.amd) {
		define([], function () {
			return northenlight;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = northenlight;
	} else {
		window.northenlight = northenlight;
	}
    
	/* constructor */
    function Northenlight(options) {
        layout();
        window.addEventListener("resize", layout);
        return this;
	}
    
	/* Organize layout */ 
    function layout(){
        canvas();
        valign();
        halign();
    }

    /* Place all canvas childs elements */  
    function canvas(){
        var canvas = getFlElements(attributesNames._CANVAS_ATTR_PREFIX_);
        for (var i=canvas.length-1 ; i >= 0 ; i--) {
            
            switch(getCanvasMode(canvas[i])) {
                case stackMode._CANVASMODE_HSTACK_:
                    var totalWidth = 0;
                    var bigestHeight = 0;
                    var childs = canvas[i].children;
                    
                    for (var j=0 ; j < childs.length ; j++) {
                        
                        childs[j].style.left = totalWidth + 'px'; 
                        totalWidth = Math.round(totalWidth + childs[j].trueWidth);
                        
                        if(childs[j].trueHeight > bigestHeight){
                            bigestHeight = childs[j].trueHeight;
                        }
                        canvas[i].style.width = totalWidth
                                                + parseInt(window.getComputedStyle(canvas[i]).paddingLeft, 10)
                                                + parseInt(window.getComputedStyle(canvas[i]).paddingRight, 10)
                                                + 'px';
                        canvas[i].style.height = bigestHeight
                                                + parseInt(window.getComputedStyle(canvas[i]).paddingBottom, 10)
                                                + parseInt(window.getComputedStyle(canvas[i]).paddingTop, 10)
                                                + 'px';
                    }
                    break;
                case stackMode._CANVASMODE_VSTACK_:
                    var totalHeight = 0;
                    var bigestWidth = 0;
                    var childs = canvas[i].children;
                    
                    for (var j=0 ; j < childs.length ; j++) {
                        
                        childs[j].style.top = totalHeight + 'px'; 
                        totalHeight = Math.round(totalHeight + childs[j].trueHeight);
                        
                        if(childs[j].trueWidth > bigestWidth){
                            bigestWidth = childs[j].trueWidth;
                        }
                        canvas[i].style.height = totalHeight
                                                + parseInt(window.getComputedStyle(canvas[i]).paddingTop, 10)
                                                + parseInt(window.getComputedStyle(canvas[i]).paddingBottom, 10)
                                                + 'px';
                        canvas[i].style.width = bigestWidth
                                                + parseInt(window.getComputedStyle(canvas[i]).paddingLeft, 10)
                                                + parseInt(window.getComputedStyle(canvas[i]).paddingRight, 10)
                                                + 'px';
                    }
                    break;
            }
        }
    }
    
    /* Place all vertical aligned elements */
    function valign(){
        var elem = getFlElements(attributesNames._VALIGN_ATTR_PREFIX_);
        for (var i=elem.length-1 ; i >= 0 ; i--) {
            elem[i].style.margin = null;
             switch(getValignMode(elem[i])) {
                case vAlignMode._VALIGNMODE_TOP_:
                    elem[i].style.top = parseInt(window.getComputedStyle(elem[i].parentNode).paddingTop) + "px";
                    elem[i].style.bottom = 'auto';
                    elem[i].style.marginTop = parseInt(window.getComputedStyle(elem[i]).marginTop) + "px";
                    break;
                case vAlignMode._VALIGNMODE_BOTTOM_:
                    elem[i].style.bottom = parseInt(window.getComputedStyle(elem[i].parentNode).paddingBottom) + "px";
                    elem[i].style.top = 'auto';
                    elem[i].style.marginBottom = parseInt(window.getComputedStyle(elem[i]).marginBottom) + "px";
                    break;
                case vAlignMode._VALIGNMODE_MIDDLE_:
                     var tempHeight = parseInt(elem[i].trueHeight);
                     var parentHeight = parseInt(elem[i].parentNode.trueHeight);
                     
                     elem[i].style.top = Math.round((parentHeight - tempHeight) /2) + 'px';
                     elem[i].style.bottom = Math.round((parentHeight - tempHeight) /2) + 'px';
                     elem[i].style.marginTop = parseInt(window.getComputedStyle(elem[i]).marginTop) + "px";
                     elem[i].style.marginBottom = parseInt(window.getComputedStyle(elem[i]).marginBottom) + "px";
                     break;
             }
        }
    }
    
    /* Place all vertical aligned elements */
    function halign(){
        var elem = getFlElements(attributesNames._HALIGN_ATTR_PREFIX_);
        for (var i=elem.length-1 ; i >= 0 ; i--) {
            elem[i].style.margin = null;
             switch(getHalignMode(elem[i])) {
                case hAlignMode._HALIGNMODE_LEFT_:
                    elem[i].style.left = parseInt(window.getComputedStyle(elem[i].parentNode).paddingLeft) + "px";
                    elem[i].style.right = 'auto';
                    elem[i].style.marginLeft =  parseInt(window.getComputedStyle(elem[i]).marginLeft) + "px";
                    break;
                case hAlignMode._HALIGNMODE_RIGHT_:
                    elem[i].style.right = parseInt(window.getComputedStyle(elem[i].parentNode).paddingRight) + "px";
                    elem[i].style.left = 'auto';
                    elem[i].style.marginRight = parseInt(window.getComputedStyle(elem[i]).marginRight) + "px"; 
                    break;
                case hAlignMode._HALIGNMODE_CENTER_:
                    var tempWidth = parseInt(elem[i].trueWidth);
                    var parentWidth =  parseInt(elem[i].parentNode.trueWidth);
                    elem[i].style.left = Math.round((parentWidth - tempWidth) /2) + 'px';
                    elem[i].style.right = Math.round((parentWidth - tempWidth) /2) + 'px';
                    elem[i].style.marginLeft =  parseInt(window.getComputedStyle(elem[i]).marginLeft) + "px";
                    elem[i].style.marginRight = parseInt(window.getComputedStyle(elem[i]).marginRight) + "px";
                    break;
             }
        }
    }
    
    /* get all element that contain attribute text */  
    function getFlElements(flAttributeName){
        var _flElements = new Array();
        var all = document.getElementsByTagName('*');
        for (var i=0 ; i < all.length ; i++) {
            var attrs = all[i].attributes;
            for (var j=0 ; j < attrs.length ; j++) {
                 if(attrs[j].name.indexOf(flAttributeName) > -1){
                     _flElements.push(all[i]);
                 }
            }
        }
       return _flElements;
    }
    
    /* return canvas mode */  
    function getCanvasMode(flCanvas){
        var _canvasType;

        var attrs = flCanvas.attributes;
        for (var j=0 ; j < attrs.length ; j++) {
             if(attrs[j].name.indexOf(attributesNames._CANVAS_ATTR_PREFIX_) > -1){
                 _canvasType = attrs[j].value;
             }
        }
       return _canvasType;
    }
    
    /* return vertical align mode */
    
    function getValignMode(flalign){
        var _alignType;

        var attrs = flalign.attributes;
        for (var j=0 ; j < attrs.length ; j++) {
             if(attrs[j].name.indexOf(attributesNames._VALIGN_ATTR_PREFIX_) > -1){
                 var attrNameHash = attrs[j].name.split("_");
                 if(!attrNameHash[1]){
                    _alignType = attrs[j].value;
                }else{
                    if(window.matchMedia("(" + attrNameHash[1] + ")").matches){
                        _alignType = attrs[j].value;
                    }
                }
             }
        }
       return _alignType;
    }
    
    /* return horizontal align mode */ 
    function getHalignMode(flalign){
        var _alignType;

        var attrs = flalign.attributes;
        for (var j=0 ; j < attrs.length ; j++) {
            if(attrs[j].name.indexOf(attributesNames._HALIGN_ATTR_PREFIX_) > -1){
                var attrNameHash = attrs[j].name.split("_");
                if(!attrNameHash[1]){
                    _alignType = attrs[j].value;
                }else{
                    if(window.matchMedia("(" + attrNameHash[1] + ")").matches){
                        _alignType = attrs[j].value;
                    }
                } 
             }
        }
       return _alignType;
    }
    
    /* return true height */
    Object.defineProperty(Element.prototype, 'trueHeight', {
        'get': function(){
            var height = this.clientHeight;
            height += parseInt(window.getComputedStyle(this).marginTop, 10);
            height += parseInt(window.getComputedStyle(this).marginBottom, 10);
            height += parseInt(window.getComputedStyle(this).borderTopWidth, 10);
            height += parseInt(window.getComputedStyle(this).borderBottomWidth, 10);
            return height;
        }
    });
    
    /* return true width */  
    Object.defineProperty(Element.prototype, 'trueWidth', {
        'get': function(){
            var width = this.clientWidth;
            width += parseInt(window.getComputedStyle(this).marginLeft, 10);
            width += parseInt(window.getComputedStyle(this).marginRight, 10);
            width += parseInt(window.getComputedStyle(this).borderLeftWidth, 10);
            width += parseInt(window.getComputedStyle(this).borderRightWidth, 10);
            return width;
        }
    }); 
        
    /* enable forach on array */  
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(fn){
            for ( var i = 0; i < this.length; i++ ) {
              fn( this[i], i, this );
            }
        };
    }
    
}(window, document));


