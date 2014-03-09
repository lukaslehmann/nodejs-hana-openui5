/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides TablePersoController
jQuery.sap.declare("sap.m.TablePersoController");
jQuery.sap.require("sap.ui.base.ManagedObject");
jQuery.sap.require("sap.m.TablePersoDialog");


/**
 * The TablePersoController can be used to connect a table that you want to provide
 * a personalization dialog for, with a persistence service such as one provided by
 * the unified shell.
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
 * @class Table Personalization Controller
 * @extends sap.ui.base.ManagedObject
 * @author SAP
 * @version 1.16.8-SNAPSHOT
 * @name sap.m.TablePersoController
 * @experimental Since 1.15. API is not yet finished and might change completely.
 */
sap.ui.base.ManagedObject.extend("sap.m.TablePersoController", /** @lends sap.m.TablePersoController */

{
	constructor: function(sId, mSettings) {

		sap.ui.base.ManagedObject.apply(this, arguments);

	},

	metadata: {
		properties: {
			"contentWidth": {type: "sap.ui.core/CSSSize"}
		},
		aggregations: {
			"_tablePersoDialog": {
				type: "sap.m.TablePersoDialog",
				multiple: false,
				visibility: "hidden"
			},
			"persoService": {
				type: "Object",
				multiple: false
			}
		},
		associations: {
			"table": {
				type: "sap.m.Table",
				multiple: false
			}
		},
		events: {
			personalizationsDone: {}
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
sap.m.TablePersoController.prototype.init = function() {

	// Table Personalization schema
	this._schemaProperty = "_persoSchemaVersion";
	this._schemaVersion = "1.0";

	// To store the intermediate personalization data
	this._oPersonalizations = null;

};

/**
 * Activates the controller, i.e. tries to retrieve existing persisted
 * personalizations, creates a TablePersoDialog for the associated
 * table and attaches a close handler to apply the personalizations to
 * the table and persist them.
 * @public
 */
sap.m.TablePersoController.prototype.activate = function() {

	// Instantiate persistence service
	this._oPersService = this.getPersoService();

	// Try to retrieve existing persisted personalizations
	// and adjust the table
	this.applyPersonalizations();

	// Create a new TablePersoDialog control for the associated table
	var oTablePersoDialog = new sap.m.TablePersoDialog({
		persoDialogFor: sap.ui.getCore().byId(this.getAssociation("table"))
	});

	// Link to this new TablePersoDialog via the aggregation
	this.setAggregation("_tablePersoDialog", oTablePersoDialog);

	// When the TablePersoDialog closes, we want to retrieve the personalizations
	// made, amend the table, and also persist them
	oTablePersoDialog.attachConfirm(jQuery.proxy(function() {
		this._oPersonalizations = oTablePersoDialog.retrievePersonalizations();
		this._personalizeTable();
		this.savePersonalizations();
		this.firePersonalizationsDone();
	}, this));

	return this;

};



/**
 * Applies the personalizations by getting the existing personalizations
 * and adjusting to the table.
 *
 * @public
 */
sap.m.TablePersoController.prototype.applyPersonalizations = function() {
	var oReadPromise = this._oPersService.getPersData();
	var that = this;
	oReadPromise.done(function(oPersData) {
		that._adjustTable(oPersData);
	});
	oReadPromise.fail(function() {
		jQuery.sap.log.error("Problem reading persisted personalization data.");
	});
};



/**
 * Adjusts the table by getting the existing personalizations
 * and applying them to the table.
 *
 * @private
 */
sap.m.TablePersoController.prototype._adjustTable = function(oData) {
	if (oData && oData.hasOwnProperty(this._schemaProperty) && oData[this._schemaProperty] === this._schemaVersion) {
		this._oPersonalizations = oData;
		this._personalizeTable();
	}
};


/**
 * Personalizes the table, i.e. sets column order and visibility
 * according to the stored personalization settings
 *
 * @private
 */
sap.m.TablePersoController.prototype._personalizeTable = function() {
	var oTable = sap.ui.getCore().byId(this.getAssociation("table"));
	// unused:  var aColumns = oTable.getColumns();

	// Set order and visibility
	for ( var c = 0, cl = this._oPersonalizations.aColumns.length; c < cl; c++) {
		var oNewSetting = this._oPersonalizations.aColumns[c];
		var oTableColumn = sap.ui.getCore().byId(oNewSetting.id);
		if (oTableColumn) {
			oTableColumn.setVisible(oNewSetting.visible);
			oTableColumn.setOrder(c);
		}
	}

	// Force re-rendering of Table for column reorder
	oTable.invalidate();

};


/**
 * Persist the personalizations
 *
 * @public
 */
sap.m.TablePersoController.prototype.savePersonalizations = function() {

	var oBundle = this._oPersonalizations;

	// Add schema version to bundle
	oBundle[this._schemaProperty] = this._schemaVersion;

	// Commit to backend service
	var oWritePromise = this._oPersService.setPersData(oBundle);
	oWritePromise.done(function() {
		// all OK
	});
	oWritePromise.fail(function() {
		jQuery.sap.log.error("Problem persisting personalization data.");
	});

};


/**
 * Opens the TablePersoDialog, stores the personalized settings on close,
 * modifies the table columns, and sends them to the persistence service
 *
 * @public
 */
sap.m.TablePersoController.prototype.openDialog = function() {
	var oTablePersoDialog = this.getAggregation("_tablePersoDialog");
	oTablePersoDialog.open();
};

/**
 * Reflectors for the TablePersoDialog's Dialog's contentWidth property
 * @public
 */
sap.m.TablePersoController.prototype.getContentWidth = function() {
	return this.getAggregation("_tablePersoDialog").getContentWidth();
};

sap.m.TablePersoController.prototype.setContentWidth = function(sWidth) {
	this.getAggregation("_tablePersoDialog").setContentWidth(sWidth);
	return this;
};

