/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.type.Boolean");jQuery.sap.require("sap.ui.model.SimpleType");jQuery.sap.require("sap.ui.core.format.NumberFormat");sap.ui.model.SimpleType.extend("sap.ui.model.type.Boolean",{constructor:function(){sap.ui.model.SimpleType.apply(this,arguments);this.sName="Boolean"}});
sap.ui.model.type.Boolean.prototype.formatValue=function(v,i){if(v==undefined||v==null){return null}switch(i){case"boolean":return v;case"string":return v.toString();case"int":case"float":default:throw new sap.ui.model.FormatException("Don't know how to format Boolean to "+i)}};
sap.ui.model.type.Boolean.prototype.parseValue=function(v,i){var r;switch(i){case"boolean":return v;case"string":if(v.toLowerCase()=="true"||v=="X"){return true}if(v.toLowerCase()=="false"||v==""){return false}throw new sap.ui.model.ParseException("Don't know how to parse Boolean from "+i);case"int":case"float":default:throw new sap.ui.model.ParseException("Don't know how to parse Boolean from "+i)}};
sap.ui.model.type.Boolean.prototype.validateValue=function(v){};
