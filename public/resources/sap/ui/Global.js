/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
if(window.OpenAjax&&window.OpenAjax.hub){OpenAjax.hub.registerLibrary("sap","http://www.sap.com/","0.1",{})}jQuery.sap.declare("sap.ui.Global");jQuery.sap.require("jquery.sap.dom");if(typeof window.sap!=="object"&&typeof window.sap!=="function"){window.sap={}}if(typeof window.sap.ui!=="object"){window.sap.ui={}}sap.ui=jQuery.extend(sap.ui,{version:"1.16.8-SNAPSHOT",buildinfo:{lastchange:"${ldi.scm.revision}",buildtime:"201312172109"}});
sap.ui.namespace=function(n){return jQuery.sap.getObject(n,0)};
sap.ui.lazyRequire=function(c,m,M){var f=c.replace(/\//gi,"\."),l=f.lastIndexOf("."),p=f.substr(0,l),C=f.substr(l+1),P=jQuery.sap.getObject(p,0),o=P[C],a=(m||"new").split(" "),b=jQuery.inArray("new",a);M=M||f;if(!o){if(b>=0){o=function(){jQuery.sap.log.debug("lazy stub for '"+f+"' (constructor) called.");jQuery.sap.require(M);var r=P[C];if(r._sapUiLazyLoader){throw new Error("lazyRequire: stub '"+f+"'has not been replaced by module '"+M+"'")}var i=jQuery.sap.newObject(r.prototype);var R=r.apply(i,arguments);if(R&&(typeof R==="function"||typeof R==="object")){i=R}return i};o._sapUiLazyLoader=true;a.splice(b,1)}else{o={}}P[C]=o}jQuery.each(a,function(i,s){if(!o[s]){o[s]=function(){jQuery.sap.log.debug("lazy stub for '"+f+"."+s+"' called.");jQuery.sap.require(M);var r=P[C];if(r[s]._sapUiLazyLoader){throw new Error("lazyRequire: stub '"+f+"."+s+"' has not been replaced by loaded module '"+M+"'")}return r[s].apply(r,arguments)};o[s]._sapUiLazyLoader=true}})};
sap.ui.resource=function(l,r){var m=r.match(/^themes\/([^\/]+)\//);if(m){l+=".themes."+m[1];r=r.substr(m[0].length)}return jQuery.sap.getModulePath(l,'/')+r};
sap.ui.localResources=function(n){jQuery.sap.registerModulePath(n,"./"+n.replace(/\./g,"/"))};
