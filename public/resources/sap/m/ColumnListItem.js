/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ColumnListItem");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.ListItemBase");sap.m.ListItemBase.extend("sap.m.ColumnListItem",{metadata:{library:"sap.m",defaultAggregation:"cells",aggregations:{"clonedHeaders":{type:"sap.ui.core.Control",multiple:true,singularName:"clonedHeader",visibility:"hidden"},"cells":{type:"sap.ui.core.Control",multiple:true,singularName:"cell",bindable:"bindable"}}}});sap.m.ColumnListItem.prototype._popinId="";
sap.m.ColumnListItem.prototype.removePopin=function(){if(this._popinId){jQuery.sap.byId(this._popinId).remove();this._popinId=""}return this};
sap.m.ColumnListItem.prototype.hasPopin=function(){return Boolean(this._popinId)};
sap.m.ColumnListItem.prototype.exit=function(){if(sap.m.ListItemBase.prototype.exit){sap.m.ListItemBase.prototype.exit.call(this)}this.destroyAggregation("clonedHeaders",true);return this.removePopin()};
sap.m.ColumnListItem.prototype._activeHandlingInheritor=function(){this._toggleActiveClass(true)};
sap.m.ColumnListItem.prototype._inactiveHandlingInheritor=function(){this._toggleActiveClass(false)};
sap.m.ColumnListItem.prototype._toggleActiveClass=function(s){if(this._popinId){jQuery.sap.byId(this._popinId).toggleClass("sapMLIBActive",s)}};
sap.m.ColumnListItem.handleEvents=function(e,E,c){var $=jQuery(e.target).closest(".sapMListTblSubRow",c);if($.length){var C=sap.ui.getCore().byId($.prev().attr("id"));if(C){e.srcControl=sap.ui.getCore().byId(e.target.id)||C;if(C["on"+E]){C["on"+E](e)}}}};
