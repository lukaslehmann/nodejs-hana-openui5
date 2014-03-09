/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.core.plugin.TemplatingSupport
jQuery.sap.declare("sap.ui.core.plugin.TemplatingSupport");

jQuery.sap.require("sap.ui.core.Core");
jQuery.sap.require("sap.ui.core.tmpl.Template");

/**
 * Creates an instance of the class <code>sap.ui.core.plugin.TemplatingSupport</code>
 * The plugin uses the <code>sap.ui.core.tmpl.Template</code>.
 *
 * @author Peter Muessig
 * @public
 * @since 1.15.0
 * @version 1.16.8-SNAPSHOT
 */
sap.ui.core.plugin.TemplatingSupport = function() {
};


/**
 * Will be invoked by <code>sap.ui.core.Core</code> to notify the plugin to start.
 *
 * @param {sap.ui.core.Core} oCore reference to the Core
 * @param {boolean} [bOnInit] whether the hook is called during core initialization
 * @public
 */
sap.ui.core.plugin.TemplatingSupport.prototype.startPlugin = function(oCore, bOnInit) {
	jQuery.sap.log.info("Starting TemplatingSupport plugin.");
	this.oCore = oCore;
	sap.ui.template();
};

/**
 * Will be invoked by <code>sap.ui.core.Core</code> to notify the plugin to start
 * @param {sap.ui.core.Core} oCore reference to the Core
 * @public
 */
sap.ui.core.plugin.TemplatingSupport.prototype.stopPlugin = function() {
	jQuery.sap.log.info("Stopping TemplatingSupport plugin.");
	this.oCore = null;
};


/**
 * Create the <code>sap.ui.core.plugin.TemplatingSupport</code> plugin and
 * register it within the <code>sap.ui.core.Core</code>.
 */
(function(){
	var oThis = new sap.ui.core.plugin.TemplatingSupport();
	sap.ui.getCore().registerPlugin(oThis);
}());