/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.LocalBusyIndicatorSupport");
sap.ui.core.LocalBusyIndicatorSupport=function(){if(this===sap.ui.core.Control.prototype){this.setDelay=function(d){this.setBusyIndicatorDelay(d)}}else{jQuery.sap.log.error("Only controls can use the LocalBusyIndicator",this)}};
jQuery.sap.require("sap.ui.core.Element");
