/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * OData-based DataBinding
 *
 * @namespace
 * @name sap.ui.model.odata
 * @public
 */

// Provides class sap.ui.model.odata.ODataModel
jQuery.sap.declare("sap.ui.model.odata.ODataModel");
jQuery.sap.require("sap.ui.thirdparty.datajs");
jQuery.sap.require("sap.ui.thirdparty.URI");
jQuery.sap.require("sap.ui.model.Model");
jQuery.sap.require("sap.ui.model.odata.ODataPropertyBinding");
jQuery.sap.require("sap.ui.model.odata.ODataListBinding");
jQuery.sap.require("sap.ui.model.odata.ODataMetadata");

/*global OData *///declare unusual global vars for JSLint/SAPUI5 validation
/*global URI *///declare unusual global vars for JSLint/SAPUI5 validation

/**
 * Constructor for a new ODataModel.
 *
 * @param {string} sServiceUrl required - base uri of the service to request data from; additional URL parameters appended here will be appended to every request
 * @param {string | object} [bJSON] (optional) true to request data as JSON or an object which contains the following parameter properties: 
 * 							json, user, password, headers, tokenHandling, withCredentials, loadMetadataAsync, maxDataServiceVersion (default = '2.0';
 * please use the following string format e.g. '2.0' or '3.0'. Currently supported: '2.0' and '3.0'), useBatch (all requests will be sent in batch requests default = false),
 * refreshAfterChange (enable/disable automatic refresh after change operations: default = true).
 * See below for descriptions of these parameters. 
 * @param {string} [sUser] (optional) user
 * @param {string} [sPassword] (optional) password
 * @param {object} [mHeaders] (optional) map of custom headers which should be set in each request.
 * @param {boolean} [bTokenHandling] (optional) enable/disable XCSRF-Token handling
 * @param {boolean} [bWithCredentials] (optional, experimental) true when user credentials are to be included in a cross-origin request. Please note that this works only if all requests are asynchronous.
 * @param {object} [bLoadMetadataAsync] (optional) determined if the service metadata request is sent synchronous or asynchronous. Default is false.
 * Please note that if this is set to true attach to the metadataLoaded event to get notified when the metadata has been loaded before accessing the service metadata.

 *
 * @class
 * Model implementation for oData format
 *
 * @extends sap.ui.model.Model
 *
 * @author SAP AG
 * @version 1.16.8-SNAPSHOT
 *
 * @constructor
 * @public
 * @name sap.ui.model.odata.ODataModel
 */
sap.ui.model.Model.extend("sap.ui.model.odata.ODataModel", /** @lends sap.ui.model.odata.ODataModel */ {
	
	constructor : function(sServiceUrl, bJSON, sUser, sPassword, mHeaders, bTokenHandling, bWithCredentials, bLoadMetadataAsync) {
		sap.ui.model.Model.apply(this, arguments);
		
		var bUseBatch,
			bRefreshAfterChange,
			sMaxDataServiceVersion;
		
		if (typeof bJSON === "object") {
			sUser = bJSON.user;
			sPassword = bJSON.password;
			mHeaders = bJSON.headers;
			bTokenHandling = bJSON.tokenHandling;
			bLoadMetadataAsync = bJSON.loadMetadataAsync;
			bWithCredentials = bJSON.withCredentials;
			sMaxDataServiceVersion = bJSON.maxDataServiceVersion;
			bUseBatch = bJSON.useBatch;
			bRefreshAfterChange = bJSON.refreshAfterChange;
			bJSON = bJSON.json;
		}
		
		this.sDefaultBindingMode = sap.ui.model.BindingMode.OneWay;
		this.mSupportedBindingModes = {"OneWay": true, "OneTime": true, "TwoWay":true};
		this.bCountSupported = true;
		this.bJSON = bJSON;
		this.bCache = true;
		this.oRequestQueue = {};
		this.aBatchOperations = [];
		this.oHandler;
		this.sETag = '';
		this.bTokenHandling = bTokenHandling !== false;
		this.bWithCredentials = bWithCredentials === true; 
		this.bUseBatch = bUseBatch === true;
		this.bRefreshAfterChange = bRefreshAfterChange !== false;
		this.sMaxDataServiceVersion = sMaxDataServiceVersion;
		
		// prepare variables for request headers, data and metadata
		// TODO: metadata should be an separate object furthermore
		this.oHeaders = {};
		this.setHeaders(mHeaders);
		this.oData = {};
		this.oMetadata = {};
	
		// determine the service base url and the url parameters
		if (sServiceUrl.indexOf("?") == -1) {
			this.sServiceUrl = sServiceUrl;
		} else {
			var aUrlParts = sServiceUrl.split("?");
			this.sServiceUrl = aUrlParts[0];
			this.sUrlParams = aUrlParts[1];
		}
	
		// Remove trailing slash (if any)
		this.sServiceUrl = this.sServiceUrl.replace(/\/$/, "");
	
		// store user and password
		this.sUser = sUser;
		this.sPassword = sPassword;
		
		this.oHeaders["Accept-Language"] = sap.ui.getCore().getConfiguration().getLanguage();
		
		// load the metadata before setting accept headers because metadata is only available as XML
		if (!bLoadMetadataAsync === true) {
			bLoadMetadataAsync = false;
		}
		this.oMetadata = new sap.ui.model.odata.ODataMetadata(this, bLoadMetadataAsync);
	
		// set the the header for the accepted content types
		if (this.bJSON) {
			if (this.sMaxDataServiceVersion === "3.0") {
				this.oHeaders["Accept"] = "application/json;odata=fullmetadata";
			} else {
				this.oHeaders["Accept"] = "application/json";
			}
			this.oHandler = OData.jsonHandler;
		} else {
			this.oHeaders["Accept"] = "application/atom+xml,application/atomsvc+xml,application/xml";
			this.oHandler = OData.atomHandler;
		}
		
		
		// the max version number the client can accept in a response 
		this.oHeaders["MaxDataServiceVersion"] = "2.0";
		if (this.sMaxDataServiceVersion) {
			this.oHeaders["MaxDataServiceVersion"] = this.sMaxDataServiceVersion;
		}
		
		// set version to 2.0 because 1.0 does not support e.g. skip/top, inlinecount...
		// states the version of the Open Data Protocol used by the client to generate the request.
		this.oHeaders["DataServiceVersion"] = "2.0";
		
	},
	metadata : {
	
		publicMethods : ["create", "remove", "update", "submitChanges", "getServiceMetadata", "read", "hasPendingChanges", "refresh", "resetChanges",
		                 "isCountSupported", "setCountSupported", "forceNoCache", "setProperty", "refreshSecurityToken", "setHeaders", "getHeaders",
		                 "formatValue, setUseBatch"]
	}
});

/**
 * Creates a new subclass of class sap.ui.model.odata.ODataModel with name <code>sClassName</code> 
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
 * @name sap.ui.model.odata.ODataModel.extend
 * @function
 */

//
sap.ui.model.odata.ODataModel.M_EVENTS = {
		RejectChange: "rejectChange",
		/**
		 * Event is fired if the metadata document was successfully loaded
		 */
		MetadataLoaded: "metadataLoaded"
};

sap.ui.model.odata.ODataModel.prototype.fireRejectChange = function(mArguments) {
	this.fireEvent("rejectChange", mArguments);
	return this;
};

sap.ui.model.odata.ODataModel.prototype.attachRejectChange = function(oData, fnFunction, oListener) {
	this.attachEvent("rejectChange", oData, fnFunction, oListener);
	return this;
};

sap.ui.model.odata.ODataModel.prototype.detachRejectChange = function(fnFunction, oListener) {
	this.detachEvent("rejectChange", fnFunction, oListener);
	return this;
};

sap.ui.model.odata.ODataModel.prototype.fireMetadataLoaded = function(mArguments) {
	this.fireEvent("metadataLoaded", mArguments);
	return this;
};

sap.ui.model.odata.ODataModel.prototype.attachMetadataLoaded = function(oData, fnFunction, oListener) {
	this.attachEvent("metadataLoaded", oData, fnFunction, oListener);
	return this;
};

sap.ui.model.odata.ODataModel.prototype.detachMetadataLoaded = function(fnFunction, oListener) {
	this.detachEvent("metadataLoaded", fnFunction, oListener);
	return this;
};

/**
 * creates a request object
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._createRequest = function(sPath, aUrlParams, bAsync, bCache) {

	// create the url for the service
	var sUrl = this.sServiceUrl;
	if (sPath) {
		if (!jQuery.sap.startsWith(sPath, "/")) {
			sUrl += "/";
		}
		sUrl += sPath;
	}
	if (!aUrlParams) {
		aUrlParams = [];
	}
	if (this.sUrlParams) {
		aUrlParams.push(this.sUrlParams);
	}
	if (aUrlParams.length > 0) {
		sUrl += "?" + aUrlParams.join("&");
	}
	if (bCache === undefined) {
		bCache = true;
	}
	if (bCache === false) {

		var timeStamp = jQuery.now();
		// try replacing _= if it is there
		var ret = sUrl.replace( /([?&])_=[^&]*/, "$1_=" + timeStamp );
		// if nothing was replaced, add timestamp to the end
		sUrl = ret + ( ( ret === sUrl ) ? ( /\?/.test( sUrl ) ? "&" : "?" ) + "_=" + timeStamp : "" );
	}
	
	var oChangeHeader = {};
	jQuery.extend(oChangeHeader, this.mCustomHeaders, this.oHeaders);
	
	if (bAsync === undefined) {
		bAsync = true;
	}
	
	// create a request object for the url, url params and async option
	var oRequest = {
		requestUri: sUrl,
		headers: oChangeHeader,
		async: bAsync,
		user: this.sUser,
		password: this.sPassword
	};
	
	if (bAsync) {
		oRequest.withCredentials = this.bWithCredentials;
	}
	
	return oRequest;

};

/**
 * Does a request using the service URL and configuration parameters 
 * provided in the model's constructor and sets the response data into the
 * model. This request is performed asynchronously.
 *
 * @param {string}
 *            sPath Path A string containing the path to the data which should
 *            be retrieved. The path is concatenated to the <code>sServiceUrl</code>
 *            which was specified in the model constructor.
 * @param {function}
 *            [fnSuccess] a callback function which is called when the data has
 *            been successfully retrieved and stored in the model
 * @param {function}
 *            [fnError] a callback function which is called when the request failed
 *            
 * @param {boolean} [bCache=true] Force no caching if false
 *
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._loadData = function(sPath, aParams, fnSuccess, fnError, oContext, bCache, fnHandleUpdate, bRefreshData){

	 /*
	  * TODO: Johannes, Malte: check whether this is OK or not?
	  *
	  * We added a 5th parameter to support loading data within a context scope.
	  * In case of the ExactBrowser this led to the issue, that fn: checkUpdate
	  * updated all the bindings and also the root binding, which finally reset
	  * the ExactBrowser and the nested levels will not show up. By adding the
	  * context to this function it is possible now to update only the relevant
	  * bindings!
	  *
	  * To reproduce the issue just avoid to pass the binding context to the
	  * checkUpdate function and use the following Snippix sample: #3867
	  *
	  * Other change is in the ODataModel where this function is called when
	  * loading additional contexts.
	  */

	// create a request object for the data request
	var oRequestHandle,
	oRequest = this._createRequest(sPath, aParams, true, bCache || this.bCache);

	if (bRefreshData === undefined) { 
		bRefreshData = true;
	}
	// request the data of the service for the given path
	var that = this;

	function _handleSuccess(oData, oResponse) {

		var oResultData = oData;
		// no data available
		if (!oResultData) {
			jQuery.sap.log.fatal("The following problem occurred: No data was retrieved by service: " + oResponse.requestUri);
			that.sChangeKey = null;
			that.fireRequestCompleted({url : oRequest.requestUri, type : "GET", async : oRequest.async, info: "Accept headers:" + that.oHeaders["Accept"], success: false});
			return false;
		}
		
		if (that.bUseBatch) { // process batch response
			// check if errors occurred in the batch
			var aErrorResponses = that._getBatchErrors(oData);
			if (aErrorResponses.length > 0) {
				// call handle error with the first error.
				_handleError(aErrorResponses[0]);
				return false;
			}
			
			if (oResultData.__batchResponses && oResultData.__batchResponses.length > 0) {
				oResultData = oResultData.__batchResponses[0].data;
			} else {
				jQuery.sap.log.fatal("The following problem occurred: No data was retrieved by service: " + oResponse.requestUri);
			}
		}

		aResults = aResults.concat(oResultData.results);
		// check if not all requested data was loaded
		if (oResultData.__next){
			// replace request uri with next uri to retrieve additional data
			var oURI = new URI(oResultData.__next);
			oRequest.requestUri = oURI.absoluteTo(oResponse.requestUri).toString();
			readRequestedData(oRequest);
		}else{
			// all data is read so merge all data
			jQuery.extend(oResultData.results, aResults);
			// broken implementations need this
			if (oResultData.results && !jQuery.isArray(oResultData.results)) {
				oResultData = oResultData.results;
			}
			
			// adding the result data to the data object
			that._importData(oResultData);

			if (fnSuccess) {
				fnSuccess(oResultData);
			}
			that.sChangeKey = null;
			
			if (bRefreshData) {
				that.checkUpdate(false, oContext); /* TODO: Johannes, Malte: check whether this is OK or not? */
			}
			that.fireRequestCompleted({url : oRequest.requestUri, type : "GET", async : oRequest.async, info: "Accept headers:" + that.oHeaders["Accept"], success: true});
		}
	}

	function _handleError(oError) {
		if (fnError) {
			fnError();
		}
		
		var mParameters = that._handleError(oError);
		
		that.sChangeKey = null;
		
		that.fireRequestCompleted({url : oRequest.requestUri, type : "GET", async : oRequest.async, info: "Accept headers:" + that.oHeaders["Accept"], success: false, errorobject: mParameters});
		that.fireRequestFailed(mParameters);

	}

	/**
	 * this method is used to retrieve all desired data. It triggers additional read requests if the server paging size
	 * permits to return all the requested data. This could only happen for servers with support for oData > 2.0.
	 */
	function readRequestedData(oRequest){
		// execute the request and use the metadata if available
		
		if (that.bUseBatch) {
			
			var _submitReadBatch = function() {
				that.clearBatch();
				// batch requests only need the path without the service URL
				// extract query of url and combine it with the path...
				var sUriQuery = URI.parse(oRequest.requestUri).query;
				var sRequestUrl = sPath.replace(/\/$/, ""); // remove trailing slash if any
				sRequestUrl += sUriQuery ? "?" + sUriQuery : "";			
				
				var oReadOp = that.createBatchOperation(sRequestUrl, "GET");
				that.addBatchReadOperations([oReadOp]);
				oRequestHandle = that.submitBatch(_handleSuccess, _handleError, oRequest.async);				
			}
			// because we use POST now the server might ask for a token
			if (that.bTokenHandling && !that.bTokenRequested) {
				var _fnRefreshTokenSuccess = function(oData, oResponse) {
					if (oResponse) {
						oRequest.headers["x-csrf-token"]= oResponse.headers["x-csrf-token"];
					}
					_submitReadBatch();
				}
				that.refreshSecurityToken(_fnRefreshTokenSuccess, _handleError, false);
			} else {
				_submitReadBatch();
			}
		} else {
			oRequestHandle = OData.read(oRequest, _handleSuccess, _handleError, that.oHandler, undefined, that.oMetadata.getServiceMetadata());			
		}
		
		if (fnHandleUpdate) { 
			fnHandleUpdate(oRequestHandle);
		}
	}

	// execute request
	var aResults = [];
	this.fireRequestSent({url : oRequest.requestUri, type : "GET", async : oRequest.async, info: "Accept headers:" + this.oHeaders["Accept"]});
	readRequestedData(oRequest);
};

/**
 * Imports the data to the internal storage.
 * Nested entries are processed recursively, moved to the canonic location and referenced from the parent entry.
 */
sap.ui.model.odata.ODataModel.prototype._importData = function(oData){
	var that = this,
		aList, sKey, oResult, oEntry;
	if (oData.results) {
		aList = [];
		jQuery.each(oData.results, function(i, entry) {
			aList.push(that._importData(entry));
		});
		return aList;
	} else {
		sKey = this._getKey(oData);
		oEntry = this.oData[sKey];
		if (!oEntry) {
			oEntry = oData;	
			this.oData[sKey] = oEntry;
		}
		jQuery.each(oData, function(sName, oProperty) {
			if (oProperty && (oProperty.__metadata && oProperty.__metadata.uri || oProperty.results) && !oProperty.__deferred) {
				oResult = that._importData(oProperty);
				if (jQuery.isArray(oResult)) {
					oEntry[sName] = { __list: oResult };
				}
				else {
					oEntry[sName] = { __ref: oResult	};
				}
			} else {
				oEntry[sName] = oProperty;
			}
		});
		return sKey;
	}
};

/**
 * Remove references of navigation properties created in importData function
 */
sap.ui.model.odata.ODataModel.prototype._removeReferences = function(oData){
	var that = this, aList;
	if (oData.results) {
		aList = [];
		jQuery.each(oData.results, function(i, entry) {
			aList.push(that._removeReferences(entry));
		});
		return aList;
	} else {
		jQuery.each(oData, function(sPropName, oCurrentEntry) {
			if (oCurrentEntry) {
				if (oCurrentEntry["__ref"] || oCurrentEntry["__list"]) {
					delete oData[sPropName];				
				}
			}
		});
		return oData;
	}
};

/**
 * Restore reference entries of navigation properties created in importData function 
 */
sap.ui.model.odata.ODataModel.prototype._restoreReferences = function(oData){
	var that = this,
 	oCurrentEntry, aList,
 	aResults = [];
	if (oData.results) {
		aList = [];
		jQuery.each(oData.results, function(i, entry) {
			aList.push(that._restoreReferences(entry));
		});
		return aList;
	} else {
		jQuery.each(oData, function(sPropName, oCurrentEntry) {
			if (oCurrentEntry && oCurrentEntry["__ref"]) {
				var oChildEntry = that._getObject("/" + oCurrentEntry["__ref"]);
				jQuery.sap.assert(oChildEntry, "ODataModel inconsistent: " + oCurrentEntry["__ref"] + " not found!");
				if (oChildEntry) {
					delete oCurrentEntry["__ref"];
					oData[sPropName] = oChildEntry;
					// check recursively for found child entries
					that._restoreReferences(oChildEntry);
				}
			} else if (oCurrentEntry && oCurrentEntry["__list"]) {
				jQuery.each(oCurrentEntry["__list"], function(j, sEntry) {
					var oChildEntry = that._getObject("/" + oCurrentEntry["__list"][j]);
					jQuery.sap.assert(oChildEntry, "ODataModel inconsistent: " +  oCurrentEntry["__list"][j] + " not found!");
					if (oChildEntry) {
						aResults.push(oChildEntry);
						// check recursively for found child entries
						that._restoreReferences(oChildEntry);
					}
				});
				delete oCurrentEntry["__list"];
				oCurrentEntry.results = aResults;
				aResults = [];
			}
		});
		return oData;
	}
};

/**
 * removes all existing data from the model
 */
sap.ui.model.odata.ODataModel.prototype.removeData = function(){
	this.oData = {};
};

/**
 * Refresh the model.
 * This will check all bindings for updated data and update the controls if data has been changed. 
 * 
 * @param {boolean} bForceUpdate Update controls even if data has not been changed
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.refresh = function(bForceUpdate) {
	// Call refresh on all bindings instead of checkUpdate to properly reset cached data in bindings
	var aBindings = this.aBindings.slice(0);		
	jQuery.each(aBindings, function(iIndex, oBinding) {		
		oBinding.refresh(bForceUpdate);		
	});
};

/**
 * Private method iterating the registered bindings of this model instance and initiating their check for update
 *
 * @param {boolean} bForceUpdate
 * @param {object} oContext
 *
 * @private
 */
sap.ui.model.odata.ODataModel.prototype.checkUpdate = function(bForceUpdate, oContext) {
	var aBindings = this.aBindings.slice(0);
	jQuery.each(aBindings, function(iIndex, oBinding) {
		if ((!oContext || oBinding.getContext() == oContext) || bForceUpdate) {
			oBinding.checkUpdate(bForceUpdate);
		}
	});
};

/**
 * @see sap.ui.model.Model.prototype.bindProperty
 */
sap.ui.model.odata.ODataModel.prototype.bindProperty = function(sPath, oContext, mParameters) {
	var oBinding = new sap.ui.model.odata.ODataPropertyBinding(this, sPath, oContext, mParameters);
	return oBinding;
};

/**
 * @see sap.ui.model.Model.prototype.bindList
 */
sap.ui.model.odata.ODataModel.prototype.bindList = function(sPath, oContext, aSorters, aFilters, mParameters) {
	var oBinding = new sap.ui.model.odata.ODataListBinding(this, sPath, oContext, aSorters, aFilters, mParameters);
	return oBinding;
};

/**
 * @see sap.ui.model.Model.prototype.createBindingContext
 */
sap.ui.model.odata.ODataModel.prototype.createBindingContext = function(sPath, oContext, mParameters, fnCallBack, bForceUpdate) {
	var aNavProps, bReload = false;
	// optional parameter handling
	if (typeof oContext == "function") {
		fnCallBack = oContext;
		oContext = null;
	}
	if (typeof mParameters == "function") {
		fnCallBack = mParameters;
		mParameters = null;
	}
	// try to resolve path, send a request to the server if data is not available yet
	// if we have set forceUpdate in mParameters we send the request even if the data is available
	var oData = this._getObject(sPath, oContext),
		sKey,
		oNewContext,
		that = this;
	//check if all NavigationProperties ($expanded) are already loaded
	aNavProps = mParameters && mParameters["expand"] ? mParameters["expand"].split(',') : []; 
	if (aNavProps && oData) { 
		for(var i = 0; i < aNavProps.length; i++) {
			if (oData[aNavProps[i]] && oData[aNavProps[i]].__deferred) {
				bReload = true;
			}
		}
	}
	if (oData && !bForceUpdate && !bReload) {
		sKey = this._getKey(oData);
		oNewContext = this.getContext('/'+sKey);
		fnCallBack(oNewContext);
	}
	else {
		var bIsRelative = !jQuery.sap.startsWith(sPath, "/"),
			sFullPath = this.resolve(sPath, oContext);
		if (sFullPath) {
			var aParams = [],
				sCustomParams = this.createCustomParams(mParameters);
			if (sCustomParams) {
				aParams.push(sCustomParams);
			}
			this._loadData(sFullPath, aParams, function(oData) {
				sKey = oData ? that._getKey(oData) : undefined;
				if (sKey && oContext && bIsRelative) {
					var sContextPath = oContext.getPath();
					// remove starting slash
					sContextPath = sContextPath.substr(1);
					// when model is refreshed, parent entity might not be available yet
					if (that.oData[sContextPath]) {
						that.oData[sContextPath][sPath] = {__ref: sKey};
					}
				}
				oNewContext = that.getContext('/'+sKey);
				fnCallBack(oNewContext);
			}, function() {
				fnCallBack(); // error - notify to recreate contexts
			}, oContext, undefined, undefined, false);
		} else {
			fnCallBack(); // error - notify to recreate contexts
		}
	}
};

/**
 * @see sap.ui.model.Model.prototype.destroyBindingContext
 */
sap.ui.model.odata.ODataModel.prototype.destroyBindingContext = function(oContext) {
};

/**
 * Create URL parameters from custom parameters
 * @private
 */
sap.ui.model.odata.ODataModel.prototype.createCustomParams = function(mParameters) {
	var aCustomParams = [],
		mCustomQueryOptions,
		mSupportedParams = {
			expand: true,
			select: true
		};
	for (var sName in mParameters) {
		if (sName in mSupportedParams) {
			aCustomParams.push("$" + sName + "=" + jQuery.sap.encodeURL(mParameters[sName]));
		}
		if (sName == "custom") {
			mCustomQueryOptions = mParameters[sName];
			for (var sName in mCustomQueryOptions) {
				if (sName.indexOf("$") == 0) {
					jQuery.sap.log.warning("Trying to set OData parameter " + sName + " as custom query option!");
				}
				else {
					aCustomParams.push(sName + "=" + jQuery.sap.encodeURL(mCustomQueryOptions[sName]));
				}
			}
		}
	}
	return aCustomParams.join("&");
};

/**
 * Sets whether this OData service supports $count on its collections
 *
 * @param {boolean} bCountSupported
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.setCountSupported = function(bCountSupported) {
	this.bCountSupported = bCountSupported;
};

/**
 * Returns whether this model supports the $count on its collections
 *
 * @returns {boolean}
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.isCountSupported = function() {
	return this.bCountSupported;
};


/**
 * Returns the key part from the complete entry URI
 */
sap.ui.model.odata.ODataModel.prototype._getKey = function(oEntry) {
	var sURI = oEntry.__metadata.uri;
	return sURI.substr(sURI.lastIndexOf("/") + 1);
};


/**
 * Returns the value for the property with the given <code>sPropertyName</code>
 *
 * @param {string}
 *          sPath the path/name of the property
 * @param {object} [oContext] the context if available to access the property value
 * @param {boolean} [bIncludeExpandEntries=null] This parameter should be set when a URI or custom parameter 
 * with a $expand System Query Option was used to retrieve associated entries embedded/inline.
 * If true then the getProperty function returns a desired property value/entry and includes the associated expand entries (if any).
 * If false the associated/expanded entry properties are removed and not included in the
 * desired entry as properties at all. This is useful for performing updates on the base entry only. Note: A copy and not a reference of the entry will be returned.
 * @type any
 * @return the value of the property
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.getProperty = function(sPath, oContext, bIncludeExpandEntries) {
	var oValue = this._getObject(sPath, oContext);
	
	// same behavior as before
	if (bIncludeExpandEntries == null || bIncludeExpandEntries == undefined) {
		return oValue;
	}
	
	// if value is a plain value and not an object we return directly
	if (!jQuery.isPlainObject(oValue)) {
		return oValue;
	}
	
	// do a value copy or the changes to that value will be modified in the model as well (reference)
	oValue = jQuery.extend(true, {}, oValue);
	
	if (bIncludeExpandEntries == true) {
		// include expand entries
		return this._restoreReferences(oValue);		
	} else {
		// remove expanded references
		return this._removeReferences(oValue);
	}

};

/**
 * @param sPath
 * @param oContext
 * @returns
 */
sap.ui.model.odata.ODataModel.prototype._getObject = function(sPath, oContext) {
	var oNode = this.isLegacySyntax() ? this.oData : null,
		sKey;
	if (oContext) {
		sKey = oContext.getPath();
		// remove starting slash
		sKey = sKey.substr(1);
		oNode = this.oData[sKey];
	}
	if (!sPath) {
		return oNode;
	}
	var aParts = sPath.split("/"),
		iIndex = 0;
	if (!aParts[0]) {
		// absolute path starting with slash
		oNode = this.oData;
		iIndex++;
	}
	while(oNode && aParts[iIndex]) {
		oNode = oNode[aParts[iIndex]];
		if (oNode) {
			if (oNode.__ref) {
				oNode = this.oData[oNode.__ref];
			}
			else if (oNode.__list) {
				oNode = oNode.__list;
			}
			else if (oNode.__deferred) {
				oNode = null;
			}
		}
		iIndex++;
	}
	return oNode;
};

/**
 * refresh XSRF token by performing a GET request against the service root URL.
 *  
 * @param {function} [fnSuccess] a callback function which is called when the data has
 *            					 been successfully retrieved.
 * @param {function} [fnError] a callback function which is called when the request failed. The handler can have the parameter: oError which contains
 *  additional error information.
 * 
 * @param {boolean} [bAsync=false] true for asynchronous requests.
 * 
 * @return {object} an object which has an <code>abort</code> function to abort the current request.
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.refreshSecurityToken = function(fnSuccess, fnError, bAsync) {
	var that = this;
	
	this.oHeaders["x-csrf-token"] = "Fetch";
	if (bAsync == undefined) {
		bAsync = false;
	}
	// trigger a read to the service url
	var oRequest = this._createRequest("/", null, bAsync);
	
	function _handleSuccess(oData, oResponse) {
		if (oResponse) {
			that._convertHeaders("x-csrf-token", oResponse.headers);
			that.oHeaders["x-csrf-token"]= oResponse.headers["x-csrf-token"];
			that.bTokenRequested = true;
		}
		
		if (fnSuccess) {
			fnSuccess(oData, oResponse);
		}
	}

	function _handleError(oError) {
		that._handleError(oError);
		that.bTokenRequested = false;
		
		if (fnError) {
			fnError(oError);
		}
	}

	return OData.read(oRequest, _handleSuccess, _handleError, this.oHandler, null, this.getServiceMetadata());
};

/**
 * submit changes from the requestQueue (queue can currently have only one request) 
 * 
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._submitChange = function(oRequest, fnSuccess, fnError){	
	var that = this;
		
	function _handleSuccess(oData, oResponse) {
		// check if embedded errors occurred in success request
		if (that.bUseBatch) {
			// check if errors occurred in the batch
			var aErrorResponses = that._getBatchErrors(oData);
			if (aErrorResponses.length > 0) {
				// call handle error with the first error.
				_handleError(aErrorResponses[0]);
				return false;
			}
			// if response contains data
			if (oData.__batchResponses && oData.__batchResponses.length > 0) {
				oData = oData.__batchResponses[0].data;
			}
		}
		
		if (that.sChangeKey && oRequest.requestUri === that.sChangeKey) {
			that.sChangeKey = null;
		} 
		
		var oRequestToDelete = oRequest;

		// delete request from queue: if it is a create entry or a remove we also delete the data from oData
		jQuery.each(that.oRequestQueue,function(sName, oRequest){
			oRequest === oRequestToDelete ? delete that.oRequestQueue[sName] : false;
			
			// delete created entry via POST (CREATE) and DELETE
			if ((oRequest.method === "POST" && !oRequest.headers["x-http-method"]) || oRequest.method === "DELETE") {
				var sPath = sName.substr(sName.lastIndexOf('/') + 1);
				delete that.oData[sPath];
				delete that.mContexts["/" + sPath]; // contexts are stored starting with /
			}
		});
		
		if (that.bRefreshAfterChange && that._isRefreshNeeded(oRequest)){
			that.refresh();
		}
		
		if (fnSuccess) {
			fnSuccess(oData, oResponse);
		}
	}

	function _handleError(oError) {
		
		// if batch is enabled don't call handle error because _submitBatch has its own _handleError call
		if (!that.bUseBatch) { 
			that._handleError(oError);			
		}
		
		if (that.sChangeKey && oRequest.requestUri === that.sChangeKey) {
			that.sChangeKey = null;
			delete that.oRequestQueue[oRequest.requestUri];
			that.refresh();
		} 
		
		if (fnError) {
			fnError(oError);
		}
	}
	
	if (this.bTokenHandling && !this.bTokenRequested) {
	    
		var _fnRefreshTokenSuccess = function(oData, oResponse) {
			if (oResponse) {
				oRequest.headers["x-csrf-token"]= oResponse.headers["x-csrf-token"];
			}
			return _submit();
		}
		
		this.refreshSecurityToken(_fnRefreshTokenSuccess, _handleError, false);
	} else {
		return _submit();
	}
	
	function _submit(){
		if (that.bUseBatch) {
			that.clearBatch();
			var sRequestUrl = that._getBatchUrl(oRequest.requestUri);
			
			// check MERGE which is converted to POST in _createChangeRequest function
			if (oRequest.method === "POST" && oRequest.headers["x-http-method"] === "MERGE") {
				oRequest.method = "MERGE";
			}
			var oChangeOp = that.createBatchOperation(sRequestUrl, oRequest.method, oRequest.data);
			that.addBatchChangeOperations([oChangeOp]);
			return that.submitBatch(_handleSuccess, _handleError, oRequest.async);
		} else {
			return OData.request(oRequest, _handleSuccess, _handleError, that.oHandler, undefined, that.getServiceMetadata());			
		}
	}

};

/**
 * submit batch requests and collects errors of included requests in an array.
 * 
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._submitBatch = function(oRequest, fnSuccess, fnError){	
	var that = this, 
		aErrorResponses = [];
	
	function _handleSuccess(oData, oResponse) {
		that.aBatchOperations = [];
		
		// check if errors occurred in the batch
		aErrorResponses = that._getBatchErrors(oData);
		
		if (that.bRefreshAfterChange && that._isRefreshNeeded(oRequest)){
			that.refresh();
		}
		
		if (fnSuccess) {
			fnSuccess(oData, oResponse, aErrorResponses);
		}
	}

	function _handleError(oError) {
		that._handleError(oError);
		that.aBatchOperations = [];
				
		if (fnError) {
			fnError(oError);
		}
	}
	
	if (this.bTokenHandling && !this.bTokenRequested) {
	    
		var _fnRefreshTokenSuccess = function(oData, oResponse) {
			if (oResponse) {
				oRequest.headers["x-csrf-token"]= oResponse.headers["x-csrf-token"];
			}
			return _submit();
		}
		
		this.refreshSecurityToken(_fnRefreshTokenSuccess, _handleError, false);
	} else {
		return _submit();
	}
	
	function _submit() {
		return OData.request(oRequest, _handleSuccess, _handleError, OData.batchHandler, undefined, that.getServiceMetadata());		
	}
	
};


sap.ui.model.odata.ODataModel.prototype._getBatchErrors = function(oData) {
	var aErrorResponses = [], sErrorMsg;
	// check if errors occurred in the batch
	jQuery.each(oData.__batchResponses, function(iIndex, oOperationResponse) {
		if (oOperationResponse.message) {
			sErrorMsg = "The following problem occurred: " + oOperationResponse.message;
			if (oOperationResponse.response) {
				sErrorMsg += oOperationResponse.response.statusCode + "," +
				oOperationResponse.response.statusText + "," +
				oOperationResponse.response.body;				
			}
			aErrorResponses.push(oOperationResponse);
			jQuery.sap.log.fatal(sErrorMsg);
		}
		if (oOperationResponse.__changeResponses) {
			jQuery.each(oOperationResponse.__changeResponses, function(iIndex, oChangeOperationResponse) {
				if (oChangeOperationResponse.message) {
					sErrorMsg = "The following problem occurred: " + oChangeOperationResponse.message;
					if (oChangeOperationResponse.response) {
						sErrorMsg += oChangeOperationResponse.response.statusCode + "," +
						oChangeOperationResponse.response.statusText + "," +
						oChangeOperationResponse.response.body;				
					}
					aErrorResponses.push(oChangeOperationResponse);
					jQuery.sap.log.fatal(sErrorMsg);
				}
			});
		}
	});
	return aErrorResponses;
};

/**
 * error handling for requests
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._handleError = function(oError) {
	var mParameters = {}, fnHandler, that = this; 
	var sErrorMsg = "The following problem occurred: " + oError.message;
			
	mParameters.message = oError.message;
	if (oError.response){
		// if XSRFToken is not valid we get 403 with the x-csrf-token header : Required. 
		// a new token will be fetched in the refresh afterwards.
		this._convertHeaders("x-csrf-token", oError.response.headers);
		if (oError.response.statusCode == '403' && oError.response.headers["x-csrf-token"]) {
			this.oHeaders["x-csrf-token"] = oError.response.headers["x-csrf-token"];
			if (oError.response.headers["x-csrf-token"].toLowerCase() === "required" && !this.bRefreshing) {
				this.bRefreshing = true;
				fnHandler = function (){
					that.bRefreshing = false;
				}
				this.refreshSecurityToken(fnHandler, fnHandler);
			}
		}
		sErrorMsg += oError.response.statusCode + "," +
		oError.response.statusText + "," +
		oError.response.body;
		mParameters.statusCode = oError.response.statusCode;
		mParameters.statusText = oError.response.statusText;
		mParameters.responseText = oError.response.body;
	}
	jQuery.sap.log.fatal(sErrorMsg);

	return mParameters;	
};

/**
 * reset changes
 * 
 * @private
 */
/*sap.ui.model.odata.ODataModel.prototype.resetChanges = function(fnSuccess, fnError) {
	var that = this, sPath;
	
	
};*/

/**
 * Return requested data as object if the data has already been loaded and stored in the model. 
 * 
 * @param {string} sPath A string containing the path to the data object that should be returned.
 * @param {object} [oContext] the optional context which is used with the sPath to retrieve the requested data.
 * @param {boolean} [bIncludeExpandEntries=null] This parameter should be set when a URI or custom parameter 
 * with a $expand System Query Option was used to retrieve associated entries embedded/inline.
 * If true then the getProperty function returns a desired property value/entry and includes the associated expand entries (if any).
 * If false the associated/expanded entry properties are removed and not included in the
 * desired entry as properties at all. This is useful for performing updates on the base entry only. Note: A copy and not a reference of the entry will be returned.
 * 
 * return {object} oData Object containing the requested data if the path is valid. 
 * @public
 * @deprecated please use {@link #getProperty} instead
 */
sap.ui.model.odata.ODataModel.prototype.getData = function(sPath, oContext, bIncludeExpandEntries) {
	return this.getProperty(sPath, oContext, bIncludeExpandEntries);
};

/**
 * get change url: the url which can be used to easily trigger your change without "nachdenken".
 * 
 * @return {string} change url
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._getChangeUrl = function(sPath, oContext){
	var sUrl, sKey;
	
	if (oContext) {
		sKey = oContext.getPath();
		// remove starting slash
		sKey = sKey.substr(1);
	}

	sPath = sPath.replace(/^\/|\/$/g, "");
	
	if(oContext && sPath) {
		sUrl = this.sServiceUrl + '/' + sKey + '/' + sPath;
	} else if (!oContext && sPath){
		sUrl = this.sServiceUrl + '/' + sPath;
	} else {
		sUrl = this.sServiceUrl + '/' + sKey;
	}
	return sUrl;
};

/**
 * sets this.sETag to either the passed sETag or tries to retrieve the ETag from the metadata of oPayload or sPath 
 * 
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._setCurrentETag = function(sPath, oPayload, sETag) {
	var sCurrent, sEntry;
	if(sETag){
		sCurrent = sETag;
	}
	else{
		if (oPayload && oPayload.__metadata){
			sCurrent = oPayload.__metadata.etag;
		}
		else if(sPath){
			sEntry = sPath.replace(this.sServiceUrl+'/','');
			if (this.oData.hasOwnProperty(sEntry)){
				sCurrent = this.getProperty('/' + sEntry +'/__metadata/etag');
			}
		}
	}
	this.sETag = sCurrent;
};
/**
 * creation of a request object for changes
 * 
 * @return {object} request object
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._createChangeRequest = function(sUrl, oPayload, sMethod, bAsync, sETag) {	
	var oChangeHeader = {};
	jQuery.extend(oChangeHeader, this.mCustomHeaders, this.oHeaders);

	this._setCurrentETag(sUrl, oPayload, sETag);

	if(this.sETag){
		oChangeHeader["If-Match"] = this.sETag;
	}
	// make sure to set content type header for POST/PUT requests when using JSON format to prevent datajs to add "odata=verbose" to the content-type header
	// may be removed as later gateway versions support this
	if (this.bJSON && sMethod != "DELETE" && this.sMaxDataServiceVersion === "2.0") {
		oChangeHeader["Content-Type"] = "application/json";
	}

	if (sMethod == "MERGE") {
		oChangeHeader["x-http-method"] = "MERGE";
		sMethod = "POST";
	}
	
	if (bAsync === undefined) {
		bAsync = true;
	}
	
	var oRequest = {
			headers : oChangeHeader,
			requestUri : sUrl,
			method : sMethod,
			data : oPayload,
			user: this.sUser,
			password: this.sPassword,
			async: bAsync
	};
	
	if (bAsync) {
		oRequest.withCredentials = this.bWithCredentials;
	}
	
	return oRequest;
};

/**
 * Checks if a model refresh is needed, either because the the data provided by the sPath and oContext is stored 
 * in the model or new data is added (POST). For batch requests all embedded requests are checked separately.
 * 
 * @return {boolean} 
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._isRefreshNeeded = function(oRequest) {
	var bRefreshNeeded = false,
		that = this;
	
	// if this is a batch request, loop through the batch operations, find change requests
	// and check every change request individually
	if (oRequest.data && jQuery.isArray(oRequest.data.__batchRequests)) {
		jQuery.each(oRequest.data.__batchRequests, function(iIndex, oBatchRequest) {
			if (jQuery.isArray(oBatchRequest.__changeRequests)) {
				jQuery.each(oBatchRequest.__changeRequests, function(iIndex, oChangeRequest) {
					bRefreshNeeded = bRefreshNeeded || that._isRefreshNeeded(oChangeRequest);
					return !bRefreshNeeded; //break
				});
			}	
			return !bRefreshNeeded; //break
		});
	} else {
		var sPath = oRequest.requestUri.replace(this.sServiceUrl,''), 
			oData = this._getObject(sPath);
		if (oData || oRequest.method == "POST" || oRequest.method === "DELETE") {
			bRefreshNeeded = true;
		}
	}
	return bRefreshNeeded;
};

/**
 * Trigger a PUT/MERGE request to the odata service that was specified in the model constructor. 
 * 
 * @param {string} sPath A string containing the path to the data that should be updated.
 * 							The path is concatenated to the sServiceUrl which was specified 
 * 							in the model constructor.
 * @param {object} oData data of the entry that should be updated.
 * @param {object} [oParameters] Optional, can contain the following attributes:
 * @param {object} [oParameters.oContext] If specified the sPath has to be is relative to the path given with the context.
 * @param {function} [oParameters.fnSuccess] a callback function which is called when the data has been successfully updated.
 * @param {function} [oParameters.fnError] a callback function which is called when the request failed. 
 *     The handler can have the parameter <code>oError</code> which contains additional error information.
 * @param {boolean} [oParameters.bMerge=false] trigger a MERGE request instead of a PUT request to perform a differential update
 * @param {string} [oParameters.sETag] If specified, the If-Match-Header will be set to this Etag.
 * 
 * @return {object} an object which has an <code>abort</code> function to abort the current request.
 * 
 * @public
 */

sap.ui.model.odata.ODataModel.prototype.update = function(sPath, oData, oParameters) {
	var fnSuccess, fnError, bMerge, oRequest, sUrl, oContext, sETag;
//ensure compatibility, check for old or new declaration of parameters
	if (oParameters instanceof sap.ui.model.Context || arguments.length >3)
	{
		oContext = oParameters;
		fnSuccess = arguments [3];
		fnError = arguments [4];
		bMerge = arguments [5];
	} 
	else{
		if (oParameters instanceof Object){
		//we are using the new parameters
			oContext = oParameters.oContext;
			fnSuccess = oParameters.fnSuccess;
			fnError = oParameters.fnError;
			bMerge = oParameters.bMerge;
			sETag = oParameters.sETag;
		//else oParameters is just not there
		}
	}
	sUrl = this._getChangeUrl(sPath, oContext);
 
	if (bMerge) {
		oRequest = this._createChangeRequest(sUrl, oData, "MERGE", false, sETag);
	} else {
		oRequest = this._createChangeRequest(sUrl, oData, "PUT", false, sETag);
	}

	this.oRequestQueue[oRequest.requestUri] = oRequest;

	return this._submitChange(oRequest, fnSuccess, fnError);

};

/**
 * Trigger a POST request to the odata service that was specified in the model constructor. 
 * 
 * @param {string} sPath A string containing the path to the collection where an entry 
 *                      should be created. The path is concatenated to the sServiceUrl
 *                      which was specified in the model constructor.
 * @param {object} oData data of the entry that should be created.
 * @param {object} [oContext] If specified the sPath has to be relative to the path given with the context. 
 *
 * @param {function} [fnSuccess] a callback function which is called when the data has
 *                              been successfully retrieved. The handler can have the 
 *                              following parameters: oData and response.
 *
 * @param {function} [fnError] a callback function which is called when the request failed. 
 *           The handler can have the parameter <code>oError</code> which contains additional error information.
 * 
 * @return {object} an object which has an <code>abort</code> function to abort the current request.
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.create = function(sPath, oData, oContext, fnSuccess, fnError) {
	var oRequest, sUrl;

	sUrl = this._getChangeUrl(sPath, oContext);

	oRequest = this._createChangeRequest(sUrl, oData, "POST", false);

	this.oRequestQueue[oRequest.requestUri] = oRequest;
	
	return this._submitChange(oRequest, fnSuccess, fnError);

};

/**
 * Trigger a DELETE request to the odata service that was specified in the model constructor. 
 *
 * @param {string} sPath A string containing the path to the data that should be removed. 
 *                       The path is concatenated to the sServiceUrl which was specified in the model constructor.
 * @param {object} [oParameters] Optional, can contain the following attributes: oContext, fnSuccess, fnError, sETag: 
 * @param {object} [oParameters.oContext] If specified the sPath has to be relative to the path given with the context.
 * @param {function} [oParameters.fnSuccess]  a callback function which is called when the data has been successfully retrieved. 
 *                       The handler can have the following parameters: <code>oData<code> and <code>response</code>.
 * @param {function} [oParameters.fnError] a callback function which is called when the request failed. 
 *                       The handler can have the parameter: <code>oError</code> which contains additional error information.
 * @param {string} [oParameters.sETag] If specified, the If-Match-Header will be set to this Etag.
 * 
 * @return {object} an object which has an <code>abort</code> function to abort the current request.
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.remove = function(sPath, oParameters) {
	var oContext, fnSuccess, fnError, oRequest, sUrl, sETag;
	// maintain compatibility, check if the old or new function parameters are used and set values accordingly: 
	if ((oParameters && oParameters instanceof sap.ui.model.Context) || arguments[2])
	{
		oContext = oParameters;
		fnSuccess = arguments [2];
		fnError = arguments [3];
	} else {
	  if (oParameters){
	  	oContext = oParameters.oContext;
			fnSuccess = oParameters.fnSuccess;
			fnError = oParameters.fnError;
			sETag = oParameters.sETag;
	  }
	}
	sUrl = this._getChangeUrl(sPath, oContext);

	oRequest = this._createChangeRequest(sUrl, null, "DELETE", false, sETag);
	
	this.oRequestQueue[oRequest.requestUri] = oRequest;

	return this._submitChange(oRequest, fnSuccess, fnError);
	
};

/**
 * Trigger a request to the function import odata service that was specified in the model constructor.
 *
 * @param {string} sFunctionName A string containing the name of the function to call.
 *                       The name is concatenated to the sServiceUrl which was specified in the model constructor.
 * @param {string} sMethod A string containing the type of method to call this function with
 * @param {map} oParameters A map containing the parameters that will be passed as query strings
 * @param {object} oContext If specified the sPath has to be relative to the path given with the context.
 * @param {function} fnSuccess  a callback function which is called when the data has been successfully retrieved.
 *                       The handler can have the following parameters: <code>oData<code> and <code>response</code>.
 * @param {function} fnError a callback function which is called when the request failed.
 *                       The handler can have the parameter: <code>oError</code> which contains additional error information.
 * @return {object} an object which has an <code>abort</code> function to abort the current request.
 *
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.callFunction = function (sFunctionName, sMethod, oParameters, oContext, fnSuccess, fnError) {
    var oRequest, sUrl;
    var that = this;
    var oUrlParams = {};
    var oFunctionMetadata = this.oMetadata._getFunctionImportMetadata(sFunctionName, sMethod);
    jQuery.sap.assert(oFunctionMetadata, "Function " + sFunctionName + " not found in the metadata !");
    if (oFunctionMetadata) {
        sUrl = this._getChangeUrl(sFunctionName, oContext);

        var sUrlURI = URI(sUrl);
        if (oFunctionMetadata.parameter != null) {
            jQuery.each(oParameters, function (sParameterName, oParameterValue) {
                var matchingParameters = jQuery.grep(oFunctionMetadata.parameter, function (oParameter) {
                    return oParameter.name == sParameterName && oParameter.mode == "In";
                });
                if (matchingParameters != null && matchingParameters.length > 0) {
                    var matchingParameter = matchingParameters[0];
                    oUrlParams[sParameterName] = that.formatValue(oParameterValue, matchingParameter.type);
                }
                else {
                    jQuery.sap.log.warning("Parameter " + sParameterName + " is not defined for function call " + sFunctionName + "!");
                }
            });
        }
        if (sMethod === "GET") {
        	// parameters are encoded in read function
            that.read(sFunctionName, oContext, oUrlParams, true, fnSuccess, fnError)
        }
        else {
            jQuery.each(oUrlParams, function (sParameterName, oParameterValue) {
            	// addQuery also encodes the url
                sUrlURI.addQuery(sParameterName, oParameterValue);
            });
            oRequest = this._createChangeRequest(sUrlURI.toString(), null, sMethod, false);

            this.oRequestQueue[oRequest.requestUri] = oRequest;

            return this._submitChange(oRequest, fnSuccess, fnError);
        }
    }
};

/**
 * Trigger a GET request to the odata service that was specified in the model constructor. 
 * The data will not be stored in the model. The requested data is returned with the response.
 *
 * @param {string} sPath A string containing the path to the data which should
 *            				be retrieved. The path is concatenated to the sServiceUrl
 *            				which was specified in the model constructor.
 * @param {object} [oContext] If specified the sPath has to be is relative to the path given with the context. 
 * @param {any[]} [oUrlParams] An map of url parameters which will be concatenated to the read url
 *
 * @param {boolean} [bAsync] true for asynchronous requests. Default is true.
 * 
 * @param {function} [fnSuccess] a callback function which is called when the data has
 *            					 been successfully retrieved. The handler can have the 
 *            	                 following parameters: oData and response. 
 * @param {function} [fnError] a callback function which is called when the request failed. The handler can have the parameter: oError which contains
 * additional error information.
 * 
 * @return {object} an object which has an <code>abort</code> function to abort the current request.
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.read = function(sPath, oContext, oUrlParams, bAsync, fnSuccess, fnError) {
	var oRequest, sUrl,
		that = this,
		aUrlParams = [];
	
	sUrl = this._getChangeUrl(sPath, oContext);
	
	if (oUrlParams && !jQuery.isArray(oUrlParams)) {
		// convert parameter map into parameter array as needed by read function
		jQuery.each(oUrlParams, function (sParameterName, oParameterValue) {
			if (jQuery.type(oParameterValue) === "string") {
				oParameterValue = jQuery.sap.encodeURL(oParameterValue);				
			}
			aUrlParams.push(jQuery.sap.encodeURL(sParameterName) + "=" + oParameterValue);
		});		
	} else {
		// compatibility with old aUrlParams array
		aUrlParams = oUrlParams;
	}
	
	oRequest = this._createRequest(sUrl.replace(this.sServiceUrl,''), aUrlParams, bAsync);
	
	if (this.bUseBatch) {
		this.clearBatch();

		var sRequestUrl = this._getBatchUrl(oRequest.requestUri);
		
		var oReadOp = that.createBatchOperation(sRequestUrl, "GET");
		that.addBatchReadOperations([oReadOp]);
		
		// check if embedded errors occurred in success request
		var _fnSuccess = function(oData, oResponse){
			// check if errors occurred in the batch
			var aErrorResponses = that._getBatchErrors(oData);
			if (aErrorResponses.length > 0) {
				// call handle error with the first error.
				if (fnError) {
					fnError(aErrorResponses[0]);					
				}
				return false;
			}
			// first response should contain the data
			if (oData.__batchResponses && oData.__batchResponses.length > 0) {
				oData = oData.__batchResponses[0].data;
			} else {
				jQuery.sap.log.fatal("The following problem occurred: No data was retrieved by service: " + oResponse.requestUri);
			}
			if (fnSuccess) {
				fnSuccess(oData, oResponse);				
			}
		}
		
		return that.submitBatch(_fnSuccess, fnError, oRequest.async);
	} else {
		return OData.read(oRequest, fnSuccess, fnError, this.oHandler, null, this.getServiceMetadata());		
	}
	
};

sap.ui.model.odata.ODataModel.prototype._getBatchUrl = function(sUrl) {
	// batch requests only need the path without the service URL
	// extract query of url and combine it with the path...
	var sExtractedUrl = sUrl.replace(this.sServiceUrl,'');
	var sRequestUrl = sExtractedUrl.replace(/\/$/, ""); // remove trailing slash if any
	return sRequestUrl;
};

/**
 * Creates a single batch operation (read or change operation) which can be used in a batch request.
 * 
 * @param {string} sPath A string containing the path to the collection or entry where the batch operation should be performed.
 * 						The path is concatenated to the sServiceUrl which was specified in the model constructor.
 * @param {string} sMethod for the batch operation. Possible values are GET, PUT, MERGE, POST, DELETE
 * @param {object} [oData] optional data payload which should be created, updated, deleted in a change batch operation.
 * @param {object} [oParameters] optional parameter for additional information introduced in SAPUI5 1.9.1, 
 * @param {string} [oParameters.sETag] an ETag which can be used for concurrency control. If it is specified, 
 *                  it will be used in an If-Match-Header in the request to the server for this entry.    
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.createBatchOperation = function(sPath, sMethod, oData, oParameters) {
	var oChangeHeader = {}, sETag;
	jQuery.extend(oChangeHeader, this.mCustomHeaders, this.oHeaders);
	
	// for batch remove starting / if any
	if (jQuery.sap.startsWith(sPath, "/")) {
		sPath = sPath.substr(1);
	}
	
	if (oParameters){
		sETag = oParameters.sETag;
	}
	
	if (sMethod != "GET"){
		this._setCurrentETag(sPath, oData, sETag);
		if(this.sETag){
			oChangeHeader["If-Match"] = this.sETag;
		}
	}
	// make sure to set content type header for POST/PUT requests when using JSON format to prevent datajs to add "odata=verbose" to the content-type header
	// may be removed as later gateway versions support this
	if (this.bJSON){
		if (sMethod != "DELETE" && sMethod != "GET" && this.sMaxDataServiceVersion === "2.0") {
			oChangeHeader["Content-Type"] = "application/json";
		}
	}
	else {
		// for XML case set the content-type accordingly so that the data is transformed to XML in the batch part
		oChangeHeader["Content-Type"] = "application/atom+xml";
	}
	
	var oRequest = {
		requestUri: sPath,
		method: sMethod.toUpperCase(),
		headers: oChangeHeader
	};
	
	if (oData) {
		oRequest.data = oData;
	}
	
	return oRequest;

};

/**
 * Appends the read batch operations to the end of the batch stack. Only GET batch operations should be included in the specified array. 
 * If an illegal batch operation is added to the batch nothing will be performed and false will be returned.
 * 
 * @param {any[]} aReadOperations an array of read batch operations created via <code>createBatchOperation</code> and <code>sMethod</code> = GET
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.addBatchReadOperations = function(aReadOperations) {
	if (!jQuery.isArray(aReadOperations) || aReadOperations.length <= 0) {
		jQuery.sap.log.warning("No array with batch operations provided!");
		return false;
	}
	var that = this;
	jQuery.each(aReadOperations, function(iIndex, oReadOperation) {
		if (oReadOperation.method != "GET") {
			jQuery.sap.log.warning("Batch operation should be a GET operation!");
			return false;
		}
		that.aBatchOperations.push(oReadOperation);
	});
};

/**
 * Appends the change batch operations to the end of the batch stack. Only PUT, POST or DELETE batch operations should be included in the specified array. 
 * The operations in the array will be included in a single changeset. To embed change operations in different change sets call this method with the corresponding change operations again.
 * If an illegal batch operation is added to the change set nothing will be performed and false will be returned.
 * 
 * @param {any[]} aChangeOperations an array of change batch operations created via <code>createBatchOperation</code> and <code>sMethod</code> = POST, PUT, MERGE or DELETE
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.addBatchChangeOperations = function(aChangeOperations) {
	if (!jQuery.isArray(aChangeOperations) || aChangeOperations.length <= 0) {
		return false;
	}
	jQuery.each(aChangeOperations, function(iIndex, oChangeOperation) {
		if (oChangeOperation.method != "POST" && oChangeOperation.method != "PUT" && oChangeOperation.method != "MERGE" && oChangeOperation.method != "DELETE") {
			jQuery.sap.log.warning("Batch operation should be a POST/PUT/MERGE/DELETE operation!");
			return false;
		}
	});
	this.aBatchOperations.push({ __changeRequests : aChangeOperations });
};

/**
 * Removes all operations in the current batch.
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.clearBatch = function() {
	this.aBatchOperations = [];
};

/**
 * Submits the collected changes in the batch which were collected via <code>addBatchReadOperations</code> or <code>addBatchChangeOperations</code>.
 * The batch will be cleared afterwards. If the batch is empty no request will be performed and false will be returned.
 * Note: No data will be stored in the model. 
 *  
 * @param {function} [fnSuccess] a callback function which is called when the batch request has
 *            					 been successfully sent. Note: There might have errors occured in the single batch operations. These errors can be accessed in the
 *            aErrorResponses parameter in the callback handler.
 *            The handler can have the 
 *            	                 following parameters: oData, oResponse and aErrorResponses. 
 * 
 * @param {function} [fnError] a callback function which is called when the batch request failed. The handler can have the parameter: oError which contains
 * additional error information.
 * @param {boolean} [bAsync] true for asynchronous request. Default is true.
 * 
 * @return {object} an object which has an <code>abort</code> function to abort the current request. Returns false if no request will be performed because the batch is empty.
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.submitBatch = function(fnSuccess, fnError, bAsync) {
	var oRequest, sUrl; 

	// ensure compatibility with old declaration: // bAsync, fnSuccess, fnError 
	if (!(typeof(fnSuccess) == "function")) {
		var fnOldError = bAsync;
		var fnOldSuccess = fnError;
		bAsync = fnSuccess;
		fnSuccess = fnOldSuccess;
		fnError = fnOldError; 
	}

	if (this.aBatchOperations.length <= 0) {
		jQuery.sap.log.warning("No batch operations in batch. No request will be triggered!");
		return false;
	}

	sUrl = this.sServiceUrl	+ "/$batch";
	
	if (this.sUrlParams) {
		sUrl += "?" + this.sUrlParams;
	}
	
	var oChangeHeader = {};
	jQuery.extend(oChangeHeader, this.mCustomHeaders, this.oHeaders);

	// reset
	delete oChangeHeader["Content-Type"];

	// create payload
	var oPayload = { };
	oPayload.__batchRequests = this.aBatchOperations;
	
	if (bAsync === undefined) {
		bAsync = true;
	}

	var oRequest = {
		    headers : oChangeHeader, 
		    requestUri : sUrl, 
		    method : "POST",
		    data : oPayload,
		    user: this.sUser,
		    password: this.sPassword,
		    async: bAsync
	};
	
	if (bAsync) {
		oRequest.withCredentials = this.bWithCredentials; 
	}

	return this._submitBatch(oRequest, fnSuccess, fnError);
};

/**
 * Return the metadata object. Please note that when using the model with bLoadMetadataAsync = true then this function might return undefined because the
 * metadata has not been loaded yet.
 * In this case attach to the <code>metadataLoaded</code> event to get notified when the metadata is available and then call this function.
 *
 * @return {Object} metdata object
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.getServiceMetadata = function() {
	if (this.oMetadata.getServiceMetadata) {
		return this.oMetadata.getServiceMetadata();		
	}
	return undefined;
};


/**
 * Submits the collected changes which were collected by the setProperty method. A MERGE request will be triggered to only update the changed properties.
 * If a URI with a $expand System Query Option was used then the expand entries will be removed from the collected changes.
 * Changes to this entries should be done on the entry itself. So no deep updates are supported.
 * 
 * @param {function} [fnSuccess] a callback function which is called when the data has
 *            					 been successfully updated. The handler can have the 
 *            	                 following parameters: oData and response. 
 * @param {function} [fnError] a callback function which is called when the request failed. The handler can have the parameter: oError which contains
 * additional error information
 * @param {object} [oParameters] optional parameter for additional information introduced in SAPUI5 1.9.1 
 * @param {string} [oParameters.sETag] an ETag which can be used for concurrency control. If it is specified, it will be used in an If-Match-Header in the request to the server for this entry.
 * @return {object} an object which has an <code>abort</code> function to abort the current request.
 * 
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.submitChanges = function(fnSuccess, fnError, oParameters) {

	var oRequest, oPayload, that = this, sPath, sETag, sType;
	
	if (this.sChangeKey) {	

		sPath = this.sChangeKey.replace(this.sServiceUrl,'');

		oPayload = this._getObject(sPath);

		if (jQuery.isPlainObject(oPayload)) {
			// do a copy of the payload or the changes will be deleted in the model as well (reference)
			oPayload = jQuery.extend(true, {}, oPayload);
			// remove metadata, navigation properties to reduce payload
			if (oPayload.__metadata) {
				sType = oPayload.__metadata.type;
				delete oPayload.__metadata; 
				// type information may be needed by an odata service!!!
				if (sType) {
					oPayload.__metadata = { type : sType };					
				}
			}
			jQuery.each(oPayload, function(sPropName, oPropValue) {
				if (oPropValue && oPropValue.__deferred) {
					delete oPayload[sPropName];
				}
			});

			// delete expand properties = navigation properties
			var oEntityType = this.oMetadata._getEntityTypeByPath(sPath);
			if (oEntityType) {
				var aNavProps = this.oMetadata._getNavigationPropertyNames(oEntityType);
				jQuery.each(aNavProps, function(iIndex, sNavPropName) {
					delete oPayload[sNavPropName];
				});
			} 
			// remove any yet existing references which should already have been deleted 
			oPayload = this._removeReferences(oPayload);
		}
		if (oParameters){
			sETag = oParameters.sETag;
		}

		oRequest = this._createChangeRequest(this.sChangeKey, oPayload, "MERGE", true, sETag);

		this.oRequestQueue[this.sChangeKey] = oRequest;
	}
	function _handleSuccess(oData, oResponse) {
		if (fnSuccess) {
			fnSuccess(oData, oResponse);
		}
	}
	function _handleError(oError) {
		if (fnError) {
			fnError(oError);
		} 
	}

	//loop request queue
	jQuery.each(this.oRequestQueue, function(sKey, oRequest){
		//remove create flag
		oRequest.data._bCreate ? delete oRequest.data._bCreate : false;
		that._submitChange(oRequest, _handleSuccess, _handleError);
	});
	return undefined;
};

/**
 * 
 * Resets the collected changes by the setProperty method and reloads the data from the server.
 * 
 * @param {function} [fnSuccess] a callback function which is called when the data has
 *            					 been successfully resetted. The handler can have the 
 *            	                 following parameters: oData and response. 
 * @param {function} [fnError] a callback function which is called when the request failed
 * 
 * @public
 */ 
sap.ui.model.odata.ODataModel.prototype.resetChanges = function(fnSuccess, fnError) {
	
	var sPath;
	if (this.sChangeKey) {
		sPath = this.sChangeKey.replace(this.sServiceUrl,'');
		this._loadData(sPath, null, fnSuccess, fnError);
	}
};

/**
 * Sets a new value for the given property <code>sPropertyName</code> in the model without triggering a server request.
 *  This can be done by the submitChanges method.
 *  
 *  Note: Only one entry of one collection can be updated at once. Otherwise a fireRejectChange event is fired.
 *  
 *  Before updating a different entry the existing changes of the current entry have to be submitted or resetted by the
 *  corresponding methods: submitChanges, resetChanges.
 *  
 *  IMPORTANT: All pending changes are resetted in the model if the application triggeres any kind of requests 
 *  which change the model data e.g. sorting, filtering, refresh, create, remove, update. Make sure to
 *  submit the pending changes first. To determine if there are any pending changes call the hasPendingChanges method.
 * 
 * @param {string}  sPath path of the property to set
 * @param {any}     oValue value to set the property to
 * @param {object} [oContext=null] the context which will be used to set the property
 * @return {boolean} true if the value was set correctly and false if errors occurred like the entry was not found or another entry was already updated.
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.setProperty = function(sPath, oValue, oContext) {
		
	var sProperty, oEntry = { }, 
		sChangeKey = this._getChangeUrl(sPath, oContext),
		sObjectPath = sPath.substring(0, sPath.lastIndexOf("/")),
		success = false;
	
	// check if path / context is valid
	if (!this.resolve(sPath, oContext)) {
		return success;
	}
	
	// extract the Url that points to the 'entry'. We need to do this if a complex type will be updated.
	sChangeKey = sChangeKey.replace(this.sServiceUrl+'/','');
	sChangeKey = sChangeKey.substring(0, sChangeKey.indexOf("/")),
	sChangeKey = this.sServiceUrl + '/' + sChangeKey,
	
	sProperty = sPath.substr(sPath.lastIndexOf("/")+1);
	oEntry = this._getObject(sObjectPath, oContext);
	
	if (oEntry._bCreate) {
		oEntry[sProperty] = oValue;
		success = true;
		this.checkUpdate(false, oContext);
	} else {
		if (!this.sChangeKey) {
			this.sChangeKey = sChangeKey;
		} 

		if (this.sChangeKey == sChangeKey) {
			oEntry[sProperty] = oValue;
			success = true;
			this.checkUpdate(false, oContext);
		} else {
			this.fireRejectChange(
					{rejectedValue : oValue,
						oldValue: oEntry[sProperty]}
			);
		}
	}
	return success;
	
};


sap.ui.model.odata.ODataModel.prototype._isHeaderPrivate = function(sHeaderName) {
	// case sensitive check needed to make sure private headers cannot be overriden by difference in the upper/lower case (e.g. accept and Accept).
	switch(sHeaderName.toLowerCase()) {
		case "accept":
		case "accept-language":
		case "maxdataserviceversion":
		case "dataserviceversion":
			return true;
			break;
		case "x-csrf-token":
			return this.bTokenHandling;
			break;
		default:
			return false;
	}
};

/**
 * Set custom headers which are provided in a key/value map. These headers are used for requests against the OData backend.
 * Private headers which are set in the ODataModel cannot be modified.
 * These private headers are: accept, accept-language, x-csrf-token, MaxDataServiceVersion, DataServiceVersion.
 * 
 * To remove these headers simply set the mCustomHeaders parameter to null. Please also note that when calling this method again all previous custom headers 
 * are removed unless they are specified again in the mCustomHeaders parameter. 
 * 
 * @param {object} mHeaders the header name/value map.
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.setHeaders = function(mHeaders) {	
	var mCheckedHeaders = {}, 
		that= this;
	if (mHeaders) {
		jQuery.each(mHeaders, function(sHeaderName, sHeaderValue){
			// case sensitive check needed to make sure private headers cannot be overriden by difference in the upper/lower case (e.g. accept and Accept).
			if (that._isHeaderPrivate(sHeaderName)){
				jQuery.sap.log.warning("Not allowed to modify private header: " + sHeaderName);				
			}
			else {
				mCheckedHeaders[sHeaderName] = sHeaderValue;				
			}
		});		
		this.mCustomHeaders = mCheckedHeaders;
	} else {
		this.mCustomHeaders = {};
	}
	
};

/**
 * Returns all headers and custom headers which are stored in the OData model.
 * @return {object} the header map
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.getHeaders = function() {
	return jQuery.extend({}, this.mCustomHeaders, this.oHeaders);
};

/**
 * Searches the specified headers map for the specified header name and converts the found header to the case form of the sConvertHeader
 * e.g. sConvertHeader = "myHeader". mHeader = {"MYHEAder" : "test"}
 * --> will be converted to mHeader = {"myHeader" : "test"}
 */
sap.ui.model.odata.ODataModel.prototype._convertHeaders = function(sConvertHeader, mHeaders) {
	var sHeaderName, oHeaderValue;
	for (sHeaderName in mHeaders) {
		if (sHeaderName !== sConvertHeader && sHeaderName.toLowerCase() === sConvertHeader.toLowerCase()) {
			oHeaderValue = mHeaders[sHeaderName];
			delete mHeaders[sHeaderName];
			mHeaders[sConvertHeader] = oHeaderValue;
			break;
		}
	}
};

/**
 * Checks if there exist pending changes in the model created by the setProperty method.
 * @return {boolean} true/false  
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.hasPendingChanges = function() {
	return this.sChangeKey != null;
};

/**
 * update all bindings
 * @param {boolean} [bForceUpdate=false] If set to false an update  will only be done when the value of a binding changed.
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.updateBindings = function(bForceUpdate) {
	this.checkUpdate(bForceUpdate);
};

/**
 * Force no caching
 * @param {boolean} [bForceNoCache=false] whether to force no caching
 * @public
 * @deprecated The caching should be controlled by the backend by setting the correct cache control header
 */
sap.ui.model.odata.ODataModel.prototype.forceNoCache = function(bForceNoCache) {
	this.bCache = !bForceNoCache; 
};

/**
 * Enable/Disable XCSRF-Token handling
 * @param {boolean} [bTokenHandling=true] whether to use token handling or not
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.setTokenHandlingEnabled  = function(bTokenHandling) {
	this.bTokenHandling = bTokenHandling; 
};

/**
 * Enable/Disable batch for all requests
 * @param {boolean} [bUseBatch=true] whether the requests should be encapsulated in a batch request
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.setUseBatch  = function(bUseBatch) {
	this.bUseBatch = bUseBatch;
};

/**
 * Format a JavaScript value according to the given EDM type
 * http://www.odata.org/documentation/overview#AbstractTypeSystem
 * 
 * @param {any} vValue the value to format
 * @param {string} sType the EDM type (e.g. Edm.Decimal)
 * @return {string} the formatted value
 */
sap.ui.model.odata.ODataModel.prototype.formatValue = function(vValue, sType) {
	// Lazy creation of format objects
	if (!this.oDateTimeFormat) {
		this.oDateTimeFormat = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "'datetime'''yyyy-MM-dd'T'HH:mm:ss''"
		});
		this.oDateTimeOffsetFormat = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "'datetimeoffset'''yyyy-MM-dd'T'HH:mm:ss'Z'''"
		});
		this.oTimeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
			pattern: "'time'''HH:mm:ss''"
		});
	}

	// Format according to the given type
	var sValue;
	switch(sType) {
		case "Edm.String":
			// quote
			sValue = "'" + String(vValue).replace(/'/g, "''") + "'";
			break;
		case "Edm.Time":
			sValue = "time'" + vValue + "'";
			break;			
		case "Edm.DateTime":
			sValue = this.oDateTimeFormat.format(new Date(vValue), true);
			break;
		case "Edm.DateTimeOffset":
			sValue = this.oDateTimeOffsetFormat.format(new Date(vValue), true);
			break;
		case "Edm.Guid":
			sValue = "guid'" + vValue + "'";
			break;
		case "Edm.Decimal":
			sValue = vValue + "M";
			break;
		case "Edm.Int64":
			sValue = vValue + "L";
			break;
		case "Edm.Single":
			sValue = vValue + "f";
			break;				
		case "Edm.Binary":
			sValue = "binary'" + vValue + "'";
			break;
		default: 
			sValue = new String(vValue);
			break;
	}
	return sValue;
};

/**
 * Deletes a created entry from the request queue and the model.
 * @param {sap.ui.model.Context} oContext The context object pointing to the created entry
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.deleteCreatedEntry = function(oContext) {	
	if (oContext) {
		var sPath = oContext.getPath();
		delete this.mContexts[sPath]; // contexts are stored starting with /
		// remove starting / if any
		if (jQuery.sap.startsWith(sPath, "/")) {
			sPath = sPath.substr(1);
		}
		delete this.oRequestQueue[sPath];
		delete this.oData[sPath];
		
	}
};

/**
 * Creates a new entry object which is described by the metadata of the entity type of the 
 * specified sPath Name. A context object is returned which can be used to bind
 * against the newly created object. 
 * 
 * For each created entry a request is created and stored in a request queue.
 * The request queue can be submitted by calling submitChanges. To delete a created
 * entry from the request queue call deleteCreateEntry. 
 * 
 * The optional vProperties parameter can be used as follows:
 * 
 *   - vProperties could be an array containing the property names which should be included 
 *     in the new entry. Other properties defined in the entity type are not included.
 *   - vProperties could be an object which includes the desired properties and the values 
 *     which should be used for the created entry.
 *  
 * If vProperties is not specified, all properties in the entity type will be included in the 
 * created entry.
 * 
 * If there are no values specified the properties will have undefined values.
 * 
 * Please note that deep creates (including data defined by navigationproperties) are not supported
 *
 * @param {String} sPath Name of the path to the collection
 * @param {array|object} vProperties An array that specifies a set of properties or the entry
 * @return {sap.ui.model.Context} oContext A Context object that point to the new created entry.  
 * @public
 */
sap.ui.model.odata.ODataModel.prototype.createEntry = function(sPath, vProperties) {
	if (!jQuery.sap.startsWith(sPath, "/")) {
		sPath = "/" + sPath;
	}
	var oEntity = {};
	var oEntityMetadata = this.oMetadata._getEntityTypeByPath(sPath);
	if (!oEntityMetadata) {
		jQuery.sap.assert(oEntityMetadata, "No Metadata for collection "+sPath+" found");
		return undefined;
	}
	if (typeof vProperties === "object" && !jQuery.isArray(vProperties)) {
		oEntity = vProperties;
	} else {
		for (var i = 0; i < oEntityMetadata.property.length; i++) {
			var oPropertyMetadata = oEntityMetadata.property[i];
			
			var aType = oPropertyMetadata.type.split('.');
			var bPropertyInArray = jQuery.inArray(oPropertyMetadata.name,vProperties) > -1; 
			if (!vProperties || bPropertyInArray)  {
				oEntity[oPropertyMetadata.name] = this._createPropertyValue(aType);
				if (bPropertyInArray) {
					vProperties.splice(vProperties.indexOf(oPropertyMetadata.name),1);
				}
			}
		}
		if (vProperties) {
			jQuery.sap.assert(vProperties.length === 0, "No metadata for the following properties found: "+vProperties.join(","));
		}
	}
	//mark as entity for create; we need this for setProperty
	oEntity._bCreate = true;
	
	// remove starting / for key only
	var sKey = sPath.substring(1) +"('"+jQuery.sap.uid()+"')";
	
	this.oData[sKey] = oEntity;
	
	oEntity.__metadata = {type: ""+ oEntityMetadata.entityType};
	
	var sChangeKey = this._getChangeUrl(sPath); 
	
	var oRequest = this._createChangeRequest(sChangeKey, oEntity, "POST", true);
	
	this.oRequestQueue[sKey] = oRequest;
	
	return this.getContext("/" + sKey); // context wants a path
};

/**
 * Return value for a property. This can also be a ComplexType property
 * @param {array} aType Type splitted by dot and passed as array
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._createPropertyValue = function(aType) {
	var sNamespace = aType[0];
	var sTypeName = aType[1];
	if (sNamespace.toUpperCase() !== 'EDM') {
		var oComplexType = {};
		var oComplexTypeMetadata = this.oMetadata._getObjectMetadata("complexType",sTypeName,sNamespace);
		jQuery.sap.assert(oComplexTypeMetadata, "Compley type " + sTypeName + " not found in the metadata !");
		for (var i = 0; i < oComplexTypeMetadata.property.length; i++) {
			var oPropertyMetadata = oComplexTypeMetadata.property[i];
			var aType = oPropertyMetadata.type.split('.');
			oComplexType[oPropertyMetadata.name] = this._createPropertyValue(aType);
		}
		return oComplexType;
	} else {
		return this._getDefaultPropertyValue(sTypeName,sNamespace);
	}
};

/**
 * Returns the default value for a property
 * @param {string} sType
 * @param {string} sNamespace  
 * @private
 */
sap.ui.model.odata.ODataModel.prototype._getDefaultPropertyValue = function(sType, sNamespace) {
	return undefined;
};

/**
 * Enable/Disable automatic updates of all Bindings after change operations
 * @param {boolean} bRefreshAfterChange
 * @public
 * @since 1.16.3
 */
sap.ui.model.odata.ODataModel.prototype.setRefreshAfterChange = function(bRefreshAfterChange) {
	this.bRefreshAfterChange = bRefreshAfterChange;
};
