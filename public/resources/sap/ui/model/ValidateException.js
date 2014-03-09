/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.ValidateException");jQuery.sap.require("sap.ui.base.Exception");
sap.ui.model.ValidateException=function(m,v){this.name="ValidateException";this.message=m;this.violatedConstraints=v};
sap.ui.model.ValidateException.prototype=jQuery.sap.newObject(sap.ui.base.Exception.prototype);
