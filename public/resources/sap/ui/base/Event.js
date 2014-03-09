/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.base.Event");jQuery.sap.require("sap.ui.base.Object");sap.ui.base.Object.extend("sap.ui.base.Event",{constructor:function(i,s,p){sap.ui.base.Object.apply(this);if(arguments.length>0){this.init(i,s,p)}}});
sap.ui.base.Event.prototype.init=function(i,s,p){this.sId=i;this.oSource=s;this.mParameters=p||{};this.bCancelBubble=false;this.bPreventDefault=false};
sap.ui.base.Event.prototype.reset=function(){this.sId="";this.oSource=null;this.mParameters=null;this.bCancelBubble=false;this.bPreventDefault=false};
sap.ui.base.Event.prototype.getId=function(){return this.sId};
sap.ui.base.Event.prototype.getSource=function(){return this.oSource};
sap.ui.base.Event.prototype.getParameters=function(){return this.mParameters};
sap.ui.base.Event.prototype.getParameter=function(n){return this.mParameters[n]};
sap.ui.base.Event.prototype.cancelBubble=function(){this.bCancelBubble=true};
sap.ui.base.Event.prototype.preventDefault=function(){this.bPreventDefault=true};
