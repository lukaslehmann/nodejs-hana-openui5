/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.type.DateTime");jQuery.sap.require("sap.ui.model.type.Date");sap.ui.model.type.Date.extend("sap.ui.model.type.DateTime",{constructor:function(){sap.ui.model.type.Date.apply(this,arguments);this.sName="DateTime"}});
sap.ui.model.type.DateTime.prototype._handleLocalizationChange=function(){this.oOutputFormat=sap.ui.core.format.DateFormat.getDateTimeInstance(this.oFormatOptions);if(this.oFormatOptions.source){this.oInputFormat=sap.ui.core.format.DateFormat.getDateTimeInstance(this.oFormatOptions.source)}};
