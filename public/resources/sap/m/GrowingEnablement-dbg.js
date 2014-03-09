/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.m.GrowingEnablement
jQuery.sap.declare("sap.m.GrowingEnablement");
jQuery.sap.require("sap.ui.base.Object");

sap.ui.base.Object.extend("sap.m.GrowingEnablement", {

	/**
	 * Creates a GrowingEnablement delegate that can be attached to ListBase Controls requiring capabilities for growing
	 *
	 * @extends sap.ui.base.Object
	 * @name sap.m.GrowingEnablement
	 * @experimental Since 1.16. This class is experimental and provides only limited functionality. Also the API might be changed in future.
	 *
	 * @param {sap.m.ListBase} oControl the ListBase control of which this Growing is the delegate
	 *
	 * @constructor
	 * @protected
	 */
	constructor : function(oControl) {
		sap.ui.base.Object.apply(this);
		this._oControl = oControl;
		this._oControl.bUseExtendedChangeDetection = true;
		this._oControl.addDelegate(this);

		/* init growing list */
		var iRenderedItemsLength = this._oControl.getItems().length;
		this._iRenderedDataItems = iRenderedItemsLength;
		this._iItemCount = iRenderedItemsLength;
		this._bLastAsyncCheck = false;
		this._bRebuilding = false;
		this._fnRebuildQ = null;
		this._bLoading = false;
	},

	/**
	 * Destroys this GrowingEnablement delegate.
	 * This function must be called by the control which uses this delegate in the <code>exit</code> function.
	 */
	destroy : function() {
		if (this._oBusyIndicator) {
			this._oBusyIndicator.destroy();
			delete this._oBusyIndicator;
		}
		if (this._oTrigger) {
			this._oTrigger.destroy();
			delete this._oTrigger;
		}
		if (this._oLoading) {
			this._oLoading.destroy();
			delete this._oLoading;
		}
		if (this._oScrollDelegate) {
			this._oScrollDelegate.setGrowingList(null);
			this._oScrollDelegate = null;
		}

		jQuery(this._oControl.getId() + "-triggerList").remove();
		this._oControl.bUseExtendedChangeDetection = false;
		this._oControl.removeDelegate(this);
		this._bLoading = false;
		this._oControl = null;
	},

	/**
	 * Renders loading indicator or load more trigger
	 */
	render : function(rm) {
		rm.write("<ul id='" + this._oControl.getId() + "-triggerList'");

		if (this._oControl.getGrowingScrollToLoad()) {
			rm.addStyle("display", "none");
			rm.writeStyles();
		}

		// no header or footer no div
		rm.addClass("sapMListUl");
		rm.addClass("sapMGrowingList");
		if (this._oControl.setBackgroundDesign) {
			rm.addClass("sapMListBG" + this._oControl.getBackgroundDesign());
		}
		if (this._oControl.getInset()) {
			rm.addClass("sapMListInset");
		}
		rm.writeClasses();
		rm.write(">");

		var oActionItem;
		if (this._oControl.getGrowingScrollToLoad()) {
			oActionItem = this._getLoading(this._oControl.getId() + "-loading");
		} else {
			oActionItem = this._getTrigger(this._oControl.getId() + "-trigger");
		}

		// this variable is needed to render loading indicator in list even in table mode
		oActionItem._renderInList = true;
		rm.renderControl(oActionItem);
		rm.write("</ul>");
	},

	/**
	 * Called after rendering phase of the given control
	 */
	onAfterRendering : function() {
		if (this._oControl.getGrowingScrollToLoad()) {
			var oScrollDelegate = sap.m.getScrollDelegate(this._oControl);
			if (oScrollDelegate) {
				this._oScrollDelegate = oScrollDelegate;
				oScrollDelegate.setGrowingList(this._oControl, jQuery.proxy(this._triggerLoadingByScroll, this));
			}
		}
		this._updateTrigger();
	},

	setTriggerText : function(sText) {
		if (this._oTrigger) {
			this._oTrigger.$().find(".sapMSLITitle").text(sText);
		}
	},

	// call to reset paging
	reset : function() {
		this._iItemCount = 0;
	},

	// get actual and total info
	getInfo : function() {
		return {
			total : this._oControl.getMaxItemsCount(),
			actual : this._iRenderedDataItems
		};
	},

	// call to request new page
	requestNewPage : function() {
		// if max item count not reached
		if (this._oControl && !this._bLoading && this._iItemCount < this._oControl.getMaxItemsCount()) {
			this._showIndicator();
			jQuery.sap.delayedCall(0, this, function() {
				if (this._oControl) {	// maybe control is already destroyed
					this._iItemCount += this._oControl.getGrowingThreshold();
					this.updateItems("Growing");
				}
			});
		}
	},

	// called before new page loaded
	_onBeforePageLoaded : function(sChangeReason) {
		this._bLoading = true;
		this._oControl.onBeforePageLoaded(this.getInfo(), sChangeReason);
	},

	// called after new page loaded
	_onAfterPageLoaded : function(sChangeReason) {
		this._hideIndicator();
		this._updateTrigger();
		this._bLoading = false;
		this._oControl.onAfterPageLoaded(this.getInfo(), sChangeReason);
	},

	_renderItemIntoContainer : function(oItem, bDoNotPreserve, vInsert) {
		var oDomRef = this._oControl.getItemsContainerDomRef();
		if (oDomRef) {
			var rm = sap.ui.getCore().createRenderManager();
			rm.renderControl(oItem);
			rm.flush(oDomRef, bDoNotPreserve, vInsert);
			rm.destroy();
		}
	},

	_getBusyIndicator : function() {
		return this._oBusyIndicator || (this._oBusyIndicator = new sap.m.BusyIndicator({
			size : "2.0em"
		}));
	},

	/**
	 * returns loading indicator
	 */
	_getLoading : function(sId) {
		var that = this;
		return this._oLoading || (this._oLoading = new sap.m.CustomListItem({
			id : sId,
			content : new sap.ui.core.HTML({
				content :	"<div class='sapMSLIDiv sapMGrowingListLoading'>" +
								"<div class='sapMGrowingListBusyIndicator' id='" + sId + "-busyIndicator'></div>" +
							"</div>",
				afterRendering : function(e) {
					var oBusyIndicator = that._getBusyIndicator();
					var rm = sap.ui.getCore().createRenderManager();
					rm.render(oBusyIndicator, this.getDomRef().firstChild);
					rm.destroy();
				}
			})
		}).setParent(this._oControl, null, true));
	},

	/**
	 * returns load more trigger
	 */
	_getTrigger : function(sId) {
		var that = this;

		var sTriggerText = sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LOAD_MORE_DATA");
		if (this._oControl.getGrowingTriggerText()) {
			sTriggerText = this._oControl.getGrowingTriggerText();
		}

		this._oControl.addNavSection(sId);

		return this._oTrigger || (this._oTrigger = new sap.m.CustomListItem({
			id : sId,
			content : new sap.ui.core.HTML({
				content :	"<div class='sapMGrowingListTrigger'>" +
								"<div class='sapMGrowingListBusyIndicator' id='" + sId + "-busyIndicator'></div>" +
								"<div class='sapMSLITitleDiv sapMGrowingListTitel'>" +
									"<h1 class='sapMSLITitle'>" + jQuery.sap.encodeHTML(sTriggerText) + "</h1>" +
								"</div>" +
								"<div class='sapMGrowingListDescription'>" +
									"<div class='sapMSLIDescription' id='" + sId + "-itemInfo'>" + that._getListItemInfo() + "</div>" +
								"</div>" +
							"</div>",
				afterRendering : function(e) {
					var oBusyIndicator = that._getBusyIndicator();
					var rm = sap.ui.getCore().createRenderManager();
					rm.render(oBusyIndicator, this.getDomRef().firstChild);
					rm.destroy();
				}
			}),
			type : sap.m.ListType.Active
		}).setParent(this._oControl, null, true).attachPress(this.requestNewPage, this).addEventDelegate({
			onsapspace : this.requestNewPage
		}, this));
	},

	/**
	 * Returns the information about the list items.
	 * -> how many items are displayed
	 * -> maximum items to be displayed
	 */
	_getListItemInfo : function() {
		return ("[ " + this._iRenderedDataItems + " / " + this._oControl.getMaxItemsCount() + " ]");
	},

	/**
	 * Only call when grouped
	 */
	_getGroupForContext : function(oContext) {
		var oNewGroup = this._oControl.getBinding("items").aSorters[0].fnGroup(oContext);
		if (typeof oNewGroup == "string") {
			oNewGroup = {
				key: oNewGroup
			};
		}
		return oNewGroup;
	},

	/**
	 * If table has pop-in then we have two rows for one item
	 * So this method finds the correct DOM position to insert item
	 */
	_getDomIndex : function(iIndex) {
		if (this._oControl.hasPopin && this._oControl.hasPopin()) {
			var aItems = this._oControl.getItems();
			aItems.slice(0, iIndex).forEach(function(oItem) {
				if (oItem.hasPopin()) {
					iIndex++;
				}
			});
		}
		return iIndex;
	},

	/**
	 * function is called to destroy all items in list
	 */
	destroyListItems : function() {
		this._oControl.destroyAggregation("items");
		this._iRenderedDataItems = 0;
	},

	/**
	 * function is called to add single list item or row
	 */
	addListItem : function(oItem, bSuppressInvalidate) {
		this._iRenderedDataItems++;

		// Grouping support
		var oBinding = this._oControl.getBinding("items"),
			oBindingInfo = this._oControl.getBindingInfo("items");

		if (oBinding.isGrouped() && oBindingInfo) {
			var bNewGroup = false,
				aItems = this._oControl.getItems(),
				sModelName = oBindingInfo.model || undefined,
				oNewGroup = this._getGroupForContext(oItem.getBindingContext(sModelName));

			if (aItems.length == 0) {
				bNewGroup = true;
			} else if (oNewGroup.key !== this._getGroupForContext(aItems[aItems.length-1].getBindingContext(sModelName)).key) {
				bNewGroup = true;
			}

			if (bNewGroup) {
				var oGroupHeader = null;
				if (oBindingInfo.groupHeaderFactory) {
					oGroupHeader = oBindingInfo.groupHeaderFactory(oNewGroup);
				}
				this.addItemGroup(oNewGroup, oGroupHeader);
			}
		}

		this._oControl.addAggregation("items", oItem, bSuppressInvalidate);
		if (bSuppressInvalidate) {
			this._renderItemIntoContainer(oItem, false, true);
		}
		return this;
	},

	/**
	 * function is called to add multiple items
	 */
	addListItems : function(aContexts, oBindingInfo, bSuppressInvalidate) {
		if (oBindingInfo && aContexts) {
			for (var i = 0, l = aContexts.length; i < l; i++) {
				var oClone = oBindingInfo.factory("", aContexts[i]);
				oClone.setBindingContext(aContexts[i], oBindingInfo.model);
				this.addListItem(oClone, bSuppressInvalidate);
			}
		}
	},

	/**
	 * destroy all list items and then insert
	 * this function take care async calls during the insertion
	 */
	rebuildListItems : function(aContexts, oBindingInfo, bSuppressInvalidate) {
		// check if building already started
		if (this._bRebuilding) {
			this._fnRebuildQ = jQuery.proxy(this, "rebuildListItems", aContexts, oBindingInfo, bSuppressInvalidate);
			return;
		}

		// rebuild list items
		this._bRebuilding = true;
		this.destroyListItems();
		this.addListItems(aContexts, oBindingInfo, bSuppressInvalidate);
		this._bRebuilding = false;

		// check if something is in the queue
		if (this._fnRebuildQ) {
			var fnRebuildQ = this._fnRebuildQ;
			this._fnRebuildQ = null;
			fnRebuildQ();
		}
	},

	/**
	 * adds a new GroupHeaderListItem
	 */
	addItemGroup : function(oGroup, oHeader) {
		oHeader = this._oControl.addItemGroup(oGroup, oHeader, true);
		this._renderItemIntoContainer(oHeader, false, true);
		return this;
	},

	/**
	 * function is called to insert single list item or row.
	 */
	insertListItem : function(oItem, iIndex) {
		// TODO: should be a better way to set private variables
		this._oControl.insertAggregation("items", oItem, iIndex, true);
		this._iRenderedDataItems++;
		this._renderItemIntoContainer(oItem, false, this._getDomIndex(iIndex));
		return this;
	},

	/**
	 * function is called to remove single list item or row
	 */
	deleteListItem : function(oItem) {
		this._iRenderedDataItems--;
		this._oControl.removeAggregation("items", oItem, true);
		oItem.destroy();
		return this;
	},

	/**
	 * update loaded items ... 2nd time called from oData model.
	 */
	updateItems : function(sChangeReason) {
		// TODO: this is very fragile we should not distinguish bindings
		// but this is the best option for now to handle loading animations
		// make an update after core team handles asynchronous nature of different models
		var oUiModel = sap.ui.model,
			oBindingInfo = this._oControl.getBindingInfo("items"),
			oBinding = oBindingInfo.binding,
			fnFactory = oBindingInfo.factory,
			fnODataListBinding = oUiModel && oUiModel.odata && oUiModel.odata.ODataListBinding,
			bODataListBinding = fnODataListBinding && oBinding instanceof fnODataListBinding;

		// set iItemCount to initial value if not set or filtered
		if (!this._iItemCount || sChangeReason == sap.ui.model.ChangeReason.Filter) {
			this._iItemCount = this._oControl.getGrowingThreshold();
		}

		// fire growing started event
		if (!bODataListBinding) {
			// JSON model fires event immediately
			this._onBeforePageLoaded(sChangeReason);
		} else if (!this._bLastAsyncCheck) {
			// oDataModel and first asynchronous check
			this._onBeforePageLoaded(sChangeReason);
		}

		var iLastItemCount = this._iItemCount - this._oControl.getGrowingThreshold();
		var aContexts = oBinding ? oBinding.getContexts(0, this._iItemCount) || [] : [];

		if (oBinding.isGrouped()) {
			// If binding is sorted or filtered we need to recreate the whole list
			if (sChangeReason && (sChangeReason == sap.ui.model.ChangeReason.Sort || sChangeReason == sap.ui.model.ChangeReason.Filter)) {
				this.destroyListItems();
				delete aContexts.diff;
			}

			var bFromScratch = true;
			if (aContexts.length > 0) {
				if (this._oControl.getDomRef()) {
					// check if model diff-array exists and execute
					if (aContexts.diff) {
						bFromScratch = false;
						var bFirstAddedItemChecked = false;
						for (var i = 0, l = aContexts.diff.length; i < l; i++) {
							if (aContexts.diff[i].type === "delete") {
								bFromScratch = true;
								break;
							}
							else if (aContexts.diff[i].type === "insert") {
								if (!bFirstAddedItemChecked && aContexts.diff[i].index !== this._iRenderedDataItems) {
									bFromScratch = true;
									break;
								}
								bFirstAddedItemChecked = true;
								var oClone = fnFactory("", aContexts[aContexts.diff[i].index]);
								oClone.setBindingContext(aContexts[aContexts.diff[i].index], oBindingInfo.model);
								this.addListItem(oClone, true);
							}
						}
					}
					if (bFromScratch) {
						// renderer available - fill the aggregation and render list items
						this.rebuildListItems(aContexts, oBindingInfo, false);
					}
				} else {
					// no renderer - fill only the aggregation
					this.rebuildListItems(aContexts, oBindingInfo, true);
				}
			} else {
				this.destroyListItems();
			}

		} else { // no grouping, stable implementation
			if (aContexts.length > 0) {
				if (this._oControl.getDomRef()) {
					// check if model diff-array exists and execute
					if (aContexts.diff) {
						var aItems, oClone;
						for (var i = 0, l = aContexts.diff.length; i < l; i++) {
							aItems = this._oControl.getItems();
							if (aContexts.diff[i].type === "delete") {
								this.deleteListItem(aItems[aContexts.diff[i].index]);
							}
							else if (aContexts.diff[i].type === "insert") {
								oClone = fnFactory("", aContexts[aContexts.diff[i].index]);
								oClone.setBindingContext(aContexts[aContexts.diff[i].index], oBindingInfo.model);
								this.insertListItem(oClone, aContexts.diff[i].index);
							}
						}
						// update context on all items after applying diff
						aItems = this._oControl.getItems();
						for (var i = 0, l = aContexts.length; i < l; i++) {
							aItems[i].setBindingContext(aContexts[i], oBindingInfo.model);
						}
					} else {
						// most likely a new binding is set in this case - therefore remove all items and fill again
						this.rebuildListItems(aContexts, oBindingInfo, false);
					}
				} else {
					// no renderer - fill only the aggregation
					this.rebuildListItems(aContexts, oBindingInfo, true);
				}
			} else {
				this.destroyListItems();
			}
		}

		// fire growing finished event
		if (!bODataListBinding) {
			// JSON model fires event immediately
			this._onAfterPageLoaded(sChangeReason);
		} else if (this._bLastAsyncCheck) {
			// oData model and last asynchronous  check
			this._onAfterPageLoaded(sChangeReason);
			this._bLastAsyncCheck = false;
		} else if (aContexts.length > iLastItemCount) {
			// oData model but maybe all data is already in context
			this._onAfterPageLoaded(sChangeReason);
		} else {
			// reverse the flag
			this._bLastAsyncCheck = true;
		}
	},

	/**
	 * hide or show loading trigger according to list item count.
	 */
	_updateTrigger : function() {
		if (this._oControl.getGrowingScrollToLoad()) {
			return;
		}

		// check trigger list DOM first
		var oTriggerListDomRef = document.getElementById(this._oControl.getId() + "-triggerList");
		if (!oTriggerListDomRef) {
			return;
		}

		// hide trigger if no items or maximum of items reached
		var iMaxItems = this._oControl.getMaxItemsCount();
		var iItemsLength = this._oControl.getItems().length;
		var sDisplay = (!iItemsLength || !this._iItemCount || this._iItemCount >= iMaxItems) ? "none" : "block";

		// if we are in the popover then hiding the trigger removes focus and closes popup
		sap.ui.Device.system.desktop && sDisplay == "none" && oTriggerListDomRef.contains(document.activeElement) && this._oControl.$().focus();

		// update trigger info
		oTriggerListDomRef.style.display = sDisplay;
		jQuery.sap.byId(this._oControl.getId() + "-trigger-itemInfo").text(this._getListItemInfo());
	},

	/**
	 * show loading indicator
	 */
	_showIndicator : function() {
		if (!this._oControl.getGrowingScrollToLoad()) {
			jQuery.sap.byId(this._oControl.getId() + "-trigger-busyIndicator").addClass("sapMGrowingListBusyIndicatorVisible");
		} else {
			var $trigger = jQuery.sap.byId(this._oControl.getId() + "-triggerList").css("display", "block");
			if (jQuery.support.touch && this._oScrollDelegate) {
				if (this._oScrollDelegate.getMaxScrollTop() - this._oScrollDelegate.getScrollTop() < $trigger.height()) {
					this._oScrollDelegate.refresh();
					this._oScrollDelegate.scrollTo(this._oScrollDelegate.getScrollLeft(), this._oScrollDelegate.getMaxScrollTop());
				}
			}
		}

		this._getBusyIndicator().setVisible(true);
	},

	/**
	 * hide loading indicator
	 */
	_hideIndicator : function() {
		jQuery.sap.delayedCall(0, this, function() {
			if (this._oControl) {	// maybe control is already destroyed
				var sId = this._oControl.getId();
				this._getBusyIndicator().setVisible(false);
				if (this._oControl.getGrowingScrollToLoad()) {
					jQuery.sap.byId(sId + "-triggerList").css("display", "none");
				} else {
					jQuery.sap.byId(sId + "-trigger-itemInfo").html(this._getListItemInfo());
					jQuery.sap.byId(sId + "-trigger-busyIndicator").removeClass("sapMGrowingListBusyIndicatorVisible");
				}
			}
		});
	},

	/**
	 * ScrollDelegate call this method to inform new page needs to load
	 */
	_triggerLoadingByScroll : function() {
		this.requestNewPage();
	}
});