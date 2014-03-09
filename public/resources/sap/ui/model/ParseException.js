/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.ParseException");jQuery.sap.require("sap.ui.base.Exception");
sap.ui.model.ParseException=function(m){this.name="ParseException";this.message=m};
sap.ui.model.ParseException.prototype=jQuery.sap.newObject(sap.ui.base.Exception.prototype);
