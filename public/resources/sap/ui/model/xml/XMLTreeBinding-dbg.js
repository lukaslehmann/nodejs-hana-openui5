/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the XML model implementation of a list binding
jQuery.sap.declare("sap.ui.model.xml.XMLTreeBinding");
jQuery.sap.require("sap.ui.model.ClientTreeBinding");

/**
 *
 * @class
 * Tree binding implementation for XML format
 *
 * @param sPath
 * @param [oModel]
 * @name sap.ui.model.xml.XMLTreeBinding
 * @extends sap.ui.model.TreeBinding
 */
sap.ui.model.ClientTreeBinding.extend("sap.ui.model.xml.XMLTreeBinding");

/**
 * Return node contexts for the tree
 * @param {object} oContext to use for retrieving the node contexts
 * @return {Array} the contexts array
 * @protected
 */
sap.ui.model.xml.XMLTreeBinding.prototype.getNodeContexts = function(oContext) {
	var sContextPath = oContext.getPath();
	
	if (!jQuery.sap.endsWith(sContextPath,"/")) {
		sContextPath = sContextPath + "/";
	}
	if (!jQuery.sap.startsWith(sContextPath,"/")) {
		sContextPath = "/" + sContextPath;
	}

	var aContexts = [],
		mNodeIndices = {},
		that = this,
		oNode = this.oModel._getObject(oContext.getPath()),
		oChild, sChildPath, oChildContext;

	jQuery.each(oNode[0].childNodes, function(sName, oChild) {
		if (oChild.nodeType == 1) { // check if node is an element
			if (mNodeIndices[oChild.nodeName] == undefined){
				mNodeIndices[oChild.nodeName] = 0;
			} else {
				mNodeIndices[oChild.nodeName]++;
			}
			sChildPath = sContextPath + oChild.nodeName + "/" + mNodeIndices[oChild.nodeName];
			oChildContext = that.oModel.getContext(sChildPath);
			// check if there is a filter on this level applied
			if (that.aFilters && !that.bIsFiltering){
				if (jQuery.inArray(oChildContext, that.filterInfo.aFilteredContexts) != -1) {
					aContexts.push(oChildContext);
				}
			}else {
				aContexts.push(oChildContext);
			}
		}
	});

	return aContexts;
};