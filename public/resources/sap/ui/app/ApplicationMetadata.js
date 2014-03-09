/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.app.ApplicationMetadata");jQuery.sap.require("sap.ui.base.ManagedObjectMetadata");
sap.ui.app.ApplicationMetadata=function(c,C){sap.ui.base.ManagedObjectMetadata.apply(this,arguments)};
sap.ui.app.ApplicationMetadata.prototype=jQuery.sap.newObject(sap.ui.base.ManagedObjectMetadata.prototype);
sap.ui.app.ApplicationMetadata.preprocessClassInfo=function(c){if(c&&typeof c.metadata==="string"){c.metadata={_src:c.metadata}}return c};
sap.ui.app.ApplicationMetadata.prototype.applySettings=function(c){var s=c.metadata;sap.ui.base.ManagedObjectMetadata.prototype.applySettings.call(this,c);if(s._src){jQuery.sap.log.warning("The metadata of the application "+this.getName()+" is loaded from file "+s._src+". This is a design time feature and not for productive usage!");var p=this.getName().replace(/\.\w+?$/,"");var u=jQuery.sap.getModulePath(p,"/"+s._src);var r=jQuery.sap.syncGetJSON(u);if(r.success){jQuery.extend(s,r.data)}else{jQuery.sap.log.error("Failed to load application metadata from \""+s._src+"\"! Reason: "+r.error)}}this._mRootComponent=s.rootComponent||null;this._mModels=s.models||null;this._mServices=s.services||null};
sap.ui.app.ApplicationMetadata.prototype.getRootComponent=function(){return this._mRootComponent};
sap.ui.app.ApplicationMetadata.prototype.getModels=function(){return this._mModels};
sap.ui.app.ApplicationMetadata.prototype.getServices=function(){return this._mServices};
