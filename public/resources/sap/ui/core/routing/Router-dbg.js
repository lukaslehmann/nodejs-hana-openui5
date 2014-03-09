/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*global crossroads *///declare unusual global vars for JSLint/SAPUI5 validation

jQuery.sap.declare("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ui.base.EventProvider");
jQuery.sap.require("sap.ui.base.ManagedObject");
jQuery.sap.require("sap.ui.thirdparty.signals");
jQuery.sap.require("sap.ui.thirdparty.crossroads");
jQuery.sap.require("sap.ui.core.routing.Route");
jQuery.sap.require("sap.ui.core.routing.HashChanger");

(function(){
	
	var oRouters = {};

	/**
	 * Instantiates a SAPUI5 Router
	 * 
	 * @class
	 *
	 * @param {object} Default values for route configuration
	 * @param {sap.ui.core.routing.Router} A router to which all paths are relative to
	 * @public
	 * @name sap.ui.core.routing.Router
	 */
	sap.ui.base.EventProvider.extend("sap.ui.core.routing.Router", /** @lends sap.ui.core.routing.Router */ {

		constructor : function(oRoutes, oConfig, oOwner) {
			sap.ui.base.EventProvider.apply(this);

			this._oConfig = oConfig;
			this._oRouter = crossroads.create();
			this._oRouter.ignoreState = true;
			this._oRoutes = {};
			this._oViews = {};
			this._oOwner = oOwner;

			var that = this;

			if (!oRoutes) {
				oRoutes = {};
			}

			if (jQuery.isArray(oRoutes)) {
				//Convert route object
				var aRoutes = oRoutes;
				oRoutes = {};
				jQuery.each(aRoutes, function(iRouteIndex, oRouteConfig) {
					oRoutes[oRouteConfig.name] = oRouteConfig;
				});
			}

			jQuery.each(oRoutes, function(sRouteName, oRouteConfig) {
				if (oRouteConfig.name == undefined) {
					oRouteConfig.name = sRouteName;
				}
				that.addRoute(oRouteConfig);
			});

		},
		metadata : {
			publicMethods: ["initialize", "getURL", "register"]
		}

	});
	
	sap.ui.core.routing.Router.M_EVENTS = {
		RouteMatched : "routeMatched",
		RoutePatternMatched : "routePatternMatched",
		ViewCreated : "viewCreated"
	};
	
	/**
	 * Adds a route to the router
	 * 
	 * @param {object} oConfig configuration object for the route 
	 *        oConfig.pattern:  the url pattern where it needs to match agains
	 *        oConfig.name:     the name of the route
	 *        oConfig.callback: a function which is executed after the route matched
	 * @param {sap.ui.core.routing.Route} oParent the parent of the route
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.addRoute = function (oConfig, oParent) {
		if (!oConfig.name) {
			jQuery.sap.log.error("A name has to be specified for every route");
		}

		if (this._oRoutes[oConfig.name]) {
			jQuery.sap.log.error("Route with name " + oConfig.name + " already exists");
		}
		this._oRoutes[oConfig.name] = new sap.ui.core.routing.Route(this, oConfig, oParent);
	}
	
	sap.ui.core.routing.Router.prototype.parse = function (sNewHash, sOldHash) {
		this._oRouter.parse(sNewHash);
	};
	
	/**
	 * Attaches the router to the hash changer
	 *
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.initialize = function () {
		var that = this,
			oHashChanger = this.oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
		
		this.fnHashChanged = jQuery.proxy(function(oEvent) {
			that.parse(oEvent.getParameter("newHash"), oEvent.getParameter("oldHash"));
		}, this);
		
		oHashChanger.attachEvent("hashChanged", this.fnHashChanged);
		
		if(!oHashChanger.init()) {
			this.parse(oHashChanger.getHash());
		}
		
		return this;
	};
	
	/**
	 * Removes the router from the hash changer
	 *
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.destroy = function () {
		sap.ui.base.EventProvider.prototype.destroy.apply(this);

		if (!this.fnHashChanged) {
			jQuery.sap.log.warning("Router is not initialized.");
			return this;
		}

		this._oOwner = null;
		
		//will remove all the signals attached to the routes - all the routes will not be useable anymore
		this._oRouter.removeAllRoutes();
		this._oRouter = null;
		
		this.oHashChanger.detachEvent("hashChanged", this.fnHashChanged);
		return this;
	};
	
	/**
	 * Returns the URL for the route and replaces the placeholders with the values in oParameters
	 * 
	 * @param {String} Name of the route
	 * @param {object} Parameters for the route
	 * @return {string} the unencoded pattern with interpolated arguments
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.getURL = function (sName, oParameters) {
		if(oParameters === undefined) {
			//even if there are only optional parameters crossroads cannot navigate with undefined
			oParameters = {};
		}
		
		var oRoute = this._oRoutes[sName];
		if (!oRoute) {
			jQuery.sap.log.warning("Route with name " + sName + " does not exist");
			return;
		}
		return oRoute.getURL(oParameters);
	};
	
	/**
	 * Returns a cached view for a given name or creates it if it does not yet exists
	 * 
	 * @param {String} sViewName Name of the view
	 * @param {String} sViewType Type of the view
	 * @return {sap.ui.core.mvc.View} the view instance
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.getView = function (sViewName, sViewType) {
		if (!sViewName) {
			jQuery.sap.log.error("A name for the view has to be defined");
		}
		
		if (!this._oViews[sViewName]) {
			var fnCreateView = function() {
				return sap.ui.view({ 
					type: sViewType,
					viewName: sViewName,
				});
			};
			if (this._oOwner) {
				var that = this;
				sap.ui.base.ManagedObject.runWithOwner(function() {
					that._oViews[sViewName] = fnCreateView();
				}, this._oOwner);
			} else {
				this._oViews[sViewName] = fnCreateView();
			}
			this.fireViewCreated({
				view: this._oViews[sViewName],
				viewName: sViewName,
				type: sViewType
			});
		}
		return this._oViews[sViewName];
	};
	
	/**
	 * Navigates to a specific route defining a set of parameters
	 * 
	 * @param {String} sName Name of the route
	 * @param {object} oParameters Parameters for the route
	 * @param {boolean} bReplace Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
	 * @return {string} the unencoded pattern with interpolated arguments
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.navTo = function (sName, oParameters, bReplace) {		
		if (bReplace) {
			this.oHashChanger.replaceHash(this.getURL(sName, oParameters));
		} else {
			this.oHashChanger.setHash(this.getURL(sName, oParameters));
		}
	};
	
	/**
	 * Attach event-handler <code>fnFunction</code> to the 'routeMatched' event of this <code>sap.ui.core.routing.Router</code>.<br/>
	 *
	 *
	 * @param {object}
	 *            [oData] The object, that should be passed along with the event-object when firing the event.
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs. This function will be called on the
	 *            oListener-instance (if present) or in a 'static way'.
	 * @param {object}
	 *            [oListener] Object on which to call the given function. If empty, this Model is used.
	 *
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.attachRouteMatched = function(oData, fnFunction, oListener) {
		this.attachEvent("routeMatched", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Detach event-handler <code>fnFunction</code> from the 'routeMatched' event of this <code>sap.ui.core.routing.Router</code>.<br/>
	 *
	 * The passed function and listener object must match the ones previously used for event registration.
	 *
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs.
	 * @param {object}
	 *            oListener Object on which the given function had to be called.
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.detachRouteMatched = function(oData, fnFunction, oListener) {
		this.detachEvent("routeMatched", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Fire event routeMatched to attached listeners.
	 *
	 * @param {object} [mArguments] the arguments to pass along with the event.
	 * 
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @protected
	 */
	sap.ui.core.routing.Router.prototype.fireRouteMatched = function(mArguments) {
		this.fireEvent("routeMatched", mArguments);
		return this;
	};
	
	/**
	 * Attach event-handler <code>fnFunction</code> to the 'viewCreated' event of this <code>sap.ui.core.routing.Router</code>.<br/>
	 *
	 *
	 * @param {object}
	 *            [oData] The object, that should be passed along with the event-object when firing the event.
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs. This function will be called on the
	 *            oListener-instance (if present) or in a 'static way'.
	 * @param {object}
	 *            [oListener] Object on which to call the given function. If empty, this Model is used.
	 *
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.attachViewCreated = function(oData, fnFunction, oListener) {
		this.attachEvent("viewCreated", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Detach event-handler <code>fnFunction</code> from the 'viewCreated' event of this <code>sap.ui.core.routing.Router</code>.<br/>
	 *
	 * The passed function and listener object must match the ones previously used for event registration.
	 *
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs.
	 * @param {object}
	 *            oListener Object on which the given function had to be called.
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.detachViewCreated = function(oData, fnFunction, oListener) {
		this.detachEvent("viewCreated", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Fire event viewCreated to attached listeners.
	 *
	 * @param {object} [mArguments] the arguments to pass along with the event.
	 * 
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @protected
	 */
	sap.ui.core.routing.Router.prototype.fireViewCreated = function(mArguments) {
		this.fireEvent("viewCreated", mArguments);
		return this;
	};
	
	
	/**
	 * Attach event-handler <code>fnFunction</code> to the 'routePatternMatched' event of this <code>sap.ui.core.routing.Router</code>.<br/>
	 * This event is similar to route matched. But it will only fire for the route that has a matching pattern, not for its parent Routes <br/>
	 *
	 * @param {object}
	 *            [oData] The object, that should be passed along with the event-object when firing the event.
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs. This function will be called on the
	 *            oListener-instance (if present) or in a 'static way'.
	 * @param {object}
	 *            [oListener] Object on which to call the given function. If empty, this Model is used.
	 *
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.attachRoutePatternMatched = function(oData, fnFunction, oListener) {
		this.attachEvent("routePatternMatched", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Detach event-handler <code>fnFunction</code> from the 'routePatternMatched' event of this <code>sap.ui.core.routing.Router</code>.<br/>
	 * This event is similar to route matched. But it will only fire for the route that has a matching pattern, not for its parent Routes <br/>
	 *
	 * The passed function and listener object must match the ones previously used for event registration.
	 *
	 * @param {function}
	 *            fnFunction The function to call, when the event occurs.
	 * @param {object}
	 *            oListener Object on which the given function had to be called.
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.detachRoutePatternMatched = function(oData, fnFunction, oListener) {
		this.detachEvent("routePatternMatched", oData, fnFunction, oListener);
		return this;
	};
	
	/**
	 * Fire event routePatternMatched to attached listeners.
	 * This event is similar to route matched. But it will only fire for the route that has a matching pattern, not for its parent Routes <br/>
	 *
	 * @param {object} [mArguments] the arguments to pass along with the event.
	 * 
	 * @return {sap.ui.core.routing.Router} <code>this</code> to allow method chaining
	 * @protected
	 */
	sap.ui.core.routing.Router.prototype.fireRoutePatternMatched = function(mArguments) {
		this.fireEvent("routePatternMatched", mArguments);
		return this;
	};
	
	/**
	 * Registers the router to access it from another context. Use sap.ui.routing.Router.getRouter() to receive the instance
	 * 
	 * @param {String} Name of the router
	 * @public
	 */
	sap.ui.core.routing.Router.prototype.register = function (sName) {
		oRouters[sName] = this;
		return this;
	};
	
	/**
	 * Get a registered router
	 * 
	 * @param {String} Name of the router
	 * @return {sap.ui.core.routing.Router} The router with the specified name, else undefined
	 * @public
	 */
	sap.ui.core.routing.Router.getRouter = function (sName) {
		return oRouters[sName];
	};

}());
