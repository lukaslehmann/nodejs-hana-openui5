/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.Model");jQuery.sap.require("sap.ui.base.EventProvider");jQuery.sap.require("sap.ui.model.BindingMode");jQuery.sap.require("sap.ui.model.Context");sap.ui.base.EventProvider.extend("sap.ui.model.Model",{constructor:function(){sap.ui.base.EventProvider.apply(this,arguments);this.oData={};this.aBindings=[];this.mContexts={};this.iSizeLimit=100;this.sDefaultBindingMode=sap.ui.model.BindingMode.TwoWay;this.mSupportedBindingModes={"OneWay":true,"TwoWay":true,"OneTime":true};this.bLegacySyntax=false},metadata:{"abstract":true,publicMethods:["bindProperty","bindList","bindTree","bindContext","createBindingContext","destroyBindingContext","getProperty","getDefaultBindingMode","setDefaultBindingMode","isBindingModeSupported","attachParseError","detachParseError","attachRequestCompleted","detachRequestCompleted","attachRequestFailed","detachRequestFailed","attachRequestSent","detachRequestSent","setSizeLimit","refresh"]}});sap.ui.model.Model.M_EVENTS={ParseError:"parseError",RequestFailed:"requestFailed",RequestSent:"requestSent",RequestCompleted:"requestCompleted"};
sap.ui.model.Model.prototype.attachRequestFailed=function(d,f,l){this.attachEvent("requestFailed",d,f,l);return this};
sap.ui.model.Model.prototype.detachRequestFailed=function(f,l){this.detachEvent("requestFailed",f,l);return this};
sap.ui.model.Model.prototype.fireRequestFailed=function(a){this.fireEvent("requestFailed",a);return this};
sap.ui.model.Model.prototype.attachParseError=function(d,f,l){this.attachEvent("parseError",d,f,l);return this};
sap.ui.model.Model.prototype.detachParseError=function(f,l){this.detachEvent("parseError",f,l);return this};
sap.ui.model.Model.prototype.fireParseError=function(a){this.fireEvent("parseError",a);return this};
sap.ui.model.Model.prototype.attachRequestSent=function(d,f,l){this.attachEvent("requestSent",d,f,l);return this};
sap.ui.model.Model.prototype.detachRequestSent=function(f,l){this.detachEvent("requestSent",f,l);return this};
sap.ui.model.Model.prototype.fireRequestSent=function(a){this.fireEvent("requestSent",a);return this};
sap.ui.model.Model.prototype.attachRequestCompleted=function(d,f,l){this.attachEvent("requestCompleted",d,f,l);return this};
sap.ui.model.Model.prototype.detachRequestCompleted=function(f,l){this.detachEvent("requestCompleted",f,l);return this};
sap.ui.model.Model.prototype.fireRequestCompleted=function(a){this.fireEvent("requestCompleted",a);return this};
sap.ui.model.Model.prototype.bindContext=function(p,c,P){var b=new sap.ui.model.ContextBinding(this,p,c,P);return b};
sap.ui.model.Model.prototype.getContext=function(p){if(!jQuery.sap.startsWith(p,"/")){throw new Error("Path "+p+" must start with a / ")}var c=this.mContexts[p];if(!c){c=new sap.ui.model.Context(this,p);this.mContexts[p]=c}return c};
sap.ui.model.Model.prototype.resolve=function(p,c){var i=!jQuery.sap.startsWith(p,"/"),r=p,C;if(i){if(c){C=c.getPath();r=C+(jQuery.sap.endsWith(C,"/")?"":"/")+p}else{r=this.isLegacySyntax()?"/"+p:undefined}}if(r&&r!=="/"&&jQuery.sap.endsWith(r,"/")){r=r.substr(0,r.length-1)}return r};
sap.ui.model.Model.prototype.addBinding=function(b){this.aBindings.push(b)};
sap.ui.model.Model.prototype.removeBinding=function(b){for(var i=0;i<this.aBindings.length;i++){if(this.aBindings[i]==b){this.aBindings.splice(i,1);break}}};
sap.ui.model.Model.prototype.getDefaultBindingMode=function(){return this.sDefaultBindingMode};
sap.ui.model.Model.prototype.setDefaultBindingMode=function(m){if(this.isBindingModeSupported(m)){this.sDefaultBindingMode=m}else{throw new Error("Binding mode "+m+" is not supported by this model.")}};
sap.ui.model.Model.prototype.isBindingModeSupported=function(m){return(m in this.mSupportedBindingModes)};
sap.ui.model.Model.prototype.setLegacySyntax=function(l){this.bLegacySyntax=l};
sap.ui.model.Model.prototype.isLegacySyntax=function(){return this.bLegacySyntax};
sap.ui.model.Model.prototype.setSizeLimit=function(s){this.iSizeLimit=s};
sap.ui.model.Model.prototype.getInterface=function(){return this};
sap.ui.model.Model.prototype.refresh=function(f){this.checkUpdate(f)};
sap.ui.model.Model.prototype.checkUpdate=function(f){var b=this.aBindings.slice(0);jQuery.each(b,function(i,B){B.checkUpdate(f)})};
