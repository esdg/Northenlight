/*!
 * Northenlight core
 *
 * 
 *
 * Free to use under terms of MIT license
 */
(function(window, document, undefined) {
	'use strict';

	/*
	 * Global api.
	 */
	var northenlight = {
		get: function() {
			return _instance;
		},
		//Main entry point.
		init: function(options) {
			return _instance || new Northenlight(options);
		},
		VERSION: '0.0.1'
	};
    
	/*
	 * Global const.
	 */
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
    
	/*
	 * Global vars.
	 */
    var _instance;
    
	/*
	 * Expose northenlight as either a global variable or a require.js module.
	 */
	if(typeof define === 'function' && define.amd) {
		define([], function () {
			return northenlight;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = northenlight;
	} else {
		window.northenlight = northenlight;
	}
    
	/*
	 * constructor.
	 */
    function Northenlight(options) {
        layout();
        return this;
	}
    
	/*
	 * Functions.
	 */   
    function layout(){
        canvas();
        valign();
        halign();
    }

    /*
	 * Place all canvas elements
	 */  
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
    
    function valign(){
        var elem = getFlElements(attributesNames._VALIGN_ATTR_PREFIX_);
        for (var i=elem.length-1 ; i >= 0 ; i--) {
             switch(getValignMode(elem[i])) {
                case vAlignMode._VALIGNMODE_TOP_:
                    elem[i].style.top = 0;
                    elem[i].style.marginTop =  parseInt(window.getComputedStyle(elem[i].parentNode).paddingTop)
                                                + parseInt(window.getComputedStyle(elem[i]).marginTop)
                                                + "px";
                     break;
                case vAlignMode._VALIGNMODE_BOTTOM_:
                    elem[i].style.bottom = 0;
                    elem[i].style.marginBottom =  parseInt(window.getComputedStyle(elem[i].parentNode).paddingBottom)
                                                + parseInt(window.getComputedStyle(elem[i]).marginBottom)
                                                + "px";
                     break;
                case vAlignMode._VALIGNMODE_MIDDLE_:
                     var tempHeight = parseInt(elem[i].clientHeight);

                     elem[i].style.top = Math.round((parseInt(window.getComputedStyle(elem[i].parentNode).height) - tempHeight) /2) + 'px';
                     elem[i].style.bottom = Math.round((parseInt(window.getComputedStyle(elem[i].parentNode).height) - tempHeight) /2) + 'px';
                     elem[i].style.marginTop =  parseInt(window.getComputedStyle(elem[i].parentNode).paddingTop)
                                                + parseInt(window.getComputedStyle(elem[i]).marginTop)
                                                + "px";
                     elem[i].style.marginBottom =  parseInt(window.getComputedStyle(elem[i].parentNode).paddingBottom)
                                                + parseInt(window.getComputedStyle(elem[i]).marginBottom)
                                                + "px";
                     break;
             }
        }
    }
    function halign(){
        var elem = getFlElements(attributesNames._HALIGN_ATTR_PREFIX_);
        for (var i=elem.length-1 ; i >= 0 ; i--) {
             switch(getHalignMode(elem[i])) {
                case hAlignMode._HALIGNMODE_LEFT_:
                    elem[i].style.left = 0;
                    elem[i].style.marginLeft =  parseInt(window.getComputedStyle(elem[i].parentNode).paddingLeft)
                                                + parseInt(window.getComputedStyle(elem[i]).marginLeft)
                                                + "px";
                    break;
                case hAlignMode._HALIGNMODE_RIGHT_:
                    elem[i].style.right = 0;
                    elem[i].style.marginRight =  parseInt(window.getComputedStyle(elem[i].parentNode).paddingRight)
                                                + parseInt(window.getComputedStyle(elem[i]).marginRight)
                                                + "px";
                    break;
                case hAlignMode._HALIGNMODE_CENTER_:
                     var tempWidth = parseInt(elem[i].clientWidth);

                     elem[i].style.left = Math.round((parseInt(window.getComputedStyle(elem[i].parentNode).width) - tempWidth) /2) + 'px';
                     elem[i].style.right = Math.round((parseInt(window.getComputedStyle(elem[i].parentNode).width) - tempWidth) /2) + 'px';
                     elem[i].style.marginRight =  parseInt(window.getComputedStyle(elem[i].parentNode).paddingRight)
                                                + parseInt(window.getComputedStyle(elem[i]).marginRight)
                                                + "px";
                     elem[i].style.marginLeft =  parseInt(window.getComputedStyle(elem[i].parentNode).paddingLeft)
                                                + parseInt(window.getComputedStyle(elem[i]).marginLeft)
                                                + "px";
                    break;
             }
        }
    }
    /*
	 * get all element that contain attribute text
	 */  
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
    
    /*
	 * return canvas mode
	 */  
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
    function getValignMode(flalign){
        var _alignType;

        var attrs = flalign.attributes;
        for (var j=0 ; j < attrs.length ; j++) {
             if(attrs[j].name.indexOf(attributesNames._VALIGN_ATTR_PREFIX_) > -1){
                 _alignType = attrs[j].value;
             }
        }
       return _alignType;
    }
    function getHalignMode(flalign){
        var _alignType;

        var attrs = flalign.attributes;
        for (var j=0 ; j < attrs.length ; j++) {
             if(attrs[j].name.indexOf(attributesNames._HALIGN_ATTR_PREFIX_) > -1){
                 _alignType = attrs[j].value;
             }
        }
       return _alignType;
    }
    
    /*
	 * return true height
	 */  
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
    
    /*
	 * return true width
	 */  
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
    
    /*
	 * enable forach on array
	 */  
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(fn){
            for ( var i = 0; i < this.length; i++ ) {
              fn( this[i], i, this );
            }
        };
    }
    
}(window, document));
    
    
    
var n = northenlight.init();