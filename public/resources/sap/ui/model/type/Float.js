/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.type.Float");jQuery.sap.require("sap.ui.model.SimpleType");jQuery.sap.require("sap.ui.core.format.NumberFormat");sap.ui.model.SimpleType.extend("sap.ui.model.type.Float",{constructor:function(){sap.ui.model.SimpleType.apply(this,arguments);this.sName="Float"}});
sap.ui.model.type.Float.prototype.formatValue=function(v,i){if(v==undefined||v==null){return null}switch(i){case"string":return this.oFormat.format(v);case"int":return Math.floor(v);case"float":return v;default:throw new sap.ui.model.FormatException("Don't know how to format Float to "+i)}};
sap.ui.model.type.Float.prototype.parseValue=function(v,i){var r;switch(i){case"string":r=this.oFormat.parse(v);if(isNaN(r)){throw new sap.ui.model.ParseException(v+" is not a valid Float value")}return r;case"int":case"float":return v;default:throw new sap.ui.model.ParseException("Don't know how to parse Float from "+i)}};
sap.ui.model.type.Float.prototype.validateValue=function(v){if(this.oConstraints){var V=[];jQuery.each(this.oConstraints,function(n,c){switch(n){case"minimum":if(v<c){V.push("minimum")}break;case"maximum":if(v>c){V.push("maximum")}}});if(V.length>0){throw new sap.ui.model.ValidateException("Validation of type constraints failed",V)}}};
sap.ui.model.type.Float.prototype.setFormatOptions=function(f){this.oFormatOptions=f;this._handleLocalizationChange()};
sap.ui.model.type.Float.prototype._handleLocalizationChange=function(){this.oFormat=sap.ui.core.format.NumberFormat.getFloatInstance(this.oFormatOptions)};
