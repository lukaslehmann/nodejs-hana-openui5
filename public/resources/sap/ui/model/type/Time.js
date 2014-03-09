/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.type.Time");jQuery.sap.require("sap.ui.model.type.Date");sap.ui.model.type.Date.extend("sap.ui.model.type.Time",{constructor:function(){sap.ui.model.type.Date.apply(this,arguments);this.sName="Time"}});
sap.ui.model.type.Time.prototype._handleLocalizationChange=function(){this.oOutputFormat=sap.ui.core.format.DateFormat.getTimeInstance(this.oFormatOptions);if(this.oFormatOptions.source){this.oInputFormat=sap.ui.core.format.DateFormat.getTimeInstance(this.oFormatOptions.source)}};
