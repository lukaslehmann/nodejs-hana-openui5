/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.ui.app.Application");
jQuery.sap.require("sap.ui.app.ApplicationMetadata");
jQuery.sap.require("sap.ui.base.ManagedObject");

(function(window, undefined) {

	/**
	 * Abstract application class. Extend this class to create a central application class.
	 * 
	 * Only one instance is allowed.
	 * 
	 * @param {string}
	 *            [sId] optional id for the application; generated automatically if
	 *            no non-empty id is given Note: this can be omitted, no matter
	 *            whether <code>mSettings</code> will be given or not!
	 * @param {object}
	 *            [mSettings] optional map/JSON-object with initial settings for the
	 *            new application instance
	 * 
	 * @public
	 * 
	 * @class Base class for application classes
	 * @extends sap.ui.base.ManagedObject
	 * @abstract
	 * @author SAP
	 * @version 1.16.8-SNAPSHOT
	 * @name sap.ui.app.Application
	 * @experimental Since 1.11.1. The Application class is still under construction, so some implementation details can be changed in future.
	 * @deprecated Since 1.15.1. The Component class is enhanced to take care about the Application code.
	 */
	sap.ui.base.ManagedObject.extend("sap.ui.app.Application", /** @lends sap.ui.app.Application.prototype */ { 

		metadata : {
			"abstract": true,
			properties: {
				root : "string",
				config : "any"
			},
			aggregations : {
				rootComponent : {
					type : "sap.ui.core.UIComponent",
					multiple : false
				}
			},
			publicMethods: [
			  "getView"
			],
			deprecated: true
		},

		_fnErrorHandler : null,
		_fnBeforeExit : null, 
		_fnExit : null,
		_mMockServers : null,

		constructor : function(sId, mSettings) {

			// existence check (only one instance is allowed!)
			if (sap.ui.getApplication) {
				throw new Error("Only one instance of sap.ui.app.Application is allowed");
			}

			// install shortcut
			sap.ui.getApplication = jQuery.proxy(this._getInstance, this);

			// mock server registry
			this._mMockServers = {};

			// error handler (if exists)
			if (this.onError) {
				this._fnErrorHandler = jQuery.proxy(function(oEvt) {
					var oError = oEvt.originalEvent;
					this.onError(oError.message, oError.filename, oError.lineno);
				}, this);
				jQuery(window).bind("error", this._fnErrorHandler);
			}

			// super
			sap.ui.base.ManagedObject.apply(this, arguments);

			// register the application instance
			this.register();

			// wait until Core is initialized to create the models & root component 
			sap.ui.getCore().attachInit(jQuery.proxy(function() {
				
				// load the models and services
				this._initApplicationModels();
				
				// init the root component
				this._initRootComponent();
				
				// call the application controller
				this.main();
				
			}, this));

			// before exit handler
			this._fnBeforeExit = jQuery.proxy(this.onBeforeExit, this);
			jQuery(window).bind("beforeunload", this._fnBeforeExit);

			// exit handler
			this._fnExit = jQuery.proxy(this.onExit, this);
			jQuery(window).bind("unload", this._fnExit);
			
		},


		/**
		 * Internal function to initialize the root component.
		 * 
		 * @private
		 */
		_initRootComponent : function() {
			var oRootComponent = this.createRootComponent();
			// only if a root component exits we load the models and services
			// and place it into a container
			if (oRootComponent) {
				
				// set the root component
				this.setRootComponent(oRootComponent);
				
				// place the component 
				var oContainer = new sap.ui.core.ComponentContainer({
					component: oRootComponent
				});
				oContainer.placeAt(this.getRoot() || document.body);
			}
		},


		/**
		 * Creates and returns the root component. Override this method in your application implementation, if you want to override the default creation by metadata.
		 * 
		 * @return {sap.ui.core.UIComponent} the root component
		 * @protected
		 */
		createRootComponent : function() {
			var sRootComponent = this.getMetadata().getRootComponent();
			var oRootComponent;
			if (sRootComponent) {
				// create the root component
				oRootComponent = sap.ui.component({
					name: sRootComponent
				});
			}
			return oRootComponent;
		},


		/**
		 * Returns the application root component. 
		 * 
		 * @return {sap.ui.core.Control} The root component
		 * 
		 * @since 1.13.1
		 * @public
		 * @deprecated
		 */
		getView : function() {
			return this.getRootComponent();
		},


		/**
		 * Returns the application instance
		 * 
		 * return {sap.ui.app.Application} The application instance
		 * 
		 * @private
		 */
		_getInstance : function() {
			return this;
		},


		/**
		 * The main method is called when the DOM and UI5 is completely loaded. Override this method in your Application class implementation to execute code which relies on a loaded DOM / UI5.
		 * 
		 * @public
		 */
		main : function() {},


		/**
		 * On before exit application hook. Override this method in your Application class implementation, to handle cleanup before the real exit or to prompt a question to the user,
		 * if the application should be exited.
		 * 
		 * @return {string} return a string if a prompt should be displayed to the user confirming closing the application (e.g. when the application is not yet saved).
		 * @public
		 */
		onBeforeExit : function() {},


		/**
		 * On exit application hook. Override this method in your Application class implementation, to handle cleanup of the application.
		 * 
		 * @public
		 */
		onExit : function() {},


		/**
		 * On error hook. Override this method in your Application class implementation to listen to unhandled errors.
		 * 
		 * @param {string} sMessage The error message.
		 * @param {string} sFile The file where the error occurred
		 * @param {number} iLine The line number of the error
		 * @public
		 * @function
		 */
		onError : null, // function(sMessage, sFile, iLine) - function not added directly as it might result in bad stack traces in older browsers


		/**
		 * Sets the configuration model.
		 * 
		 * @param {string|object|sap.ui.model.Model} vConfig the configuration model, the configuration object or a URI string to load a JSON configuration file.
		 * @since 1.13.1
		 * @public
		 */
		setConfig : function(vConfig) {
			if (typeof vConfig === "string") {
				var sUri = vConfig;
				var vConfig = new sap.ui.model.json.JSONModel();
				var oResponse = jQuery.sap.sjax({url:sUri, dataType:'json'});
				if (oResponse.success) {
					vConfig.setData(oResponse.data);
				} else {
					throw new Error("Could not load config file: " + sUri);
				}
			}
			if (typeof vConfig === "object" && !vConfig instanceof sap.ui.model.Model) {
				vConfig = new sap.ui.model.JSONModel(vConfig);
			}
			jQuery.sap.assert(vConfig instanceof sap.ui.model.Model, "the config property value must be a string, an object or an instance of sap.ui.model.Model");
			this.setProperty("config", vConfig);
		},


		/**
		 * Initializes the application models and services.
		 * 
		 * @private
		 */
		_initApplicationModels : function() {
			
			var oMetadata = this.getMetadata();
			
			// get the application configuration
			var oModelsConfig = oMetadata.getModels(),
			    oServicesConfig = oMetadata.getServices();

			// iterate over the model configurations and create and register the 
			// models base on the configuration if available
			if (oModelsConfig) {
				
				// create and start the mock server
				var fnCreateMockServer = function(sName, sUri, sMetadataUrl, sMockdataBaseUrl) {
					
					// kill the existing mock server
					if (this._mMockServers[sName]) {
						this._mMockServers[sName].stop();
					}
					
					// start the mock server
					jQuery.sap.require("sap.ui.app.MockServer");
					this._mMockServers[sName] = new sap.ui.app.MockServer({
						rootUri: sUri
					});
					
					this._mMockServers[sName].simulate(sMetadataUrl, sMockdataBaseUrl);
					this._mMockServers[sName].start();
						
				};
				
				// helper to create a model depending on the type
				// TODO: models could have generic instantiation to pass the JSON object 
				//       of the configuration directly instead of individual handling 
				var fnCreateModel = function(sName, oConfig) {
					
					// extract uri and type
					var sUri = oConfig.uri, sType = oConfig.type;
					
					// require the model and instantiate it
					jQuery.sap.require(sType);
					var oClass = jQuery.sap.getObject(sType);
					jQuery.sap.assert(oClass !== undefined, "The specified model type \"" + sType + "\" could not be found!");
					
					// create the model and apply the configuration
					var oModel;
					if (sType === "sap.ui.model.resource.ResourceModel") {
						oModel = new oClass({bundleUrl: sUri});
					} else if (sType === "sap.ui.model.odata.ODataModel") {
						// check for a mock server configuration and start the mock server
						if (oConfig.mockserver) {
							fnCreateMockServer.call(this, sName, sUri, oConfig.mockserver.model, oConfig.mockserver.data);
						}
						// create the model
						oModel = new oClass(sUri, oConfig.settings);
					} else if (sType === "sap.ui.model.json.JSONModel" || sType === "sap.ui.model.xml.XMLModel") {
						oModel = new oClass();
						if (sUri) {
							oModel.loadData(sUri);
						}
					}

					// check the model to be an instance of sap.ui.model.Model
					jQuery.sap.assert(oModel instanceof sap.ui.model.Model, "The specified model type \"" + sType + "\" must be an instance of sap.ui.model.Model!");
					return oModel;

				};
				
				// create the models
				var that = this;
				jQuery.each(oModelsConfig, function(sKey, oModelConfig) {
					
					// if the model refer to a service configuration we use the service configuration 
					var sService = oModelConfig.service, 
					    oModel;
					if (sService) {
						var oServiceConfig = oServicesConfig[sService]; 
						jQuery.sap.assert(oServiceConfig, "The service configuration for service \"" + sService + "\" is not available!");
						oModel = fnCreateModel.call(that, sKey, oServiceConfig);
					} else if (oModelConfig.type) {
						oModel = fnCreateModel.call(that, sKey, oModelConfig);
					}
					
					// we apply the model to the root component if created
					if (oModel) {
						that.setModel(oModel, sKey || undefined);
					}
					
				});
				
			}
			
		},


		/**
		 * @see sap.ui.base.ManagedObject#destroy
		 * @public
		 */
		destroy : function(bSuppressInvalidate) {
			// kill the mock servers
			if (this._mMockServers) {
				jQuery.each(this._mMockServers, function(sName, oMockServer) {
					oMockServer.stop();
				});
			}
			this._oMockServers = [];
			// remove the event handlers
			if (this._fnErrorHandler) {
				jQuery(window).unbind("error", this._fnErrorHandler);
				this._fnErrorHandler = null;
			}
			if (this._fnBeforeExit) {
				jQuery(window).unbind("beforeunload", this._fnBeforeExit);
				this._fnBeforeExit = null; 
			}
			if (this._fnExit) {
				jQuery(window).unbind("unload", this._fnExit);
				this._fnExit = null;
			}

			delete sap.ui.getApplication;

			sap.ui.base.ManagedObject.prototype.destroy.apply(this, arguments);
		}
		
		
		/**
		 * Registers this instance of sap.ui.app.Application with the Core.
		 *
		 * The implementation of this method is provided with "friend" access by Core.
		 * @see sap.ui.core.Core.constructor
		 *
		 * @function
		 * @name sap.ui.app.Application.prototype.register
		 * @private
		 */
		//register : function() {...}

		
	}, /* Metadata constructor */ sap.ui.app.ApplicationMetadata);
})(window);