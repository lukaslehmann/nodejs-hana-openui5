/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.TreeBinding");jQuery.sap.require("sap.ui.model.Binding");sap.ui.model.Binding.extend("sap.ui.model.TreeBinding",{constructor:function(m,p,c,f,P){sap.ui.model.Binding.call(this,m,p,c,P);this.aFilters=f},metadata:{"abstract":true,publicMethods:["getRootContexts","getNodeContexts","filter"]}});
sap.ui.model.TreeBinding.prototype.attachFilter=function(f,l){this.attachEvent("_filter",f,l)};
sap.ui.model.TreeBinding.prototype.detachFilter=function(f,l){this.detachEvent("_filter",f,l)};
sap.ui.model.TreeBinding.prototype._fireFilter=function(a){this.fireEvent("_filter",a)};
