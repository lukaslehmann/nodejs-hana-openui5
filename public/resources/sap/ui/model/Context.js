/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.Context");jQuery.sap.require("sap.ui.base.EventProvider");sap.ui.base.Object.extend("sap.ui.model.Context",{constructor:function(m,p){sap.ui.base.Object.apply(this);this.oModel=m;this.sPath=p},metadata:{"abstract":true,publicMethods:["getModel","getPath","getProperty","getObject"]}});
sap.ui.model.Context.prototype.getModel=function(){return this.oModel};
sap.ui.model.Context.prototype.getPath=function(){return this.sPath};
sap.ui.model.Context.prototype.getProperty=function(p){return this.oModel.getProperty(p,this)};
sap.ui.model.Context.prototype.getObject=function(){return this.oModel.getProperty(this.sPath)};
sap.ui.model.Context.prototype.toString=function(){return this.sPath};
