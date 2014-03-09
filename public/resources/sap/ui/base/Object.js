/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.base.Object");jQuery.sap.require("sap.ui.base.Interface");jQuery.sap.require("sap.ui.base.Metadata");sap.ui.base.Metadata.createClass("sap.ui.base.Object",{constructor:function(){if(!(this instanceof sap.ui.base.Object)){throw Error("Cannot instantiate object: \"new\" is missing!")}}});
sap.ui.base.Object.prototype.destroy=function(){};
sap.ui.base.Object.prototype.getInterface=function(){var i=new sap.ui.base.Interface(this,this.getMetadata().getAllPublicMethods());this.getInterface=jQuery.sap.getter(i);return i};
sap.ui.base.Object.defineClass=function(c,s,F){var m=new(F||sap.ui.base.Metadata)(c,s);var C=m.getClass();C.getMetadata=C.prototype.getMetadata=jQuery.sap.getter(m);if(!m.isFinal()){C.extend=function(S,o,f){return sap.ui.base.Metadata.createClass(C,S,o,f||F)}}jQuery.sap.log.debug("defined class '"+c+"'"+(m.getParent()?" as subclass of "+m.getParent().getName():""));return m};
