/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.base.ObjectPool");jQuery.sap.require("sap.ui.base.Object");sap.ui.base.Object.extend("sap.ui.base.ObjectPool",{constructor:function(o){sap.ui.base.Object.apply(this);this.oObjectClass=o;this.aFreeObjects=[]}});
sap.ui.base.ObjectPool.prototype.borrowObject=function(){var o=this.aFreeObjects.length==0?new this.oObjectClass():this.aFreeObjects.pop();o.init.apply(o,arguments);return o};
sap.ui.base.ObjectPool.prototype.returnObject=function(o){o.reset();this.aFreeObjects.push(o)};
