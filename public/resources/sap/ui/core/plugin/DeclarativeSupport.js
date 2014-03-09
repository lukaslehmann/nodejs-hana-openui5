/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.plugin.DeclarativeSupport");jQuery.sap.require("sap.ui.core.DeclarativeSupport");jQuery.sap.require("sap.ui.core.Core");
sap.ui.core.plugin.DeclarativeSupport=function(){};
sap.ui.core.plugin.DeclarativeSupport.prototype.startPlugin=function(c,o){jQuery.sap.log.info("Starting DeclarativeSupport plugin.");this.oCore=c;this.oWindow=window;sap.ui.core.DeclarativeSupport.compile(document.body)};
sap.ui.core.plugin.DeclarativeSupport.prototype.stopPlugin=function(){jQuery.sap.log.info("Stopping DeclarativeSupport plugin.");this.oCore=null};
(function(){var t=new sap.ui.core.plugin.DeclarativeSupport();sap.ui.getCore().registerPlugin(t)}());
