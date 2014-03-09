/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.xml.XMLTreeBinding");jQuery.sap.require("sap.ui.model.ClientTreeBinding");sap.ui.model.ClientTreeBinding.extend("sap.ui.model.xml.XMLTreeBinding");
sap.ui.model.xml.XMLTreeBinding.prototype.getNodeContexts=function(c){var C=c.getPath();if(!jQuery.sap.endsWith(C,"/")){C=C+"/"}if(!jQuery.sap.startsWith(C,"/")){C="/"+C}var a=[],n={},t=this,N=this.oModel._getObject(c.getPath()),o,s,b;jQuery.each(N[0].childNodes,function(d,o){if(o.nodeType==1){if(n[o.nodeName]==undefined){n[o.nodeName]=0}else{n[o.nodeName]++}s=C+o.nodeName+"/"+n[o.nodeName];b=t.oModel.getContext(s);if(t.aFilters&&!t.bIsFiltering){if(jQuery.inArray(b,t.filterInfo.aFilteredContexts)!=-1){a.push(b)}}else{a.push(b)}}});return a};
