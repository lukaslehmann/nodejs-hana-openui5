/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.SwitchRenderer");sap.m.SwitchRenderer={};
sap.m.SwitchRenderer.render=function(r,s){var S=s.getState(),a=S?s._sOn:s._sOff,t=s.getTooltip_AsString(),T=s.getType(),d=(T==="Default"),D=!s.getEnabled(),n=s.getName();if(!s.getVisible()){return}r.write('<div');r.addClass("sapMSwtCont");if(D){r.addClass("sapMSwtContDisabled")}r.writeClasses();r.writeStyles();r.writeControlData(s);if(t){r.writeAttributeEscaped("title",t)}r.write(">");r.write("<div");r.addClass("sapMSwt");S?r.addClass("sapMSwtOn"):r.addClass("sapMSwtOff");r.addClass("sapMSwt"+T);if(D){r.addClass("sapMSwtDisabled")}r.writeClasses();r.write('>');r.write('<div class="sapMSwtInner">');this._renderText(r,s,d);this._renderHandle(r,s,a,D);r.write("</div>");r.write("</div>");if(n){this._renderCheckbox(r,s,n,a,S,D)}r.write("</div>")};
sap.m.SwitchRenderer._renderText=function(r,s,d){r.write('<div class="sapMSwtText sapMSwtTextOn">');r.write("<span>");if(d){r.writeEscaped(s._sOn)}r.write("</span>");r.write("</div>");r.write('<div class="sapMSwtText sapMSwtTextOff">');r.write("<span>");if(d){r.writeEscaped(s._sOff)}r.write("</span>");r.write("</div>")};
sap.m.SwitchRenderer._renderHandle=function(r,s,S,d){r.write('<div class="sapMSwtHandle"');if(!d){r.writeAttribute("tabindex","0")}r.writeAttributeEscaped("data-sap-ui-swt",S);r.write("></div>")};
sap.m.SwitchRenderer._renderCheckbox=function(r,s,n,S,b,d){r.write('<input type="checkbox"');r.writeAttributeEscaped("name",n);r.writeAttribute("id",s.getId()+"-input");if(b){r.writeAttribute("checked","checked")}if(d){r.writeAttribute("disabled","disabled")}r.writeAttributeEscaped("value",S);r.write(">")};
