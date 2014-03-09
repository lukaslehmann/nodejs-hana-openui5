/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.ws.SapPcpWebSocket");jQuery.sap.require("sap.ui.core.ws.WebSocket");sap.ui.core.ws.WebSocket.extend("sap.ui.core.ws.SapPcpWebSocket",{constructor:function(u){sap.ui.core.ws.WebSocket.apply(this,arguments)}});sap.ui.core.ws.SapPcpWebSocket._deserializeRegexp=/((?:[^:\\]|(?:\\.))+):((?:[^:\\\n]|(?:\\.))+)/;sap.ui.core.ws.SapPcpWebSocket._SEPARATOR="\n\n";sap.ui.core.ws.SapPcpWebSocket._MESSAGE="MESSAGE";
sap.ui.core.ws.SapPcpWebSocket.prototype._onmessage=function(m){var s=-1,e={};if(typeof m.data==="string"){s=m.data.indexOf(sap.ui.core.ws.SapPcpWebSocket._SEPARATOR)}if(s!==-1){e.pcpFields=this._extractPcpFields(m.data.substring(0,s));e.data=m.data.substr(s+sap.ui.core.ws.SapPcpWebSocket._SEPARATOR.length)}else{jQuery.sap.log.warning("Invalid PCP message received: "+m.data);e.pcpFields={};e.data=m.data}this.fireMessage(e)};
sap.ui.core.ws.SapPcpWebSocket.prototype._extractPcpFields=function(h){var f=h.split("\n"),l=[],p={};for(var i=0;i<f.length;i++){l=f[i].match(sap.ui.core.ws.SapPcpWebSocket._deserializeRegexp);if(l&&l.length===3){p[this._unescape(l[1])]=this._unescape(l[2])}}return p};
sap.ui.core.ws.SapPcpWebSocket.prototype._unescape=function(e){var p=e.split("\u0008"),u="";for(var i=0;i<p.length;i++){p[i]=p[i].replace(/\\\\/g,"\u0008").replace(/\\:/g,':').replace(/\\n/g,'\n').replace(/\u0008/g,"\\")}u=p.join("\u0008");return u};
sap.ui.core.ws.SapPcpWebSocket.prototype._serializePcpFields=function(p,m,P){var s="",f="",a="";if(m==='string'){a='text'}else if(m==='blob'||m==='arraybuffer'){a='binary'}if(p&&typeof p==='object'){for(f in p){if(p.hasOwnProperty(f)&&f.indexOf('pcp-')!==0){s+=this._escape(f)+":"+this._escape(String(p[f]))+"\n"}}}return"pcp-action:"+P+"\npcp-body-type:"+a+"\n"+s+"\n"};
sap.ui.core.ws.SapPcpWebSocket.prototype._escape=function(u){return u.replace(/\\/g,'\\\\').replace(/:/g,'\\:').replace(/\n/g,'\\n')};
sap.ui.core.ws.SapPcpWebSocket.prototype.send=function(m,p){var M=typeof m,P="";P=this._serializePcpFields(p,M,sap.ui.core.ws.SapPcpWebSocket._MESSAGE);sap.ui.core.ws.WebSocket.prototype.send.call(this,P+m);return this};
