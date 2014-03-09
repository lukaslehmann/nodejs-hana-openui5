/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.ClientPropertyBinding");jQuery.sap.require("sap.ui.model.PropertyBinding");sap.ui.model.PropertyBinding.extend("sap.ui.model.ClientPropertyBinding",{constructor:function(m,p,c){sap.ui.model.PropertyBinding.apply(this,arguments);this.oValue=this._getValue()}});
sap.ui.model.ClientPropertyBinding.prototype.getValue=function(){return this.oValue};
sap.ui.model.ClientPropertyBinding.prototype._getValue=function(){var p=this.sPath.substr(this.sPath.lastIndexOf("/")+1);if(p=="__name__"){var P=this.oContext.split("/");return P[P.length-1]}return this.oModel.getProperty(this.sPath,this.oContext)};
sap.ui.model.ClientPropertyBinding.prototype.setContext=function(c){if(this.oContext!=c){this.oContext=c;if(this.isRelative()){this.checkUpdate()}}};
