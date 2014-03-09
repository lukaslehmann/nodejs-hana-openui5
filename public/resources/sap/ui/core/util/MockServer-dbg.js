/*
* SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/

// Provides class sap.ui.core.util.MockServer for mocking a server
jQuery.sap.declare("sap.ui.core.util.MockServer");
jQuery.sap.require("sap.ui.base.ManagedObject");

jQuery.sap.require("sap.ui.thirdparty.sinon");

if (!!sap.ui.Device.browser.internet_explorer) {
       jQuery.sap.require("sap.ui.thirdparty.sinon-ie");
}

/*global URI *///declare unusual global vars for JSLint/SAPUI5 validation

(function() {
       

       /**
       * Creates a mocked server. This helps to mock all or some backend calls, e.g. for OData/JSON Models or simple XHR calls, without
       * changing the application code. This class can also be used for qunit tests.
       * 
        * @param {string} [sId] id for the new server object; generated automatically if no non-empty id is given
       *      Note: this can be omitted, no matter whether <code>mSettings</code> will be given or not!
       * @param {object} [mSettings] optional map/JSON-object with initial property values, aggregated objects etc. for the new object
       * @param {object} [oScope] scope object for resolving string based type and formatter references in bindings
       * 
        * @class Class to mock a server
       * @extends sap.ui.base.ManagedObject
       * @abstract
       * @author SAP
       * @version 1.16.8-SNAPSHOT
       * @public
       * @name sap.ui.core.util.MockServer
       * @experimental Since 1.15.1. The mock server is still under construction, so some implementation details can be changed in future.
       */
       sap.ui.base.ManagedObject.extend("sap.ui.core.util.MockServer", /** @lends sap.ui.core.util.MockServer */
       {
             constructor : function(sId, mSettings, oScope) {
                    sap.ui.base.ManagedObject.apply(this, arguments);
                    sap.ui.core.util.MockServer._aServers.push(this);
             },

             metadata : {
                    properties : {
                           /**
                           * Setter for property <code>rootUri</code>. All request path URI are prefixed with this root URI if set.
                           *
                           * Default value is empty/<code>undefined</code>
                           * @param {string} rootUri new value for property <code>rootUri</code>
                           * @public
                           * @name sap.ui.core.util.MockServer#setRootUri
                           * @function
                           */

                           /**
                           * Getter for property <code>rootUri</code>.
                           *
                           * Default value is empty/<code>undefined</code>
                           *
                           * @return {string} the value of property <code>rootUri</code>
                           * @public
                           * @name sap.ui.core.util.MockServer#getRootUri
                           * @function
                           */
                           rootUri : "string",

                           /**
                           * Setter for property <code>requests</code>.
                           * 
                            * Default value is is <code>[]</code>
                           * 
                            * Each array entry should consist of an array with the following properties / values:
                           *
                           * <ul>
                           * <li><b>method <string>: "GET"|"POST"|"DELETE|"PUT"</b>
                           * <br>
                           * (any HTTP verb)
                           * </li>
                           * <li><b>path <string>: "/path/to/resource"</b>
                           * <br> 
                            * The path is converted to a regular expression, so it can contain normal regular expression syntax.
                           * All regular expression groups are forwarded as arguments to the <code>response</code> function.
                           * In addition to this, parameters can be written in this notation: <code>:param</code>. These placeholder will be replaced by regular expression groups.
                           * </li>
                           * <li><b>response <function>: function(xhr, param1, param2, ...) { }</b>
                           * <br>
                           * The xhr object can be used to respond on the request. Supported methods are:
                           * <br>
                           * <code>xhr.respond(iStatusCode, mHeaders, sBody)</code>
                           * <br>
                           * <code>xhr.respondJSON(iStatusCode, mHeaders, oJsonObjectOrString)</code>. By default a JSON header is set for response header
                           * <br>
                           * <code>xhr.respondXML(iStatusCode, mHeaders, sXmlString)</code>. By default a XML header is set for response header
                           * <br>
                           * <code>xhr.respondFile(iStatusCode, mHeaders, sFileUrl)</code>. By default the mime type of the file is set for response header
                           * </li>
                           * </ul>
                           * 
                            * @param {object[]} requests new value for property <code>requests</code>
                           * @public
                           * @name sap.ui.core.util.MockServer#setRequests
                           * @function
                           */

                           /**
                           * Getter for property <code>requests</code>.
                           *
                           * Default value is <code>[]</code>
                           *
                           * @return {object[]} the value of property <code>rootUri</code>
                           * @public
                           * @name sap.ui.core.util.MockServer#getRequests
                           * @function
                           */
                           requests : {type:"object[]", defaultValue:[]}
                    }
             },

             _oServer : null,
             _aFilter : null,
             _oMockdata: null,
             _oMetadata: null,
             _sMetadataUrl: null,
             _sMockdataBaseUrl: null
             
       });


       /**
       * Starts the server.
       * @public
       */
       sap.ui.core.util.MockServer.prototype.start = function() {
             this._oServer = sap.ui.core.util.MockServer._getInstance();
             this._aFilters = [];
             var aRequests = this.getRequests();
             var iLength = aRequests.length;
             for (var i = 0; i < iLength; i++) {
                    var oRequest = aRequests[i];
                    this._addRequestHandler(oRequest.method, oRequest.path, oRequest.response);
             }
       };


       /**
       * Stops the server.
       * @public
       */
       sap.ui.core.util.MockServer.prototype.stop = function() {
             if (this.isStarted()) {
                    this._removeAllRequestHandlers();
                    this._removeAllFilters();
                    this._oServer = null;
             }
       };


       /**
       * Returns whether the server is started or not.
       * 
        * @return {boolean} whether the server is started or not.
       * @public
       */
       sap.ui.core.util.MockServer.prototype.isStarted = function() {
             return !!this._oServer;
       };


       /**
       * Refreshes the service metadata document and the mockdata
       * 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._refreshData = function() {
             var that = this;
             
             // load the metadata
             this._loadMetadata(this._sMetadataUrl);
             
             // here we need to analyse the EDMX and identify the entity sets
             var mEntitySets = this._findEntitySets(this._oMetadata) 

             if (this._sMockdataBaseUrl == null) {
                    // load the mockdata
                    this._generateMockdata(mEntitySets, this._oMetadata);
             } else {
                    // check the mockdata base URL to end with a slash
                    if (!jQuery.sap.endsWith(this._sMockdataBaseUrl, "/") && !jQuery.sap.endsWith(this._sMockdataBaseUrl, ".json")) {
                           this._sMockdataBaseUrl += "/";
                    }
                    // load the mockdata
                    this._loadMockdata(mEntitySets, this._sMockdataBaseUrl);
             }
       };

       
       /**
       * Returns the root URI without query or hash parameters
       * @return {string} the root URI without query or hash parameters
       */
       sap.ui.core.util.MockServer.prototype._getRootUri = function() {
             var sUri = this.getRootUri();
             sUri = sUri && /([^?#]*)([?#].*)?/.exec(sUri)[1]; // remove URL parameters or anchors
             return sUri;
       };
       
       
       /**
       * Loads the service metadata for the given url
       * @param {string} sMetadataUrl url to the service metadata document
       * @return {XMLDocument} the xml document object 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._loadMetadata = function(sMetadataUrl) {
             
             // load the metadata
             var oMetadata = jQuery.sap.sjax({url: sMetadataUrl, dataType: "xml"}).data;
             jQuery.sap.assert(oMetadata !== undefined, "The metadata for url \"" + sMetadataUrl + "\" could not be found!");
             this._oMetadata = oMetadata;
             
             return oMetadata;
             
       };
       

       /**
       * find the entity sets in the metadata XML document
       * @param {XMLDocument} oMetadata the metadata XML document
       * @return {map} map of entity sets 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._findEntitySets = function(oMetadata) {
             
             // here we need to analyse the EDMX and identify the entity sets
             var mEntitySets = {};
             jQuery(oMetadata).find("EntitySet").each(function(iIndex, oEntitySet) {
                    var $EntitySet = jQuery(oEntitySet);
                    // split the namespace and the name of the entity type (namespace could have dots inside)
                    var aEntityTypeParts =/((.*)\.)?(.*)/.exec($EntitySet.attr("EntityType"));
                    mEntitySets[$EntitySet.attr("Name")] = {
                           "name": $EntitySet.attr("Name"), 
                           "schema": aEntityTypeParts[2],
                           "type": aEntityTypeParts[3],
                           "keys": [],
                           "navprops": {}
                    };
             });
             
             // helper function to find the entity set and property reference
             // for the given role name
             var fnResolveNavProp = function(sRole, bFrom) {
                    var sEntitySet = jQuery(jQuery(oMetadata).find("End[Role=" + sRole + "][EntitySet]")).attr("EntitySet");
                    var aPropRef = [];
                    jQuery(oMetadata).find("[Role=" + sRole + "]").find("PropertyRef").each(function(iIndex, oPropRef) {
                           aPropRef.push(jQuery(oPropRef).attr("Name"));
                    });
                    return {
                           "role": sRole,
                           "entitySet": sEntitySet,
                           "propRef": aPropRef
                    };
             };
             
             // find the navigation properties of the entity types
             jQuery.each(mEntitySets, function(sEntitySetName, oEntitySet) {
                    // find the keys
                    var aKeys = jQuery(oMetadata).find("EntityType[Name=" + oEntitySet.type + "] PropertyRef");
                    jQuery.each(aKeys, function(iIndex, oPropRef) {
                           oEntitySet.keys.push(jQuery(oPropRef).attr("Name"));
                    });
                    // resolve the navigation properties
                    var aNavProps = jQuery(oMetadata).find("EntityType[Name=" + oEntitySet.type + "] NavigationProperty");
                    jQuery.each(aNavProps, function(iIndex, oNavProp) {
                           var $NavProp = jQuery(oNavProp);
                           oEntitySet.navprops[$NavProp.attr("Name")] = {
                                  "name": $NavProp.attr("Name"),
                                  "from": fnResolveNavProp($NavProp.attr("FromRole")),
                                  "to": fnResolveNavProp($NavProp.attr("ToRole"))
                           };
                    })
             });

             // return the entity sets
             return mEntitySets;

       };
       
       
       /**
       * find the entity types in the metadata XML document
       * @param {XMLDocument} oMetadata the metadata XML document
       * @return {map} map of entity types
       * @private
       */
       sap.ui.core.util.MockServer.prototype._findEntityTypes = function (oMetadata) {
             var mEntityTypes = {};
             jQuery(oMetadata).find("EntityType").each(function (iIndex, oEntityType) {
                    var $EntityType = jQuery(oEntityType);
                    mEntityTypes[$EntityType.attr("Name")] = {
                           "name": $EntityType.attr("Name"),
                           "properties": [],
                           "keys": []
                    };
                    $EntityType.find("Property").each(function (iIndex, oProperty) {
                           var $Property = jQuery(oProperty);
                           var aPropertyTypeParts = $Property.attr("Type").split(".");
                           mEntityTypes[$EntityType.attr("Name")].properties.push({
                                  "schema": aPropertyTypeParts[0],
                                  "type": aPropertyTypeParts[1],
                                  "name": $Property.attr("Name"),
                                  "precision": $Property.attr("Precision"),
                                  "scale": $Property.attr("Scale")
                           })
                    });
                    $EntityType.find("PropertyRef").each(function (iIndex, oKey) {
                           var $Key = jQuery(oKey);
                           var sPropertyName = $Key.attr("Name");
                           mEntityTypes[$EntityType.attr("Name")].keys.push(sPropertyName);
                    });
             });
             return mEntityTypes;
       };

       
       /**
       * find the complex types in the metadata XML document
       * @param {XMLDocument} oMetadata the metadata XML document
       * @return {map} map of complex types
       * @private
       */
       sap.ui.core.util.MockServer.prototype._findComplexTypes = function (oMetadata) {
             var mComplexTypes = {};
             jQuery(oMetadata).find("ComplexType").each(function (iIndex, oComplexType) {
                    var $ComplexType = jQuery(oComplexType);
                    mComplexTypes[$ComplexType.attr("Name")] = {
                           "name": $ComplexType.attr("Name"),
                           "properties": []
                    };
                    $ComplexType.find("Property").each(function (iIndex, oProperty) {
                           var $Property = jQuery(oProperty);
                           var aPropertyTypeParts = $Property.attr("Type").split(".");
                           mComplexTypes[$ComplexType.attr("Name")].properties.push({
                                  "schema": aPropertyTypeParts[0],
                                  "type": aPropertyTypeParts[1],
                                  "name": $Property.attr("Name"),
                                  "precision": $Property.attr("Precision"),
                                  "scale": $Property.attr("Scale")
                           })
                    });
             });
             return mComplexTypes;
       };


       /**
       * creates a key string for the given keys and entry
       * @param {array} aKeys string array of key names
       * @param {object} oEntry entity set entry which contains the keys as properties
       * @return {string} the keys string
       * @private 
        */
       sap.ui.core.util.MockServer.prototype._createKeysString = function(aKeys, oEntry) {
             // creates the key string for an entity
             var sKeys = "";
             if (oEntry) {
                    jQuery.each(aKeys, function(iIndex, sKey) {
                           if (sKeys) {
                                  sKeys += ",";
                           }
                           sKeys += sKey + "='" + oEntry[sKey] + "'"; // TODO: consider datatype
                    });
             }
             return sKeys;
       };
       
       
       /**
       * loads the mock data for the given entity sets and tries to load them from
       * the files inside the given base url. The name of the JSON files containing the
       * mock data should be the same as the name of the underlying entity type. As
       * an alternative you could also specify the url to a single JSON file containing
       * the mock data for all entity types.
       * @param {map} mEntitySets map of entity sets
       * @param {string} sBaseUrl the base url which contains the mock data in JSON files or if the url is pointing to a JSON file containing all entity types
       * @return {array} the mockdata arary containing the data for the entity sets
       * @private 
        */
       sap.ui.core.util.MockServer.prototype._loadMockdata = function(mEntitySets, sBaseUrl) {
             // load the entity sets (map the entity type data to the entity set)
             var that = this,
                 mEntityTypesData = {};
             this._oMockdata = {};
             // load the entity types data 
             if (jQuery.sap.endsWith(sBaseUrl, ".json")) {
                    // all entity types are in one file
                    var oResponse = jQuery.sap.sjax({url: sBaseUrl, dataType: "json"});
                    if (oResponse.success) {
                           mEntityTypesData = oResponse.data;
                    } else {
                           jQuery.sap.log.error("The mockdata for all the entity types could not be found at \"" + sBaseUrl + "\"!");
                    }
             } else {
                    // load the entity types individually
                    jQuery.each(mEntitySets, function(sEntitySetName, oEntitySet) {
                           if (!mEntityTypesData[oEntitySet.type]) {
                                  var sEntityTypeUrl = sBaseUrl + oEntitySet.type + ".json";
                                  var oResponse = jQuery.sap.sjax({url: sEntityTypeUrl, dataType: "json"});
                                  if (oResponse.success) {
                                        mEntityTypesData[oEntitySet.type] = oResponse.data;
                                  } else {
                                        jQuery.sap.log.error("The mockdata for entity type \"" + oEntitySet.type + "\" could not be found at \"" + sBaseUrl + "\"!");
                                  }
                           }
                    });
             }
             // create the mock data for the entity sets and enhance the mock data with metadata
             jQuery.each(mEntitySets, function(sEntitySetName, oEntitySet) {
                    // TODO: should we clone here or not? right now we clone because of unique metadata for 
                    //       individual entity sets otherwise the data of the entity types would be a 
                    //       reference and thus it overrides the metadata from the other entity type.
                    //       this happens especially then when we have two entity sets for the same
                    //       entity type => maybe we move the metdata generation to the response creation!
                    that._oMockdata[sEntitySetName] = [];
                    if (mEntityTypesData[oEntitySet.type]) {
                           jQuery.each(mEntityTypesData[oEntitySet.type], function(iIndex, oEntity) {
                                  that._oMockdata[sEntitySetName].push(jQuery.extend(true, {}, oEntity));
                           });
                    }
                    // enhance with OData metadata if exists
                    if (that._oMockdata[sEntitySetName].length > 0) {
                           that._enhanceWithMetadata(oEntitySet, that._oMockdata[sEntitySetName]);
                    }
             });
             // return the new mockdata
             return this._oMockdata;
       };

       
       /**
       * enhances the mock data for the given entity set with the necessary metadata.
       * Important is at least to have a metadata entry incl. uri for the entry and 
        * for the navigation property it is required to have a deferred infor in case
       * of not expanding it.
       * @param {object} oEntitySet the entity set info
       * @param {object} oMockData mock data for the entity set
       * @private 
        */
       sap.ui.core.util.MockServer.prototype._enhanceWithMetadata = function(oEntitySet, oMockData) {
             if (oMockData) {
                    var that = this,
                        sRootUri = this._getRootUri(),
                        sEntitySetName = oEntitySet && oEntitySet.name;
                    jQuery.each(oMockData, function(iIndex, oEntry) {
                           // add the metadata for the entry
                           oEntry.__metadata = {
                                  uri: sRootUri + sEntitySetName + "(" + that._createKeysString(oEntitySet.keys, oEntry) + ")"
                           };
                           // add the navigation properties
                           jQuery.each(oEntitySet.navprops, function(sKey, oNavProp) {
                                  oEntry[sKey] = {
                                               __deferred: {
                                                            uri: sRootUri + sEntitySetName + "(" + that._createKeysString(oEntitySet.keys, oEntry) + ")/" + sKey
                                               }
                                  };
                           });
                    });
             }
       };

       
       /**
       * Takes a string '<poperty1>=<value1>, <poperty2>=<value2>,...' and creates an
       * object (hash map) out of it.
       * 
        * @param {sKeys}
       *            the string of porperty/value pairs
       * @param {object}
       *            object consisting of the parsed properties
       */    
       sap.ui.core.util.MockServer.prototype._parseKeys = function(sKeys) {
           var oResult = {}; // default is an empty hash map
           var sToBeSplit = sKeys.slice(1, sKeys.length-1);
           var aProps = sToBeSplit.split(",");
           for (var i=0; i<aProps.length; i++) {
               var aPair = aProps[i].split("=");
               if (aPair.length === 2) {
                   oResult[aPair[0]] = aPair[1].slice(1,aPair[1].length-1);
               }
           };
           return oResult;
       };
       
       
       /**
       * This method takes over the already existing key values from oKeys and
       * adds values for all remaining keys specified by oEntitySet.
       * The result is merged into oEntity.
       * 
        * @param {object}
       *            oEntitySet description of the entity set, conatins the full list of key fields
       * @param {oKeys}
       *            oKeys contains already defined key values
       * @param {oEntity}
       *            oEntity the result object, where the key property/value pairs merged into
       */
       sap.ui.core.util.MockServer.prototype._completeKey = function(oEntitySet,
                    oKeys, oEntity) {
             if (oEntity) {
                    jQuery.each(oEntitySet.keys, function(iIndex, sKey) {
                           if (oKeys[sKey]) {
                                  // take over the specified key value
                                  oEntity[sKey] = oKeys[sKey];
                           } else {
                                  // create a new key value
                                  if (!oEntitySet.iSequence) {
                                        oEntitySet.iSequence = 0;
                                  }
                                  oEntitySet.iSequence++;
                                  oEntity[sKey] = oEntitySet.type + "_" + oEntity.type + "_" + oEntitySet.iSequence.toString();
                           }
                    });
             }
       };
       
       /**
       * Generate some mock data for a specific entityType. String value will be
       * based on the property name and an index Integer / Decimal value will be
       * generated randomly Date / Time / DateTime value will also be generated
       * randomly
       * 
        * @param {object}
       *            oEntityType the entity type used to generate the data
       * @param {int}
       *            iIndex index of this particular object in the parent
       *            collection
       * @param {map}
       *            mComplexTypes map of the complex types
       * @return {object} the mocked entity
       * @private
       */
       sap.ui.core.util.MockServer.prototype._generateDataFromEntity = function(oEntityType, iIndex, mComplexTypes) {
             var oEntity = {};
             for (var i = 0; i < oEntityType.properties.length; i++) {
                    var oProperty = oEntityType.properties[i];
                    var oPropertyValue = "";
                    if (oProperty.schema == "Edm") {
                           if (oProperty.type == "String") {
                                  oPropertyValue = oEntityType.name + "_" + iIndex + "_" + oProperty.name;
                           } else if (oProperty.type == "DateTime") {
                                  var date = new Date();
                                  date.setFullYear(2000 + Math.floor(Math.random() * 20));
                                  date.setDate(Math.floor(Math.random() * 30));
                                  date.setMonth(Math.floor(Math.random() * 12));
                                  oPropertyValue = "/Date(" + date.getTime() + ")/";
                           } else if (oProperty.type == "Int32") {
                                  oPropertyValue = Math.floor(Math.random() * 10000);
                           } else if (oProperty.type == "Decimal") {
                                  oPropertyValue = Math.floor(Math.random() * 1000000) / 100;
                           }
                    } else {
                           oPropertyValue = this._generateDataFromEntity(mComplexTypes[oProperty.type], iIndex)
                    }
                    oEntity[oProperty.name] = oPropertyValue;
             }
             return oEntity;
       };
       

       /**
       * Generate some mock data for a specific entityset.
       * @param {object} oEntitySet the entity set for which we want to generate the data
       * @param {map} mEntityTypes map of the entity types
       * @param {map} mComplexTypes map of the complex types
       * @return {array} the array of mocked data
       * @private
       */
       sap.ui.core.util.MockServer.prototype._generateDataFromEntitySet = function(oEntitySet, mEntityTypes, mComplexTypes) {
             var oEntityType = mEntityTypes[oEntitySet.type];
             var aMockedEntries = [];
             for ( var i = 0; i < 100; i++) {
                    aMockedEntries.push(this._generateDataFromEntity(oEntityType, i, mComplexTypes));
             }
             return aMockedEntries;
       };
       

       /**
       * Generate some mock data based on the metadata specified for the odata service.
       * @param {map} mEntitySets map of the entity sets
       * @param {object} oMetadata the complete metadata for the service
       * @private
       */
       sap.ui.core.util.MockServer.prototype._generateMockdata = function(mEntitySets, oMetadata) {
             // load the entity sets (map the entity type data to the entity set)
             var that = this, sRootUri = this._getRootUri(), oMockData = {};

             // here we need to analyse the EDMX and identify the entity types and complex types
             var mEntityTypes = this._findEntityTypes(oMetadata);
             var mComplexTypes = this._findComplexTypes(oMetadata);

             jQuery.each(mEntitySets, function(sEntitySetName, oEntitySet) {
                    oMockData[sEntitySetName] = that._generateDataFromEntitySet(oEntitySet, mEntityTypes, mComplexTypes);
                    jQuery.each(oMockData[sEntitySetName], function(iIndex, oEntry) {
                           // add the metadata for the entry
                           oEntry.__metadata = {
                                  uri : sRootUri + sEntitySetName + "(" + that._createKeysString(oEntitySet.keys, oEntry) + ")",
                                  type : oEntitySet.schema + "." + oEntitySet.type
                           };
                           // add the navigation properties
                           jQuery.each(oEntitySet.navprops, function(sKey, oNavProp) {
                                  oEntry[sKey] = {
                                        __deferred : {
                                               uri : sRootUri + sEntitySetName + "(" + that._createKeysString(oEntitySet.keys, oEntry) + ")/" + sKey
                                        }
                                  };
                           });
                    });
             });
             this._oMockdata = oMockData;
       };


       
       /**
       * Simulates an existing OData service by sepcifiying the metadata URL and the base URL for the mockdata. The server
       * configures the request handlers depending on the service metadata. The mockdata needs to be stored individually for
       * each entity type in a separate JSON file. The name of the JSON file needs to match the name of the entity type. If
       * no base url for the mockdata is specified then the mockdata are generated from the metadata
       * 
        * @param {string} sMetadataUrl url to the service metadata document
       * @param {string} sMockdataBaseUrl base url which contains the mockdata as single .json files or the .json file containing the complete mock data 
        * 
        * @experimental functionality might be enhanced in future - right now only read is supported
       * @since 1.13.2
       * @public
       */
       sap.ui.core.util.MockServer.prototype.simulate = function(sMetadataUrl, sMockdataBaseUrl) {

             var that = this;
             this._sMetadataUrl = sMetadataUrl;
             this._sMockdataBaseUrl = sMockdataBaseUrl;
             
             this._refreshData();
             
             var mEntitySets = this._findEntitySets(this._oMetadata);
             
             // helper to find the entity set entry for a given entity set name and the keys of the entry
             var fnGetEntitySetEntry = function(sEntitySetName, sKeys) {
                    var oFoundEntry;
                    jQuery.each(that._oMockdata[sEntitySetName], function(iIndex, oEntry) {
                           // TODO - consider to implement a proper check
                           if (sKeys === "(" + that._createKeysString(mEntitySets[sEntitySetName].keys, oEntry) + ")") {
                                  oFoundEntry = {index: iIndex, entry: oEntry};
                                  return false; // = break
                           }
                    });
                    return oFoundEntry;
             };
             
             // helper function to resolve a navigation and return the matching entities
             var fnResolveNavigation = function(sEntitySetName, oFromRecord, sNavProp) {
                    var oNavProp = mEntitySets[sEntitySetName].navprops[sNavProp];
                    // maybe we can do symbolic links with a function to handle the navigation properties 
                    // instead of copying the data into the nested structures
                    if (oNavProp && oNavProp.to) {
                           var aEntries = [];
                           jQuery.each(that._oMockdata[oNavProp.to.entitySet], function(iIndex, oToRecord) {
                                  
                                  // check for property ref being identical
                                  var bEquals = true;
                                  for (var i = 0, l = oNavProp.from.propRef.length; i < l; i++) {
                                        if (oFromRecord[oNavProp.from.propRef[i]] != oToRecord[oNavProp.to.propRef[i]]) {
                                               bEquals = false;
                                               break;
                                        }
                                  }
                                  
                                  // if identical we add the to record
                                  if (bEquals) {
                                        aEntries.push(oToRecord);
                                  }
                                  
                           });
                           return aEntries;
                    }
             };
             

             // helper to resolve an entity set for insert/delete/update operations
             var fnResolveTargetEntityName = function(oEntitySet, sKeys, sUrlParams) {
                    // Set the default entity name
                    var sSetName = oEntitySet.name;
                    // If there are sUrlParams try to find a navigation property
                    if (sUrlParams) {
                           var navProp = oEntitySet.navprops[sUrlParams];
                    }
                    if (navProp) {
                           // instead of the default entity name use the endpoints entity
                           // name
                           sSetName = navProp.to.entitySet;
                    }
                    return sSetName;
             };

             var initNewEntity = function(oXhr, sTargetEntityName, sKeys, sUrlParams) {
                    var oEntity = JSON.parse(oXhr.requestBody);
                    if (oEntity) {
                           var oKeys = that._parseKeys(sKeys);
                           that._completeKey(mEntitySets[sTargetEntityName], oKeys, oEntity);
                           that._enhanceWithMetadata(mEntitySets[sTargetEntityName], [oEntity]);
                           return oEntity;
                    }
                    return null;
             };
             
             // create the request handlers
             var aRequests = [];
             
             // add the CSRF-token request
        aRequests.push({
            method : "GET",
            path : "",
            response : function(oXhr) {
                if (oXhr.requestHeaders["x-csrf-token"] == "Fetch" ) {
                    oXhr.respond(200, { "X-CSRF-Token": "42424242424242424242424242424242" });
                } else {
                    oXhr.respond(404);
                }
            }
        });
              
             // add the $metadata request
             aRequests.push({
                    method : "GET",
                    path : new RegExp("\\$metadata"),
                    response : function(oXhr) {
                           jQuery.sap.require("jquery.sap.xml");
                           oXhr.respond(200, { "Content-Type": "application/xml;charset=utf-8" }, jQuery.sap.serializeXML(that._oMetadata));
                    }
             });
             
             // add entity sets
             jQuery.each(mEntitySets, function(sEntitySetName, oEntitySet) {
                    
                    // navigation property support
                    jQuery.each(oEntitySet.navprops, function(sKey, oNavProp) {
                           
                           // support $count requests on navigation properties
                           aRequests.push({
                                  method : "GET",
                                  path : new RegExp("(" + sEntitySetName + ")(\\([^/\\?#]+\\))/(" + sKey + ")/\\$count/?(.*)?"),
                                  response : function(oXhr, sEntitySetName, sKeys, sNavProp, sUrlParams) {
                                        var oEntry = fnGetEntitySetEntry(sEntitySetName, sKeys);
                                        if (oEntry) {
                                               var aEntries = fnResolveNavigation(sEntitySetName, oEntry.entry, sNavProp);
                                               oXhr.respond(200, { "Content-Type": "text/plain;charset=utf-8" }, "" + aEntries.length);
                                        } else {
                                               oXhr.respond(404);
                                        }
                                  }
                           });
                           
                           // support access of the entity set navigation property (collection)
                           aRequests.push({
                                  method : "GET",
                                  path : new RegExp("(" + sEntitySetName + ")(\\([^/\\?#]+\\))/(" + sKey + ")/?(.*)?"),
                                  response : function(oXhr, sEntitySetName, sKeys, sNavProp, sUrlParams) {
                                        var oEntry = fnGetEntitySetEntry(sEntitySetName, sKeys);
                                        if (oEntry) {
                                               var aEntries = fnResolveNavigation(sEntitySetName, oEntry.entry, sNavProp);
                                               oXhr.respond(200, { "Content-Type": "application/json;charset=utf-8" }, JSON.stringify({d: {results: aEntries }}));
                                        } else {
                                               oXhr.respond(404);
                                        }
                                  }
                           });
                           
                    });

                    // support $count requests on entity set
                    aRequests.push({
                           method : "GET",
                           path : new RegExp("(" + sEntitySetName + ")/\\$count/?(.*)?"),
                           response : function(oXhr, sEntitySetName, sUrlParams) {
                                  oXhr.respond(200, { "Content-Type": "text/plain;charset=utf-8" }, "" + that._oMockdata[sEntitySetName].length);
                           }
                    });
                    
                    
                    // support access of the entry of an entity set (collection)
                    aRequests.push({
                           method : "GET",
                           path : new RegExp("(" + sEntitySetName + ")"),
                           response : function(oXhr, sEntitySetName, sKeys, sUrlParams) {
                                  oXhr.respond(200, { "Content-Type": "application/json;charset=utf-8" }, JSON.stringify({d : { results : that._oMockdata[sEntitySetName]}}));
                           }
                    });
                    
                    
                    
                    // support access of the entry of an entity set (collection)
                    aRequests.push({
                           method : "GET",
                           path : new RegExp("(" + sEntitySetName + ")(\\([^/\\?#]+\\))/?(.*)?"),
                           response : function(oXhr, sEntitySetName, sKeys, sUrlParams) {
                                  var oEntry = fnGetEntitySetEntry(sEntitySetName, sKeys);
                                  if (oEntry) {
                                        oXhr.respond(200, { "Content-Type": "application/json;charset=utf-8" }, JSON.stringify({d: oEntry.entry}));
                                  } else {
                                        oXhr.respond(404);
                                  }
                           }
                    });
                    
                    // support creation of an entity of a specific type
                    aRequests.push({
                           method : "POST",
                           path : new RegExp("(" + sEntitySetName + ")(\\([^/\\?#]+\\))/?(.*)?"),
                           response : function(oXhr, sEntitySetName, sKeys, sUrlParams) {
                                  var sRespondData = null;
                                  var sRespondContentType = null;
                                  var iResult = 405; // default: method not allowed
                                  var sTargetEntityName = fnResolveTargetEntityName(oEntitySet, sKeys, sUrlParams);
                                  if (sTargetEntityName) {
                                        var oEntity = initNewEntity(oXhr, sTargetEntityName, sKeys, sUrlParams);
                                        if (oEntity) {
                                               var sUri = that._getRootUri() + sTargetEntityName + "(" + that._createKeysString(mEntitySets[sTargetEntityName].keys, oEntity) + ")";
                                               sRespondData = '{"uri": "' + sUri + '" }';
                                               sRespondContentType = {"Content-Type": "application/json;charset=utf-8"};
                                               that._oMockdata[sTargetEntityName] = that._oMockdata[sTargetEntityName].concat([oEntity]);
                                               iResult = 201; 
                                        }
                                  }
                                  oXhr.respond(iResult, sRespondContentType, sRespondData); 
                           }
                    });
                    
                    // support creation/update of an entity of a specific type
                    aRequests.push({
                           method : "PUT",
                           path : new RegExp("(" + sEntitySetName + ")(\\([^/\\?#]+\\))/?(.*)?"),
                           response : function(oXhr, sEntitySetName, sKeys, sUrlParams) {
                                  
                                  var iResult = 405; // default: method not allowed 
                                  var sRespondData = null;
                                  var sRespondContentType = null;
                                  
                                  var sTargetEntityName = fnResolveTargetEntityName(oEntitySet, sKeys, sUrlParams);
                                  if (sTargetEntityName) {
                                        var oEntity = initNewEntity(oXhr, sTargetEntityName, sKeys, sUrlParams);
                                        if (oEntity) {
                                               var sUri = that._getRootUri() + sTargetEntityName + "(" + that._createKeysString(mEntitySets[sTargetEntityName].keys, oEntity) + ")";
                                               sRespondData = '{"uri": "' + sUri + '" }';
                                               sRespondContentType = {"Content-Type": "application/json;charset=utf-8"};
                                               
                                               var oExistingEntry = fnGetEntitySetEntry(sEntitySetName, sKeys);
                                               if (oExistingEntry) { // Overwrite existing
                                                      that._oMockdata[sEntitySetName][oExistingEntry.index] = oEntity;
                                               } else { // really new
                                                      that._oMockdata[sTargetEntityName] = that._oMockdata[sTargetEntityName].concat([oEntity]);
                                               }
                                               iResult = 201; 
                                        }
                                  } 
                                  oXhr.respond(iResult, sRespondContentType, sRespondData);  
                           }
                    });
                    
                    
                    // support creation of an entity of a specific type
                    aRequests.push({
                           method : "DELETE",
                           path : new RegExp("(" + sEntitySetName + ")(\\([^/\\?#]+\\))/?(.*)?"),
                           response : function(oXhr, sEntitySetName, sKeys, sUrlParams) {
                                  var iResult = 204; // default: method not allowed 
                                  var oEntry = fnGetEntitySetEntry(sEntitySetName, sKeys);
                                  if (oEntry) {
                                        delete that._oMockdata[sEntitySetName][oEntry.index];
                                        iResult = 200;
                                  }
                                  oXhr.respond(iResult, null, null); 
                           }
                    });
                    
                    // support access of the entity set (collection)
                    aRequests.push({
                           method : "GET",
                           path : new RegExp("(" + sEntitySetName + ")(\\?\\$)(filter|skip)/?(.*)?"),
                           response : function(oXhr, sEntitySetName, sUrlParams) {
                                  // sUrlParams should not contains ?, but only & in its stead
                                  // TODO: make this more mature - it is hacky right now
                                  sUrlParams = sUrlParams && sUrlParams.replace("?", "&");
                                  var parsedQuery = URI.parseQuery(sUrlParams);
                                  var aMockData = that._oMockdata[sEntitySetName];
                                  var aFilteredData = aMockData;
                                  
                                  if (parsedQuery.hasOwnProperty("$filter")) {
                                        // The data needs to be filtered for the moment only simple filters can be used
                                        var sODataFilterExpression = parsedQuery["$filter"],
                                            sODataFilterMethod = sODataFilterExpression.split("(")[0],
                                            aODataFilterValues, 
                                            sPath,
                                            sValue,
                                            oMockData = that._oMockdata;
                                        switch (sODataFilterMethod) {
                                               case "substringof" :
                                                      aODataFilterValues = sODataFilterExpression.split("(")[1].split(")")[0].split(",");
                                                      sValue = aODataFilterValues[0].substr(1, aODataFilterValues[0].length - 2);
                                                      sPath = aODataFilterValues[1];
                                                      aFilteredData = jQuery.grep(aMockData, function(oMockData) {
                                                            return (oMockData[sPath].indexOf(sValue) != -1);
                                                      });
                                                      break;
                                               case "startswith" :
                                                      aODataFilterValues = sODataFilterExpression.split("(")[1].split(")")[0].split(",");
                                                      sValue = aODataFilterValues[1].substr(1, aODataFilterValues[0].length - 2);
                                                      sPath = aODataFilterValues[0];
                                                      aFilteredData = jQuery.grep(aMockData, function(oMockData) {
                                                            return (oMockData[sPath].indexOf(sValue) == 0);
                                                      });
                                                      break;
                                               case "endswith" :
                                                      aODataFilterValues = sODataFilterExpression.split("(")[1].split(")")[0].split(",");
                                                      sValue = aODataFilterValues[1].substr(1, aODataFilterValues[0].length - 2);
                                                      sPath = aODataFilterValues[0];
                                                      aFilteredData = jQuery.grep(aMockData, function(oMockData) {
                                                            var sMockDataValue = oMockData[sPath];
                                                            return (oMockData[sPath].indexOf(sValue) == (sMockDataValue.length - sValue.length));
                                                      });
                                                      break;

                                        }
                                  }
                                  
                                  if (parsedQuery.hasOwnProperty("$count")) {
                                        oXhr.respond(200, { "Content-Type" : "text/plain;charset=utf-8"       }, "" + aFilteredData.length);
                                  } else {
                                        oXhr.respond(200, { "Content-Type" : "application/json;charset=utf-8"  }, JSON.stringify({ d : { results : aFilteredData     }      }));
                                  }

                           }
                    });

             });
             
             // apply the request handlers
             this.setRequests(aRequests);
             
       };


       /**
       * Removes all request handlers.
       * 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._removeAllRequestHandlers = function() {
             var aRequests = this.getRequests();
             var iLength = aRequests.length;
             for (var i = 0; i < iLength; i++) {
                    sap.ui.core.util.MockServer._removeResponse(aRequests[i].response);
             }
       };


       /**
       * Removes all filters.
       * 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._removeAllFilters = function() {
             for (var i = 0; i < this._aFilters.length; i++) {
                    sap.ui.core.util.MockServer._removeFilter(this._aFilters[i]);
             }
             this._aFilters = null;
       };


       /**
       * Adds a request handler to the server, based on the given configuration.
       * 
        * @param {string}
       *          sMethod HTTP verb to use for this method (e.g. GET, POST, PUT, DELETE...)
       * @param {string|regexp}
       *          sPath the path of the URI (will be concatenated with the rootUri)
       * @param {function}
       *          fnResponse the response function to call when the request occurs
       * 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._addRequestHandler = function(sMethod, sPath, fnResponse) {
             sMethod = sMethod ? sMethod.toUpperCase() : sMethod;
             if (typeof sMethod !== "string") {
                    throw new Error("Error in request configuration: value of 'method' has to be a string");
             }
             if (!(typeof sPath === "string" || sPath instanceof RegExp)) {
                    throw new Error("Error in request configuration: value of 'path' has to be a string or a regular expression");
             }
             if (typeof fnResponse !== "function") {
                    throw new Error("Error in request configuration: value of 'response' has to be a function");
             }

             var sUri = this._getRootUri();
             
             // create the URI regexp (will be escaped)
             sUri = sUri && new RegExp(this._escapeStringForRegExp(sUri));
             
             // create the path regexp (will have the special regexp encoding)
             if (sPath && !(sPath instanceof RegExp)) {
                    sPath = new RegExp(this._createRegExpPattern(sPath));
             }
             
             // create the regexp for the request handler (concat root uri and path)
             var oRegExp = this._createRegExp(sUri ? sUri.source + sPath.source : sPath.source);

             this._addFilter(this._createFilter(sMethod, oRegExp));
             this._oServer.respondWith(sMethod, oRegExp, fnResponse);

             // some debug logging to see what is registered and how the regex look like
             jQuery.sap.log.debug("MockServer: adding " + sMethod + " request handler for pattern " + oRegExp);
             
       };


       /**
       * Creates a regular expression based on a given pattern.
       * 
        * @param {string} sPattern the pattern to use for the regular expression.
       * @return {RegExp} the created regular expression.
       * 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._createRegExp = function(sPattern) {
             return new RegExp("^" + sPattern + "$");
       };


       /**
       * Creates a regular expression pattern. All <code>:param</code> are replaced 
        * by regular expression groups.
       * 
        * @return {string} the created regular expression pattern.
       * 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._createRegExpPattern = function(sPattern) {
             return sPattern.replace(/:([\w\d]+)/g, "([^\/]+)");
       };

       /**
       * Converts a string into a regular expression. Escapes all regexp crticial 
        * characters.
       * 
        * @return {string} the created regular expression pattern.
       * 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._escapeStringForRegExp = function(sString) {
             return sString.replace(/[\\\/\[\]\{\}\(\)\-\*\+\?\.\^\$\|]/g, "\\$&");
       };

       /**
       * Adds a filter function. The filter determines whether to fake a response or not. When the filter function
       * returns true, the request will be faked.
       * 
        * @param {function} fnFilter the filter function to add
       * @private
       */
       sap.ui.core.util.MockServer.prototype._addFilter = function(fnFilter) {
             this._aFilters.push(fnFilter)
             sap.ui.core.util.MockServer._addFilter(fnFilter);
       };


       /**
       * Creates and returns a filter filter function.
       * 
        * @param {string} sRequestMethod HTTP verb to use for this method (e.g. GET, POST, PUT, DELETE...)
       * @param {RegExp} oRegExp the regular expression to use for this filter
       * 
        * @private
       */
       sap.ui.core.util.MockServer.prototype._createFilter = function(sRequestMethod, oRegExp) {
             return function(sMethod, sUri, bAsync, sUsername, sPassword) {
                    return sRequestMethod === sMethod && oRegExp.test(sUri);
             }
       };


       /**
       * Cleans up the resources associated with this object and all its aggregated children.
       *
       * After an object has been destroyed, it can no longer be used in!
       *
       * Applications should call this method if they don't need the object any longer.
       *
       * @see sap.ui.base.ManagedObject#destroy
       * @param {boolean}
       *            [bSuppressInvalidate] if true, this ManagedObject is not marked as changed
       * @public
       */
       sap.ui.core.util.MockServer.prototype.destroy = function(bSuppressInvalidate) {
             sap.ui.base.ManagedObject.prototype.destroy.apply(this, arguments);
             this.stop();
             var aServers = sap.ui.core.util.MockServer._aServers;
             var iIndex = jQuery.inArray(this, aServers);
             aServers.splice(iIndex, 1);
       };


       // =======
       // STATICS
       // =======
       
       sap.ui.core.util.MockServer._aFilters = [];
       sap.ui.core.util.MockServer._oServer = null;
       sap.ui.core.util.MockServer._aServers = [];

       /**
       * Returns the instance of the sinon fake server.
       * 
        * @return {object} the server instance
       * @private
       */
       sap.ui.core.util.MockServer._getInstance = function() {
             // We can not create many fake servers, see bug https://github.com/cjohansen/Sinon.JS/issues/211
             // This is why we reuse the server and patch it manually
             if (!this._oServer) {
                    this._oServer = window.sinon.fakeServer.create();
                    this._oServer.autoRespond = true;
             }
             return this._oServer;
       };


       /**
       * Global configuration of all mock servers.
       * 
        * @param {object} mConfig the configuration object.
       * @param {boolean} [mConfig.autoRespond=true] If set true, all mock servers will respond automatically. If set false you have to call {@link sap.ui.core.util.MockServer#respond} method for response.
       * @param {int} [mConfig.autoRespondAfter=0] the time in ms after all mock servers should send their response. 
        * @param {boolean} [mConfig.fakeHTTPMethods=false] If set to true, all mock server will find <code>_method</code> parameter in the POST body and use this to override the the actual method. 
        */
       sap.ui.core.util.MockServer.config = function(mConfig) {
             var oServer = this._getInstance();

             oServer.autoRespond = mConfig.autoRespond === false ? false : true;
             oServer.autoRespondAfter = mConfig.autoRespondAfter || 0;
             oServer.fakeHTTPMethods = mConfig.fakeHTTPMethods || false;
       };


       /**
       * Respond to a request, when the servers are configured not to automatically respond.
       */
       sap.ui.core.util.MockServer.respond = function() {
             this._getInstance().respond();
       };


       /**
       * Starts all registered servers.
       */
       sap.ui.core.util.MockServer.startAll = function() {
             for (var i=0; i < this._aServers.length; i++) {
                    this._aServers[i].start();
             }
       };


       /**
       * Stops all registered servers.
       */
       sap.ui.core.util.MockServer.stopAll = function() {
             for (var i=0; i < this._aServers.length; i++) {
                    this._aServers[i].stop();
             }
             this._getInstance().restore();
             this._oServer = null;
       };


       /**
       * Stops and calls destroy on all registered servers. Use this method for cleaning up.
       */
       sap.ui.core.util.MockServer.destroyAll = function() {
             this.stopAll();
             for (var i=0; i < this._aServers.length; i++) {
                    this._aServers[i].destroy();
             }
       };


       /**
       * Adds a filter function. The filter determines whether to fake a response or not. When the filter function
       * returns true, the request will be faked.
       * 
        * @param {function} fnFilter the filter function to add
       * @private
       */
       sap.ui.core.util.MockServer._addFilter = function(fnFilter) {
             this._aFilters.push(fnFilter);
       };


       /**
       * Removes a filter function.
       * 
        * @param {function} fnFilter the filter function to remove
       * @return {boolean} whether the filter was removed or not
       * @private
       */
       sap.ui.core.util.MockServer._removeFilter = function(fnFilter) {
             var iIndex = jQuery.inArray(fnFilter, this._aFilters);
             if (iIndex !== -1) {
                    this._aFilters.splice(iIndex, 1);
             }
             return iIndex !== -1;
       };


       /**
       * Removes a response from the real sinon fake server object

       * @param {function} fnResponse the response function to remove
       * @return {boolean} whether the response was removed or not
       * @private
       */
       sap.ui.core.util.MockServer._removeResponse = function(fnResponse) {
             var aResponses = this._oServer.responses;
             var iLength = aResponses.length;
             for (var i = 0; i < iLength; i++) {
                    if (aResponses[i].response === fnResponse) {
                           aResponses.splice(i, 1);
                           return true;
                    }
             }
             return false;
       };

       // ================================
       // SINON CONFIGURATON AND EXTENSION
       // ================================

       window.sinon.FakeXMLHttpRequest.useFilters = true;

       window.sinon.FakeXMLHttpRequest.addFilter(function(sMethod, sUri, bAsync, sUsername, sPassword) {
             var aFilters = sap.ui.core.util.MockServer._aFilters;
             for (var i = 0; i < aFilters.length; i++) {
                    var fnFilter = aFilters[i];
                    if (fnFilter(sMethod, sUri, bAsync, sUsername, sPassword)) {
                           return false;
                    }
             }
             return true;
       });

       var getMimeType = function(sFileName) {
             if (/.*\.json$/i.test(sFileName)) {
                    return "JSON";
             }
             if (/.*\.xml$/i.test(sFileName)) {
                    return "XML";
             }
             if (/.*metadata$/i.test(sFileName)) {
                    // This is needed in case the metadata comes from a
                    // local file otherwise it's interpreted as octetstream
                    return "XML";
             }
             return null;
       };

       /**
       * @public
       */
       window.sinon.FakeXMLHttpRequest.prototype.respondFile = function(iStatus, mHeaders, sFileUrl) {
             var oResponse = jQuery.sap.sjax({url:sFileUrl, dataType:"text"});
             if (!oResponse.success) throw new Error("Could not load file from: " + sFileUrl);

             var oData = oResponse.data;
             var sMimeType = getMimeType(sFileUrl);

             if (this["respond" + sMimeType]) {
                    this["respond" + sMimeType](iStatus, mHeaders, oData);
             } else {
                    this.respond(iStatus, mHeaders, oData);
             }
       };

       /**
       * @public
       */
       window.sinon.FakeXMLHttpRequest.prototype.respondJSON = function(iStatus, mHeaders, oJSONData) {
             mHeaders = mHeaders || {};
             mHeaders["Content-Type"] = mHeaders["Content-Type"] || "application/json";
             this.respond(iStatus, mHeaders, typeof oJSONData === "string" ? oJSONData : JSON.stringify(oJSONData));
       };

       /**
       * @public
       */
       window.sinon.FakeXMLHttpRequest.prototype.respondXML = function(iStatus, mHeaders, sXmlData) {
             mHeaders = mHeaders || {};
             mHeaders["Content-Type"] = mHeaders["Content-Type"] || "application/xml";
             this.respond(iStatus, mHeaders, sXmlData);
       };
       
})();

