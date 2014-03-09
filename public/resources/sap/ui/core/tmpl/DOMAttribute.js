/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.tmpl.DOMAttribute");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.core.tmpl.DOMAttribute",{metadata:{library:"sap.ui.core",properties:{"name":{type:"string",group:"Data",defaultValue:null},"value":{type:"string",group:"Data",defaultValue:null}}}});
sap.ui.core.tmpl.DOMAttribute.prototype.setValue=function(v){this.setProperty("value",v,true);var p=this.getParent(),$=p&&p.$();if($&&$.length>0){$.attr(this.getName(),this.getProperty("value"))}return this};
