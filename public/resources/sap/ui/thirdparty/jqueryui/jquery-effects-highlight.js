/*!
 * jQuery UI Effects Highlight 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.highlight=function(o){return this.queue(function(){var e=$(this),p=['backgroundImage','backgroundColor','opacity'],m=$.effects.setMode(e,o.options.mode||'show'),a={backgroundColor:e.css('backgroundColor')};if(m=='hide'){a.opacity=0}$.effects.save(e,p);e.show().css({backgroundImage:'none',backgroundColor:o.options.color||'#ffff99'}).animate(a,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){(m=='hide'&&e.hide());$.effects.restore(e,p);(m=='show'&&!$.support.opacity&&this.style.removeAttribute('filter'));(o.callback&&o.callback.apply(this,arguments));e.dequeue()}})})}})(jQuery);
