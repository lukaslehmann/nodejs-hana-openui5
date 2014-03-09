/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.tmpl.DOMElementRenderer");sap.ui.core.tmpl.DOMElementRenderer={};
sap.ui.core.tmpl.DOMElementRenderer.render=function(r,e){r.write("<");r.write(e.getTag());r.writeControlData(e);jQuery.each(e.getAttributes(),function(i,a){var n=a.getName().toLowerCase();if(n==="class"){var c=a.getValue().split(" ");jQuery.each(c,function(i,C){var C=C.trim();if(C){r.addClass(C)}})}else if(n==="style"){var s=a.getValue().split(";");jQuery.each(s,function(i,S){var i=S.indexOf(":");if(i!=-1){var k=S.substring(0,i).trim();var v=S.substring(i+1).trim();r.addStyle(k,v)}})}else{r.writeAttributeEscaped(a.getName(),a.getValue())}});r.writeClasses();r.writeStyles();var E=e.getElements(),h=!!e.getText()||E.length>0;if(!h){r.write("/>")}else{r.write(">");if(e.getText()){r.writeEscaped(e.getText())}jQuery.each(E,function(i,c){r.renderControl(c)});r.write("</");r.write(e.getTag());r.write(">")}};
