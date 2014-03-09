/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */



// Provides class sap.ui.model.odata.ODataMetadata
jQuery.sap.declare("sap.ui.model.odata.ODataMetadata");

/*global OData *///declare unusual global vars for JSLint/SAPUI5 validation

/**
 * Constructor for a new ODataMetadata.
 *
 * @param {object} oMetadata the parsed metadata object provided by datajs
 *
 * @class
 * Implementation to access oData metadata
 *
 * @author SAP AG
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor
 * @public
 * @name sap.ui.model.odata.ODataMetadata
 * @extends sap.ui.base.Object
 */
sap.ui.base.Object.extend("sap.ui.model.odata.ODataMetadata", /** @lends sap.ui.model.odata.ODataMetadata */ {

	constructor : function(oModel, bLoadMetadataAsync) {

		this.oModel = oModel;
		this.oMetadata = null;
		this._loadMetadata(oModel, bLoadMetadataAsync);
	},

	metadata : {
		publicMethods : ["getServiceMetadata"]
	}

});

/**
 * Loads the metadata for the service
 * @private
 */
sap.ui.model.odata.ODataMetadata.prototype._loadMetadata = function(oModel, bAsync) {

	var oRequest = oModel._createRequest("$metadata", null, bAsync);

	// request the metadata of the service
	var that = this;

	function _handleSuccess(oMetadata, oResponse) {
		that.oMetadata = oMetadata;
		
		if (!oModel.bUseBatch) {
			oModel.bUseBatch = that._getUseBatchExtensionValue();			
		}

		that.oModel.fireMetadataLoaded();

		// trigger loading of data if bindings are already there
		that.oModel.refresh();
	}

	function _handleError(oError) {
		that.oModel._handleError(oError);
	}

	// execute the request
	OData.read(oRequest, _handleSuccess, _handleError, OData.metadataHandler);

};

/**
 * Creates a new subclass of class sap.ui.model.odata.ODataMetadata with name <code>sClassName</code>
 * and enriches it with the information contained in <code>oClassInfo</code>.
 *
 * For a detailed description of <code>oClassInfo</code> or <code>FNMetaImpl</code>
 * see {@link sap.ui.base.Object.extend Object.extend}.
 *
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class
 * @param {function} [FNMetaImpl] alternative constructor for a metadata object
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.model.odata.ODataMetadata.extend
 * @function
 */

/**
 * Return the metadata object
 *
 * @return {Object} metdata object
 * @public
 */
sap.ui.model.odata.ODataMetadata.prototype.getServiceMetadata = function() {
	return this.oMetadata;
};


/**
 * Extract the entity type name of a given sPath. Also navigation properties in the path will be followed to get the right entity type for that property.
 * eg.
 * /Categories(1)/Products(1)/Category --> will get the Categories entity type
 * /Products --> will get the Products entity type
 * @return {object} the entity type or null if not found
 */
sap.ui.model.odata.ODataMetadata.prototype._getEntityTypeByPath = function(sPath) {
	if (!sPath) {
		jQuery.sap.assert(undefined, "sPath not defined!");
		return null;
	}
	if (!this.oMetadata || jQuery.isEmptyObject(this.oMetadata)) {
		jQuery.sap.assert(undefined, "No metadata loaded!");
		return null;
	}
	// remove starting and trailing /
	var sCandidate = sPath.replace(/^\/|\/$/g, ""),
		aParts = sCandidate.split("/"),
		iLength = aParts.length,
		aAssociationName,
		oAssociation,
		oParentEntityType,
		oEnd,
		aEntityTypeName,
		oEntityType,
		oResultEntityType,
		that = this;

	// remove key from first path segment if any (e.g. Products(555) --> Products)
	if (aParts[0].indexOf("(") != -1){
		aParts[0] = aParts[0].substring(0,aParts[0].indexOf("("));
	}

	if (iLength > 1 ) {
		// check if navigation property is used
		// e.g. Categories(1)/Products(1)/Category --> Category is a navigation property so we need the collection Categories

		oParentEntityType = that._getEntityTypeByPath(aParts[0]);

		for (var i = 1; i < aParts.length; i++ ){
			if (oParentEntityType) {
				// remove key from current part if any
				if (aParts[i].indexOf("(") != -1){
					aParts[i] = aParts[i].substring(0,aParts[i].indexOf("("));
				}
				// check for navigation properties
				// if no navigation property found we assume that the current part is a normal property so we return the current oParentEntityType
				// which is the parent entity type of that property
				if (oParentEntityType.navigationProperty) {
					oResultEntityType = that._getEntityTypeByNavProperty(oParentEntityType, aParts[i]);
					if (oResultEntityType) {
						oParentEntityType = oResultEntityType;
					}
				}

				oEntityType = oParentEntityType;

			}
		};
	} else {
		// if only one part exists it should be the name of the collection and we can get the entity type for it
		aEntityTypeName = this._splitName(this._getEntityTypeName(aParts[0]));
		oEntityType = this._getObjectMetadata("entityType", aEntityTypeName[0], aEntityTypeName[1]);
		if (oEntityType) {		
			// store the type name also in the oEntityType
			oEntityType.entityType = this._getEntityTypeName(aParts[0]);
		}
	}

	// check for function imports
	if (!oEntityType) {
		var sFuncCandName = aParts[aParts.length - 1]; // last segment is always a function import
		var oFuncType = this._getFunctionImportMetadata(sFuncCandName, "GET");
		if (oFuncType && oFuncType.entitySet) { // only collections supported which have an entitySet			
			oEntityType = this._getEntityTypeByPath(oFuncType.entitySet);
			if (oEntityType) {		
				// store the type name also in the oEntityType
				oEntityType.entityType = this._getEntityTypeName(oFuncType.entitySet);
			}			
		}
	}
	
	
	//jQuery.sap.assert(oEntityType, "EntityType for path " + sPath + " could not be found!");
	return oEntityType;
};


/**
 * splits a name e.g. Namespace.Name into [Name, Namespace]
 */
sap.ui.model.odata.ODataMetadata.prototype._splitName = function(sFullName) {
	var aParts = [];
	if (sFullName) {
		var iSepIdx = sFullName.lastIndexOf(".");
		aParts[0] = sFullName.substr(iSepIdx + 1);
		aParts[1] = sFullName.substr(0, iSepIdx);
	}
	return aParts;
};


/**
*  search metadata for specified collection name (= entity set name)
*/
sap.ui.model.odata.ODataMetadata.prototype._getEntityTypeName = function(sCollection) {
	var sEntityTypeName;
	if (sCollection) {
		jQuery.each(this.oMetadata.dataServices.schema, function(i, oSchema) {
			if (oSchema.entityContainer) {
				jQuery.each(oSchema.entityContainer, function(k, oEntityContainer) {
					jQuery.each(oEntityContainer.entitySet, function(j, oEntitySet) {
						if (oEntitySet.name === sCollection) {
							sEntityTypeName = oEntitySet.entityType;
							return false;
						}
					});
				});
			}
		});
	}
	//jQuery.sap.assert(sEntityTypeName, "EntityType name of EntitySet "+ sCollection + " not found!");
	return sEntityTypeName;
};

/**
 * get the object of a specified type name and namespace
 */
sap.ui.model.odata.ODataMetadata.prototype._getObjectMetadata = function(sObjectType, sObjectName, sNamespace) {
	var oObject;
	if (sObjectName && sNamespace) {
		// search in all schemas for the sObjectName
		jQuery.each(this.oMetadata.dataServices.schema, function(i, oSchema) {
			// check if we found the right schema which will contain the sObjectName
			if (oSchema[sObjectType] && oSchema.namespace === sNamespace) {
				jQuery.each(oSchema[sObjectType], function(j, oCurrentObject) {
					if (oCurrentObject.name === sObjectName) {
						oObject = oCurrentObject;
						return false;
					}
				});
				return !oObject;
			}
		});
	}
	//jQuery.sap.assert(oObject, "ObjectType " + sObjectType + " for name " + sObjectName + " not found!");
	return oObject;
};

/**
 * get the the use-batch extension value if any
 */
sap.ui.model.odata.ODataMetadata.prototype._getUseBatchExtensionValue = function() {
	var bUseBatch = false;
	// search in all schemas for the use batch extension
	jQuery.each(this.oMetadata.dataServices.schema, function(i, oSchema) {
		if (oSchema.entityContainer) {
			jQuery.each(oSchema.entityContainer, function(k, oEntityContainer) {
				if (oEntityContainer.extensions) {
					jQuery.each(oEntityContainer.extensions, function(l, oExtension) {
						if (oExtension.name === "use-batch" && oExtension.namespace === "http://www.sap.com/Protocols/SAPData") {
							bUseBatch = (typeof oExtension.value === 'string') ? (oExtension.value.toLowerCase() === 'true') : !!oExtension.value;
							return false;
						}
					});
				}
			});
		}
	});
	return bUseBatch;
};

/**
 * Retrieve the function import metadata for a name and a method.
 *
 * @param {string} sFunctionName The name of the function import to look up
 * @param {string} sMethod The HTTP Method for which this function is requested
 */
sap.ui.model.odata.ODataMetadata.prototype._getFunctionImportMetadata = function(sFunctionName, sMethod) {
	var oObject = null;
	// search in all schemas for the sObjectName
	jQuery.each(this.oMetadata.dataServices.schema, function(i, oSchema) {
		// check if we found the right schema which will contain the sObjectName
		if (oSchema["entityContainer"]) {
			jQuery.each(oSchema["entityContainer"], function(j,oEntityContainer) {
				if (oEntityContainer["functionImport"]) {
					jQuery.each(oEntityContainer["functionImport"], function(k,oFunctionImport) {
						if (oFunctionImport.name === sFunctionName && oFunctionImport.httpMethod === sMethod) {
							oObject = oFunctionImport;
							return false;
						}
					});
				}
				return !oObject;
			});
		}
		return !oObject;
	});
//	jQuery.sap.assert(oObject, "FunctionImport for name " + sFunctionName
//			+ " and method " + sMethod + " not found!");
	return oObject;
};


sap.ui.model.odata.ODataMetadata.prototype._getEntityTypeByNavProperty = function(oEntityType, sNavPropertyName) {
	var that = this, aAssociationName, oAssociation, aEntityTypeName, oNavEntityType;

	jQuery.each(oEntityType.navigationProperty, function(k, oNavigationProperty) {
		if (oNavigationProperty.name === sNavPropertyName) {
			// get association for navigation property and then the collection name
			aAssociationName = that._splitName(oNavigationProperty.relationship);
		    oAssociation = that._getObjectMetadata("association", aAssociationName[0], aAssociationName[1]);
			if (oAssociation) {
				var oEnd = oAssociation.end[0];
				if (oEnd.role !== oNavigationProperty.toRole) {
					oEnd = oAssociation.end[1];
				}
				aEntityTypeName = that._splitName(oEnd.type);
				oNavEntityType = that._getObjectMetadata("entityType", aEntityTypeName[0], aEntityTypeName[1]);
				if (oNavEntityType) {
					// store the type name also in the oEntityType
					oNavEntityType.entityType = oEnd.type;					
				}
				return false;
			}
		}
	});
	return oNavEntityType;
};

/**
 * get all navigation property names in an array by the specified entity type
 */
sap.ui.model.odata.ODataMetadata.prototype._getNavigationPropertyNames = function(oEntityType) {
	var aNavProps = [];
	if (oEntityType.navigationProperty) {
		jQuery.each(oEntityType.navigationProperty, function(k, oNavigationProperty) {
			aNavProps.push(oNavigationProperty.name);
		});
	}
	return aNavProps;
};

/**
*  extract the property metadata of a specified property of a entity type out of the metadata document
*/
sap.ui.model.odata.ODataMetadata.prototype._getPropertyMetadata = function(oEntityType, sProperty) {
	var oPropertyMetadata, that = this;

	// remove starting/trailing /
	sProperty = sProperty.replace(/^\/|\/$/g, "");
	var aParts = sProperty.split("/"); // path could point to a complex type

	jQuery.each(oEntityType.property, function(k, oProperty) {
		if (oProperty.name === aParts[0]){
			oPropertyMetadata = oProperty;
			return false;
		}
	});

	// check if complex type
	if (oPropertyMetadata && aParts.length > 1 && !jQuery.sap.startsWith(oPropertyMetadata.type.toLowerCase(), "edm.")) {
		var aName = this._splitName(oPropertyMetadata.type);
		oPropertyMetadata = this._getPropertyMetadata(this._getObjectMetadata("complexType", aName[0], aName[1]), aParts[1]);
	}

	// check if navigation property
	if (!oPropertyMetadata && aParts.length > 1) {
		var oParentEntityType = this._getEntityTypeByNavProperty(oEntityType, aParts[0]);
		if (oParentEntityType) {
			oPropertyMetadata = that._getPropertyMetadata(oParentEntityType, aParts[1]);
		}
	}

	//jQuery.sap.assert(oPropertyMetadata, "PropertyType for property "+ aParts[0]+ " of EntityType " + oEntityType.name + " not found!");
	return oPropertyMetadata;
};
