/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides TablePersoDialog
jQuery.sap.declare("sap.m.TablePersoDialog");
jQuery.sap.require("sap.ui.base.ManagedObject");
jQuery.sap.require("sap.m.InputListItem");
jQuery.sap.require("sap.m.Switch");
jQuery.sap.require("sap.m.SwitchType");
jQuery.sap.require("sap.m.Dialog");
jQuery.sap.require("sap.m.List");
jQuery.sap.require("sap.m.Bar");
jQuery.sap.require("sap.m.Button");


/**
 * The TablePersoDialog can be used to display and allow modification of personalization settings relating to a Table
 *
 * @param {string}
 *			[sId] optional id for the new control; generated automatically if
 *			no non-empty id is given Note: this can be omitted, no matter
 *			whether <code>mSettings</code> will be given or not!
 * @param {object}
 *			[mSettings] optional map/JSON-object with initial settings for the
 *			new component instance
 * @public
 *
 * @class Table Personalization Dialog
 * @extends sap.ui.base.ManagedObject
 * @author SAP
 * @version 1.16.8-SNAPSHOT
 * @name sap.m.TablePersoDialog
 * @experimental Since 1.15. API is not yet finished and might change completely.
 */
sap.ui.base.ManagedObject.extend("sap.m.TablePersoDialog", /** @lends sap.m.TablePersoDialog */

{
	constructor : function(sId, mSettings) {

		sap.ui.base.ManagedObject.apply(this, arguments);

	},

	metadata : {
		properties: {
			"contentWidth": {type: "sap.ui.core/CSSSize"}
		},
		associations: {
			"persoDialogFor": sap.m.Table
		},
		events: {
			confirm: {},
			cancel: {}
		},
		library: "sap.m"
	}

});


/**
 * Initializes the TablePersoDialog instance after creation.
 *
 * @function
 * @name sap.m.TablePeroDialog.prototype.init
 * @protected
 */
sap.m.TablePersoDialog.prototype.init = function() {
	jQuery.sap.log.debug("TablePersoDialog init()");
	var that = this;

	// Resource bundle, for texts
	this._oRb = sap.ui.getCore().getLibraryResourceBundle("sap.m");

	// To store the column settings
	this._oP13nModel = new sap.ui.model.json.JSONModel();

	// Template for list inside the dialog - 1 item per column
	this._columnItemTemplate = new sap.m.InputListItem({
		label: "{Personalization>text}",
		content: new sap.m.Switch({
			state: "{Personalization>visible}",
			customTextOn: " ",
			customTextOff: " "
		})
	}).addStyleClass("sapMPersoDialog");

	this._oDialog = new sap.m.Dialog({
		title : this._oRb.getText("PERSODIALOG_COLUMNS_TITLE"),
		stretch: jQuery.device.is.phone,
		content : new sap.m.List({
			includeItemInSelection: true,
			mode: sap.m.ListMode.SingleSelectMaster
		}),
		subHeader : new sap.m.Bar({
			contentLeft: [
				new sap.m.Button({
					icon: "sap-icon://arrow-top",
					press: function(oEvent) {
						that._moveItem(-1);
				}
				}),
				new sap.m.Button({
					icon: "sap-icon://arrow-bottom",
					press: function(oEvent) {
						that._moveItem(1);
					}
				})
			],
			contentRight: new sap.m.Button({
				icon: "sap-icon://refresh",
				press : function () {
					that._resetAll();
				}
			})
		}),
		leftButton : new sap.m.Button({
			text : this._oRb.getText("PERSODIALOG_OK"),
			press : function () {
				this.getParent().close();
				that.fireConfirm();
			}
		}),
		rightButton : new sap.m.Button({
			text: this._oRb.getText("PERSODIALOG_CANCEL"),
			press: function () {
				that._readCurrentSettingsFromTable();
				this.getParent().close();
				that.fireCancel();
			}
		})
	});

};

/**
 * Returns the personalizations made. Currently supports
 * a 'columns' property which holds an array of settings,
 * one element per column in the associated table. The element
 * contains column-specific information as follows: id: column id;
 * order: new order; text: the column's header text that was displayed
 * in the dialog; visible: visibility (true or false).
 *
 * @return object personalizationData
 * @public
 */
sap.m.TablePersoDialog.prototype.retrievePersonalizations = function () {
	return this._oP13nModel.getData();
};

/**
 * Sets the content of the dialog, being list items representing
 * the associated table's column settings, and opens the dialog
 * @public
 */
sap.m.TablePersoDialog.prototype.open = function () {

	// The only control in the Dialog's content aggregation is a List
	var oList = this._oDialog.getContent()[0];

	// Get the associated Table's column info and set it into the Personalization model
	this._readCurrentSettingsFromTable();

	// Also save initial state in model in case of Reset All
	this._oInitialState = JSON.stringify(this._oP13nModel.getData().aColumns);

	this._oDialog.setModel(this._oP13nModel, "Personalization");
	oList.bindAggregation("items", "Personalization>/aColumns", this._columnItemTemplate);

	// Now show the dialog
	this._oDialog.open();
};

/**
 * Reflectors for the internal Dialog's contentWidth property
 * @public
 */
sap.m.TablePersoDialog.prototype.getContentWidth = function() {
	return this._oDialog.getContentWidth();
};

sap.m.TablePersoDialog.prototype.setContentWidth = function(sWidth) {
	this._oDialog.setContentWidth(sWidth);
	return this;
};

/* =========================================================== */
/*           begin: internal methods                           */
/* =========================================================== */

/**
* Turn column visibility and order back to initial state
* when dialog was opened
* @private
*/
sap.m.TablePersoDialog.prototype._resetAll = function () {

	var oData = this._oP13nModel.getData();
	oData.aColumns = JSON.parse(this._oInitialState);
	this._oP13nModel.setData(oData);

};

/**
 * Returns table column settings (header text, order, visibility) for a table
 * @private
 * @param {object} oTable the table for which column settings should be returned
 */
sap.m.TablePersoDialog.prototype._tableColumnInfo = function (oTable) {
	var aColumns = oTable.getColumns();
	var aColumnInfo = [];
	for (var c = 0, cl = aColumns.length; c < cl; c++) {
		var oColumn = aColumns[c];
		aColumnInfo.push({
			text : oColumn.getHeader().getText(),
			order : oColumn.getOrder(),
			visible : oColumn.getVisible(),
			id: oColumn.getId()
		});
	}

	// Sort to make sure they're presented in the right order
	aColumnInfo.sort(function(a, b) { return a.order - b.order; });

	return aColumnInfo;
};

/**
 * Moves an item up or down, swapping it with the neighbour.
 * Does this in the bound model.
 * @private
 * @param {int} iDirection the move direction (-1 up, 1 down)
 */
sap.m.TablePersoDialog.prototype._moveItem = function (iDirection) {

	var oList = this._oDialog.getContent()[0];
	var oModel = this._oP13nModel;

	// Abort if nothing selected
	var oSelectedItem = oList.getSelectedItem();
	if (! oSelectedItem) return;

	// The items themselves
	var data = oModel.getData();

	// Get array index of selected item
	var item = oSelectedItem.getBindingContext("Personalization").getPath().split("/").pop() * 1;

	// Get array index of item to swap with
	var swap = item + iDirection;

	// Abort if out of bounds
	if ( swap < 0 || swap >= data.aColumns.length ) return;

	// Do the swap
	var temp = data.aColumns[swap];
	data.aColumns[swap] = data.aColumns[item];
	data.aColumns[item] = temp;

	// Remove selection before binding
	oList.removeSelections(true);

	// Re-set the data in the model
	oModel.setData(data);

	// Switch the selected item
	oList.setSelectedItem(oList.getItems()[swap], true);

};

/**
 * Reads current column settings from the table and stores in the model
 * @private
 */
sap.m.TablePersoDialog.prototype._readCurrentSettingsFromTable = function() {
	var oTable = sap.ui.getCore().byId(this.getPersoDialogFor());
	this._oP13nModel.setData({ aColumns : this._tableColumnInfo(oTable) });
};

