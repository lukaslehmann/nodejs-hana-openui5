/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.table.TreeTable.
jQuery.sap.declare("sap.ui.table.TreeTable");
jQuery.sap.require("sap.ui.table.library");
jQuery.sap.require("sap.ui.table.Table");


/**
 * Constructor for a new TreeTable.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getExpandFirstLevel expandFirstLevel} : boolean (default: false)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.ui.table.TreeTable#event:toggleOpenState toggleOpenState} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.table.Table#constructor sap.ui.table.Table}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The TreeTable Control.
 * @extends sap.ui.table.Table
 *
 * @author  
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor   
 * @public
 * @name sap.ui.table.TreeTable
 */
sap.ui.table.Table.extend("sap.ui.table.TreeTable", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"expand", "collapse", "isExpanded"
	],

	// ---- control specific ----
	library : "sap.ui.table",
	properties : {
		"expandFirstLevel" : {type : "boolean", group : "", defaultValue : false}
	},
	events : {
		"toggleOpenState" : {}
	}
}});


/**
 * Creates a new subclass of class sap.ui.table.TreeTable with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.table.TreeTable.extend
 * @function
 */

sap.ui.table.TreeTable.M_EVENTS = {'toggleOpenState':'toggleOpenState'};


/**
 * Getter for property <code>expandFirstLevel</code>.
 * Flag to enable or disable expanding of first level.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>expandFirstLevel</code>
 * @public
 * @name sap.ui.table.TreeTable#getExpandFirstLevel
 * @function
 */

/**
 * Setter for property <code>expandFirstLevel</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bExpandFirstLevel  new value for property <code>expandFirstLevel</code>
 * @return {sap.ui.table.TreeTable} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.TreeTable#setExpandFirstLevel
 * @function
 */


/**
 * fired when a node has been expanded or collapsed (only available in hierachical mode) 
 *
 * @name sap.ui.table.TreeTable#toggleOpenState
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {int} oControlEvent.getParameters.rowIndex index of the expanded/collapsed row
 * @param {object} oControlEvent.getParameters.rowContext binding context of the selected row
 * @param {boolean} oControlEvent.getParameters.expanded flag whether the node has been expanded or collapsed
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'toggleOpenState' event of this <code>sap.ui.table.TreeTable</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.ui.table.TreeTable</code>.<br/> itself. 
 *  
 * fired when a node has been expanded or collapsed (only available in hierachical mode) 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.ui.table.TreeTable</code>.<br/> itself.
 *
 * @return {sap.ui.table.TreeTable} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.TreeTable#attachToggleOpenState
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'toggleOpenState' event of this <code>sap.ui.table.TreeTable</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.ui.table.TreeTable} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.TreeTable#detachToggleOpenState
 * @function
 */

/**
 * Fire event toggleOpenState to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'rowIndex' of type <code>int</code> index of the expanded/collapsed row</li>
 * <li>'rowContext' of type <code>object</code> binding context of the selected row</li>
 * <li>'expanded' of type <code>boolean</code> flag whether the node has been expanded or collapsed</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.ui.table.TreeTable} <code>this</code> to allow method chaining
 * @protected
 * @name sap.ui.table.TreeTable#fireToggleOpenState
 * @function
 */


/**
 * expands the row for the given row index
 *
 * @name sap.ui.table.TreeTable.prototype.expand
 * @function
 * @param {int} 
 *         iRowIndex
 *         index of the row to expand

 * @type sap.ui.table.TreeTable
 * @public
 */


/**
 * collapses the row for the given row index
 *
 * @name sap.ui.table.TreeTable.prototype.collapse
 * @function
 * @param {int} 
 *         iRowIndex
 *         index of the row to collapse

 * @type sap.ui.table.TreeTable
 * @public
 */


/**
 * returns whether the row is expanded or collapsed
 *
 * @name sap.ui.table.TreeTable.prototype.isExpanded
 * @function
 * @param {int} 
 *         iRowIndex
 *         index of the row to check

 * @type boolean
 * @public
 */


// Start of sap\ui\table\TreeTable.js
/**
 * Initialization of the TreeTable control
 * @private
 */
sap.ui.table.TreeTable.prototype.init = function() {
	sap.ui.table.Table.prototype.init.apply(this, arguments);
	this._iLastFixedColIndex = 0;
};

/**
 * Rerendering handling
 * @private
 */
sap.ui.table.TreeTable.prototype.onAfterRendering = function() {
	sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
	this.$().find("[role=grid]").attr("role", "treegrid");
}

sap.ui.table.TreeTable.prototype.isTreeBinding = function(sName) {
	sName = sName || "rows";
	if (sName === "rows") {
		return true;
	}
	return sap.ui.core.Element.prototype.isTreeBinding.apply(this, sName);
};

sap.ui.table.TreeTable.prototype.getBinding = function(sName) {
	sName = sName || "rows";
	var oBinding = sap.ui.core.Element.prototype.getBinding.call(this, sName);
	// the check for the tree binding is only relevant becuase of the DataTable migration
	//  --> once the DataTable is deleted after the deprecation period this check can be deleted 
	if (oBinding && this.isTreeBinding(sName) && sName === "rows" && !oBinding.getLength) {
		// SIMULATE A LIST BINDING FOR THE TREE BINDING!
		//jQuery.sap.log.info("Enhancing Binding Object - Tree to List Binding");
		var that = this;
		jQuery.extend(oBinding, {
			_init: function(bExpandFirstLevel) {
				// load the root contexts and create the context info map
				this.mContextInfo = {};
				this._initContexts();
				// expand the first level if required
				if (bExpandFirstLevel) {
					var that = this;
					if (this.aContexts) {
						jQuery.each(this.aContexts.slice(), function(iIndex, oContext) {
							that._loadChildContexts(oContext);
							that._getContextInfo(oContext).bExpanded = true;
						});
					}
				}
			},
			_initContexts: function() {
				// load the root contexts and create the context info map entry (if missing)
				this.aContexts = this.getRootContexts();
				for (var i = 0, l = this.aContexts.length; i < l; i++) {
					var oldContextInfo = this._getContextInfo(this.aContexts[i]);
					this._setContextInfo({
						oContext: this.aContexts[i],
						iLevel: 0,
						bExpanded: oldContextInfo ? oldContextInfo.bExpanded : false,
						bHasChildren: this._hasChildContexts(this.aContexts[i])
					});
				}
			},
			_fnFireFilter: oBinding._fireFilter,
			_fireFilter: function() {
				this._fnFireFilter.apply(this, arguments);
				this._initContexts();
				this._restoreContexts(this.aContexts);
			},
			_fnFireChange: oBinding._fireChange,
			_fireChange: function() {
				this._fnFireChange.apply(this, arguments);
				this._initContexts();
				this._restoreContexts(this.aContexts);
			},
			_restoreContexts: function(aContexts) {
				var that = this;
				var aNewChildContexts = [];
				jQuery.each(aContexts.slice(), function(iIndex, oContext) {
					var oContextInfo = that._getContextInfo(oContext);
					if (oContextInfo && oContextInfo.bExpanded) {
						aNewChildContexts.push.apply(aNewChildContexts, that._loadChildContexts(oContext));
					}
				});
				if (aNewChildContexts.length > 0) {
					this._restoreContexts(aNewChildContexts);
				}
			},
			_loadChildContexts: function(oContext) {
				var oContextInfo = this._getContextInfo(oContext);
				var iIndex = jQuery.inArray(oContext, this.aContexts);
				var aNodeContexts = this.getNodeContexts(oContext);
				for (var i = 0, l = aNodeContexts.length; i < l; i++) {
					this.aContexts.splice(iIndex + i + 1, 0, aNodeContexts[i]);
					var oldContextInfo = this._getContextInfo(aNodeContexts[i]);
					this._setContextInfo({
						oParentContext: oContext,
						oContext: aNodeContexts[i],
						iLevel: oContextInfo.iLevel + 1,
						bExpanded: oldContextInfo ? oldContextInfo.bExpanded : false,
						bHasChildren: this._hasChildContexts(aNodeContexts[i])
					});
				}
				return aNodeContexts;
			},
			_hasChildContexts: function(oContext) {
				return this.getNodeContexts(oContext).length > 0;
			},
			_getContextInfo: function(oContext) {
				return oContext ? this.mContextInfo[oContext.getPath()] : undefined;
			},
			_setContextInfo: function(mData) {
				if (mData && mData.oContext) {
					this.mContextInfo[mData.oContext.getPath()] = mData;
				}
			},
			getLength: function() {
				return this.aContexts ? this.aContexts.length : 0;
			},
			getContexts: function(iStartIndex, iLength) {
				return this.aContexts.slice(iStartIndex, iStartIndex + iLength);
			},
			getLevel: function(oContext) {
				var oContextInfo = this._getContextInfo(oContext);
				return oContextInfo ? oContextInfo.iLevel : -1;
			},
			isExpanded: function(oContext) {
				var oContextInfo = this._getContextInfo(oContext);
				return oContextInfo ? oContextInfo.bExpanded : false;
			},
			hasChildren: function(oContext) {
				var oContextInfo = this._getContextInfo(oContext);
				return oContextInfo ? oContextInfo.bHasChildren : false;
			},
			expandContext: function(oContext) {
				var oContextInfo = this._getContextInfo(oContext);
				if (oContextInfo && !oContextInfo.bExpanded) {
					this.storeSelection();
					this._loadChildContexts(oContext);
					oContextInfo.bExpanded = true;
					this._fireChange();
					this.restoreSelection();
				}
			},
			collapseContext: function(oContext) {
				var oContextInfo = this._getContextInfo(oContext);
				if (oContextInfo && oContextInfo.bExpanded) {
					this.storeSelection();
					for (var i = this.aContexts.length - 1; i > 0; i--) {
						if (this._getContextInfo(this.aContexts[i]).oParentContext === oContext) {
							this.aContexts.splice(i, 1);
						}
					}
					oContextInfo.bExpanded = false;
					this._fireChange();
					this.restoreSelection();
				}
			},
			toggleContext: function(oContext) {
				var oContextInfo = this._getContextInfo(oContext);
				if (oContextInfo) {
					if (oContextInfo.bExpanded) {
						this.collapseContext(oContext);
					} else {
						this.expandContext(oContext);
					}
				}
			},
			storeSelection: function() {
				var aSelectedIndices = that.getSelectedIndices();
				var aSelectedContexts = [];
				jQuery.each(aSelectedIndices, function(iIndex, iValue) {
					aSelectedContexts.push(that.getContextByIndex(iValue));
				});
				this._aSelectedContexts = aSelectedContexts;
			},
			restoreSelection: function() {
				that.clearSelection();
				var _aSelectedContexts = this._aSelectedContexts;
				jQuery.each(this.aContexts, function(iIndex, oContext) {
					if (jQuery.inArray(oContext, _aSelectedContexts) >= 0) {
						that.addSelectionInterval(iIndex, iIndex);
					}
				});
				this._aSelectedContexts = undefined;
			},
			attachSort: function() {},
			detachSort: function() {}
		});
		// initialize the binding
		oBinding._init(this.getExpandFirstLevel());
	}
	return oBinding;
};

sap.ui.table.TreeTable.prototype._updateTableContent = function() {
	
	sap.ui.table.Table.prototype._updateTableContent.apply(this, arguments);
	
	var oBinding = this.getBinding("rows");
	if (oBinding && this.isTreeBinding("rows")) {
	
		var $this = this.$();
		var iFirstRow = this.getFirstVisibleRow();
		var iCount = this.getVisibleRowCount();
	
		for (var iRow = 0; iRow < iCount; iRow++) {
		
			var oContext = this.getContextByIndex(iFirstRow + iRow);
	
			var iLevel = oBinding.getLevel ? oBinding.getLevel(oContext) : 0;
			var $row = $this.find("[data-sap-ui-rowindex=" + iRow + "]");
			var $TreeIcon = $row.find(".sapUiTableTreeIcon");
			$TreeIcon.css("marginLeft", iLevel * 17);
			var sTreeIconClass = "sapUiTableTreeIconLeaf";
			if (oBinding.hasChildren && oBinding.hasChildren(oContext)) {
				sTreeIconClass = oBinding.isExpanded(oContext) ? "sapUiTableTreeIconNodeOpen" : "sapUiTableTreeIconNodeClosed";
				$row.attr('aria-expanded', oBinding.isExpanded(oContext));
			} else {
				$row.attr('aria-expanded', false);
			}
			$TreeIcon.removeClass("sapUiTableTreeIconLeaf sapUiTableTreeIconNodeOpen sapUiTableTreeIconNodeClosed").addClass(sTreeIconClass);
			$row.attr("data-sap-ui-level", iLevel);
			$row.attr('aria-level', iLevel + 1);
		
		}
	
	}
	
};

sap.ui.table.TreeTable.prototype.onclick = function(oEvent) {
	if (jQuery(oEvent.target).hasClass("sapUiTableTreeIcon")) {
		this._onNodeSelect(oEvent);
	} else {
		if (sap.ui.table.Table.prototype.onclick) {
			sap.ui.table.Table.prototype.onclick.apply(this, arguments);
		}
	}
};

sap.ui.table.TreeTable.prototype.onsapselect = function(oEvent) {
	if (jQuery(oEvent.target).hasClass("sapUiTableTreeIcon")) {
		this._onNodeSelect(oEvent);
	} else {
		if (sap.ui.table.Table.prototype.onsapselect) {
			sap.ui.table.Table.prototype.onsapselect.apply(this, arguments);
		}
	}
};

sap.ui.table.TreeTable.prototype._onNodeSelect = function(oEvent) {

	var $parent = jQuery(oEvent.target).parents("tr");
	if ($parent.length > 0) {
		var iRowIndex = this.getFirstVisibleRow() + parseInt($parent.attr("data-sap-ui-rowindex"), 10);
		var oContext = this.getContextByIndex(iRowIndex);
		this.fireToggleOpenState({
			rowIndex: iRowIndex,
			rowContext: oContext,
			expanded: !this.getBinding().isExpanded(oContext)
		});
		this.getBinding("rows").toggleContext(oContext);
	}

	oEvent.preventDefault();
	oEvent.stopPropagation();

};


sap.ui.table.TreeTable.prototype.expand = function(iRowIndex) {
	var oBinding = this.getBinding("rows");
	if (oBinding) {
		var oContext = this.getContextByIndex(iRowIndex);
		oBinding.expandContext(oContext);
	}
};

sap.ui.table.TreeTable.prototype.collapse = function(iRowIndex) {
	var oBinding = this.getBinding("rows");
	if (oBinding) {
		var oContext = this.getContextByIndex(iRowIndex);
		oBinding.collapseContext(oContext);
	}
};

sap.ui.table.TreeTable.prototype.isExpanded = function(iRowIndex) {
	var oBinding = this.getBinding("rows");
	if (oBinding) {
		var oContext = this.getContextByIndex(iRowIndex);
		return oBinding.isExpanded(oContext);
	}
	return false;
};

sap.ui.table.TreeTable.prototype._enterActionMode = function(oDomRef) {
	var $domRef = jQuery(oDomRef);
	
	sap.ui.table.Table.prototype._enterActionMode.apply(this, arguments);
	if (oDomRef && this._bActionMode && $domRef.hasClass("sapUiTableTreeIcon")) {
		//Set tabindex to 0 to have a visible forcus border for node icon
		$domRef.attr("tabindex", 0);
	}
}

sap.ui.table.TreeTable.prototype._leaveActionMode = function(oEvent) {
	sap.ui.table.Table.prototype._leaveActionMode.apply(this, arguments);
	this.$().find(".sapUiTableTreeIcon").attr("tabindex", -1);
}

