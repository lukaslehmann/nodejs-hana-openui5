/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.TablePersoController");jQuery.sap.require("sap.ui.base.ManagedObject");jQuery.sap.require("sap.m.TablePersoDialog");sap.ui.base.ManagedObject.extend("sap.m.TablePersoController",{constructor:function(i,s){sap.ui.base.ManagedObject.apply(this,arguments)},metadata:{properties:{"contentWidth":{type:"sap.ui.core/CSSSize"}},aggregations:{"_tablePersoDialog":{type:"sap.m.TablePersoDialog",multiple:false,visibility:"hidden"},"persoService":{type:"Object",multiple:false}},associations:{"table":{type:"sap.m.Table",multiple:false}},events:{personalizationsDone:{}},library:"sap.m"}});
sap.m.TablePersoController.prototype.init=function(){this._schemaProperty="_persoSchemaVersion";this._schemaVersion="1.0";this._oPersonalizations=null};
sap.m.TablePersoController.prototype.activate=function(){this._oPersService=this.getPersoService();this.applyPersonalizations();var t=new sap.m.TablePersoDialog({persoDialogFor:sap.ui.getCore().byId(this.getAssociation("table"))});this.setAggregation("_tablePersoDialog",t);t.attachConfirm(jQuery.proxy(function(){this._oPersonalizations=t.retrievePersonalizations();this._personalizeTable();this.savePersonalizations();this.firePersonalizationsDone()},this));return this};
sap.m.TablePersoController.prototype.applyPersonalizations=function(){var r=this._oPersService.getPersData();var t=this;r.done(function(p){t._adjustTable(p)});r.fail(function(){jQuery.sap.log.error("Problem reading persisted personalization data.")})};
sap.m.TablePersoController.prototype._adjustTable=function(d){if(d&&d.hasOwnProperty(this._schemaProperty)&&d[this._schemaProperty]===this._schemaVersion){this._oPersonalizations=d;this._personalizeTable()}};
sap.m.TablePersoController.prototype._personalizeTable=function(){var t=sap.ui.getCore().byId(this.getAssociation("table"));for(var c=0,a=this._oPersonalizations.aColumns.length;c<a;c++){var n=this._oPersonalizations.aColumns[c];var T=sap.ui.getCore().byId(n.id);if(T){T.setVisible(n.visible);T.setOrder(c)}}t.invalidate()};
sap.m.TablePersoController.prototype.savePersonalizations=function(){var b=this._oPersonalizations;b[this._schemaProperty]=this._schemaVersion;var w=this._oPersService.setPersData(b);w.done(function(){});w.fail(function(){jQuery.sap.log.error("Problem persisting personalization data.")})};
sap.m.TablePersoController.prototype.openDialog=function(){var t=this.getAggregation("_tablePersoDialog");t.open()};
sap.m.TablePersoController.prototype.getContentWidth=function(){return this.getAggregation("_tablePersoDialog").getContentWidth()};
sap.m.TablePersoController.prototype.setContentWidth=function(w){this.getAggregation("_tablePersoDialog").setContentWidth(w);return this};
