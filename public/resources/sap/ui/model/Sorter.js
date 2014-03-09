/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.Sorter");sap.ui.base.Object.extend("sap.ui.model.Sorter",{constructor:function(p,d,g){if(typeof p==="object"){var s=p;p=s.path;d=s.descending;g=s.group}this.sPath=p;var S=this.sPath.indexOf(">");if(S>0){this.sPath=this.sPath.substr(S+1)}this.bDescending=d;this.vGroup=g;if(typeof g=="boolean"&&g){this.fnGroup=function(c){return c.getProperty(this.sPath)}}if(typeof g=="function"){this.fnGroup=g}}});
