/*!
 * jQuery UI Effects Fade 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fade
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.fade=function(o){return this.queue(function(){var e=$(this),m=$.effects.setMode(e,o.options.mode||'hide');e.animate({opacity:m},{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){(o.callback&&o.callback.apply(this,arguments));e.dequeue()}})})}})(jQuery);
