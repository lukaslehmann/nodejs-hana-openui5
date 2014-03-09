/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.ValueStateSupport");(function(){sap.ui.core.ValueStateSupport={};var t=null;var e=function(){if(!t){t={};var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");t[sap.ui.core.ValueState.Error]=r.getText("VALUE_STATE_ERROR");t[sap.ui.core.ValueState.Warning]=r.getText("VALUE_STATE_WARNING");t[sap.ui.core.ValueState.Success]=r.getText("VALUE_STATE_SUCCESS")}};sap.ui.core.ValueStateSupport.enrichTooltip=function(E,T){if(!T&&E.getTooltip()){return undefined}if(E.getValueState){var s=E.getValueState();if(s&&(s!=sap.ui.core.ValueState.None)){e();return(T?T+" - ":"")+t[s]}}return T};sap.ui.core.ValueStateSupport.getAdditionalText=function(E){var r=null;if(E.getValueState){var s=E.getValueState();if(s&&(s!=sap.ui.core.ValueState.None)){e();r=t[s]}}return r}})();
