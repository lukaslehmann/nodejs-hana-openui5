/*!
 * jQuery UI Effects Pulsate 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.pulsate=function(o){return this.queue(function(){var e=$(this),m=$.effects.setMode(e,o.options.mode||'show'),t=((o.options.times||5)*2)-1,d=o.duration?o.duration/2:$.fx.speeds._default/2,a=e.is(':visible'),b=0;if(!a){e.css('opacity',0).show();b=1}if((m=='hide'&&a)||(m=='show'&&!a)){t--}for(var i=0;i<t;i++){e.animate({opacity:b},d,o.options.easing);b=(b+1)%2}e.animate({opacity:b},d,o.options.easing,function(){if(b==0){e.hide()}(o.callback&&o.callback.apply(this,arguments))});e.queue('fx',function(){e.dequeue()}).dequeue()})}})(jQuery);
