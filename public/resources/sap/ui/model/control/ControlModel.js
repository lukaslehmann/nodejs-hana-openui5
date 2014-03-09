/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.control.ControlModel");jQuery.sap.require("sap.ui.model.Model");jQuery.sap.require("sap.ui.model.control.ControlPropertyBinding");sap.ui.model.Model.extend("sap.ui.model.control.ControlModel",{constructor:function(c){sap.ui.model.Model.apply(this,arguments);this.oControl=c;this.oControl.attachEvent("_change",this.checkUpdate,this);this.oElements=[]}});
sap.ui.model.control.ControlModel.prototype.destroy=function(){this.oControl.detachEvent("_change",this.checkUpdate,this)};
sap.ui.model.control.ControlModel.prototype.addFacadeComponent=function(e){var i=jQuery.inArray(e,this.oElements);if(i<0){this.oElements.push(e);e.attachEvent("_change",this.checkUpdate,this)}};
sap.ui.model.control.ControlModel.prototype.removeFacadeComponent=function(e){var i=jQuery.inArray(e,this.oElements);if(i>=0){this.oElements.splice(i,1);e.detachEvent("_change",this.checkUpdate,this)}};
sap.ui.model.control.ControlModel.prototype.bindProperty=function(p,c){c=c||this.oControl;if(c!==this.oControl){this.addFacadeComponent(c)}return new sap.ui.model.control.ControlPropertyBinding(this,p,c)};
sap.ui.model.control.ControlModel.prototype.checkUpdate=function(e){if(this._onchange){this._onchange(e)}if(this.aBindings.length){var b=this.aBindings.slice(0);jQuery.each(b,function(i,B){B.checkUpdate()})}};
