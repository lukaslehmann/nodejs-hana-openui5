/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.Item");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.core.Item",{metadata:{library:"sap.ui.core",properties:{"text":{type:"string",group:"Misc",defaultValue:""},"enabled":{type:"boolean",group:"Misc",defaultValue:true},"textDirection":{type:"sap.ui.core.TextDirection",group:"Misc",defaultValue:sap.ui.core.TextDirection.Inherit},"key":{type:"string",group:"Data",defaultValue:null}}}});
