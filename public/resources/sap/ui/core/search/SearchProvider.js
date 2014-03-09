/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.search.SearchProvider");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.core.search.SearchProvider",{metadata:{publicMethods:["suggest"],library:"sap.ui.core",properties:{"icon":{type:"string",group:"Misc",defaultValue:null}}}});
sap.ui.core.search.SearchProvider.prototype.suggest=function(v,c){jQuery.sap.log.warning("sap.ui.core.search.SearchProvider is the abstract base class for all SearchProviders. Do not create instances of this class, but use a concrete sub class instead.")};
