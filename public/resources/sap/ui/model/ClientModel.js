/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.ClientModel");jQuery.sap.require("sap.ui.model.Model");jQuery.sap.require("sap.ui.model.ClientPropertyBinding");jQuery.sap.require("sap.ui.model.ClientListBinding");jQuery.sap.require("sap.ui.model.ClientTreeBinding");sap.ui.model.Model.extend("sap.ui.model.ClientModel",{constructor:function(d){sap.ui.model.Model.apply(this,arguments);this.bCache=true;if(typeof d=="string"){this.loadData(d)}},metadata:{publicMethods:["loadData","setData","getData","setProperty","forceNoCache"]}});
sap.ui.model.ClientModel.prototype.getData=function(){return this.oData};
sap.ui.model.ClientModel.prototype.checkUpdate=function(f){var b=this.aBindings.slice(0);jQuery.each(b,function(i,B){B.checkUpdate(f)})};
sap.ui.model.ClientModel.prototype.createBindingContext=function(p,c,P,C){if(typeof c=="function"){C=c;c=null}if(typeof P=="function"){C=P;P=null}var s=this.resolve(p,c),n=(s==undefined)?undefined:this.getContext(s?s:"/");C(n)};
sap.ui.model.ClientModel.prototype.destroyBindingContext=function(c){};
sap.ui.model.ClientModel.prototype.updateBindings=function(f){this.checkUpdate(f)};
sap.ui.model.ClientModel.prototype.forceNoCache=function(f){this.bCache=!f};
