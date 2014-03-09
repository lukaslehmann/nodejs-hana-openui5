/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.core.ws.WebSocket for standard WebSocket support
jQuery.sap.declare("sap.ui.core.ws.WebSocket");

jQuery.sap.require("sap.ui.core.ws.ReadyState");
jQuery.sap.require("sap.ui.base.EventProvider");
jQuery.sap.require("sap.ui.Device");

/**
 * Creates a new WebSocket connection.
 *
 * @param {string}
 *            sUrl relative or absolute URL for WebSocket connection.
 *
 * @public
 *
 * @class Basic WebSocket class
 * @extends sap.ui.base.EventProvider
 * @author SAP
 * @version 1.16.8-SNAPSHOT
 * @name sap.ui.core.ws.WebSocket
 */
sap.ui.base.EventProvider.extend("sap.ui.core.ws.WebSocket", /** @lends sap.ui.core.ws.WebSocket */ {

	constructor: function(sUrl) {
		sap.ui.base.EventProvider.apply(this);

		// Check WebSocket support
		if (!sap.ui.Device.support.websocket) {
			throw new Error("Browser does not support WebSockets.");
		}

		if (typeof(sUrl) !== "string") {
			throw new Error("sUrl must be a string.");
		}

		this._openConnection(sUrl);
	},

	metadata: {
		publicMethods : [ "send", "close", "getReadyState" ]
	}

});

/**
 * Creates a new subclass of class sap.ui.core.ws.WebSocket with name <code>sClassName</code>
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
 * @name sap.ui.core.ws.WebSocket.extend
 * @function
 */

/**
 * @see sap.ui.base.Object#getInterface
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.getInterface = function() {
	return this;
};

/**
 * Map of event names, that are provided by the WebSocket.
 */
sap.ui.core.ws.WebSocket.M_EVENTS = {

	/**
	 * Fired when the connection was successfully opened.
	 */
	Open : "open",

	/**
	 * Fired when the connection was closed.
	 */
	Close : "close",

	/**
	 * Fired when an error occurred.
	 * Contains Parameters: error
	 */
	Error : "error",

	/**
	 * Fired when a message was received
	 * Contains Parameters: data
	 */
	Message : "message"
};

/**
 * The 'open' event is fired, when the connection was successfully opened.
 *
 * @name sap.ui.core.ws.WebSocket#open
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 */

/**
 * Attach event-handler <code>fnFunction</code> to the 'open' event of this <code>sap.ui.core.ws.WebSocket</code>.<br>
 *
 * @param {object}
 *            [oData] The object, that should be passed along with the event-object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs. This function will be called on the
 *            oListener-instance (if present) or in a 'static way'.
 * @param {object}
 *            [oListener] Object on which to call the given function. If empty, this WebSocket is used.
 *
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.attachOpen = function(oData, fnFunction, oListener) {
	this.attachEvent("open", oData, fnFunction, oListener);
	return this;
};

/**
 * Detach event-handler <code>fnFunction</code> from the 'open' event of this <code>sap.ui.core.ws.WebSocket</code>.<br>
 *
 * The passed function and listener object must match the ones previously used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Object on which the given function had to be called.
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.detachOpen = function(fnFunction, oListener) {
	this.detachEvent("open", fnFunction, oListener);
	return this;
};

/**
 * Fire event 'open' to attached listeners.
 *
 * @param {object} [mArguments] the arguments to pass along with the event.
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @protected
 */
sap.ui.core.ws.WebSocket.prototype.fireOpen = function(mArguments) {
	this.fireEvent("open", mArguments);
	return this;
};


/**
 * The 'close' event is fired, when the connection was closed.
 *
 * @name sap.ui.core.ws.WebSocket#close
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.code Close code provided by the server.
 * @param {string} oControlEvent.getParameters.reason Reason from server for closing the connection.
 * @param {string} oControlEvent.getParameters.wasClean Indicates whether the connection was cleanly closed or not.
 * @public
 */

/**
 * Attach event-handler <code>fnFunction</code> to the 'close' event of this <code>sap.ui.core.ws.WebSocket</code>.<br>
 *
 * @param {object}
 *            [oData] The object, that should be passed along with the event-object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs. This function will be called on the
 *            oListener-instance (if present) or in a 'static way'.
 * @param {object}
 *            [oListener] Object on which to call the given function. If empty, this WebSocket is used.
 *
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.attachClose = function(oData, fnFunction, oListener) {
	this.attachEvent("close", oData, fnFunction, oListener);
	return this;
};

/**
 * Detach event-handler <code>fnFunction</code> from the 'close' event of this <code>sap.ui.core.ws.WebSocket</code>.<br>
 *
 * The passed function and listener object must match the ones previously used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Object on which the given function had to be called.
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.detachClose = function(fnFunction, oListener) {
	this.detachEvent("close", fnFunction, oListener);
	return this;
};

/**
 * Fire event 'close' to attached listeners.
 *
 * @param {object} [mArguments] the arguments to pass along with the event.
 * @param {string} [mArguments.code] Close code provided by the server.
 * @param {string} [mArguments.reason] Reason from server for closing the connection.
 * @param {string} [mArguments.wasClean] Indicates whether the connection was cleanly closed or not.
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @protected
 */
sap.ui.core.ws.WebSocket.prototype.fireClose = function(mArguments) {
	this.fireEvent("close", mArguments);
	return this;
};


/**
 * The 'error' event is fired, when an error occurred.
 *
 * @name sap.ui.core.ws.WebSocket#error
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 */

/**
 * Attach event-handler <code>fnFunction</code> to the 'error' event of this <code>sap.ui.core.ws.WebSocket</code>.<br>
 *
 * @param {object}
 *            [oData] The object, that should be passed along with the event-object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs. This function will be called on the
 *            oListener-instance (if present) or in a 'static way'.
 * @param {object}
 *            [oListener] Object on which to call the given function. If empty, this WebSocket is used.
 *
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.attachError = function(oData, fnFunction, oListener) {
	this.attachEvent("error", oData, fnFunction, oListener);
	return this;
};

/**
 * Detach event-handler <code>fnFunction</code> from the 'error' event of this <code>sap.ui.core.ws.WebSocket</code>.<br>
 *
 * The passed function and listener object must match the ones previously used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Object on which the given function had to be called.
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.detachError = function(fnFunction, oListener) {
	this.detachEvent("error", fnFunction, oListener);
	return this;
};

/**
 * Fire event 'error' to attached listeners.
 *
 * @param {object} [mArguments] the arguments to pass along with the event.
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @protected
 */
sap.ui.core.ws.WebSocket.prototype.fireError = function(mArguments) {
	this.fireEvent("error", mArguments);
	return this;
};

/**
 * The 'message' event is fired, when a message was received.
 *
 * @name sap.ui.core.ws.WebSocket#message
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.data Received data from the server.
 * @public
 */

/**
 * Attach event-handler <code>fnFunction</code> to the 'message' event of this <code>sap.ui.core.ws.WebSocket</code>.<br>
 *
 * @param {object}
 *            [oData] The object, that should be passed along with the event-object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs. This function will be called on the
 *            oListener-instance (if present) or in a 'static way'.
 * @param {object}
 *            [oListener] Object on which to call the given function. If empty, this WebSocket is used.
 *
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.attachMessage = function(oData, fnFunction, oListener) {
	this.attachEvent("message", oData, fnFunction, oListener);
	return this;
};

/**
 * Detach event-handler <code>fnFunction</code> from the 'message' event of this <code>sap.ui.core.ws.WebSocket</code>.<br>
 *
 * The passed function and listener object must match the ones previously used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Object on which the given function had to be called.
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.detachMessage = function(fnFunction, oListener) {
	this.detachEvent("message", fnFunction, oListener);
	return this;
};

/**
 * Fire event 'message' to attached listeners.
 *
 * @param {object} [mArguments] the arguments to pass along with the event.
 * @param {string} [mArguments.data] Received data from the server.
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @protected
 */
sap.ui.core.ws.WebSocket.prototype.fireMessage = function(mArguments) {
	this.fireEvent("message", mArguments);
	return this;
};

// Private Methods
/**
 * Resolves a the full WebSocket-Url from an absolute or relative url.
 *
 * @param {string} sUrl input url
 * @return {string} sFullUrl full url which can be used for the ws-connection
 * @private
 */
sap.ui.core.ws.WebSocket.prototype._resolveFullUrl = function(sUrl) {
	var sFullUrl = '';

	// check if no protocol (ws:// or wss://) is provided
	if (!/^wss?:\/\//.test(sUrl)) {

		var loc = document.location;

		sFullUrl = ((loc.protocol === 'https:')
						? 'wss://'
						: 'ws://') +
						loc.host;

		if (sUrl.substr(0, 1) === '/') {
			// absolute url, e.g. /foo/bar
			sFullUrl += sUrl;
		} else {
			// relative url, eg. foo/../../bar
			sFullUrl += loc.pathname.substring(0, loc.pathname.lastIndexOf('/')) + '/' + sUrl;
		}

	} else {
		sFullUrl = sUrl;
	}

	return sFullUrl;
};

/**
 * Opens the connection and binds the event-handlers.
 *
 * @param {string} sUrl	Url for WebSocket
 * @private
 */
sap.ui.core.ws.WebSocket.prototype._openConnection = function(sUrl) {
	this._oWs = new window.WebSocket(this._resolveFullUrl(sUrl));
	this._oWs.onopen = jQuery.proxy(this._onopen, this);
	this._oWs.onclose = jQuery.proxy(this._onclose, this);
	this._oWs.onmessage = jQuery.proxy(this._onmessage, this);
	this._oWs.onerror = jQuery.proxy(this._onerror, this);
};

// Event-Handlers
/**
 * Internal handler for open-event.
 *
 * @private
 */
sap.ui.core.ws.WebSocket.prototype._onopen = function() {
	this.fireOpen();
};

/**
 * Internal handler for close-event.
 *
 * @private
 */
sap.ui.core.ws.WebSocket.prototype._onclose = function(oCloseEvent) {
	this.fireClose({
		code: oCloseEvent.code,
		reason: oCloseEvent.reason,
		wasClean: oCloseEvent.wasClean
	});
};

/**
 * Internal handler for error-event.
 *
 * @private
 */
sap.ui.core.ws.WebSocket.prototype._onerror = function(oEvent) {
	this.fireError();
};

/**
 * Internal handler for message-event.
 *
 * @private
 */
sap.ui.core.ws.WebSocket.prototype._onmessage = function(oMessageEvent) {
	this.fireMessage({
		data: oMessageEvent.data
	});
};

// Public Methods
/**
 * Sends a message.<br>
 * <br>
 * If the connection is not yet opened, the message will be queued and sent
 * when the connection is established.
 *
 * @param {string} sMessage Message to send
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.send = function(sMessage) {

	if (this.getReadyState() === sap.ui.core.ws.ReadyState.OPEN) {
		this._oWs.send(sMessage);
	} else if (this.getReadyState() === sap.ui.core.ws.ReadyState.CONNECTING) {
		// queue the message until the connection is opened
		this.attachEventOnce("open", function(oEvent) {
			this._oWs.send(sMessage);
		});
	} else {
		jQuery.sap.log.warning("Unable to send WebSocket message. " +
			"Connection is already closed or closing. message: " + sMessage);
	}

	return this;
};

/**
 * Closes the connection.
 *
 * @return {sap.ui.core.ws.WebSocket} <code>this</code> to allow method chaining
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.close = function() {

	if (this.getReadyState() === sap.ui.core.ws.ReadyState.OPEN) {
		this._oWs.close();
	} else {

		var sText = '';

		switch (this.getReadyState()) {
		case sap.ui.core.ws.ReadyState.CLOSED:
			sText = "Connection is already closed.";
			break;
		case sap.ui.core.ws.ReadyState.CLOSING:
			sText = "Connection is already closing.";
			break;
		case sap.ui.core.ws.ReadyState.CONNECTING:
			sText = "Connection is not yet established.";
			break;
		}

		jQuery.sap.log.warning("Unable to close WebSocket connection. " + sText);
	}

	return this;
};

/**
 * Getter for WebSocket readyState.
 *
 * @returns {sap.ui.core.ws.ReadyState} readyState
 * @public
 */
sap.ui.core.ws.WebSocket.prototype.getReadyState = function() {
	return this._oWs.readyState;
};
