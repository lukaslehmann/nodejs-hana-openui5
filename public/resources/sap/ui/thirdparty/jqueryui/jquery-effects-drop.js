/*!
 * jQuery UI Effects Drop 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.drop=function(o){return this.queue(function(){var e=$(this),p=['position','top','bottom','left','right','opacity'];var m=$.effects.setMode(e,o.options.mode||'hide');var d=o.options.direction||'left';$.effects.save(e,p);e.show();$.effects.createWrapper(e);var r=(d=='up'||d=='down')?'top':'left';var a=(d=='up'||d=='left')?'pos':'neg';var b=o.options.distance||(r=='top'?e.outerHeight(true)/2:e.outerWidth(true)/2);if(m=='show')e.css('opacity',0).css(r,a=='pos'?-b:b);var c={opacity:m=='show'?1:0};c[r]=(m=='show'?(a=='pos'?'+=':'-='):(a=='pos'?'-=':'+='))+b;e.animate(c,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(m=='hide')e.hide();$.effects.restore(e,p);$.effects.removeWrapper(e);if(o.callback)o.callback.apply(this,arguments);e.dequeue()}})})}})(jQuery);
