/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.util.serializer.HTMLViewSerializer");jQuery.sap.require("sap.ui.core.util.serializer.delegate.HTML");jQuery.sap.require("sap.ui.base.EventProvider");jQuery.sap.require("sap.ui.thirdparty.vkbeautify");sap.ui.base.EventProvider.extend("sap.ui.core.util.serializer.HTMLViewSerializer",{constructor:function(v,w,g,G){sap.ui.base.EventProvider.apply(this);this._oView=v;this._oWindow=w;this._fnGetControlId=g;this._fnGetEventHandlerName=G}});
sap.ui.core.util.serializer.HTMLViewSerializer.prototype.serialize=function(){var s=function(C){return(C instanceof this._oWindow.sap.ui.core.mvc.View)};var c=new sap.ui.core.util.serializer.Serializer(this._oView,new sap.ui.core.util.serializer.delegate.HTML(this._fnGetControlId,this._fnGetEventHandlerName),true,this._oWindow,s);var r=c.serialize();var v=[];v.push('<template');if(this._oView.getControllerName()){v.push(' data-controller-name="'+this._oView.getControllerName()+'"')}v.push(" >");v.push(r);v.push("</template>");return vkbeautify.xml(v.join(""))};
