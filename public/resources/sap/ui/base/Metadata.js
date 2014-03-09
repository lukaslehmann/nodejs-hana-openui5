/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.base.Metadata");jQuery.sap.require("jquery.sap.script");
sap.ui.base.Metadata=function(c,C){if(!C||typeof C.metadata!=="object"){C={metadata:C||{},constructor:jQuery.sap.getObject(c)};C.metadata.__version=1.0}C.metadata.__version=C.metadata.__version||2.0;if(typeof C.constructor!=="function"){throw Error("constructor for class "+c+" must have been declared before creating metadata for it")}this._sClassName=c;this._oClass=C.constructor;this.extend(C)};
sap.ui.base.Metadata.prototype.extend=function(c){this.applySettings(c);this.afterApplySettings()};
sap.ui.base.Metadata.prototype.applySettings=function(c){var t=this,s=c.metadata,p,n;if(s.baseType){var P=jQuery.sap.getObject(s.baseType);if(typeof P!=="function"){jQuery.sap.log.fatal("base class '"+s.baseType+"' does not exist")}if(P.getMetadata){this._oParent=P.getMetadata();}else{this._oParent=new sap.ui.base.Metadata(s.baseType,{})}}else{this._oParent=undefined}this._bAbstract=!!s["abstract"];this._bFinal=!!s["final"];this._sStereotype=s.stereotype||(this._oParent?this._oParent._sStereotype:"object");this._aInterfaces=jQuery.sap.unique(s.interfaces||[]);this._aPublicMethods=jQuery.sap.unique(s.publicMethods||[]);p=this._oClass.prototype;jQuery.sap.forIn(c,function(n,v){if(n!=="metadata"&&n!=="constructor"){p[n]=v;if(!n.match(/^_|^on|^init$|^exit$/)){t._aPublicMethods.push(n)}}})};
sap.ui.base.Metadata.prototype.afterApplySettings=function(){if(this._oParent){this._aAllPublicMethods=jQuery.sap.unique(this._oParent._aAllPublicMethods.concat(this._aPublicMethods))}else{this._aAllPublicMethods=this._aPublicMethods}};
sap.ui.base.Metadata.prototype.getStereotype=function(){return this._sStereotype};
sap.ui.base.Metadata.prototype.getName=function(){return this._sClassName};
sap.ui.base.Metadata.prototype.getClass=function(){return this._oClass};
sap.ui.base.Metadata.prototype.getParent=function(){return this._oParent};
sap.ui.base.Metadata.prototype.getPublicMethods=function(){return this._aPublicMethods};
sap.ui.base.Metadata.prototype.getAllPublicMethods=function(){return this._aAllPublicMethods};
sap.ui.base.Metadata.prototype.getInterfaces=function(){return this._aInterfaces};
sap.ui.base.Metadata.prototype.isInstanceOf=function(I){if(this._oParent){if(this._oParent.isInstanceOf(I)){return true}};var a=this._aInterfaces;for(var i=0,l=a.length;i<l;i++){if(a[i]===I){return true}}return false};
sap.ui.base.Metadata.prototype.isAbstract=function(){return this._bAbstract};
sap.ui.base.Metadata.prototype.isFinal=function(){return this._bFinal};
sap.ui.base.Metadata.prototype.addPublicMethods=function(m){var n=(m instanceof Array)?m:arguments;function u(a,v){Array.prototype.push.apply(a,v);jQuery.sap.unique(a)}u(this._aPublicMethods,n);u(this._aAllPublicMethods,n)};
sap.ui.base.Metadata.createClass=function(b,c,C,F){if(typeof b==="string"){F=C;C=c;c=b;b=null}F=F||sap.ui.base.Metadata;if(typeof F.preprocessClassInfo==="function"){C=F.preprocessClassInfo(C)}C=C||{};C.metadata=C.metadata||{};if(!C.hasOwnProperty('constructor')){C.constructor=undefined}var f=C.constructor;if(b){if(!f){if(C.metadata.deprecated){f=function(){jQuery.sap.log.warning("Usage of deprecated class: "+c);b.apply(this,arguments)}}else{f=function(){b.apply(this,arguments)}}}f.prototype=jQuery.sap.newObject(b.prototype);f.prototype.constructor=f;C.metadata.baseType=b.getMetadata().getName()}else{f=f||function(){};delete C.metadata.baseType}C.constructor=f;jQuery.sap.setObject(c,f);var m=new F(c,C);f.getMetadata=f.prototype.getMetadata=jQuery.sap.getter(m);if(!f.getMetadata().isFinal()){f.extend=function(s,S,a){return sap.ui.base.Metadata.createClass(f,s,S,a||F)}}return f};
