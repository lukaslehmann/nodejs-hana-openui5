/*!
 * jQuery UI Effects Explode 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function($,u){$.effects.explode=function(o){return this.queue(function(){var r=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;var c=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;o.options.mode=o.options.mode=='toggle'?($(this).is(':visible')?'hide':'show'):o.options.mode;var e=$(this).show().css('visibility','hidden');var a=e.offset();a.top-=parseInt(e.css("marginTop"),10)||0;a.left-=parseInt(e.css("marginLeft"),10)||0;var w=e.outerWidth(true);var h=e.outerHeight(true);for(var i=0;i<r;i++){for(var j=0;j<c;j++){e.clone().appendTo('body').wrap('<div></div>').css({position:'absolute',visibility:'visible',left:-j*(w/c),top:-i*(h/r)}).parent().addClass('ui-effects-explode').css({position:'absolute',overflow:'hidden',width:w/c,height:h/r,left:a.left+j*(w/c)+(o.options.mode=='show'?(j-Math.floor(c/2))*(w/c):0),top:a.top+i*(h/r)+(o.options.mode=='show'?(i-Math.floor(r/2))*(h/r):0),opacity:o.options.mode=='show'?0:1}).animate({left:a.left+j*(w/c)+(o.options.mode=='show'?0:(j-Math.floor(c/2))*(w/c)),top:a.top+i*(h/r)+(o.options.mode=='show'?0:(i-Math.floor(r/2))*(h/r)),opacity:o.options.mode=='show'?1:0},o.duration||500)}}setTimeout(function(){o.options.mode=='show'?e.css({visibility:'visible'}):e.css({visibility:'visible'}).hide();if(o.callback)o.callback.apply(e[0]);e.dequeue();$('div.ui-effects-explode').remove()},o.duration||500)})}})(jQuery);
