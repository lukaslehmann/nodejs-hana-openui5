/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.base.EventProvider");jQuery.sap.require("sap.ui.base.Object");jQuery.sap.require("sap.ui.base.Event");jQuery.sap.require("sap.ui.base.ObjectPool");sap.ui.base.Object.extend("sap.ui.base.EventProvider",{constructor:function(){sap.ui.base.Object.apply(this);this.mEventRegistry={}}});sap.ui.base.EventProvider.M_EVENTS={EventHandlerChange:"EventHandlerChange"};sap.ui.base.EventProvider.prototype.oEventPool=new sap.ui.base.ObjectPool(sap.ui.base.Event);
sap.ui.base.EventProvider.prototype.attachEvent=function(e,d,f,l){if(typeof(d)==="function"){l=f;f=d;d=undefined}if(!this.mEventRegistry[e]){this.mEventRegistry[e]=[]}this.mEventRegistry[e].push({oListener:l,fFunction:f,oData:d});this.fireEvent(sap.ui.base.EventProvider.M_EVENTS.EventHandlerChange,{EventId:e,type:'listenerAttached'});return this};
sap.ui.base.EventProvider.prototype.attachEventOnce=function(e,d,f,l){if(typeof(d)==="function"){l=f;f=d;d=undefined}function o(){this.detachEvent(e,o);f.apply(l||this,arguments)}this.attachEvent(e,d,o,undefined);return this};
sap.ui.base.EventProvider.prototype.detachEvent=function(e,f,l){var E=this.mEventRegistry[e];if(!E){return this}var L=false;for(var i=0,a=E.length;i<a;i++){if(E[i].fFunction===f&&E[i].oListener===l){E.splice(i,1);L=true;break}}if(E.length==0){delete this.mEventRegistry[e]}if(L){this.fireEvent(sap.ui.base.EventProvider.M_EVENTS.EventHandlerChange,{EventId:e,type:'listenerDetached'})}return this};
sap.ui.base.EventProvider.prototype.fireEvent=function(e,p,a,E){if(typeof p=="boolean"){E=a;a=p}var b=this.mEventRegistry[e],P=false,o,c,I;if(E||(b&&jQuery.isArray(b))){b=b?b.slice():[];o=this.oEventPool.borrowObject(e,this,p);for(var i=0,l=b.length;i<l;i++){I=b[i];I.fFunction.call(I.oListener||this,o,I.oData)}if(E){c=this.getEventingParent();while(c&&!o.bCancelBubble){b=c.mEventRegistry[e];if(b&&b instanceof Array){b=b.slice();for(var i=0,l=b.length;i<l;i++){I=b[i];I.fFunction.call(I.oListener||c,o,I.oData)}}c=c.getEventingParent()}}P=o.bPreventDefault;this.oEventPool.returnObject(o)}if(a){return!P}else{return this}};
sap.ui.base.EventProvider.prototype.hasListeners=function(e){return!!this.mEventRegistry[e]};
sap.ui.base.EventProvider.getEventList=function(e){return e.mEventRegistry};
sap.ui.base.EventProvider.prototype.getEventingParent=function(){return null};
sap.ui.base.EventProvider.prototype.toString=function(){if(this.getMetadata){return"EventProvider "+this.getMetadata().getName()}else{return"EventProvider"}};
sap.ui.base.EventProvider.prototype.destroy=function(){this.mEventRegistry={};sap.ui.base.Object.prototype.destroy.apply(this,arguments)};
