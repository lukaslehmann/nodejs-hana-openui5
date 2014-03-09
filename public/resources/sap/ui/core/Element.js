/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.Element");jQuery.sap.require("jquery.sap.strings");jQuery.sap.require("sap.ui.base.ManagedObject");jQuery.sap.require("sap.ui.core.ElementMetadata");jQuery.sap.require("sap.ui.model.SimpleType");sap.ui.base.ManagedObject.extend("sap.ui.core.Element",{metadata:{stereotype:"element","abstract":true,publicMethods:["getId","getMetadata","getTooltip_AsString","getTooltip_Text","getModel","setModel","hasModel","bindElement","unbindElement","getElementBinding","prop","getLayoutData","setLayoutData"],library:"sap.ui.core",properties:{},aggregations:{tooltip:{name:"tooltip",type:"sap.ui.core.TooltipBase",altTypes:["string"],multiple:false},customData:{name:"customData",type:"sap.ui.core.CustomData",multiple:true,singularName:"customData"},layoutData:{name:"layoutData",type:"sap.ui.core.LayoutData",multiple:false,singularName:"layoutData"}},associations:{},events:{}},constructor:function(i,s){sap.ui.base.ManagedObject.apply(this,arguments)},renderer:null},sap.ui.core.ElementMetadata);
sap.ui.core.Element.defineClass=function(c,s,m){return sap.ui.base.Object.defineClass(c,s,m||sap.ui.core.ElementMetadata)};
sap.ui.core.Element.prototype.getInterface=function(){return this};
sap.ui.core.Element.prototype._handleEvent=function(e){var h="on"+e.type;this._callEventHandles(this.aBeforeDelegates,h,e,true);this._callEventHandles([this],h,e);this._callEventHandles(this.aDelegates,h,e,true)};
sap.ui.core.Element.prototype._callEventHandles=function(h,H,e,d){if(h.length>0){for(var i=0;i<h.length;i++){if(e.isImmediateHandlerPropagationStopped()){break}var o=d?h[i].oDelegate:h[i];var t=(d&&h[i].vThis)?h[i].vThis:o;if(t===true){t=this}if(o[H]){o[H].call(t,e)}}}};
sap.ui.core.Element.create=function(d,k){if(!d||d instanceof sap.ui.core.Element||typeof d!=="object"||d instanceof String){return d}function g(t){if(typeof t==="function"){return t}if(typeof t==="string"){return jQuery.sap.getObject(t)}}var c=g(d.Type)||g(k&&k.type);if(typeof c==="function"){return new c(d)}var m="Don't know how to create an Element from "+d+" ("+(typeof d)+")";jQuery.sap.log.fatal(m);throw new Error(m)};
sap.ui.core.Element.prototype.toString=function(){if(this.getMetadata){return"Element "+this.getMetadata().getName()+"#"+this.sId}else{return"Element {unknown class}#"+this.sId}};
sap.ui.core.Element.prototype.getDomRef=function(){return jQuery.sap.domById(this.getId())};
sap.ui.core.Element.prototype.$=function(){return jQuery(this.getDomRef())};
sap.ui.core.Element.prototype.isActive=function(){return this.oParent&&this.oParent.isActive()};
sap.ui.core.Element.prototype.prop=function(p,v){var P=this.getMetadata().getJSONKeys()[p];if(P){if(arguments.length==1){return this[P._sGetter]()}else{this[P._sMutator](v);return this}}};
jQuery.sap.require("sap.ui.core.Core");
sap.ui.core.Element.prototype.rerender=function(){if(this.oParent){this.oParent.rerender()}};
sap.ui.core.Element.prototype.getUIArea=function(){return this.oParent?this.oParent.getUIArea():null};
sap.ui.core.Element.prototype.destroy=function(s){sap.ui.base.ManagedObject.prototype.destroy.call(this,s);this.$().remove()};
sap.ui.core.Element.prototype.fireEvent=function(e,p){var a=Array.prototype.slice.apply(arguments);a[1]=p=p||{};p.id=p.id||this.getId();return sap.ui.base.EventProvider.prototype.fireEvent.apply(this,a)};
sap.ui.core.Element.prototype.addDelegate=function(d,c,t,C){this.removeDelegate(d);if(typeof c==="object"){C=t;t=c;c=false}if(typeof t==="boolean"){C=t;t=undefined}(c?this.aBeforeDelegates:this.aDelegates).push({oDelegate:d,bClone:!!C,vThis:((t===this)?true:t)});return this};
sap.ui.core.Element.prototype.removeDelegate=function(d){for(var i=0;i<this.aDelegates.length;i++){if(this.aDelegates[i].oDelegate==d){this.aDelegates.splice(i,1)}}for(var i=0;i<this.aBeforeDelegates.length;i++){if(this.aBeforeDelegates[i].oDelegate==d){this.aBeforeDelegates.splice(i,1)}}return this};
sap.ui.core.Element.prototype.addEventDelegate=function(d,t){return this.addDelegate(d,false,t,true)};
sap.ui.core.Element.prototype.removeEventDelegate=function(d){return this.removeDelegate(d)};
sap.ui.core.Element.prototype.getFocusDomRef=function(){return this.getDomRef()||null};
sap.ui.core.Element.prototype.focus=function(){var f=this.getFocusDomRef();if(f){try{f.focus()}catch(e){var i=f.id?" (id: "+f.id+")":" ";jQuery.sap.log.warning("DOM element"+i+" in "+this.toString()+" which should be focused cannot be focused: "+e.message)}}};
sap.ui.core.Element.prototype.getFocusInfo=function(){return{id:this.getId()}};
sap.ui.core.Element.prototype.applyFocusInfo=function(f){this.focus();return this};
sap.ui.core.Element.prototype._refreshTooltipBaseDelegate=function(t){var o=this.getTooltip();if(o instanceof sap.ui.core.TooltipBase){this.removeDelegate(o)}if(t instanceof sap.ui.core.TooltipBase){t._currentControl=this;this.addDelegate(t)}};
sap.ui.core.Element.prototype.setTooltip=function(t){this._refreshTooltipBaseDelegate(t);this.setAggregation("tooltip",t);return this};
sap.ui.core.Element.prototype.getTooltip=function(){return this.getAggregation("tooltip")};
sap.ui.core.Element.runWithPreprocessors=sap.ui.base.ManagedObject.runWithPreprocessors;
sap.ui.core.Element.prototype.getTooltip_AsString=function(){var t=this.getTooltip();if(typeof t==="string"||t instanceof String){return t}return undefined};
sap.ui.core.Element.prototype.getTooltip_Text=function(){var t=this.getTooltip();if(t&&typeof t.getText==="function"){return t.getText()}return t};
(function(){var g=function(e,k){var d=e.getAggregation("customData");if(d){for(var i=0;i<d.length;i++){if(d[i].getKey()==k){return d[i]}}}return null};var s=function(e,k,v,w){if(v===null){var d=g(e,k);if(!d){return}var a=e.getAggregation("customData").length;if(a==1){e.destroyAggregation("customData",true)}else{e.removeAggregation("customData",d,true);d.destroy()}}else{var d=g(e,k);if(d){d.setValue(v);d.setWriteToDom(w)}else{var d=new sap.ui.core.CustomData({key:k,value:v,writeToDom:w});e.addAggregation("customData",d,true)}}};sap.ui.core.Element.prototype.data=function(){var a=arguments.length;if(a==0){var d=this.getAggregation("customData"),r={};if(d){for(var i=0;i<d.length;i++){r[d[i].getKey()]=d[i].getValue()}}return r}else if(a==1){var b=arguments[0];if(b===null){this.destroyAggregation("customData",true);return this}else if(typeof b=="string"){var c=g(this,b);return c?c.getValue():null}else if(typeof b=="object"){for(var k in b){s(this,k,b[k])}return this}else{throw new Error("When data() is called with one argument, this argument must be a string, an object or null, but is "+(typeof b)+":"+b+" (on UI Element with ID '"+this.getId()+"')")}}else if(a==2){s(this,arguments[0],arguments[1]);return this}else if(a==3){s(this,arguments[0],arguments[1],arguments[2]);return this}else{throw new Error("data() may only be called with 0-3 arguments (on UI Element with ID '"+this.getId()+"')")}}})();
sap.ui.core.Element.prototype.clone=function(I,l){var c=sap.ui.base.ManagedObject.prototype.clone.apply(this,arguments);for(var i=0;i<this.aDelegates.length;i++){if(this.aDelegates[i].bClone){c.aDelegates.push(this.aDelegates[i])}}for(var i=0;i<this.aBeforeDelegates.length;i++){if(this.aBeforeDelegates[i].bClone){c.aBeforeDelegates.push(this.aBeforeDelegates[i])}}return c};
sap.ui.core.Element.prototype.findElements=function(r){var c=sap.ui.base.ManagedObject.prototype.findAggregatedObjects.call(this,r);return c};
sap.ui.core.Element.prototype.setLayoutData=function(l){this.setAggregation("layoutData",l,true);var L=this.getParent();if(L){var e=jQuery.Event("LayoutDataChange");e.srcControl=this;L._handleEvent(e)}return this};
sap.ui.core.Element.prototype.bindElement=function(p,P){return this.bindObject(p,P)};
sap.ui.core.Element.prototype.unbindElement=function(m){return this.unbindObject(m)};
sap.ui.core.Element.prototype.getElementBinding=function(m){return this.getObjectBinding(m)};
