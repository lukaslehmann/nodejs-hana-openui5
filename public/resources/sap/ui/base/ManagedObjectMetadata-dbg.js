/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.base.ManagedObjectMetadata
jQuery.sap.declare("sap.ui.base.ManagedObjectMetadata");
jQuery.sap.require("sap.ui.base.Metadata");
jQuery.sap.require("sap.ui.base.DataType");

/**
 * Creates a new metadata object for a Element subclass.
 *
 * @param {string} sClassName fully qualified name of the class that is described by this metadata object
 * @param {object} oStaticInfo static info to construct the metadata from
 *
 * @class
 * @author Frank Weigel
 * @version 1.16.8-SNAPSHOT
 * @since 0.8.6
 */
sap.ui.base.ManagedObjectMetadata = function(sClassName, oClassInfo) {

	// call super constructor
	sap.ui.base.Metadata.apply(this, arguments);

};

//chain the prototypes
sap.ui.base.ManagedObjectMetadata.prototype = jQuery.sap.newObject(sap.ui.base.Metadata.prototype);

/**
 * @private
 */
sap.ui.base.ManagedObjectMetadata.prototype.applySettings = function(oClassInfo) {

	var oStaticInfo = oClassInfo.metadata;

	sap.ui.base.Metadata.prototype.applySettings.call(this, oClassInfo);

	var rPlural = /(children|ies|ves|oes|ses|ches|shes|xes|s)$/i;
	var mSingular = {'children' : -3, 'ies' : 'y', 'ves' : 'f', 'oes' : -2, 'ses' : -2, 'ches' : -2, 'shes' : -2, 'xes' : -2, 's' : -1 };

	function normalize(mInfoMap, sDefaultName, oDefaultValues) {
		var sName,oInfo;
		mInfoMap = mInfoMap || {};
		for(sName in mInfoMap) {
			oInfo = mInfoMap[sName];
			// if settings are not an object literal and if there is a default setting, set it
			if ( sDefaultName && typeof oInfo !== "object" ) {
				oInfo = {};
				oInfo[sDefaultName] = mInfoMap[sName];
			}
			oInfo = jQuery.extend({}, oDefaultValues, oInfo);
			oInfo.name = sName;
			// if info contains a multiple flag but no singular name, calculate one
			if ( oInfo.multiple === true && !oInfo.singularName) {
				oInfo.singularName = sName.replace(rPlural, function($,sPlural) {
					var vRepl = mSingular[sPlural.toLowerCase()];
					return typeof vRepl === "string" ? vRepl : sPlural.slice(0,vRepl);
				});
			}
			mInfoMap[sName] = oInfo;
		}
		return mInfoMap;
	}

	function filter(mInfoMap, bPublic) {
		var mResult={},sName;
		for(sName in mInfoMap) {
			if ( bPublic === (mInfoMap[sName].visibility === 'public') ) {
				mResult[sName] = mInfoMap[sName];
			}
		}
		return mResult;
	}
	
	var rLibName = /([a-z][^.]*(?:\.[a-z][^.]*)*)\./;

	function defaultLibName(sName) {
	  var m = rLibName.exec(sName);
	  return (m && m[1]) || "";
	}

	// init basic metadata from static infos and fallback to defaults
	this._sLibraryName = oStaticInfo.library || defaultLibName(this.getName());
	this._mProperties = normalize(oStaticInfo.properties, "type", { type : "string", group : "Misc" });
	var mAllAggregations = normalize(oStaticInfo.aggregations, "type", { type : "sap.ui.core.Control", multiple : true, visibility : 'public' });
	this._mAggregations = filter(mAllAggregations, true);
	this._mPrivateAggregations = filter(mAllAggregations, false);
	this._sDefaultAggregation = oStaticInfo.defaultAggregation || null;
	this._mAssociations = normalize(oStaticInfo.associations, "type", { type : "sap.ui.core.Control", multiple : false});
	this._mEvents = normalize(oStaticInfo.events, /* no default setting */ null, { allowPreventDefault : false });

	this._bEnriched = false;

	if ( oClassInfo.metadata.__version > 1.0 ) {
		this.generateAccessors();
	}

};

/**
 * @private
 */
sap.ui.base.ManagedObjectMetadata.prototype.afterApplySettings = function() {

	sap.ui.base.Metadata.prototype.afterApplySettings.call(this);

	// if there is a parent class, produce the flattened "all" views for the element specific metadata
	// PERFOPT: this could be done lazily
	var oParent = this.getParent();
	if ( oParent && oParent instanceof sap.ui.base.ManagedObjectMetadata ) {
		this._mAllEvents = jQuery.extend({},oParent._mAllEvents, this._mEvents);
		this._mAllProperties = jQuery.extend({},oParent._mAllProperties, this._mProperties);
		this._mAllPrivateAggregations = jQuery.extend({},oParent._mAllPrivateAggregations, this._mPrivateAggregations);
		this._mAllAggregations = jQuery.extend({},oParent._mAllAggregations, this._mAggregations);
		this._mAllAssociations = jQuery.extend({},oParent._mAllAssociations, this._mAssociations);
		this._sDefaultAggregation = this._sDefaultAggregation || oParent._sDefaultAggregation;
		if ( oParent._mHiddenAggregations ) {
		  this._mHiddenAggregations = jQuery.extend({},oParent._mHiddenAggregations);
		}
	} else {
		this._mAllEvents = this._mEvents;
		this._mAllProperties = this._mProperties;
		this._mAllPrivateAggregations = this._mPrivateAggregations;
		this._mAllAggregations = this._mAggregations;
		this._mAllAssociations = this._mAssociations;
	}

};

sap.ui.base.ManagedObjectMetadata.Kind = {
  PROPERTY :0, SINGLE_AGGREGATION : 1, MULTIPLE_AGGREGATION : 2, SINGLE_ASSOCIATION : 3, MULTIPLE_ASSOCIATION : 4, EVENT : 5
};


/**
 * Returns the name of the library that contains the described UIElement.
 * @return {string} the name of the library
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getLibraryName = function() {
	return this._sLibraryName;
};

/**
 * Returns whether the class/control is abstract
 * @return {boolean} whether the class/control is abstract
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.isAbstract = function() {
	return this._bAbstract;
};

/**
 * Declares an additional property for the UIElement class described by this metadata.
 *
 * Any property declaration via this method must happen before the described class
 * is subclassed, or the added property will not be visible in the subclass.
 *
 * Typically used to enrich UIElement classes in an aspect oriented manner.
 * @public
 * @see sap.ui.core.EnabledPropagator
 */
sap.ui.base.ManagedObjectMetadata.prototype.addProperty = function(sName, oInfo) {
	oInfo.name = sName;
	this._mProperties[sName] = oInfo;
	if(!this._mAllProperties[sName]) {// ensure extended AllProperties meta-data is also enriched
		this._mAllProperties[sName] = oInfo;
	}

	if ( this._bEnriched ) { // does not seem right! this is the 'drop out' condition for _enrichChildInfos() -> senseless
		this._enrichChildInfos();
	}
	// TODO notify listeners (subclasses) about change
};

/**
 * Checks the existance of the given property by its name
 * @param {string} sName name of the property
 * @return {boolean} true, if the property exists
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.hasProperty = function(sName) {
	return !!this._mAllProperties[sName];
};

/**
 * Returns infos about the properties declared by the UIElement class
 * described by this metadata object. Properties from ancestor classes
 * are not returned.
 *
 * The returned map contains property info objects keyed by the property name.
 *
 * @return {map} Map of property infos keyed by property names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getProperties = function() {
	return this._mProperties;
};

/**
 * Returns infos about all properties declared by the UIElement class
 * described by this metadata object as well as properties from base classes.
 *
 * The returned map contains property info objects keyed by the property name.
 *
 * @return {map} Map of property infos keyed by property names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getAllProperties = function() {
	return this._mAllProperties;
};

/**
 * Returns infos about the public aggregations declared by the UIElement class
 * described by this metadata object. Aggregations from ancestor classes
 * are not returned.
 *
 * The returned map contains aggregation info objects keyed by the aggregation name.
 * In case of 0..1 aggregations this is the singular name, otherwise it is the plural
 * name.
 *
 * @return {map} Map of aggregation infos keyed by aggregation names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getAggregations = function() {
	return this._mAggregations;
};

/**
 * Checks the existance of the given aggregation by its name
 * @param {string} sName name of the aggregation
 * @return {boolean} true, if the aggregation exists
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.hasAggregation = function(sName) {
	return !!this._mAllAggregations[sName];
};

/**
 * Returns infos about all public aggregations declared by the UIElement class
 * described by this metadata object as well as public aggregations from base classes.
 *
 * The returned map contains aggregation info objects keyed by the aggregation name.
 * In case of 0..1 aggregations this is the singular name, otherwise it is the plural
 * name.
 *
 * @return {map} Map of aggregation infos keyed by aggregation names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getAllAggregations = function() {
	return this._mAllAggregations;
};

/**
 * Returns infos about all private (hidden) aggregations declared by the UIElement class
 * described by this metadata object as well as private aggregations from base classes.
 *
 * The returned map contains aggregation info objects keyed by the aggregation name.
 * In case of 0..1 aggregations this is the singular name, otherwise it is the plural
 * name.
 *
 * @return {map} Map of aggregation infos keyed by aggregation names
 * @protected
 */
sap.ui.base.ManagedObjectMetadata.prototype.getAllPrivateAggregations = function() {
	return this._mAllPrivateAggregations;
};

/**
 * Returns the info object for a public or private aggregation declared by the described 
 * ManagedObject class or by any of its ancestors.
 *
 * @return {object} aggregation info or null
 * @protected
 */
sap.ui.base.ManagedObjectMetadata.prototype.getManagedAggregation = function(sAggregationName) {
	return this._mAllAggregations[sAggregationName] || this._mAllPrivateAggregations[sAggregationName] 
};

/**
 * Returns the name of the default aggregation of this control.
 * If the control itself does not define a default aggregation, then the
 * default aggregation of the parent is returned. If no control in the
 * hierarchy defines a default aggregation, null is returned.
 *
 * @return {string} Name of the default aggregation for this class
 */
sap.ui.base.ManagedObjectMetadata.prototype.getDefaultAggregationName = function() {
	return this._sDefaultAggregation;
};

/**
 * Returns the name of the default aggregation of this control.
 * If the control itself does not define a default aggregation, then the
 * default aggregation of the parent is returned.
 *
 * @return {string} Name of the default aggregation for this class
 */
sap.ui.base.ManagedObjectMetadata.prototype.getDefaultAggregation = function() {
	return this._sDefaultAggregation && this.getAllAggregations()[this._sDefaultAggregation];
};

/**
 * Returns infos about the associations declared by the UIElement class
 * described by this metadata object. Associations from ancestor classes
 * are not returned.
 *
 * The returned map contains association info objects keyed by the association name.
 * In case of 0..1 associations this is the singular name, otherwise it is the plural
 * name.
 *
 * @return {map} Map of association infos keyed by association names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getAssociations = function() {
	return this._mAssociations;
};

/**
 * Checks the existance of the given association by its name
 * @param {string} sName name of the association
 * @return {boolean} true, if the association exists
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.hasAssociation = function(sName) {
	return !!this._mAllAssociations[sName];
};

/**
 * Returns infos about all associations declared by the UIElement class
 * described by this metadata object as well as associations from base classes.
 *
 * The returned map contains association info objects keyed by the association name.
 * In case of 0..1 associations this is the singular name, otherwise it is the plural
 * name.
 *
 * @return {map} Map of association infos keyed by association names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getAllAssociations = function() {
	return this._mAllAssociations;
};

/**
 * Returns infos about the events declared by the UIElement class
 * described by this metadata object. Events from ancestor classes
 * are not returned.
 *
 * The returned map contains events info objects keyed by the events name.
 *
 * @return {map} Map of event infos keyed by event names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getEvents = function() {
	return this._mEvents;
};

/**
 * Checks the existance of the given event by its name
 * @param {string} sName name of the event
 * @return {boolean} true, if the event exists
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.hasEvent = function(sName) {
	return !!this._mAllEvents[sName];
};

/**
 * Returns infos about all events declared by the UIElement class
 * described by this metadata object as well as events from base classes.
 *
 * The returned map contains event info objects keyed by the event name.
 *
 * @return {map} Map of event infos keyed by event names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getAllEvents = function() {
	return this._mAllEvents;
};

/**
 * Returns a map of default values for all properties declared by the
 * described class and its ancestors, keyed by the property name.
 *
 * @return {map} Map of default values keyed by property names
 * @public
 */
sap.ui.base.ManagedObjectMetadata.prototype.getPropertyDefaults = function() {

	var mDefaults = this._mDefaults,
		oType;
	if ( mDefaults ) {
		return mDefaults;
	}

	if ( this.getParent() instanceof sap.ui.base.ManagedObjectMetadata ) {
		mDefaults = jQuery.sap.newObject(this.getParent().getPropertyDefaults());
	} else {
		mDefaults = {};
	}

	for(var s in this._mProperties) {
		if ( this._mProperties[s].defaultValue !== null ) {
			mDefaults[s] = this._mProperties[s].defaultValue;
		} else {
			oType = sap.ui.base.DataType.getType(this._mProperties[s].type);
			if (oType instanceof sap.ui.base.DataType) {
				mDefaults[s] = oType.getDefaultValue();
			} else { // Enumeration
				for (var i in oType) {
					mDefaults[s] = oType[i];
					break;
				}
			}
		}
	}
	return (this._mDefaults = mDefaults);
};


sap.ui.base.ManagedObjectMetadata.prototype.createPropertyBag = function() {
	if ( !this._fnPropertyBagFactory ) {
		this._fnPropertyBagFactory = jQuery.sap.factory(this.getPropertyDefaults());
	}
	return new (this._fnPropertyBagFactory)();
};

/**
 * Helper method that enriches the (generated) information objects for children
 * (e.g. properties, aggregations, ...) of this Element.
 *
 * Also ensures that the parent metadata is enriched.
 *
 * @private
 */
sap.ui.base.ManagedObjectMetadata.prototype._enrichChildInfos = function() {

	if ( this._bEnriched ) {
		return;
	}

	if ( this.getParent() instanceof sap.ui.base.ManagedObjectMetadata ) {
		this.getParent()._enrichChildInfos();
	}

	var m,sName,oInfo;
	function method(sPrefix, sName) {
		return sPrefix + sName.substring(0,1).toUpperCase() + sName.substring(1);
	}

	// adapt properties
	m=this._mProperties;
	for(sName in m) {
		oInfo = m[sName];
		oInfo._sName = sName;
		oInfo._sUID = sName;
		oInfo._oParent = this;
		oInfo._iKind = sap.ui.base.ManagedObjectMetadata.Kind.PROPERTY;
		oInfo._sMutator = method("set", sName);
		oInfo._sGetter = method("get", sName);
	}

	// adapt aggregations
	m=this._mAggregations;
	for(sName in m) {
		oInfo = m[sName];
		oInfo._sName = sName;
		oInfo._sUID = "aggregation:" + sName;
		oInfo._oParent = this;
		oInfo._sDestructor = method("destroy", sName);
		oInfo._sGetter = method("get", sName);
		if ( oInfo.multiple ) {
			oInfo._iKind = sap.ui.base.ManagedObjectMetadata.Kind.MULTIPLE_AGGREGATION;
			oInfo._sMutator = method("add", oInfo.singularName);
			oInfo._sRemoveMutator = method("remove", oInfo.singularName);
			oInfo._sRemoveAllMutator = method("removeAll", sName);
		} else {
			oInfo._iKind = sap.ui.base.ManagedObjectMetadata.Kind.SINGLE_AGGREGATION;
			oInfo._sMutator = method("set", sName);
		}
	}

	// adapt associations
	m=this._mAssociations;
	for(sName in m) {
		oInfo = m[sName];
		oInfo._sName = sName;
		oInfo._sUID = "association:" + sName;
		oInfo._oParent = this;
		oInfo._sGetter = method("get", sName);
		if ( oInfo.multiple ) {
			oInfo._iKind = sap.ui.base.ManagedObjectMetadata.Kind.MULTIPLE_ASSOCIATION;
			oInfo._sMutator = method("add", oInfo.singularName);
		} else {
			oInfo._iKind = sap.ui.base.ManagedObjectMetadata.Kind.SINGLE_ASSOCIATION;
			oInfo._sMutator = method("set", sName);
		}
	}

	// adapt events
	m=this._mEvents;
	for(sName in m) {
		oInfo = m[sName];
		oInfo._sName = sName;
		oInfo._sUID = "event:" + sName;
		oInfo._oParent = this;
		oInfo._iKind = sap.ui.base.ManagedObjectMetadata.Kind.EVENT;
		oInfo._sMutator = method("attach", sName);
	}

	this._bEnriched = true;
};

/**
 * Builds a "reflection like" map of setters/type infos keyed by the possible JSON names.
 * Mainly used for the {@link sap.ui.core.Element.applySettings} method.
 *
 * @see sap.ui.core.Element.prototype.applySettings
 * @private
 */
sap.ui.base.ManagedObjectMetadata.prototype.getJSONKeys = function() {

	if ( this._mJSONKeys ) {
		return this._mJSONKeys;
	}

	this._enrichChildInfos();

	var mJSONKeys = {};
	function addKeys(m) {
		var sName, oInfo;
		for(sName in m) {
			oInfo = m[sName];
			if ( !mJSONKeys[sName] || oInfo._iKind < mJSONKeys[sName]._iKind ) {
				mJSONKeys[sName] = oInfo;
			};
			mJSONKeys[oInfo._sUID] = oInfo;
		};
	}

	addKeys(this.getAllProperties());
	addKeys(this.getAllAggregations());
	addKeys(this.getAllAssociations());
	addKeys(this.getAllEvents());

	return (this._mJSONKeys = mJSONKeys);
};

sap.ui.base.ManagedObjectMetadata.prototype.generateAccessors = function() {

	var meta=this;
	var proto = this.getClass().prototype;
	function method(sPrefix, sName, fn, bDeprecated) {
		var sName = sPrefix + sName.substring(0,1).toUpperCase() + sName.substring(1);
		if ( !proto[sName] ) {
			proto[sName] = bDeprecated ? function() {
				jQuery.sap.log.warning("Usage of deprecated feature: " + meta.getName() + "." + sName);
				return fn.apply(this, arguments);
			} : fn; 
			meta._aPublicMethods.push(sName);
		}
	}

	jQuery.each(this._mProperties, function(n,info) {
		method("get", n, function() { return this.getProperty(n); });
		method("set", n, function(v) { this.setProperty(n,v); return this; }, info.deprecated);
		if ( info.bindable ) {
			method("bind", n, function(p,fn,m) { this.bindProperty(n,p,fn,m); return this; }, info.deprecated);
			method("unbind", n, function(p) { this.unbindProperty(n,p); return this; });
		}
	});
	jQuery.each(this._mAggregations, function(n,info) {
		if ( !info.multiple ) {
			method("get", n, function() { return this.getAggregation(n); });
			method("set", n, function(v) { this.setAggregation(n,v); return this; }, info.deprecated);
		} else {
			var n1 = info.singularName;
			method("get", n, function() { return this.getAggregation(n,[]); });
			method("add", n1, function(a) { this.addAggregation(n,a); return this; }, info.deprecated);
			method("insert", n1, function(i,a) { this.insertAggregation(n,i,a); return this; }, info.deprecated);
			method("remove", n1, function(a) { return this.removeAggregation(n,a); });
			method("removeAll", n, function() { return this.removeAllAggregation(n); });
			method("indexOf", n1, function(a) { return this.indexOfAggregation(n,a); });
		}
		method("destroy", n, function() { this.destroyAggregation(n); return this; });
		if ( info.bindable ) {
			method("bind", n, function(p,t,s,f) { this.bindAggregation(n,p,t,s,f); return this; }, info.deprecated);
			method("unbind", n, function(p) { this.unbindAggregation(n,p); return this; });
		}
	});
	jQuery.each(this._mAssociations, function(n,info) {
		if ( !info.multiple ) {
			method("get", n, function() { return this.getAssociation(n); });
			method("set", n, function(v) { this.setAssociation(n,v); return this; }, info.deprecated);
		} else {
			var n1 = info.singularName;
			method("get", n, function() { return this.getAssociation(n,[]); });
			method("add", n1, function(a) { this.addAssociation(n,a); return this; }, info.deprecated);
			method("remove", n1, function(a) { return this.removeAssociation(n,a); });
			method("removeAll", n, function() { return this.removeAllAssociation(n); });
		}
	});
	jQuery.each(this._mEvents, function(n,info) {
		method("attach", n, function(d,f,o) { this.attachEvent(n,d,f,o); return this; }, info.deprecated);
		method("detach", n, function(f,o) { this.detachEvent(n,f,o); return this; });
		var n1 = !!info.allowPreventDefault;
		method("fire", n, function(p) { return this.fireEvent(n,p, n1); });
	});

};

(function() {

	/**
	 * Usage counters for the different UID tokens
	 */
	var mUIDCounts = {};

	function uid(sId) {
		jQuery.sap.assert(!/[0-9]+$/.exec(sId), "AutoId Prefixes must not end with numbers");

		sId = sap.ui.getCore().getConfiguration().getUIDPrefix() + sId;

		// initialize counter
		mUIDCounts[sId] = mUIDCounts[sId] || 0;

		// combine prefix + counter
		// concatenating sId and a counter is only safe because we don't allow trailing numbers in sId!
		return (sId + mUIDCounts[sId]++);
	}

	/**
	 * Calculates a new id based on a prefix.
	 *
	 * @return {string} A (hopefully unique) control id
	 * @public
	 * @function
	 */
	sap.ui.base.ManagedObjectMetadata.uid = uid;

	/**
	 * Calculates a new id for an instance of this class.
	 *
	 * Note that the calculated short name part is usually not unique across
	 * all classes, but doesn't have to be. It might even be empty when the
	 * class name consists of invalid characters only.
	 *
	 * @return {string} A (hopefully unique) control id
	 * @public
	 */
	sap.ui.base.ManagedObjectMetadata.prototype.uid = function() {

		var sId = this._sUIDToken;
		if ( typeof sId !== "string" ) {
			// start with qualified class name
			sId  = this.getName();
			// reduce to unqualified name
			sId = sId.slice(sId.lastIndexOf('.')+1);
			// reduce a camel case, multi word name to the last word
			sId = sId.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ").slice(-1)[0];
			// remove unwanted chars (and no trailing digits!) and convert to lower case
			sId = this._sUIDToken = sId.replace(/([^A-Za-z0-9-_.:])|([0-9]+$)/g,"").toLowerCase();
		}

		return uid(sId);
	};

}());