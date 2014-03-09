/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.ws.WebSocket");jQuery.sap.require("sap.ui.core.ws.ReadyState");jQuery.sap.require("sap.ui.base.EventProvider");jQuery.sap.require("sap.ui.Device");sap.ui.base.EventProvider.extend("sap.ui.core.ws.WebSocket",{constructor:function(u){sap.ui.base.EventProvider.apply(this);if(!sap.ui.Device.support.websocket){throw new Error("Browser does not support WebSockets.")}if(typeof(u)!=="string"){throw new Error("sUrl must be a string.")}this._openConnection(u)},metadata:{publicMethods:["send","close","getReadyState"]}});
sap.ui.core.ws.WebSocket.prototype.getInterface=function(){return this};
sap.ui.core.ws.WebSocket.M_EVENTS={Open:"open",Close:"close",Error:"error",Message:"message"};
sap.ui.core.ws.WebSocket.prototype.attachOpen=function(d,f,l){this.attachEvent("open",d,f,l);return this};
sap.ui.core.ws.WebSocket.prototype.detachOpen=function(f,l){this.detachEvent("open",f,l);return this};
sap.ui.core.ws.WebSocket.prototype.fireOpen=function(a){this.fireEvent("open",a);return this};
sap.ui.core.ws.WebSocket.prototype.attachClose=function(d,f,l){this.attachEvent("close",d,f,l);return this};
sap.ui.core.ws.WebSocket.prototype.detachClose=function(f,l){this.detachEvent("close",f,l);return this};
sap.ui.core.ws.WebSocket.prototype.fireClose=function(a){this.fireEvent("close",a);return this};
sap.ui.core.ws.WebSocket.prototype.attachError=function(d,f,l){this.attachEvent("error",d,f,l);return this};
sap.ui.core.ws.WebSocket.prototype.detachError=function(f,l){this.detachEvent("error",f,l);return this};
sap.ui.core.ws.WebSocket.prototype.fireError=function(a){this.fireEvent("error",a);return this};
sap.ui.core.ws.WebSocket.prototype.attachMessage=function(d,f,l){this.attachEvent("message",d,f,l);return this};
sap.ui.core.ws.WebSocket.prototype.detachMessage=function(f,l){this.detachEvent("message",f,l);return this};
sap.ui.core.ws.WebSocket.prototype.fireMessage=function(a){this.fireEvent("message",a);return this};
sap.ui.core.ws.WebSocket.prototype._resolveFullUrl=function(u){var f='';if(!/^wss?:\/\//.test(u)){var l=document.location;f=((l.protocol==='https:')?'wss://':'ws://')+l.host;if(u.substr(0,1)==='/'){f+=u}else{f+=l.pathname.substring(0,l.pathname.lastIndexOf('/'))+'/'+u}}else{f=u}return f};
sap.ui.core.ws.WebSocket.prototype._openConnection=function(u){this._oWs=new window.WebSocket(this._resolveFullUrl(u));this._oWs.onopen=jQuery.proxy(this._onopen,this);this._oWs.onclose=jQuery.proxy(this._onclose,this);this._oWs.onmessage=jQuery.proxy(this._onmessage,this);this._oWs.onerror=jQuery.proxy(this._onerror,this)};
sap.ui.core.ws.WebSocket.prototype._onopen=function(){this.fireOpen()};
sap.ui.core.ws.WebSocket.prototype._onclose=function(c){this.fireClose({code:c.code,reason:c.reason,wasClean:c.wasClean})};
sap.ui.core.ws.WebSocket.prototype._onerror=function(e){this.fireError()};
sap.ui.core.ws.WebSocket.prototype._onmessage=function(m){this.fireMessage({data:m.data})};
sap.ui.core.ws.WebSocket.prototype.send=function(m){if(this.getReadyState()===sap.ui.core.ws.ReadyState.OPEN){this._oWs.send(m)}else if(this.getReadyState()===sap.ui.core.ws.ReadyState.CONNECTING){this.attachEventOnce("open",function(e){this._oWs.send(m)})}else{jQuery.sap.log.warning("Unable to send WebSocket message. "+"Connection is already closed or closing. message: "+m)}return this};
sap.ui.core.ws.WebSocket.prototype.close=function(){if(this.getReadyState()===sap.ui.core.ws.ReadyState.OPEN){this._oWs.close()}else{var t='';switch(this.getReadyState()){case sap.ui.core.ws.ReadyState.CLOSED:t="Connection is already closed.";break;case sap.ui.core.ws.ReadyState.CLOSING:t="Connection is already closing.";break;case sap.ui.core.ws.ReadyState.CONNECTING:t="Connection is not yet established.";break}jQuery.sap.log.warning("Unable to close WebSocket connection. "+t)}return this};
sap.ui.core.ws.WebSocket.prototype.getReadyState=function(){return this._oWs.readyState};
