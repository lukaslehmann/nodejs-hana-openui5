/*!
 * jQuery UI Effects Fold 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.fold=function(o){return this.queue(function(){var e=$(this),p=['position','top','bottom','left','right'];var m=$.effects.setMode(e,o.options.mode||'hide');var s=o.options.size||15;var h=!(!o.options.horizFirst);var d=o.duration?o.duration/2:$.fx.speeds._default/2;$.effects.save(e,p);e.show();var w=$.effects.createWrapper(e).css({overflow:'hidden'});var a=((m=='show')!=h);var r=a?['width','height']:['height','width'];var b=a?[w.width(),w.height()]:[w.height(),w.width()];var c=/([0-9]+)%/.exec(s);if(c)s=parseInt(c[1],10)/100*b[m=='hide'?0:1];if(m=='show')w.css(h?{height:0,width:s}:{height:s,width:0});var f={},g={};f[r[0]]=m=='show'?b[0]:s;g[r[1]]=m=='show'?b[1]:0;w.animate(f,d,o.options.easing).animate(g,d,o.options.easing,function(){if(m=='hide')e.hide();$.effects.restore(e,p);$.effects.removeWrapper(e);if(o.callback)o.callback.apply(e[0],arguments);e.dequeue()})})}})(jQuery);
