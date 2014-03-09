/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.json.JSONTreeBinding");jQuery.sap.require("sap.ui.model.ClientTreeBinding");sap.ui.model.ClientTreeBinding.extend("sap.ui.model.json.JSONTreeBinding");
sap.ui.model.json.JSONTreeBinding.prototype.getNodeContexts=function(c){var C=c.getPath();if(!jQuery.sap.endsWith(C,"/")){C=C+"/"}if(!jQuery.sap.startsWith(C,"/")){C="/"+C}var a=[],t=this,n=this.oModel._getObject(C),o,A=this.mParameters&&this.mParameters.arrayNames,b;if(A&&jQuery.isArray(A)){jQuery.each(A,function(i,s){b=n[s];if(b){jQuery.each(b,function(S,d){t._saveSubContext(d,a,C,s+"/"+S)})}})}else{if(n){jQuery.sap.each(n,function(N,o){if(jQuery.isArray(o)){jQuery.each(o,function(s,S){t._saveSubContext(S,a,C,N+"/"+s)})}else if(typeof o=="object"){t._saveSubContext(o,a,C,N)}})}}return a};
sap.ui.model.json.JSONTreeBinding.prototype._saveSubContext=function(n,c,C,N){if(typeof n=="object"){var o=this.oModel.getContext(C+N);if(this.aFilters&&!this.bIsFiltering){if(jQuery.inArray(o,this.filterInfo.aFilteredContexts)!=-1){c.push(o)}}else{c.push(o)}}};
