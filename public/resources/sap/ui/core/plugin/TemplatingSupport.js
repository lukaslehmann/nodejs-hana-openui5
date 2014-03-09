/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.plugin.TemplatingSupport");jQuery.sap.require("sap.ui.core.Core");jQuery.sap.require("sap.ui.core.tmpl.Template");
sap.ui.core.plugin.TemplatingSupport=function(){};
sap.ui.core.plugin.TemplatingSupport.prototype.startPlugin=function(c,o){jQuery.sap.log.info("Starting TemplatingSupport plugin.");this.oCore=c;sap.ui.template()};
sap.ui.core.plugin.TemplatingSupport.prototype.stopPlugin=function(){jQuery.sap.log.info("Stopping TemplatingSupport plugin.");this.oCore=null};
(function(){var t=new sap.ui.core.plugin.TemplatingSupport();sap.ui.getCore().registerPlugin(t)}());
