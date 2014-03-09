/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.UIComponent");jQuery.sap.require("sap.ui.core.UIComponentMetadata");jQuery.sap.require("sap.ui.core.Component");jQuery.sap.require("sap.ui.core.mvc.View");sap.ui.core.Component.extend("sap.ui.core.UIComponent",{constructor:function(i,s){try{sap.ui.core.Component.apply(this,arguments)}catch(e){if(this._oRouter){this._oRouter.destroy()}throw e}},metadata:{"abstract":true,rootView:null,publicMethods:["render"],aggregations:{"rootControl":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},routing:{}}},sap.ui.core.UIComponentMetadata);
sap.ui.core.UIComponent.prototype.init=function(){var t=this;var p={};if(this.getAutoPrefixId()){p.id=function(i){return t.createId(i)}}sap.ui.base.ManagedObject.runWithOwner(function(){sap.ui.base.ManagedObject.runWithPreprocessors(function(){t.setAggregation("rootControl",t.createContent())},p)},this);var m=this.getMetadata(),r=m.getRoutingConfig()||{},R=m.getRoutes(),o=this.getAggregation("rootControl");if(o instanceof sap.ui.core.mvc.View){r=jQuery.extend({},{targetParent:o.getId()},r)}if(R){jQuery.sap.require("sap.ui.core.routing.Router");this._oRouter=new sap.ui.core.routing.Router(R,r,this)}};
sap.ui.core.UIComponent.prototype.destroy=function(){if(this._oRouter){this._oRouter.destroy();delete this._oRouter}sap.ui.core.Component.prototype.destroy.apply(this,arguments)};
sap.ui.core.UIComponent.getRouterFor=function(c){var v=c;if(v instanceof sap.ui.core.mvc.Controller){v=v.getView()}if(v instanceof sap.ui.core.mvc.View){var o=sap.ui.core.Component.getOwnerIdFor(v),C=sap.ui.component(o);if(C){return C.getRouter()}else{return undefined}}};
sap.ui.core.UIComponent.prototype.getRouter=function(){return this._oRouter};
sap.ui.core.UIComponent.prototype.getAutoPrefixId=function(){return false};
sap.ui.core.UIComponent.prototype.byId=function(i){return sap.ui.getCore().byId(this.createId(i))};
sap.ui.core.UIComponent.prototype.createId=function(i){if(!this.isPrefixedId(i)){i=this.getId()+"---"+i}return i};
sap.ui.core.UIComponent.prototype.isPrefixedId=function(i){return(i&&i.indexOf(this.getId()+"---")===0)};
sap.ui.core.UIComponent.prototype.createContent=function(){var r=this.getMetadata().getRootView();if(r){return sap.ui.view(r)}return null};
sap.ui.core.UIComponent.prototype.render=function(r){var c=this.getAggregation("rootControl");if(c&&r){r.renderControl(c)}};
sap.ui.core.UIComponent.prototype.getUIArea=function(){return(this.oContainer?this.oContainer.getUIArea():null)};
sap.ui.core.UIComponent.prototype.setContainer=function(c){this.oContainer=c;return this};
sap.ui.core.UIComponent.prototype.onBeforeRendering=function(){};
sap.ui.core.UIComponent.prototype.onAfterRendering=function(){};
