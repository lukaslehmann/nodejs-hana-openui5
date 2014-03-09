/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.TextRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.m.TextRenderer={};sap.m.TextRenderer.getTextAlign=sap.ui.core.Renderer.getTextAlign;
sap.m.TextRenderer.render=function(r,t){if(!t.getVisible()){return}var w=t.getWidth(),T=t.getText(true),s=t.getTextDirection(),a=t.getTooltip_AsString(),n=t.getMaxLines(),W=t.getWrapping(),b=t.getTextAlign();r.write("<span");r.writeControlData(t);r.addClass("sapMText");if(!W||n==1){r.addClass("sapMTextNoWrap")}else if(W){if(!/\s/.test(T)){r.addClass("sapMTextBreakWord")}if(n>1){if(sap.m.Text.hasNativeLineClamp){r.addClass("sapMTextLineClamp");r.addStyle("-webkit-line-clamp",n)}else{r.addClass("sapMTextMaxLine")}}}w&&r.addStyle("width",w);s&&r.writeAttribute("dir",s);a&&r.writeAttributeEscaped("title",a);if(b){b=this.getTextAlign(b,s);if(b){r.addStyle("text-align",b)}}r.writeClasses();r.writeStyles();r.write(">");r.writeEscaped(T,W);r.write("</span>")};
