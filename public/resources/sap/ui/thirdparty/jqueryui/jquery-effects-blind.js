/*!
 * jQuery UI Effects Blind 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.blind=function(o){return this.queue(function(){var e=$(this),p=['position','top','bottom','left','right'];var m=$.effects.setMode(e,o.options.mode||'hide');var d=o.options.direction||'vertical';$.effects.save(e,p);e.show();var w=$.effects.createWrapper(e).css({overflow:'hidden'});var r=(d=='vertical')?'height':'width';var a=(d=='vertical')?w.height():w.width();if(m=='show')w.css(r,0);var b={};b[r]=m=='show'?a:0;w.animate(b,o.duration,o.options.easing,function(){if(m=='hide')e.hide();$.effects.restore(e,p);$.effects.removeWrapper(e);if(o.callback)o.callback.apply(e[0],arguments);e.dequeue()})})}})(jQuery);
