/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.core.ws.WebSocket for WebSocket support with SAP-PCP Protocol
jQuery.sap.declare("sap.ui.core.ws.SapPcpWebSocket");
jQuery.sap.require("sap.ui.core.ws.WebSocket");

/**
 * Creates a new WebSocket connection and uses the pcp-protocol for communication.
 *
 * @param {string}
 *            sUrl relative or absolute URL for WebSocket connection.
 *
 * @public
 *
 * @class WebSocket class implementing the pcp-protocol
 * @extends sap.ui.core.ws.WebSocket
 * @author SAP
 * @version 1.16.8-SNAPSHOT
 * @name sap.ui.core.ws.SapPcpWebSocket
 */
sap.ui.core.ws.WebSocket.extend("sap.ui.core.ws.SapPcpWebSocket", /** @lends sap.ui.core.ws.SapPcpWebSocket */ {

	constructor: function(sUrl) {
		sap.ui.core.ws.WebSocket.apply(this, arguments);
	}

});

/**
 * Creates a new subclass of class sap.ui.core.ws.SapPcpWebSocket with name <code>sClassName</code>
 * and enriches it with the information contained in <code>oClassInfo</code>.
 *
 * For a detailed description of <code>oClassInfo</code> or <code>FNMetaImpl</code>
 * see {@link sap.ui.base.Object.extend Object.extend}.
 *
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class
 * @param {function} [FNMetaImpl] alternative constructor for a metadata object
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.core.ws.SapPcpWebSocket.extend
 * @function
 */

/**
 * The 'message' event is fired, when a message was received.
 *
 * @name sap.ui.core.ws.SapPcpWebSocket#message
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.data Received data from the server.
 * @param {string} oControlEvent.getParameters.pcpFields Received pcpFields as a key-value map.
 * @public
 */

/**
 * Fire event 'message' to attached listeners.
 *
 * @param {object} [mArguments] the arguments to pass along with the event.
 * @param {string} [mArguments.data] Received data from the server.
 * @param {string} [mArguments.pcpFields] Received pcpFields as a key-value map.
 * @return {sap.ui.core.ws.SapPcpWebSocket} <code>this</code> to allow method chaining
 * @protected
 * @name sap.ui.core.ws.SapPcpWebSocket#fireMessage
 * @function
 */

/**
 * RegEx to get pcp-header fields
 *
 * @private
 */
sap.ui.core.ws.SapPcpWebSocket._deserializeRegexp = /((?:[^:\\]|(?:\\.))+):((?:[^:\\\n]|(?:\\.))+)/;

/**
 * Separator between header-fields and message body
 *
 * @private
 */
sap.ui.core.ws.SapPcpWebSocket._SEPARATOR = "\n\n";

/**
 * pcp-action value
 *
 * @private
 */
sap.ui.core.ws.SapPcpWebSocket._MESSAGE = "MESSAGE";

/**
 * Internal handler for message-event.
 *
 * @private
 */
sap.ui.core.ws.SapPcpWebSocket.prototype._onmessage = function(oMessageEvent) {
	var iSplitPos = -1,
		oEventData = {};

	if (typeof oMessageEvent.data === "string") {
		iSplitPos = oMessageEvent.data.indexOf(sap.ui.core.ws.SapPcpWebSocket._SEPARATOR);
	}

	if (iSplitPos !== -1) {
		oEventData.pcpFields = this._extractPcpFields(oMessageEvent.data.substring(0, iSplitPos));
		oEventData.data = oMessageEvent.data.substr(iSplitPos + sap.ui.core.ws.SapPcpWebSocket._SEPARATOR.length);
	} else {
		jQuery.sap.log.warning("Invalid PCP message received: " + oMessageEvent.data);
		oEventData.pcpFields = {};
		oEventData.data = oMessageEvent.data; // Fall back, just pass through original data
	}

	this.fireMessage(oEventData);
};

/**
 * Extracts the pcp-fields from a header string.
 *
 * @param {string} sHeader Header as string
 * @return {object} oPcpFields extracted fields as key-value map
 * @private
 */
sap.ui.core.ws.SapPcpWebSocket.prototype._extractPcpFields = function(sHeader) {
	var aFields = sHeader.split("\n"),
		aLine = [],
		oPcpFields = {};

	for (var i = 0; i < aFields.length; i++) {
		aLine = aFields[i].match(sap.ui.core.ws.SapPcpWebSocket._deserializeRegexp);
		if (aLine && aLine.length === 3) {
			oPcpFields[this._unescape(aLine[1])] = this._unescape(aLine[2]);
		}
	}

	return oPcpFields;
};

/**
 * Unescapes a string.
 *
 * @param {string} sEscaped escaped string
 * @return sUnescaped Unescaped string
 * @private
 */
sap.ui.core.ws.SapPcpWebSocket.prototype._unescape = function(sEscaped) {
	var aParts = sEscaped.split("\u0008"),
		sUnescaped = "";

	for (var i = 0; i < aParts.length; i++) {
		aParts[i] = aParts[i].replace(/\\\\/g, "\u0008").replace(/\\:/g, ':').replace(/\\n/g, '\n').replace(/\u0008/g, "\\");
	}

	sUnescaped = aParts.join("\u0008");

	return sUnescaped;
};

/**
 * Serializes pcp-fields into a string.
 *
 * @param {object} oPcpFields key-value map with pcp-fields
 * @param {string} sMessageType message-type, one of 'string', 'blob' or 'arraybuffer'.
 * @param {string} sPcpAction pcp-action value
 * @return {string} serialized pcp-fields
 * @private
 */
sap.ui.core.ws.SapPcpWebSocket.prototype._serializePcpFields = function(oPcpFields, sMessageType, sPcpAction) {
	var oSerialized = "",
		sFieldName = "",
		sPcpBodyType = "";

	if (sMessageType === 'string') {
		sPcpBodyType = 'text';
	} else if (sMessageType === 'blob' || sMessageType === 'arraybuffer') {
		sPcpBodyType = 'binary';
	}

	if (oPcpFields && typeof oPcpFields === 'object') {
		for (sFieldName in oPcpFields) {
			if (oPcpFields.hasOwnProperty(sFieldName) && sFieldName.indexOf('pcp-') !== 0) {
				oSerialized += this._escape(sFieldName) + ":" + this._escape(String(oPcpFields[sFieldName])) + "\n";
			}
		}
	}

	return "pcp-action:" + sPcpAction + "\npcp-body-type:" + sPcpBodyType + "\n" + oSerialized + "\n";
};

/**
 * Escapes a string.
 *
 * @param {string} sUnEscaped unescaped string
 * @return {string} sEscaped escaped string
 * @private
 */
sap.ui.core.ws.SapPcpWebSocket.prototype._escape = function(sUnEscaped) {
	return sUnEscaped.replace(/\\/g, '\\\\').replace(/:/g, '\\:').replace(/\n/g, '\\n');
};

// Public Methods
/**
 * Sends a message and optional pcp-header-fields using the pcp-protocol.<br>
 * <br>
 * If the connection is not yet opened, the message will be queued and sent
 * when the connection is established.
 *
 * @param {string|blob|arraybuffer} message message to send
 * @param {object} [oPcpFields] additional pcp-fields as key-value map
 * @return {sap.ui.core.ws.SapPcpWebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.SapPcpWebSocket.prototype.send = function(message, oPcpFields) {
	var sMessageType = typeof message,
		sPcpFields = "";

	sPcpFields = this._serializePcpFields(oPcpFields, sMessageType, sap.ui.core.ws.SapPcpWebSocket._MESSAGE);

	sap.ui.core.ws.WebSocket.prototype.send.call(this, sPcpFields + message);
	return this;
};
