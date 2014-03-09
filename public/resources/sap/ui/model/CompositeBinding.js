/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.CompositeBinding");jQuery.sap.require("sap.ui.model.PropertyBinding");jQuery.sap.require("sap.ui.model.SimpleType");sap.ui.model.PropertyBinding.extend("sap.ui.model.CompositeBinding",{constructor:function(b,r){sap.ui.model.Binding.apply(this,[null,""]);this.aBindings=b;this.bRawValues=r},metadata:{publicMethods:["getBindings","attachChange","detachChange"]}});
sap.ui.model.CompositeBinding.prototype.getPath=function(){return null};
sap.ui.model.CompositeBinding.prototype.getModel=function(){return null};
sap.ui.model.CompositeBinding.prototype.getContext=function(){return null};
sap.ui.model.CompositeBinding.prototype.getType=function(){return null};
sap.ui.model.CompositeBinding.prototype.setContext=function(c){jQuery.each(this.aBindings,function(i,b){if(!c||b.updateRequired(c.getModel())){b.setContext(c)}})};
sap.ui.model.CompositeBinding.prototype.setValue=function(v){throw new sap.ui.base.Exception("Composite Binding does not support setValue because it contains multiple property bindings!")};
sap.ui.model.CompositeBinding.prototype.getValue=function(){var v=[],V;jQuery.each(this.aBindings,function(i,b){V=b.getValue();v.push(V)});return v};
sap.ui.model.CompositeBinding.prototype.getExternalValue=function(){var v=[],V;if(this.bRawValues){v=this.getValue()}else{jQuery.each(this.aBindings,function(i,b){V=b.getExternalValue();v.push(V)})}if(this.fnFormatter){V=this.fnFormatter.apply(this,v)}else{if(v.length>1){V=v.join(" ")}else{V=v[0]}}return V};
sap.ui.model.CompositeBinding.prototype.setExternalValue=function(v){throw new sap.ui.base.Exception("Composite Binding does not support setExternalValue because it contains multiple property bindings!")};
sap.ui.model.CompositeBinding.prototype.getBindings=function(){return this.aBindings};
sap.ui.model.CompositeBinding.prototype.attachChange=function(f,l){jQuery.each(this.aBindings,function(i,b){b.attachChange(f,l)})};
sap.ui.model.CompositeBinding.prototype.detachChange=function(f,l){jQuery.each(this.aBindings,function(i,b){b.detachChange(f,l)})};
sap.ui.model.CompositeBinding.prototype.updateRequired=function(m){var u=false;jQuery.each(this.aBindings,function(i,b){u=u||b.updateRequired(m)});return u};
