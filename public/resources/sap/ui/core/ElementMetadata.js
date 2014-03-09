/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.ElementMetadata");jQuery.sap.require("sap.ui.base.ManagedObjectMetadata");
sap.ui.core.ElementMetadata=function(c,C){sap.ui.base.ManagedObjectMetadata.apply(this,arguments)};
sap.ui.core.ElementMetadata.prototype=jQuery.sap.newObject(sap.ui.base.ManagedObjectMetadata.prototype);sap.ui.core.ElementMetadata.uid=sap.ui.base.ManagedObjectMetadata.uid;
sap.ui.core.ElementMetadata.prototype.getElementName=function(){return this._sClassName};
sap.ui.core.ElementMetadata.prototype.getRendererName=function(){return this._sRendererName};
sap.ui.core.ElementMetadata.prototype.getRenderer=function(){var r=this.getRendererName();if(!r){return}var R=jQuery.sap.getObject(r);if(R){return R}jQuery.sap.require(r);return jQuery.sap.getObject(r)};
sap.ui.core.ElementMetadata.prototype.applySettings=function(c){var s=c.metadata;this._sVisibility=s["visibility"]||"public";var r=c.hasOwnProperty("renderer")?(c.renderer||""):undefined;delete c.renderer;sap.ui.base.ManagedObjectMetadata.prototype.applySettings.call(this,c);this._sRendererName=this.getName()+"Renderer";if(typeof r!=="undefined"){if(typeof r==="string"){this._sRendererName=r||undefined;return}if(typeof r==="function"){r={render:r}}var p=this.getParent();var b;if(p&&p instanceof sap.ui.core.ElementMetadata){b=p.getRenderer()}if(!b){jQuery.sap.require("sap.ui.core.Renderer");b=sap.ui.core.Renderer}var R=jQuery.sap.newObject(b);jQuery.extend(R,r);jQuery.sap.setObject(this.getRendererName(),R)}};
sap.ui.core.ElementMetadata.prototype.afterApplySettings=function(){sap.ui.base.ManagedObjectMetadata.prototype.afterApplySettings.apply(this,arguments);this.register&&this.register(this)};
sap.ui.core.ElementMetadata.prototype.isHidden=function(){return this._sVisibility==="hidden"};
