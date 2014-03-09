/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.SimpleType");jQuery.sap.require("sap.ui.model.Type");jQuery.sap.require("sap.ui.model.ParseException");jQuery.sap.require("sap.ui.model.ValidateException");jQuery.sap.require("sap.ui.model.FormatException");sap.ui.model.Type.extend("sap.ui.model.SimpleType",{constructor:function(f,c){sap.ui.model.Type.apply(this,arguments);this.setFormatOptions(f||{});this.setConstraints(c||{});this.sName="SimpleType"},metadata:{"abstract":true,publicMethods:["setConstraints","setFormatOptions","formatValue","parseValue","validateValue"]}});
sap.ui.model.SimpleType.prototype.setConstraints=function(c){this.oConstraints=c};
sap.ui.model.SimpleType.prototype.setFormatOptions=function(f){this.oFormatOptions=f};
