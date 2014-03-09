/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.PropertyBinding");jQuery.sap.require("sap.ui.model.Binding");jQuery.sap.require("sap.ui.model.SimpleType");sap.ui.model.Binding.extend("sap.ui.model.PropertyBinding",{constructor:function(m,p,c,P){sap.ui.model.Binding.apply(this,arguments);this.oType;this.fnFormatter;this.sInternalType},metadata:{"abstract":true,publicMethods:["getValue","setValue","setType","getType","setFormatter","getFormatter","getExternalValue","setExternalValue"]}});
sap.ui.model.PropertyBinding.prototype.getExternalValue=function(){var v=this.getValue();if(this.oType){v=this.oType.formatValue(v,this.sInternalType)}if(this.fnFormatter){v=this.fnFormatter(v)}return v};
sap.ui.model.PropertyBinding.prototype.setExternalValue=function(v){if(this.fnFormatter){return}if(this.oType){v=this.oType.parseValue(v,this.sInternalType);this.oType.validateValue(v)}this.setValue(v)};
sap.ui.model.PropertyBinding.prototype.setType=function(t,i){this.oType=t;this.sInternalType=i};
sap.ui.model.PropertyBinding.prototype.getType=function(){return this.oType};
sap.ui.model.PropertyBinding.prototype.setFormatter=function(f){this.fnFormatter=f};
sap.ui.model.PropertyBinding.prototype.getFormatter=function(){return this.fnFormatter};
