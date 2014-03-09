/*!
 * jQuery UI Effects Bounce 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.bounce=function(o){return this.queue(function(){var e=$(this),p=['position','top','bottom','left','right'];var m=$.effects.setMode(e,o.options.mode||'effect');var d=o.options.direction||'up';var a=o.options.distance||20;var t=o.options.times||5;var s=o.duration||250;if(/show|hide/.test(m))p.push('opacity');$.effects.save(e,p);e.show();$.effects.createWrapper(e);var r=(d=='up'||d=='down')?'top':'left';var b=(d=='up'||d=='left')?'pos':'neg';var a=o.options.distance||(r=='top'?e.outerHeight(true)/3:e.outerWidth(true)/3);if(m=='show')e.css('opacity',0).css(r,b=='pos'?-a:a);if(m=='hide')a=a/(t*2);if(m!='hide')t--;if(m=='show'){var c={opacity:1};c[r]=(b=='pos'?'+=':'-=')+a;e.animate(c,s/2,o.options.easing);a=a/2;t--};for(var i=0;i<t;i++){var f={},g={};f[r]=(b=='pos'?'-=':'+=')+a;g[r]=(b=='pos'?'+=':'-=')+a;e.animate(f,s/2,o.options.easing).animate(g,s/2,o.options.easing);a=(m=='hide')?a*2:a/2};if(m=='hide'){var c={opacity:0};c[r]=(b=='pos'?'-=':'+=')+a;e.animate(c,s/2,o.options.easing,function(){e.hide();$.effects.restore(e,p);$.effects.removeWrapper(e);if(o.callback)o.callback.apply(this,arguments)})}else{var f={},g={};f[r]=(b=='pos'?'-=':'+=')+a;g[r]=(b=='pos'?'+=':'-=')+a;e.animate(f,s/2,o.options.easing).animate(g,s/2,o.options.easing,function(){$.effects.restore(e,p);$.effects.removeWrapper(e);if(o.callback)o.callback.apply(this,arguments)})};e.queue('fx',function(){e.dequeue()});e.dequeue()})}})(jQuery);
