/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.GroupHeaderListItem");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.ListItemBase");sap.m.ListItemBase.extend("sap.m.GroupHeaderListItem",{metadata:{library:"sap.m",properties:{"title":{type:"string",group:"Data",defaultValue:null},"count":{type:"string",group:"Data",defaultValue:null},"upperCase":{type:"boolean",group:"Appearance",defaultValue:true}}}});
sap.m.GroupHeaderListItem.prototype.isSelectable=function(){return false};
sap.m.GroupHeaderListItem.prototype.shouldClearLastValue=function(){return true};
sap.m.GroupHeaderListItem.prototype.ontap=function(e){};
sap.m.GroupHeaderListItem.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true};
sap.m.GroupHeaderListItem.prototype.onBeforeRendering=function(){var p=this.getParent();if(p&&p.constructor===sap.m.Table){p.getColumns().forEach(function(c){c.setLastValue(NaN)})}if(sap.m.ListItemBase.prototype.onBeforeRendering){sap.m.ListItemBase.prototype.onBeforeRendering.call(this)}};
