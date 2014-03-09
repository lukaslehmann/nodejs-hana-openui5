/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.core.support.plugins.ControlTree (ControlTree support plugin)
jQuery.sap.declare("sap.ui.core.support.plugins.ControlTree");

jQuery.sap.require("sap.ui.core.support.Plugin");
jQuery.sap.require("sap.ui.thirdparty.jszip");
jQuery.sap.require("sap.ui.core.util.serializer.ViewSerializer");

/*global JSZip *///declare unusual global vars for JSLint/SAPUI5 validation
/*global Blob *///declare unusual global vars for JSLint/SAPUI5 validation
/*global Uint8Array *///declare unusual global vars for JSLint/SAPUI5 validation

(function($) {

	/**
	 * Creates an instance of sap.ui.core.support.plugins.ControlTree.
	 * @class This class represents the ControlTree plugin for the support tool functionality of UI5. This class is internal and all its functions must not be used by an application.
	 * @abstract
	 * @extends sap.ui.base.Object
	 * @version 1.16.8-SNAPSHOT
	 * @constructor
	 * @private
	 * @name sap.ui.core.support.plugins.ControlTree
	 */
	sap.ui.core.support.Plugin.extend("sap.ui.core.support.plugins.ControlTree", {
		constructor : function(oSupportStub) {
			sap.ui.core.support.Plugin.apply(this, [ "sapUiSupportControlTree", "Control Tree", oSupportStub]);

			this._oStub = oSupportStub;

			if (this.isToolPlugin()) {

				// TOOLS SIDE!

				this._aEventIds = [
				    "sapUiSupportSelectorSelect",
				    this.getId() + "ReceiveControlTree",
				    this.getId() + "ReceiveControlTreeExport",
				    this.getId() + "ReceiveControlTreeExportError",
				    this.getId() + "TriggerRequestProperties",
				    this.getId() + "ReceiveProperties",
				    this.getId() + "ReceiveBindingInfos",
				    this.getId() + "ReceiveMethods",
				    this.getId() + "ReceivePropertiesMethods"
				];

				this._breakpointId = "sapUiSupportBreakpoint";

				this._tab = {
					properties: "Properties",
					bindinginfos: "BindingInfos",
					breakpoints: "Breakpoints",
					exports: "Export"
				};

				this._currentTab = this._tab.properties;

			} else {

				// APPS SIDE!

				this._aEventIds = [
				    this.getId() + "RequestControlTree",
				    this.getId() + "RequestControlTreeSerialize",
				    this.getId() + "RequestProperties",
				    this.getId() + "RequestBindingInfos",
				    this.getId() + "ChangeProperty",
				    this.getId() + "RefreshBinding"
				];

				// register as core plugin
				var that = this;

				sap.ui.getCore().registerPlugin({
					startPlugin: function(oCore) {
						that.oCore = oCore;
					},
					stopPlugin: function() {
						that.oCore = undefined;
					}
				});

			}
		}
	});

	sap.ui.core.support.plugins.ControlTree.prototype.init = function(oSupportStub){
		sap.ui.core.support.Plugin.prototype.init.apply(this, arguments);

		if (this.isToolPlugin()) {
			initInTools.call(this, oSupportStub);
		} else {
			initInApps.call(this, oSupportStub);
		}

	};

	function initInTools(oSupportStub) {
		$(document)
		.on("click", "li img.sapUiControlTreeIcon", $.proxy(this._onIconClick, this))
		.on("click", "li.sapUiControlTreeElement div", $.proxy(this._onNodeClick, this))
		.on("click", "li.sapUiControlTreeLink div", $.proxy(this._onControlTreeLinkClick, this))
		.on("click", "#sapUiSupportControlTabProperties", $.proxy(this._onPropertiesTab, this))
		.on("click", "#sapUiSupportControlTabBindingInfos", $.proxy(this._onBindingInfosTab, this))
		.on("click", "#sapUiSupportControlTabBreakpoints", $.proxy(this._onMethodsTab, this))
		.on("click", "#sapUiSupportControlTabExport", $.proxy(this._onExportTab, this))
		.on("change", "[data-sap-ui-name]", $.proxy(this._onPropertyChange, this))
		.on("change", "[data-sap-ui-method]", $.proxy(this._onPropertyBreakpointChange, this))
		.on("keyup", '.sapUiSupportControlMethods input[type="text"]', $.proxy(this._autoComplete, this))
		.on("blur", '.sapUiSupportControlMethods input[type="text"]', $.proxy(this._updateSelectOptions, this))
		.on("change", '.sapUiSupportControlMethods select', $.proxy(this._selectOptionsChanged, this))
		.on("click", '#sapUiSupportControlAddBreakPoint', $.proxy(this._onAddBreakpointClicked, this))
		.on("click", '#sapUiSupportControlExportToXml', $.proxy(this._onExportToXmlClicked, this))
		.on("click", '#sapUiSupportControlExportToHtml', $.proxy(this._onExportToHtmlClicked, this))
		.on("click", '#sapUiSupportControlActiveBreakpoints img.remove-breakpoint', $.proxy(this._onRemoveBreakpointClicked, this))
		.on("click", '#sapUiSupportControlPropertiesArea a.control-tree', $.proxy(this._onNavToControl, this))
		.on("click", '#sapUiSupportControlPropertiesArea img.sapUiSupportRefreshBinding', $.proxy(this._onRefreshBinding, this));

		this.renderContentAreas();
	};

	sap.ui.core.support.plugins.ControlTree.prototype.exit = function(oSupportStub) {
		sap.ui.core.support.Plugin.prototype.exit.apply(this, arguments);
		if (this.isToolPlugin()) {
			$(document)
			.off('click', 'li img.sapUiControlTreeIcon')
			.off('click', 'li div')
			.off("click", "li.sapUiControlTreeLink")
			.off("click", "#sapUiSupportControlTabProperties")
			.off("click", "#sapUiSupportControlTabBindings")
			.off("click", "#sapUiSupportControlTabBreakpoints")
			.off("click", "#sapUiSupportControlTabExport")
			.off('change', '[data-sap-ui-name]')
			.off('change', '[data-sap-ui-method]')
			.off('keyup', '.sapUiSupportControlMethods input[type="text"]')
			.off('blur', '.sapUiSupportControlMethods select')
			.off('change', '.sapUiSupportControlMethods select')
			.off('click', '#sapUiSupportControlAddBreakPoint')
			.off('click', '#sapUiSupportControlExportToXml')
			.off('click', '#sapUiSupportControlExportToHtml')
			.off('click', '#sapUiSupportControlActiveBreakpoints img.remove-breakpoint')
			.off('click', '#sapUiSupportControlPropertiesArea a.control-tree')
			.off('click', '#sapUiSupportControlPropertiesArea img.sapUiSupportRefreshBinding');
		}
	};

	// -------------------------------
	// Rendering
	// -------------------------------

	sap.ui.core.support.plugins.ControlTree.prototype.renderContentAreas = function() {
		var rm = sap.ui.getCore().createRenderManager();

		rm.write('<div id="sapUiSupportControlTreeArea"><ul class="sapUiSupportControlTreeList"></ul></div>');

		rm.write('<div id="sapUiSupportControlTabs" style="visibility:hidden">');
			rm.write('<button id="sapUiSupportControlTabProperties" class="sapUiSupportBtn">Properties</button>');
			rm.write('<button id="sapUiSupportControlTabBindingInfos" class="sapUiSupportBtn">Binding Infos</button>');
			rm.write('<button id="sapUiSupportControlTabBreakpoints" class="sapUiSupportBtn">Breakpoints</button>');
			rm.write('<button id="sapUiSupportControlTabExport" class="sapUiSupportBtn">Export</button>');
		rm.write('</div>');

		rm.write('<div id="sapUiSupportControlPropertiesArea"></div>');
		rm.flush(this.$().get(0));
		rm.destroy();
	};

	sap.ui.core.support.plugins.ControlTree.prototype.renderControlTree = function(aControlTree) {

		var rm = sap.ui.getCore().createRenderManager();

		function renderNode (iIndex, mElement) {
			var bHasChildren = mElement.aggregation.length > 0 || mElement.association.length > 0;
			rm.write("<li id=\"sap-debug-controltree-" + mElement.id + "\" class=\"sapUiControlTreeElement\">");
			var sImage = bHasChildren ? "minus" : "space";
			rm.write("<img class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" src=\"../../../../testsuite/images/" + sImage + ".gif\" />");
			var sPath = mElement.library.replace(/\./g, "/") + "/images/controls/" + mElement.type + ".gif";

			if (mElement.isAssociation) {
				rm.write("<img title=\"Association\" class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" src=\"../../../../testsuite/images/link.gif\" />");
			}

			rm.write("<img class=\"sapUiControlPicture\" style=\"height: 16px; width: 16px;\" src=\"../../../../../test-resources/" + sPath + "\" />");
			var sClass = mElement.type.lastIndexOf(".") > 0 ? mElement.type.substring(mElement.type.lastIndexOf(".") + 1) : mElement.type;

			rm.write('<div>');

			rm.write('<span class="name" title="' + mElement.type + '">' + sClass + ' - ' + mElement.id + '</span>');
			rm.write('<span class="sapUiSupportControlTreeBreakpointCount" title="Number of active breakpoints / methods" style="display:none;"></span>');

			rm.write('</div>');

			if (mElement.aggregation.length > 0) {
				rm.write("<ul>");
				$.each(mElement.aggregation, renderNode);
				rm.write("</ul>");
			}

			if (mElement.association.length > 0) {
				rm.write("<ul>");
				$.each(mElement.association, function(iIndex, oValue) {
					
					if (typeof(oValue) === "string") {
						rm.write("<li data-sap-ui-controlid=\"" + oValue + "\" class=\"sapUiControlTreeLink\">");
						rm.write("<img class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" align=\"middle\" src=\"../../../../testsuite/images/space.gif\" />");
						rm.write("<img class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" align=\"middle\" src=\"../../../../testsuite/images/link.gif\" />");
						rm.write("<div><span title='Association to \"" + oValue + "\"'>" + oValue + "</span></div>");
						rm.write("</li>");
					} else {
						renderNode(0 /* not used */, oValue);
					}
					
				});
				rm.write("</ul>");
			}
			rm.write("</li>");
		};

		$.each(aControlTree, renderNode);

		rm.flush(this.$().find("#sapUiSupportControlTreeArea > ul.sapUiSupportControlTreeList").get(0));
		rm.destroy();
	};

	sap.ui.core.support.plugins.ControlTree.prototype.renderPropertiesTab = function(aControlProps, sControlId) {

		var rm = sap.ui.getCore().createRenderManager();

		rm.write('<ul class="sapUiSupportControlTreeList" data-sap-ui-controlid="' + sControlId + '">');
		$.each(aControlProps, function(iIndex, oValue) {

			rm.write("<li>");

			rm.write("<span><label class='sapUiSupportLabel'>BaseType:</label> <code>" + oValue.control + "</code></span>");

			if (oValue.properties.length > 0 || oValue.aggregations.length > 0) {

				rm.write('<div class="get" title="Activate debugger for get-method">G</div><div class="set" title="Activate debugger for set-method">S</div>');

				rm.write("<div class=\"sapUiSupportControlProperties\"><table><colgroup><col width=\"50%\"/><col width=\"50%\"/></colgroup>");

				$.each(oValue.properties, function(iIndex, oProperty) {

					rm.write("<tr><td>");
					rm.write("<label class='sapUiSupportLabel'>" + oProperty.name + ((oProperty.isBound) ?
							'<img title="Value is bound (see Binding Infos)" src="../../../../../resources/testsuite/images/link.gif" style="vertical-align:middle;margin-left:3px">' : "") + "</label>");
					rm.write("</td><td>");

					if (oProperty.type === "boolean") {

						rm.write("<input type='checkbox' ");
						rm.write("data-sap-ui-name='" + oProperty.name + "' ");
						if (oProperty.value == true) {
							rm.write("checked='checked'");
						}
						rm.write("/>");

					} else if (oProperty.enumValues) {

						rm.write("<div><select ");
						rm.write("data-sap-ui-name='" + oProperty.name + "'>");
						$.each(oProperty.enumValues, function(sKey, sValue) {
							rm.write("<option>");
							rm.writeEscaped(sKey);
							rm.write("</option>");
						});
						rm.write("</select></div>");

					} else {

						rm.write("<div><input type='text' ");
						rm.write("data-sap-ui-name='" + oProperty.name + "' ");
						if (oProperty.value) {
							rm.write("value='");
							rm.writeEscaped("" + oProperty.value);
							rm.write("'");
						}
						rm.write("/></div>");

					}

					rm.write("</td>");

					rm.write('<td><input type="checkbox" data-sap-ui-method="' + oProperty._sGetter + '" title="Activate debugger for ' + oProperty._sGetter + '"');
					if (oProperty.bp_sGetter) {
						rm.write("checked='checked'");
					}
					rm.write('/></td>');

					rm.write('<td><input type="checkbox" data-sap-ui-method="' + oProperty._sMutator + '" title="Activate debugger for ' + oProperty._sMutator + '"');
					if (oProperty.bp_sMutator) {
						rm.write("checked='checked'");
					}
					rm.write('/></td>');

					rm.write("</tr>");

				});

				$.each(oValue.aggregations, function(iIndex, oAggregation) {

					rm.write("<tr><td>");

					rm.write("<label class='sapUiSupportLabel'>" + oAggregation.name + "</label>");
					rm.write("</td><td>");

					rm.write($.sap.encodeHTML("" + oAggregation.value));

					rm.write("</td>");

					rm.write('<td><input type="checkbox" data-sap-ui-method="' + oAggregation._sGetter + '" title="Activate debugger for ' + oAggregation._sGetter + '"');
					if (oAggregation.bp_sGetter) {
						rm.write("checked='checked'");
					}
					rm.write('/></td>');

					rm.write('<td><input type="checkbox" data-sap-ui-method="' + oAggregation._sMutator + '" title="Activate debugger for ' + oAggregation._sMutator + '"');
					if (oAggregation.bp_sMutator) {
						rm.write("checked='checked'");
					}
					rm.write('/></td>');

					rm.write("</tr>");

				});

				rm.write("</table></div>");

			}

			rm.write("</li>");

		});
		rm.write("</ul>");
		rm.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));
		rm.destroy();

		this.$().find("#sapUiSupportControlTabs").css("visibility", "");

		this.selectTab(this._tab.properties);
	};

	sap.ui.core.support.plugins.ControlTree.prototype.renderBindingsTab = function(mBindingInfos, sControlId) {

		var rm = sap.ui.getCore().createRenderManager();

		if (mBindingInfos.contexts.length > 0) {

			rm.write('<h2 style="padding-left:5px">Contexts</h2>');

			rm.write('<ul class="sapUiSupportControlTreeList" data-sap-ui-controlid="' + sControlId + '">');

			$.each(mBindingInfos.contexts, function(iContextIndex, oContext) {

				rm.write('<li>');

				rm.write('<span><label class="sapUiSupportLabel">Model Name: ' + oContext.modelName + '</label></span>');

				rm.write('<div class="sapUiSupportControlProperties">');

				rm.write('<table><colgroup><col width="15%"><col width="35%"><col width="50%"></colgroup>');
				rm.write('<tbody>');

				// Path
				rm.write('<tr><td colspan="2">');

				rm.write('<label class="sapUiSupportLabel">Path</label>');

				rm.write('</td><td>');

				rm.write('<div><span');

				if (oContext.invalidPath) {
					rm.write(' style="color:red"');
				}
				
				rm.write('>' + oContext.path);

				if (oContext.invalidPath) {
					rm.write(' (invalid)');
				}

				rm.write('</span></div>');

				rm.write('</td></tr>');

				if (oContext.location) {

					// Inherited from
					rm.write('<tr><td colspan="2">');

					rm.write('<label class="sapUiSupportLabel">Inherited from</label>');

					rm.write('</td><td>');

					rm.write('<div><a class="control-tree sapUiSupportLink" title="' + oContext.location.name + '" data-sap-ui-control-id="' + oContext.location.id + '" href="javascript:void(0);">' +
							oContext.location.name.substring(oContext.location.name.lastIndexOf(".") + 1) +
							' (' + oContext.location.id + ')</a></div>');

					rm.write('</td></tr>');

				}

				rm.write('</tbody></table></div></li>');

			});

			rm.write('</ul>');

		}

		if (mBindingInfos.bindings.length > 0) {

			rm.write('<h2 style="padding-left:5px">Bindings</h2>');

			rm.write('<ul class="sapUiSupportControlTreeList" data-sap-ui-controlid="' + sControlId + '">');

			$.each(mBindingInfos.bindings, function(iBindingInfoIndex, oBindingInfo) {

				rm.write('<li data-sap-ui-binding-name="' + oBindingInfo.name + '">');

				rm.write('<span>');

				rm.write('<label class="sapUiSupportLabel" style="vertical-align: middle">' + oBindingInfo.name + '</label>');
				rm.write('<img class="sapUiSupportRefreshBinding" title="Refresh Binding" ' +
					'src="../../../../../resources/testsuite/images/refresh.gif" style="cursor:pointer;margin-left:5px;vertical-align:middle">');

				rm.write('</span>');

				$.each(oBindingInfo.bindings, function(iBindingIndex, oBinding) {

					rm.write('<div class="sapUiSupportControlProperties">');

					rm.write('<table><colgroup><col width="15%"><col width="35%"><col width="50%"></colgroup>');
					rm.write('<tbody>');

					// Path
					rm.write('<tr><td colspan="2">');

					rm.write('<label class="sapUiSupportLabel">Path</label>');

					rm.write('</td><td>');

					rm.write('<div><span');

					if (oBinding.invalidPath) {
						rm.write(' style="color:red"');
					}

					rm.write('>' + oBinding.path);

					if (oBinding.invalidPath) {
						rm.write(' (invalid)');
					}

					rm.write('</span></div>');

					rm.write('</td></tr>');

					// Absolute-Path
					rm.write('<tr><td colspan="2">');

					rm.write('<label class="sapUiSupportLabel">Absolute Path</label>');

					rm.write('</td><td>');

					if (typeof oBinding.absolutePath !== 'undefined') {
						rm.write('<div>' + oBinding.absolutePath + '</div>');
					} else {
						rm.write('<div>No binding</div>');
					}

					rm.write('</td></tr>');

					// Relative
					rm.write('<tr><td colspan="2">');

					rm.write('<label class="sapUiSupportLabel">Relative</label>');

					rm.write('</td><td>');

					if (typeof oBinding.isRelative !== 'undefined') {
						rm.write('<div>' + oBinding.isRelative + '</div>');
					} else {
						rm.write('<div>No binding</div>');
					}

					rm.write('</td></tr>');

					// Binding-Type
					rm.write('<tr><td colspan="2">');

					rm.write('<label class="sapUiSupportLabel">Binding Type</label>');

					rm.write('</td><td>');

					if (!oBindingInfo.type) {
						rm.write('<div>No binding</div>');
					} else {
						rm.write('<div title="' + oBindingInfo.type + '">' + oBindingInfo.type.substring(oBindingInfo.type.lastIndexOf(".") + 1) + '</div>');
					}

					rm.write('</td></tr>');

					// Binding-Mode
					if (oBinding.mode) {
						rm.write('<tr><td colspan="2">');

						rm.write('<label class="sapUiSupportLabel">Binding Mode</label>');

						rm.write('</td><td>');

						rm.write('<div>' + oBinding.mode + '</div>');

						rm.write('</td></tr>');
					}

					// Model-Name
					rm.write('<tr><td>');

					rm.write('<label class="sapUiSupportLabel">Model</label>');

					rm.write('</td><td>');

					rm.write('<label class="sapUiSupportLabel">Name</label>');

					rm.write('</td><td>');

					if (oBinding.model && oBinding.model.name) {
						rm.write('<div>' + oBinding.model.name + '</div>');
					} else {
						rm.write('<div>No binding</div>');
					}

					rm.write('</td></tr>');

					// Model-Type
					rm.write('<tr><td>');
					rm.write('</td><td>');

					rm.write('<label class="sapUiSupportLabel">Type</label>');

					rm.write('</td><td>');

					if (oBinding.model && oBinding.model.type) {
						rm.write('<div><span title="' + oBinding.model.type + '">' + oBinding.model.type.substring(oBinding.model.type.lastIndexOf(".") + 1) + '</span></div>');
					} else {
						rm.write('<div><span>No binding</span></div>');
					}

					rm.write('</td></tr>');

					// Model-DefaultBindingMode
					rm.write('<tr><td>');
					rm.write('</td><td>');

					rm.write('<label class="sapUiSupportLabel">Default Binding Mode</label>');

					rm.write('</td><td>');

					if (oBinding.model && oBinding.model.bindingMode) {
						rm.write('<div><span>' + oBinding.model.bindingMode + '</span></div>');
					} else {
						rm.write('<div><span>No binding</span></div>');
					}

					rm.write('</td></tr>');

					// Model-Location
					rm.write('<tr><td>');
					rm.write('</td><td>');

					rm.write('<label class="sapUiSupportLabel">Location</label>');

					rm.write('</td><td>');

					if (oBinding.model && oBinding.model.location && oBinding.model.location.type) {
						if (oBinding.model.location.type === 'control') {
							rm.write('<div><a class="control-tree sapUiSupportLink" title="' + oBinding.model.location.name + '" data-sap-ui-control-id="' + oBinding.model.location.id + '" href="javascript:void(0);">' +
									oBinding.model.location.name.substring(oBinding.model.location.name.lastIndexOf(".") + 1) +
									' (' + oBinding.model.location.id + ')</a></div>');
						} else {
							rm.write('<div><span title="sap.ui.getCore()">Core</span></div>');
						}
					} else {
						rm.write('<div><span>No binding</span></div>');
					}

					rm.write('</td></tr>');

					rm.write('</tbody></table></div>');

				});

				rm.write('</li>');
			});

			rm.write('</ul>');

		}

		rm.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));
		rm.destroy();
	};

	sap.ui.core.support.plugins.ControlTree.prototype.renderBreakpointsTab = function(aMethods, sControlId) {

		var rm = sap.ui.getCore().createRenderManager();

		rm.write('<div class="sapUiSupportControlMethods" data-sap-ui-controlid="' + sControlId + '">');

		rm.write('<select id="sapUiSupportControlMethodsSelect" class="sapUiSupportAutocomplete"><option></option>');

		$.each(aMethods, function(iIndex, oValue) {
			if (!oValue.active)	rm.write('<option>' + oValue.name + '</option>');
		});

		rm.write('</select>');

		rm.write('<input class="sapUiSupportControlBreakpointInput sapUiSupportAutocomplete" type="text"/>');
		rm.write('<button id="sapUiSupportControlAddBreakPoint" class="sapUiSupportBtn">Add breakpoint</button>');
		rm.write('<hr class="no-border"/><ul id="sapUiSupportControlActiveBreakpoints" class="sapUiSupportList sapUiSupportBreakpointList">');

		$.each(aMethods, function(iIndex, oValue) {
			if (!oValue.active) return;

			rm.write('<li><span>' + oValue.name + '</span>' +
					 '<img class="remove-breakpoint" style="cursor:pointer;margin-left:5px" ' +
					 'src="../../../../testsuite/images/delete.gif"></li>');
		});

		rm.write('</ul></div>');

		rm.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));
		rm.destroy();

		this.selectTab(this._tab.breakpoints);

		this.$().find('.sapUiSupportControlBreakpointInput').focus();
	};

	sap.ui.core.support.plugins.ControlTree.prototype.renderExportTab = function() {

		var rm = sap.ui.getCore().createRenderManager();

		rm.write('<button id="sapUiSupportControlExportToXml" class="sapUiSupportBtn">Export To XML</button>');
		rm.write('<br><br>');
		rm.write('<button id="sapUiSupportControlExportToHtml" class="sapUiSupportBtn">Export To HTML</button>');
		
		rm.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));
		rm.destroy();

		this.selectTab(this._tab.exports);
	};

	sap.ui.core.support.plugins.ControlTree.prototype.requestProperties = function(sControlId) {
		this._oStub.sendEvent(this._breakpointId + "RequestInstanceMethods", {
			controlId: sControlId,
			callback: this.getId() + "ReceivePropertiesMethods"
		});
	};

	sap.ui.core.support.plugins.ControlTree.prototype.updateBreakpointCount = function(sControlId, mBpCount) {

		var $breakpoints = $("#sap-debug-controltree-" + sControlId + " > div span.sapUiSupportControlTreeBreakpointCount");

		if (mBpCount.active > 0) {
			$breakpoints.text(mBpCount.active + " / " + mBpCount.all).show();
		} else {
			$breakpoints.text("").hide();
		}

	};

	// -------------------------------
	// App-Side Event Handler
	// -------------------------------

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeTriggerRequestProperties = function(oEvent) {
		this.requestProperties(oEvent.getParameter("controlId"));
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeReceivePropertiesMethods = function(oEvent) {

		var sControlId = oEvent.getParameter("controlId");

		this._oStub.sendEvent(this.getId() + "RequestProperties", {
			id: sControlId,
			breakpointMethods: oEvent.getParameter("methods")
		});

		this.updateBreakpointCount(sControlId, JSON.parse(oEvent.getParameter("breakpointCount")));
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeReceiveControlTree = function(oEvent) {
		this.renderControlTree(JSON.parse(oEvent.getParameter("controlTree")));
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeReceiveControlTreeExportError = function(oEvent) {
		var sErrorMessage = oEvent.getParameter("errorMessage");
		this._drawAlert(sErrorMessage);
	};
	
	sap.ui.core.support.plugins.ControlTree.prototype._drawAlert = function(sErrorMessage) {
		alert("ERROR: The selected element cannot not be exported.\nPlease choose an other one.\n\nReason:\n" + sErrorMessage);
	}
		
	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeReceiveControlTreeExport = function(oEvent) {
		var zip = undefined;
		var mViews = JSON.parse(oEvent.getParameter("serializedViews"));
		var sType = oEvent.getParameter("sType")
		
		if (!$.isEmptyObject(mViews)) {
			zip = new JSZip();
			for (var oViewName in mViews) {
				var data = mViews[oViewName];
				zip.file(oViewName.replace(/\./g, '/') + ".view." + sType.toLowerCase() , data);
			}
		}
		
		if (zip) {
			var content = zip.generate({
				base64 : true
			});
			var raw = window.atob(content);
			var uInt8Array = new Uint8Array(raw.length);
			for ( var i = 0; i < uInt8Array.length; ++i) {
				uInt8Array[i] = raw.charCodeAt(i);
			}
			var blob = new Blob([ uInt8Array ], {
				type : 'application/zip'
			});
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("click");
			$("<a>", {
				download : sType.toUpperCase() + "Export.zip",
				href : window.URL.createObjectURL(blob)
			}).get(0).dispatchEvent(evt);
		}
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportSelectorSelect = function(oEvent) {
		this.selectControl(oEvent.getParameter("id"));
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeReceiveProperties = function(oEvent) {
		this.renderPropertiesTab(JSON.parse(oEvent.getParameter("properties")), oEvent.getParameter("id"));
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeReceiveBindingInfos = function(oEvent) {
		this.renderBindingsTab(JSON.parse(oEvent.getParameter("bindinginfos")), oEvent.getParameter("id"));
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeReceiveMethods = function(oEvent) {

		var sControlId = oEvent.getParameter("controlId");

		this.renderBreakpointsTab(JSON.parse(oEvent.getParameter("methods")), sControlId);
		this.updateBreakpointCount(sControlId, JSON.parse(oEvent.getParameter("breakpointCount")));
	};

	// -------------------------------
	// DOM Event Handler
	// -------------------------------

	sap.ui.core.support.plugins.ControlTree.prototype._onNodeClick = function(oEvent) {
		var $span = $(oEvent.target);
		var $li = $span.closest("li");
		if ($li.hasClass("sapUiControlTreeElement")) {
			$(".sapUiControlTreeElement > div").removeClass("sapUiSupportControlTreeSelected");
			$li.children("div").addClass("sapUiSupportControlTreeSelected");
			this._oStub.sendEvent("sapUiSupportSelectorHighlight", {id: $li.attr("id").substring("sap-debug-controltree-".length)});

			var sId = $li.attr("id").substring("sap-debug-controltree-".length);

			if ($span.hasClass("sapUiSupportControlTreeBreakpointCount")) {
				this._currentTab = this._tab.breakpoints;
			}

			this.onAfterControlSelected(sId);
		}

		oEvent.stopPropagation();
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onIconClick = function(oEvent) {
		var $source = $(oEvent.target);
		if ($source.parent().attr("data-sap-ui-collapsed")) {
			$source.attr("src", $source.attr("src").replace("plus", "minus")).parent().removeAttr("data-sap-ui-collapsed");
			$source.siblings("ul").show();
		} else {
			$source.attr("src", $source.attr("src").replace("minus", "plus")).parent().attr("data-sap-ui-collapsed", "true");
			$source.siblings("ul").hide();
		}
		if (oEvent.stopPropagation) {
			oEvent.stopPropagation();
		}
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onControlTreeLinkClick = function(oEvent) {
		this.selectControl($(oEvent.target).closest("li").attr("data-sap-ui-controlid"));
	};
	
	sap.ui.core.support.plugins.ControlTree.prototype._onPropertiesTab = function(oEvent) {
		if (this.selectTab(this._tab.properties)) {
			this.requestProperties(this.getSelectedControlId());
		};
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onBindingInfosTab = function(oEvent) {
		if (this.selectTab(this._tab.bindinginfos)) {
			this._oStub.sendEvent(this.getId() + "RequestBindingInfos", {
				id: this.getSelectedControlId()
			});
		}
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onMethodsTab = function(oEvent) {
		if (this.selectTab(this._tab.breakpoints)) {
			this._oStub.sendEvent(this._breakpointId + "RequestInstanceMethods", {
				controlId: this.getSelectedControlId(),
				callback: this.getId() + "ReceiveMethods"
			});
		};
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onExportTab = function(oEvent) {
		if (this.selectTab(this._tab.exports)) {
			this.renderExportTab();
//			this.renderControlTree(JSON.parse(oEvent.getParameter("controlTree")));
		};
	};

	sap.ui.core.support.plugins.ControlTree.prototype._autoComplete = function(oEvent) {

		if (oEvent.keyCode == jQuery.sap.KeyCodes.ENTER) {
			this._updateSelectOptions(oEvent);
			this._onAddBreakpointClicked();
		}

		if (oEvent.keyCode >= jQuery.sap.KeyCodes.ARROW_LEFT && oEvent.keyCode <= jQuery.sap.KeyCodes.ARROW_DOWN) return;

		var $input = $(oEvent.target),
			$select = $input.prev("select"),
			sInputVal = $input.val();

		if (sInputVal == "") return;

		var aOptions = $select.find("option").map(function() {
			return $(this).val();
		}).get();

		var sOption;

		for (var i = 0; i < aOptions.length; i++) {
			sOption = aOptions[i];

			if (sOption.toUpperCase().indexOf(sInputVal.toUpperCase()) == 0) {

				var iCurrentStart = $input.cursorPos();

				if (oEvent.keyCode == jQuery.sap.KeyCodes.BACKSPACE) {
					iCurrentStart--;
				}

				$input.val(sOption);
				$input.selectText(iCurrentStart, sOption.length);

				break;
			}
		}

		return;
	};

	sap.ui.core.support.plugins.ControlTree.prototype._updateSelectOptions = function(oEvent) {

		var oSelect = oEvent.target;

		if(oSelect.tagName == "INPUT") {
			var sValue = oSelect.value;
			oSelect = oSelect.previousSibling;
			var aOptions = oSelect.options;
			for (var i=0;i<aOptions.length;i++) {
				var sText = aOptions[i].value || aOptions[i].text;
				if (sText.toUpperCase()== sValue.toUpperCase()) {
					oSelect.selectedIndex = i;
					break;
				}
			}
		}

		var selIndex = oSelect.selectedIndex;
		var sClassName = oSelect.options[selIndex].value || oSelect.options[selIndex].text;

		if (oSelect.nextSibling && oSelect.nextSibling.tagName == "INPUT") {
			oSelect.nextSibling.value= sClassName;
		}

	};

	sap.ui.core.support.plugins.ControlTree.prototype._onAddBreakpointClicked = function (oEvent) {

		var $select = this.$().find("#sapUiSupportControlMethodsSelect");

		this._oStub.sendEvent(this._breakpointId + "ChangeInstanceBreakpoint", {
			controlId: $select.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid"),
			methodName: $select.val(),
			active: true,
			callback: this.getId() + "ReceiveMethods"
		});

	};
	
	sap.ui.core.support.plugins.ControlTree.prototype._onExportToXmlClicked = function (oEvent) {
		this._startSerializing("XML");
	};
	
	sap.ui.core.support.plugins.ControlTree.prototype._onExportToHtmlClicked = function (oEvent) {
		this._startSerializing("HTML");
	};
	
	sap.ui.core.support.plugins.ControlTree.prototype._startSerializing = function (sTypeValue) {
		var sSelectedId = this.getSelectedControlId();
		if (sSelectedId) {
			this._oStub.sendEvent(this.getId() + "RequestControlTreeSerialize", { controlID: sSelectedId, sType: sTypeValue });
		} else {
			this._drawAlert("Nothing to export. Please select an item in the control tree.");
		}
	};
	
	
	sap.ui.core.support.plugins.ControlTree.prototype._onRemoveBreakpointClicked = function (oEvent) {

		var $img = $(oEvent.target);

		this._oStub.sendEvent(this._breakpointId + "ChangeInstanceBreakpoint", {
			controlId: $img.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid"),
			methodName: $img.siblings('span').text(),
			active: false,
			callback: this.getId() + "ReceiveMethods"
		});
	};

	sap.ui.core.support.plugins.ControlTree.prototype._selectOptionsChanged = function (oEvent) {

		var oSelect = oEvent.target;

		var oInput = oSelect.nextSibling;

		oInput.value = oSelect.options[oSelect.selectedIndex].value;
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onPropertyChange = function(oEvent) {
		var oSource = oEvent.target;
		var $input = $(oSource);
		var sId = $input.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid");
		var sValue = $input.val();
		if ($input.attr("type") === "checkbox") {
			sValue = "" + $input.is(":checked");
		}

		this._oStub.sendEvent(this.getId() + "ChangeProperty", {id: sId, name: $input.attr("data-sap-ui-name"), value: sValue });
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onPropertyBreakpointChange = function(oEvent) {

		var $checkbox = $(oEvent.target);

		this._oStub.sendEvent(this._breakpointId + "ChangeInstanceBreakpoint", {
			controlId: $checkbox.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid"),
			methodName: $checkbox.attr("data-sap-ui-method"),
			active: $checkbox.is(":checked"),
			callback: this.getId() + "TriggerRequestProperties"
		});
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onNavToControl = function(oEvent) {
		var $link = $(oEvent.target);
		var sId = $link.attr("data-sap-ui-control-id");

		if (sId !== this.getSelectedControlId()) {
			this.selectControl(sId);
		}
	};

	sap.ui.core.support.plugins.ControlTree.prototype._onRefreshBinding = function(oEvent) {

		var $img = $(oEvent.target);

		var sId = $img.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid");

		var sName = $img.closest("[data-sap-ui-binding-name]").attr("data-sap-ui-binding-name");

		this._oStub.sendEvent(this.getId() + "RefreshBinding", {
			id: sId,
			name: sName
		});
	};

	sap.ui.core.support.plugins.ControlTree.prototype.selectTab = function(sTab) {

		var $button = this.$().find("#sapUiSupportControlTab" + sTab);

		if ($button.hasClass("active")) return false;

		this.$().find("#sapUiSupportControlTabs button").removeClass("active");
		$button.addClass("active");

		this._currentTab = sTab;

		return true;
	};

	sap.ui.core.support.Plugin.prototype.getSelectedControlId = function() {
		var $sret = this.$().find(".sapUiSupportControlTreeSelected");
		if ($sret.length===0) {
			return undefined;
		} else {
			return $sret.parent().attr("id").substring("sap-debug-controltree-".length);
		}
	};

	sap.ui.core.support.plugins.ControlTree.prototype.selectControl = function(sControlId) {

		if (!sControlId) {
			return;
		}

		$(".sapUiControlTreeElement > div").removeClass("sapUiSupportControlTreeSelected");
		var that = this;
		$.sap.byId("sap-debug-controltree-" + sControlId).parents("[data-sap-ui-collapsed]").each(function(iIndex, oValue) {
			that._onIconClick({ target: $(oValue).find("img:first").get(0) });
		});
		var oPosition = $.sap.byId("sap-debug-controltree-" + sControlId).children("div").addClass("sapUiSupportControlTreeSelected").position();
		var iScrollTop = this.$().find("#sapUiSupportControlTreeArea").scrollTop();
		this.$().find("#sapUiSupportControlTreeArea").scrollTop(iScrollTop + oPosition.top);

		this.onAfterControlSelected(sControlId);
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onAfterControlSelected = function(sId) {
		if (this._currentTab == this._tab.properties) {
			this.requestProperties(sId);
		} else if (this._currentTab == this._tab.breakpoints) {
			this._oStub.sendEvent(this._breakpointId + "RequestInstanceMethods", {
				controlId: sId,
				callback: this.getId() + "ReceiveMethods"
			});
		} else if (this._currentTab == this._tab.bindinginfos) {
			this._oStub.sendEvent(this.getId() + "RequestBindingInfos", {
				id: this.getSelectedControlId()
			});
		}
	};

	//=================================================================================================
	//=================================================================================================
	// APP SIDE
	//=================================================================================================
	//=================================================================================================

	function initInApps(oSupportStub) {
		this.onsapUiSupportControlTreeRequestControlTree();
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeRequestControlTree = function(oEvent) {
		this._oStub.sendEvent(this.getId() + "ReceiveControlTree", { controlTree: JSON.stringify(this.getControlTree()) });
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeRequestControlTreeSerialize = function(oEvent) {
		var oControl = sap.ui.getCore().byId(oEvent.getParameter("controlID"));
		var sType = oEvent.getParameter("sType");
		
		var oViewSerializer = undefined;
		var mViews = undefined;
		sap.ui.controller(sType + "ViewController", {});
		sap.ui.jsview(sType + "ViewExported", { 
			getControllerName : function() { return sType + "ViewController";},
			createContent : function(oController) { }
		});
		
		sap.ui.controller(sType + "ViewController", {});
		sap.ui.jsview(sType + "ViewExported", { 
			getControllerName : function() { return sType + "ViewController";},
			createContent : function(oController) { }
		});
		
		try {
			if (oControl) {
				var oParentControl = oControl.getParent();
				var index = undefined;
				index = oParentControl.indexOfContent(oControl);
				
				if (oControl instanceof sap.ui.core.mvc.View) {
					oViewSerializer = new sap.ui.core.util.serializer.ViewSerializer(oControl, window, "sap.m");
				} else {
					var oView = sap.ui.jsview(sType + "ViewExported");
					oView.addContent(oControl);
					oViewSerializer = new sap.ui.core.util.serializer.ViewSerializer(oView, window, "sap.m");
				}
				// By now just XML and HTML can be serialized
				mViews = (sType && sType!=="XML") ? oViewSerializer.serializeToHTML() : oViewSerializer.serializeToXML();
				if (index) {
					oParentControl.insertContent(oControl, index);
				} else {
					oParentControl.addContent(oControl);
				}
			} else {
				var oUIArea = sap.ui.getCore().getUIArea(oEvent.getParameter("controlID"));
				var oView = sap.ui.jsview(sType + "ViewExported");
				var aContent = oUIArea.getContent();
				for ( var i = 0; i < aContent.length; i++) {
					oView.addContent(aContent[i]);
				}
				oViewSerializer = new sap.ui.core.util.serializer.ViewSerializer(oView, window, "sap.m");
				// By now just XML and HTML can be serialized
				mViews = (sType && sType!=="XML") ? oViewSerializer.serializeToHTML() : oViewSerializer.serializeToXML();
				for ( var i = 0; i < aContent.length; i++) {
					oUIArea.addContent(aContent[i]);
				}
			}
			
			if (oViewSerializer) {
				this._oStub.sendEvent(this.getId() + "ReceiveControlTreeExport", { serializedViews: JSON.stringify(mViews), sType: sType });
			}
		} catch(err) {
			this._oStub.sendEvent(this.getId() + "ReceiveControlTreeExportError", { errorMessage: err.message });
		}
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeRequestProperties = function(oEvent) {

		var breakpointMethods = JSON.parse(oEvent.getParameter("breakpointMethods"));
		var aControlProps = this.getControlProperties(oEvent.getParameter("id"), breakpointMethods);

		this._oStub.sendEvent(this.getId() + "ReceiveProperties", {
			id: oEvent.getParameter("id"),
			properties: JSON.stringify(aControlProps)
		});
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeChangeProperty = function(oEvent) {

		var sId = oEvent.getParameter("id");
		var oControl = sap.ui.getCore().byId(sId);

		if (oControl) {

			var sName = oEvent.getParameter("name");
			var sValue = oEvent.getParameter("value");

			var oMetadata = oControl.getMetadata();
			oMetadata.getJSONKeys(); // hack to enrich the properties
			var oProperty = oControl.getMetadata().getAllProperties()[sName];

			if (oProperty && oProperty.type) {

				var oType = sap.ui.base.DataType.getType(oProperty.type);
				if (oType instanceof sap.ui.base.DataType) {

					// DATATYPE

					var vValue = oType.parseValue(sValue);
					if (oType.isValid(vValue) && vValue !== "(null)" ) {
						oControl[oProperty._sMutator](vValue);
					}

				} else if (oType) {

					// ENUM

					if (oType[sValue]) {
						oControl[oProperty._sMutator](sValue);
					}

				}

			}

		}

	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeRequestBindingInfos = function(oEvent) {

		var sId = oEvent.getParameter("id");

		this._oStub.sendEvent(this.getId() + "ReceiveBindingInfos", {
			id: sId,
			bindinginfos: JSON.stringify(this.getControlBindingInfos(sId))
		});
	};

	sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeRefreshBinding = function(oEvent) {

		var sId = oEvent.getParameter("id");
		var sBindingName = oEvent.getParameter("name");

		this.refreshBinding(sId, sBindingName);

		this._oStub.sendEvent(this.getId() + "ReceiveBindingInfos", {
			id: sId,
			bindinginfos: JSON.stringify(this.getControlBindingInfos(sId))
		});
	};

	// -------------------------------
	// Private Methods
	// -------------------------------

	sap.ui.core.support.plugins.ControlTree.prototype.getControlTree = function() {

		var aControlTree = [],
			mAllElements = {};

		function serializeElement(oElement) {
			var mElement = {id: oElement.getId(), type: "", aggregation: [], association: []};
			mAllElements[mElement.id] = mElement.id;
			if (oElement instanceof sap.ui.core.UIArea) {
				mElement.library = "sap.ui.core";
				mElement.type = "sap.ui.core.UIArea";
				$.each(oElement.getContent(), function(iIndex, oElement) {
					var mChild = serializeElement(oElement);
					mElement.aggregation.push(mChild);
				});
			} else {
				mElement.library = oElement.getMetadata().getLibraryName();
				if (oElement.getMetadata().getStereotype() === "control") {
					mElement.type = oElement.getMetadata().getElementName(); // difference to getName() ???
				} else if(oElement.getMetadata().getStereotype() === "component") {
					mElement.type = oElement.getMetadata().getName();
				}
				if (oElement.mAggregations) {
					for (var sAggrName in oElement.mAggregations) {
						var oAggrElement = oElement.mAggregations[sAggrName];
						if (oAggrElement) {
							var aElements = $.isArray(oAggrElement) ? oAggrElement : [oAggrElement];
							$.each(aElements, function(iIndex, oValue) {
								// tooltips are also part of aggregations
								if (oValue instanceof sap.ui.core.Element) {
									var mChild = serializeElement(oValue);
									mElement.aggregation.push(mChild);
								}
							});
						}
					}
				}
				if (oElement.mAssociations) {
					for (var sAssocName in oElement.mAssociations) {
						var sAssocId = oElement.mAssociations[sAssocName];
						if (sAssocId) {
							var aAssocIds = $.isArray(sAssocId) ? sAssocId : [sAssocId];
							$.each(aAssocIds, function(iIndex, oValue) {
								mElement.association.push(oValue);
							});
						}
					}
				}
			}
			return mElement;
		};

		$.each(this.oCore.mUIAreas, function(iIndex, oUIArea) {
			var mElement = serializeElement(oUIArea);
			aControlTree.push(mElement);
		});

		function serializeAssociations(iIndex, mElement) {

			for (var i = 0; i < mElement.association.length; i++) {
				var sAssocId = mElement.association[i];

				if (!mAllElements[sAssocId]) {
					mElement.association[i] = serializeElement(sap.ui.getCore().byId(sAssocId) || /* TODO: better handling here? */ sap.ui.getCore().getComponent(sAssocId));
					mElement.association[i].isAssociation = true;
					serializeAssociations(0, mElement.association[i]);
				}

			}
			
			$.each(mElement.aggregation, serializeAssociations);
		}

		$.each(aControlTree, serializeAssociations);

		return aControlTree;
	};

	sap.ui.core.support.plugins.ControlTree.prototype.getControlProperties = function(sId, mMethods) {

		var pSimpleType = /^((boolean|string|int|float)(\[\])?)$/;

		var aControlProps = [];

		var oControl = sap.ui.getCore().byId(sId);

		if (!oControl && sap.ui.getCore().getUIArea(sId)) {

			aControlProps.push({
				control: "sap.ui.core.UIArea",
				properties: [],
				aggregations: []
			});

		} else if (oControl) {

			var oMetadata = oControl.getMetadata();

			while(oMetadata instanceof sap.ui.core.ElementMetadata) {

				var mControlProp = {
					control: oMetadata.getName(),
					properties: [],
					aggregations: []
				};

				var mProperties = oMetadata.getProperties();
				$.each(mProperties, function(sKey, oProperty) {
					var mProperty = {};
					$.each(oProperty, function(sName, sValue) {

						if (sName.substring(0, 1) !== "_" || (sName == '_sGetter' || sName == '_sMutator')) {
							mProperty[sName] = sValue;
						}

						if (sName == '_sGetter' || sName == '_sMutator') {
							mProperty["bp" + sName] = $.grep(mMethods, function(o) { return o.name === sValue && o.active; }).length === 1;
						}

						var oType = sap.ui.base.DataType.getType(oProperty.type);
						if (oType && !(oType instanceof sap.ui.base.DataType)) {
							mProperty["enumValues"] = oType;
						}
					});
					mProperty.value = oControl.getProperty(sKey);

					mProperty.isBound = !!oControl.mBindingInfos[sKey];

					mControlProp.properties.push(mProperty);
				});

				var mAggregations = oMetadata.getAggregations();
				$.each(mAggregations, function(sKey, oAggregation) {
					if (oAggregation.altTypes && oAggregation.altTypes[0] && pSimpleType.test(oAggregation.altTypes[0]) && typeof(oControl.getAggregation(sKey)) !== 'object') {
						var mAggregation = {};
						$.each(oAggregation, function(sName, sValue) {

							if (sName.substring(0, 1) !== "_" || (sName == '_sGetter' || sName == '_sMutator')) {
								mAggregation[sName] = sValue;
							}

							if (sName == '_sGetter' || sName == '_sMutator') {
								mAggregation["bp" + sName] = $.grep(mMethods, function(o) { return o.name === sValue && o.active; }).length === 1;
							}

						});
						mAggregation.value = oControl.getAggregation(sKey);
						mControlProp.aggregations.push(mAggregation);
					}
				});

				aControlProps.push(mControlProp);

				oMetadata = oMetadata.getParent();
			}

		}

		return aControlProps;
	};

	sap.ui.core.support.plugins.ControlTree.prototype.getControlBindingInfos = function(sId) {

		var mControlBindingInfos = {
			bindings: [],
			contexts: []
		};

		var oControl = sap.ui.getCore().byId(sId);

		if (!oControl) return mControlBindingInfos;

		var mBindingInfos = oControl.mBindingInfos;

		var that = this;

		for (var bindingName in mBindingInfos) {
			if (mBindingInfos.hasOwnProperty(bindingName)) {

				var mBindingInfo = mBindingInfos[bindingName];
				var aBindings = [];
				var aBindingInfoBuffer, aBindingBuffer = [];

				if ($.isArray(mBindingInfo.parts)) {
					aBindingInfoBuffer = mBindingInfo.parts;
				} else {
					aBindingInfoBuffer = [ mBindingInfo ];
				}

				if (mBindingInfo.binding instanceof sap.ui.model.CompositeBinding) {
					aBindingBuffer = mBindingInfo.binding.getBindings();
				} else if (mBindingInfo.binding instanceof sap.ui.model.Binding) {
					aBindingBuffer = [ mBindingInfo.binding ];
				}

				$.each(aBindingInfoBuffer, function(iIndex, oInfo) {

					var mData = {};

					mData.invalidPath = true;
					mData.path = oInfo.path;
					mData.mode = oInfo.mode;
					mData.model = {
						name: oInfo.model
					};

					if (aBindingBuffer.length > iIndex && aBindingBuffer[iIndex]) {

						var oBinding = aBindingBuffer[iIndex],
							oModel = oBinding.getModel();

						if (oBinding.getContext().getProperty(mData.path) != null) {
							mData.invalidPath = false;
						}

						var sAbsolutePath = oBinding.getModel().resolve(oBinding.getPath(), oBinding.getContext());

						mData.absolutePath = (typeof(sAbsolutePath) === 'undefined') ? 'Unresolvable' : sAbsolutePath;
						mData.isRelative = oBinding.isRelative();
						mData.model = that.getBindingModelInfo(oBinding, oControl);
					}

					aBindings.push(mData);
				});

				mControlBindingInfos.bindings.push({
					name: bindingName,
					type: (mBindingInfo.binding) ? mBindingInfo.binding.getMetadata().getName() : undefined,
					bindings: aBindings
				});
			}
		}

		function getContextInfos(oContext, sModelName) {
			var mContextInfos = {
				modelName: (sModelName === 'undefined') ? 'none (default)' : sModelName,
				path: oContext.getPath()
			};

			if (!oContext.getObject() == null) {
				mContextInfos.invalidPath = true;
			}

			return mContextInfos;
		}

		var mContexts = oControl.oBindingContexts;

		for (var modelName in mContexts) {
			if (mContexts.hasOwnProperty(modelName)) {
				mControlBindingInfos.contexts.push(getContextInfos(mContexts[modelName], modelName));
			}
		}

		var mContexts = oControl.oPropagatedProperties.oBindingContexts;

		for (var modelName in mContexts) {
			if (mContexts.hasOwnProperty(modelName) && !oControl.oBindingContexts[modelName]) {

				var mContext = getContextInfos(mContexts[modelName], modelName);

				var oCurrentControl = oControl;

				do {
					if (oCurrentControl.oBindingContexts[modelName] == mContexts[modelName]) {
						mContext.location = {
							id: oCurrentControl.getId(),
							name: oCurrentControl.getMetadata().getName()
						};
						break;
					}
				} while (oCurrentControl = oCurrentControl.getParent());

				mControlBindingInfos.contexts.push(mContext);
			}
		}

		return mControlBindingInfos;
	};

	sap.ui.core.support.plugins.ControlTree.prototype.getBindingModelInfo = function(oBinding, oControl) {

		var mModelInfo = {};

		var oBindingModel = oBinding.getModel();

		function getModelName(oModels) {
			for (var sModelName in oModels) {
				if (oModels.hasOwnProperty(sModelName)) {
					if (oModels[sModelName] === oBindingModel) {
						return sModelName;
					}
				}
			}

			return null;
		}

		mModelInfo.name = getModelName(oControl.oModels) || getModelName(oControl.oPropagatedProperties.oModels);

		if (mModelInfo.name) {

			var oCurrentControl = oControl;

			// check for the model on control level (including all parents)
			do {
				if (oCurrentControl.oModels[mModelInfo.name] === oBindingModel) {
					mModelInfo.location = {
						type: 'control',
						id: oCurrentControl.getId(),
						name: oCurrentControl.getMetadata().getName()
					};
					break;
				}
			} while (oCurrentControl = oCurrentControl.getParent());

			// check for core model if no model was found
			if (!mModelInfo.location) {

				var oCoreModel = null;

				if (mModelInfo.name === 'undefined') {
					oCoreModel = sap.ui.getCore().getModel();
				} else {
					oCoreModel = sap.ui.getCore().getModel(mModelInfo.name);
				}

				if (oCoreModel) {
					mModelInfo.location = {
						type: 'core'
					};
				}
			}

		}

		// Get Model Type (JSON, XML, OData)
		mModelInfo.type = oBindingModel.getMetadata().getName();

		mModelInfo.bindingMode = oBindingModel.getDefaultBindingMode();

		// Default Model (undefined)
		mModelInfo.name = (mModelInfo.name === 'undefined') ? 'none (default)' : mModelInfo.name;

		return mModelInfo;
	};

	sap.ui.core.support.plugins.ControlTree.prototype.refreshBinding = function(sId, sBindingName) {

		var oControl = sap.ui.getCore().byId(sId);
		var mBindingInfo = oControl.mBindingInfos[sBindingName];

		if (!oControl || !mBindingInfo) return;

		var oBinding = mBindingInfo.binding;

		if (!oBinding) {
			return;
		}

		if (oBinding instanceof sap.ui.model.CompositeBinding) {

			var aBindings = oBinding.getBindings();

			for ( var i = 0; i < aBindings.length; i++) {
				aBindings[i].refresh();
			}

		} else {
			oBinding.refresh();
		}
	};

}(jQuery));
