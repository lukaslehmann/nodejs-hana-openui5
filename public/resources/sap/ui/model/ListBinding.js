/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.ListBinding");jQuery.sap.require("sap.ui.model.Binding");jQuery.sap.require("sap.ui.model.Sorter");jQuery.sap.require("sap.ui.model.Filter");sap.ui.model.Binding.extend("sap.ui.model.ListBinding",{constructor:function(m,p,c,s,f,P){sap.ui.model.Binding.call(this,m,p,c,P);this.aSorters=s;if(!jQuery.isArray(this.aSorters)&&this.aSorters instanceof sap.ui.model.Sorter){this.aSorters=[this.aSorters]}else if(!jQuery.isArray(this.aSorters)){this.aSorters=[]}this.aFilters=[];if(!jQuery.isArray(f)&&f instanceof sap.ui.model.Filter){f=[f]}else if(!jQuery.isArray(f)){f=[]}this.aApplicationFilters=f;this.bUseExtendedChangeDetection=false},metadata:{"abstract":true,publicMethods:["getContexts","sort","attachSort","detachSort","filter","attachFilter","detachFilter","getDistinctValues","isGrouped"]}});
sap.ui.model.ListBinding.prototype.getDistinctValues=function(p){return null};
sap.ui.model.ListBinding.prototype.attachSort=function(f,l){this.attachEvent("_sort",f,l)};
sap.ui.model.ListBinding.prototype.detachSort=function(f,l){this.detachEvent("_sort",f,l)};
sap.ui.model.ListBinding.prototype._fireSort=function(a){this.fireEvent("_sort",a)};
sap.ui.model.ListBinding.prototype.attachFilter=function(f,l){this.attachEvent("_filter",f,l)};
sap.ui.model.ListBinding.prototype.detachFilter=function(f,l){this.detachEvent("_filter",f,l)};
sap.ui.model.ListBinding.prototype.isGrouped=function(){return this.aSorters.length>0&&!!this.aSorters[0].fnGroup};
sap.ui.model.ListBinding.prototype._fireFilter=function(a){this.fireEvent("_filter",a)};
sap.ui.model.ListBinding.prototype.enableExtendedChangeDetection=function(){this.bUseExtendedChangeDetection=true;if(this.update){this.update()}};
