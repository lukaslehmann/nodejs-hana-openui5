/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.ComponentContainerRenderer");sap.ui.core.ComponentContainerRenderer={};
sap.ui.core.ComponentContainerRenderer.render=function(r,c){var R=r;var b=sap.ui.getCore().getConfiguration().getRTL();var C=c.getComponentInstance();var w=c.getWidth();var h=c.getHeight();R.write("<div");R.writeControlData(c);if(w){R.addStyle("width",w)}if(h){R.addStyle("height",h)}R.writeStyles();R.addClass("sapUiComponentContainer");R.writeClasses();R.write(">");R.write("<div id=\""+c.getId()+"-uiarea\"");if(w&&w!=="auto"){R.addStyle("width","100%")}if(h&&h!=="auto"){R.addStyle("height","100%")}R.writeStyles();R.write(">");if(C){C.render(R)}R.write("</div></div>")};
