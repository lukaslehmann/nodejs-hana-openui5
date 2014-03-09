/*!
 * jQuery UI Effects Transfer 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.transfer=function(o){return this.queue(function(){var e=$(this),t=$(o.options.to),a=t.offset(),b={top:a.top,left:a.left,height:t.innerHeight(),width:t.innerWidth()},s=e.offset(),c=$('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(o.options.className).css({top:s.top,left:s.left,height:e.innerHeight(),width:e.innerWidth(),position:'absolute'}).animate(b,o.duration,o.options.easing,function(){c.remove();(o.callback&&o.callback.apply(e[0],arguments));e.dequeue()})})}})(jQuery);
