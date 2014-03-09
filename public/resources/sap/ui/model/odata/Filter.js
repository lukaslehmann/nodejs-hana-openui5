/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.odata.Filter");jQuery.sap.require("sap.ui.model.FilterOperator");sap.ui.base.Object.extend("sap.ui.model.odata.Filter",{constructor:function(p,v,a){if(typeof p==="object"){var f=p;p=f.path;v=f.values;a=f.and}this.sPath=p;this.aValues=v;this.bAND=a==undefined?true:a}});
