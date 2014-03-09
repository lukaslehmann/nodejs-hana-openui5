/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.ui.core.Control");
sap.ui.core.EnabledPropagator=function(d,l){if(!(this instanceof sap.ui.core.Control)){throw new Error("EnabledPropagator only supports subclasses of Control")}if(d===undefined){d=true}function f(c){var p=c.getParent();while(p&&!p.getEnabled&&p.getParent){p=p.getParent()}return p}if(this.getEnabled===undefined){this.getEnabled=function(){var p=f(this);return(p&&p.getEnabled&&!p.getEnabled())?false:this.getProperty("enabled")};if(l){this.getMetadata().addProperty("Enabled",{type:"boolean",group:"Behavior",defaultValue:!!d})}this.getMetadata().addProperty("enabled",{type:"boolean",group:"Behavior",defaultValue:!!d});this.getMetadata().addPublicMethods('getEnabled')}else{var o=this.getEnabled;this.getEnabled=function(){var p=f(this);return(p&&p.getEnabled&&!p.getEnabled())?false:o.apply(this)}}if(this.setEnabled===undefined){this.setEnabled=function(e){this.setProperty("enabled",e)};this.getMetadata().addPublicMethods('setEnabled')}};
