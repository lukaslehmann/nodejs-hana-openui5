/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.CompositeSupport");jQuery.sap.require("sap.ui.core.Control");jQuery.sap.require("sap.ui.model.control.ControlModel");sap.ui.core.CompositeSupport={};
sap.ui.core.CompositeSupport.mixInto=function(c,f,m){if(arguments.length==2&&typeof f==="object"){m=f;f="ComponentFactory"}function _(){var M=c.getMetadata();do{M=M.getParent();if(M&&M.getComponentFactoryClass){return M.getComponentFactoryClass()}}while(M);return sap.ui.core.ComponentFactory}c[f]=(_()).subclass(m);c.getMetadata().getComponentFactoryClass=jQuery.sap.getter(c[f]);if(!c.prototype._initCompositeSupport){c.prototype._initCompositeSupport=function(s){var F=new(this.getMetadata().getComponentFactoryClass())(this);if(s.componentFactory){F.customize(s.componentFactory);delete s.componentFactory}this.getComponentFactory=jQuery.sap.getter(F)}}if(!c.prototype._exitCompositeSupport){c.prototype._exitCompositeSupport=function(){this.getComponentFactory().destroy();delete this.getComponentFactory}}};
sap.ui.base.EventProvider.extend("sap.ui.core.ComponentFactory",{constructor:function(c){sap.ui.base.EventProvider.apply(this);this.oComposite=c;return this}});
sap.ui.core.ComponentFactory.prototype.attachChange=function(f,o){this.getModel();this.attachEvent("change",f,o);return this};
sap.ui.core.ComponentFactory.prototype.detachChange=function(f,o){this.getModel();this.detachEvent("change",f,o);return this};
sap.ui.core.ComponentFactory.prototype.getModel=function(){if(!this.oModel){var t=this;this.oModel=new sap.ui.model.control.ControlModel(this.oComposite);this.oModel._onchange=function(e){t.fireEvent("change",e.getParameters&&e.getParameters())}}return this.oModel};
sap.ui.core.ComponentFactory.prototype.addFacadeComponent=function(e){this.getModel().add(e)};
sap.ui.core.ComponentFactory.prototype.removeFacadeComponent=function(e){this.getModel().remove(e)};
(function(){function _(o,m,d){jQuery.each(m,function(n,f){if(n.indexOf("default")!=0){o[n]=f}if(d&&n.indexOf("create")==0){o["defaultC"+n.substring(1)]=o[n]}})}function a(b){return function(m){var c=function(){b.apply(this,arguments)};c.prototype=jQuery.sap.newObject(b.prototype);_(c.prototype,m,true);c.customize=function(m){_(c.prototype,m);return this};c.subclass=a(c);return c}}sap.ui.core.ComponentFactory.subclass=a(sap.ui.core.ComponentFactory);sap.ui.core.ComponentFactory.prototype.customize=function(m){_(this,m);if(this.oComposite&&this.oComposite._onComponentFactoryChanged){this.oComposite._onComponentFactoryChanged()}return this}}());
