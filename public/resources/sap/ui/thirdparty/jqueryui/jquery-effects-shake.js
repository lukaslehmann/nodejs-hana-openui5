/*!
 * jQuery UI Effects Shake 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.shake=function(o){return this.queue(function(){var e=$(this),p=['position','top','bottom','left','right'];var m=$.effects.setMode(e,o.options.mode||'effect');var d=o.options.direction||'left';var a=o.options.distance||20;var t=o.options.times||3;var s=o.duration||o.options.duration||140;$.effects.save(e,p);e.show();$.effects.createWrapper(e);var r=(d=='up'||d=='down')?'top':'left';var b=(d=='up'||d=='left')?'pos':'neg';var c={},f={},g={};c[r]=(b=='pos'?'-=':'+=')+a;f[r]=(b=='pos'?'+=':'-=')+a*2;g[r]=(b=='pos'?'-=':'+=')+a*2;e.animate(c,s,o.options.easing);for(var i=1;i<t;i++){e.animate(f,s,o.options.easing).animate(g,s,o.options.easing)};e.animate(f,s,o.options.easing).animate(c,s/2,o.options.easing,function(){$.effects.restore(e,p);$.effects.removeWrapper(e);if(o.callback)o.callback.apply(this,arguments)});e.queue('fx',function(){e.dequeue()});e.dequeue()})}})(jQuery);
