/*!
 * jQuery UI Effects Clip 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.clip=function(o){return this.queue(function(){var e=$(this),p=['position','top','bottom','left','right','height','width'];var m=$.effects.setMode(e,o.options.mode||'hide');var d=o.options.direction||'vertical';$.effects.save(e,p);e.show();var w=$.effects.createWrapper(e).css({overflow:'hidden'});var a=e[0].tagName=='IMG'?w:e;var r={size:(d=='vertical')?'height':'width',position:(d=='vertical')?'top':'left'};var b=(d=='vertical')?a.height():a.width();if(m=='show'){a.css(r.size,0);a.css(r.position,b/2)}var c={};c[r.size]=m=='show'?b:0;c[r.position]=m=='show'?0:b/2;a.animate(c,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(m=='hide')e.hide();$.effects.restore(e,p);$.effects.removeWrapper(e);if(o.callback)o.callback.apply(e[0],arguments);e.dequeue()}})})}})(jQuery);
