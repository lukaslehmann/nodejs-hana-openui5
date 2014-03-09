/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides base class sap.ui.core.Component for all components
jQuery.sap.declare("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ui.core.UIComponentMetadata");
jQuery.sap.require("sap.ui.core.Component");
jQuery.sap.require("sap.ui.core.mvc.View");

/**
 * Creates and initializes a new UI component with the given <code>sId</code> and
 * settings.
 * 
 * The set of allowed entries in the <code>mSettings</code> object depends on
 * the concrete subclass and is described there. See {@link sap.ui.core.Component}
 * for a general description of this argument.
 * 
 * @param {string}
 *            [sId] optional id for the new control; generated automatically if
 *            no non-empty id is given Note: this can be omitted, no matter
 *            whether <code>mSettings</code> will be given or not!
 * @param {object}
 *            [mSettings] optional map/JSON-object with initial settings for the
 *            new component instance
 * @public
 * 
 * @class Base Class for UI Component.
 * @extends sap.ui.core.Component
 * @abstract
 * @author SAP
 * @version 1.16.8-SNAPSHOT
 * @name sap.ui.core.UIComponent
 * @experimental Since 1.9.2. The Component concept is still under construction, so some implementation details can be changed in future.
 */
sap.ui.core.Component.extend("sap.ui.core.UIComponent", /** @lends sap.ui.core.UIComponent */

{
	constructor : function(sId, mSettings) {

		try {
			sap.ui.core.Component.apply(this, arguments);
		} catch (e) {
			if (this._oRouter) {
				this._oRouter.destroy();
			}
			throw e;
		}

	},

	metadata : {
		"abstract": true,
		rootView : null, // the rootView to open (view name as string or view configuration object)
		publicMethods: [ "render" ],
		aggregations: {
			"rootControl": { type: "sap.ui.core.Control", multiple: false, visibility: "hidden" }
		},
		routing: {
			/*
			config: { // default values for routing
				viewType : "XML",
				viewPath: "NavigationWithoutMasterDetailPattern.view",
				targetParent: "myViewId",
				targetControl: "app",
				targetAggregation: "pages",
				clearTarget: false
			},
			*/
			/*
			routes: [ // contains routing configuration objects
				{
					name : "myRouteName1",
					pattern : "FirstView/{from}",
					view : "myViewId"
				},
			]
			*/
		}
		//autoDestroy: false // TODO: destroy component when view should be destroyed (not implemented yet!)
	}

}, /* Metadata constructor */ sap.ui.core.UIComponentMetadata);

/**
 * Initializes the Component instance after creation.
 *
 * Applications must not call this hook method directly, it is called by the
 * framework while the constructor of an Component is executed.
 *
 * Subclasses of Component should override this hook to implement any necessary
 * initialization. <b>When overriding this function make sure to invoke the
 * init function of the UIComponent as well!</b> 
 *
 * @function
 * @name sap.ui.core.Component.prototype.init
 * @protected
 */
sap.ui.core.UIComponent.prototype.init = function() {
	
	var that = this;
	var oPreprocessors = {};
	
	// when auto prefixing is enabled we add the prefix
	if (this.getAutoPrefixId()) {
		oPreprocessors.id = function(sId) {
			return that.createId(sId);
		};
	}
	
	// create the content
	sap.ui.base.ManagedObject.runWithOwner(function() {
		sap.ui.base.ManagedObject.runWithPreprocessors(function() {
			that.setAggregation("rootControl", that.createContent());
		}, oPreprocessors);
	}, this);
	
	// create the routing
	var oMetadata = this.getMetadata(),
	    oRoutingConfig = oMetadata.getRoutingConfig() || {},
	    aRoutes = oMetadata.getRoutes(),
	    oRootControl = this.getAggregation("rootControl");
	
	// only for root "views" we automatically define the target parent
	if (oRootControl instanceof sap.ui.core.mvc.View) {
		oRoutingConfig = jQuery.extend({}, {
			targetParent : oRootControl.getId()
		}, oRoutingConfig);
	}
	
	// create the router for the component instance
	if (aRoutes) {
		jQuery.sap.require("sap.ui.core.routing.Router");
		this._oRouter = new sap.ui.core.routing.Router(aRoutes, oRoutingConfig, this);
	}
	
};

/*
 * Destruction of the UIComponent
 */
sap.ui.core.UIComponent.prototype.destroy = function() {
	// destroy the router
	if (this._oRouter) {
		this._oRouter.destroy();
		delete this._oRouter;
	}
	// make sure that the component is destroyed properly
	sap.ui.core.Component.prototype.destroy.apply(this, arguments);
};

/**
 * Returns the reference to the router instance. The passed controller or view
 * have to be created in the context of a UIComponent to return the router 
 * instance. Otherwise this function will return undefined.
 * @param {sap.ui.core.mvc.View|sap.ui.core.mvc.Controller} either a view or controller
 * @return {sap.ui.core.routing.Router} the router instance
 * @since 1.16.1
 * @public
 */
sap.ui.core.UIComponent.getRouterFor = function(oControllerOrView) {
	var oView = oControllerOrView;
	if (oView instanceof sap.ui.core.mvc.Controller) {
		oView = oView.getView();
	}
	if (oView instanceof sap.ui.core.mvc.View) {
		var sOwner = sap.ui.core.Component.getOwnerIdFor(oView),
			oComponent = sap.ui.component(sOwner);
		
		if (oComponent) {
			return oComponent.getRouter();
		} else {
			return undefined;
		}
	}
};

/**
 * Returns the reference to the router instance which has been created by
 * the UIComponent once the routes in the routing metadata has been defined.
 * @since 1.16.1
 * @return {sap.ui.core.routing.Router} the router instance
 * @public
 */
sap.ui.core.UIComponent.prototype.getRouter = function() {
	return this._oRouter;
};

/**
 * A method to be implemented by UIComponents, returning the flag whether to prefix 
 * the IDs of controls automatically or not if the controls are created inside
 * the {@link sap.ui.core.UIComponent#createContent} function. By default this 
 * feature is not activated. 
 * 
 * You can overwrite this function and return true to activate the automatic
 * prefixing.
 * 
 * @since 1.15.1
 * @experimental Since 1.15.1. This feature might be changed in future.
 * @return {boolean} true, if the controls IDs should be prefixed automatically
 * @protected
 */
sap.ui.core.UIComponent.prototype.getAutoPrefixId = function() {
	return false;
};

/**
 * returns an Element by its id in the context of the Component
 *
 * @return Element by its id
 * @public
 */
sap.ui.core.UIComponent.prototype.byId = function(sId) {
	return sap.ui.getCore().byId(this.createId(sId));
};

/**
 * creates an id for an Element prefixed with the component id
 *
 * @return prefixed id
 * @public
 */
sap.ui.core.UIComponent.prototype.createId = function(sId) {
	if (!this.isPrefixedId(sId)) {
		// components have 3 dashes as separator, views 2 and controls/elements 1
		sId = this.getId() + "---" + sId;
	}
	return sId;
};

/**
 * Checks whether the given ID is already prefixed with this View's ID
 *
 * @param {string} potentially prefixed id
 * @return whether the ID is already prefixed
 */
sap.ui.core.UIComponent.prototype.isPrefixedId = function(sId) {
	return (sId && sId.indexOf(this.getId() + "---") === 0);
};

/**
 * The method to create the Content (UI Control Tree) of the Component. 
 * This method has to be overwritten in the implementation of the component
 * if the root view is not declared in the component metadata.
 *
 * @public
 */
sap.ui.core.UIComponent.prototype.createContent = function() {
	var oRootView = this.getMetadata().getRootView();
	if (oRootView) {
		return sap.ui.view(oRootView);
	}
	return null;
};

/**
 * Renders the the root control of the UIComponent.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager a RenderManager instance
 * @public
 */
sap.ui.core.UIComponent.prototype.render = function(oRenderManager) {
	var oControl = this.getAggregation("rootControl");
	if (oControl && oRenderManager) {
		oRenderManager.renderControl(oControl);
	}
};

/**
 * Returns the reference to the UIArea of the container.
 *
 * @return {sap.ui.core.UIArea} reference to the UIArea of the container
 * @public
 */
sap.ui.core.UIComponent.prototype.getUIArea = function() {
	return (this.oContainer ? this.oContainer.getUIArea() : null);
};

/**
 * Sets the reference to the ComponentContainer - later required for the 
 * determination of the UIArea for the UIComponent.
 *
 * @param {sap.ui.core.ComponentContainer} oContainer reference to a ComponentContainer
 * @return {sap.ui.core.UIComponent} reference to this instance to allow method chaining
 * @public
 */
sap.ui.core.UIComponent.prototype.setContainer = function(oContainer) {
	this.oContainer = oContainer;
	return this;
};

/**
 * Function is called when the rendering of the Component Container is started.
 *
 * Applications must not call this hook method directly, it is called from ComponentContainer.
 *
 * Subclasses of UIComponent override this hook to implement any necessary actions before the rendering.
 *
 * @function
 * @name sap.ui.core.UIComponent.prototype.onBeforeRendering
 * @protected
 */
sap.ui.core.UIComponent.prototype.onBeforeRendering = function() {};

/**
 * Function is called when the rendering of the Component Container is completed.
 *
 * Applications must not call this hook method directly, it is called from ComponentContainer.
 *
 * Subclasses of UIComponent override this hook to implement any necessary actions after the rendering.
 *
 * @function
 * @name sap.ui.core.UIComponent.prototype.onAfterRendering
 * @protected
 */
sap.ui.core.UIComponent.prototype.onAfterRendering = function() {};
