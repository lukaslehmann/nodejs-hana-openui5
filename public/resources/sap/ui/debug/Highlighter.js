/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.debug.Highlighter");jQuery.sap.require("jquery.sap.dom");jQuery.sap.require("jquery.sap.script");
sap.ui.debug.Highlighter=function(i,f,c,b){this.sId=i||jQuery.sap.uid();this.bFilled=(f==true);this.sColor=c||'blue';if(isNaN(b)){this.iBorderWidth=2}else if(b<=0){this.iBorderWidth=0}else{this.iBorderWidth=b}};
sap.ui.debug.Highlighter.prototype.highlight=function(d){if(!d||!d.parentNode){return}var h=jQuery.sap.domById(this.sId);if(!h){h=d.ownerDocument.createElement("DIV");h.setAttribute("id",this.sId);h.style.position="absolute";h.style.border=this.iBorderWidth+"px solid "+this.sColor;h.style.display="none";h.style.margin="0px";h.style.padding="0px";if(this.bFilled){h.innerHTML="<div style='background-color:"+this.sColor+";opacity:0.2;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=20);height:100%;width:100%'>&nbsp;</div>"}d.ownerDocument.body.appendChild(h)}var r=jQuery(d).rect();h.style.top=(r.top-this.iBorderWidth)+"px";h.style.left=(r.left-this.iBorderWidth)+"px";h.style.width=(r.width)+"px";h.style.height=(r.height)+"px";h.style.display="block"};
sap.ui.debug.Highlighter.prototype.hide=function(){var h=jQuery.sap.domById(this.sId);if(!h){return}h.style.display="none"};
