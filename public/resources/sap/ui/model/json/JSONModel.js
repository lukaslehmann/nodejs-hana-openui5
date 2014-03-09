/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.json.JSONModel");jQuery.sap.require("sap.ui.model.ClientModel");jQuery.sap.require("sap.ui.model.json.JSONPropertyBinding");jQuery.sap.require("sap.ui.model.json.JSONListBinding");jQuery.sap.require("sap.ui.model.json.JSONTreeBinding");sap.ui.model.ClientModel.extend("sap.ui.model.json.JSONModel",{constructor:function(d){sap.ui.model.ClientModel.apply(this,arguments);if(d&&typeof d=="object"){this.setData(d)}},metadata:{publicMethods:["setJSON","getJSON"]}});
sap.ui.model.json.JSONModel.prototype.setData=function(d,m){if(m){this.oData=jQuery.extend(true,{},this.oData,d)}else{this.oData=d}this.checkUpdate()};
sap.ui.model.json.JSONModel.prototype.setJSON=function(j,m){var J;try{J=jQuery.parseJSON(j);this.setData(J,m)}catch(e){jQuery.sap.log.fatal("The following problem occurred: JSON parse Error: "+e);this.fireParseError({url:"",errorCode:-1,reason:"",srcText:e,line:-1,linepos:-1,filepos:-1})}};
sap.ui.model.json.JSONModel.prototype.getJSON=function(){return JSON.stringify(this.oData)};
sap.ui.model.json.JSONModel.prototype.loadData=function(u,p,a,t,m,c,h){var b=this;if(a!==false){a=true}if(!t){t="GET"}if(c===undefined){c=this.bCache}this.fireRequestSent({url:u,type:t,async:a,headers:h,info:"cache="+c+";bMerge="+m});jQuery.ajax({url:u,async:a,dataType:'json',cache:c,data:p,headers:h,type:t,success:function(d){if(!d){jQuery.sap.log.fatal("The following problem occurred: No data was retrieved by service: "+u)}b.setData(d,m);b.fireRequestCompleted({url:u,type:t,async:a,headers:h,info:"cache=false;bMerge="+m,success:true})},error:function(X,d,e){var E={message:d,statusCode:X.status,statusText:X.statusText,responseText:X.responseText};jQuery.sap.log.fatal("The following problem occurred: "+d,X.responseText+","+X.status+","+X.statusText);b.fireRequestCompleted({url:u,type:t,async:a,headers:h,info:"cache=false;bMerge="+m,success:false,errorobject:E});b.fireRequestFailed(E)}})};
sap.ui.model.json.JSONModel.prototype.bindProperty=function(p,c,P){var b=new sap.ui.model.json.JSONPropertyBinding(this,p,c,P);return b};
sap.ui.model.json.JSONModel.prototype.bindList=function(p,c,s,f,P){var b=new sap.ui.model.json.JSONListBinding(this,p,c,s,f,P);return b};
sap.ui.model.json.JSONModel.prototype.bindTree=function(p,c,f,P){var b=new sap.ui.model.json.JSONTreeBinding(this,p,c,f,P);return b};
sap.ui.model.json.JSONModel.prototype.setProperty=function(p,v,c){var o=p.substring(0,p.lastIndexOf("/")),P=p.substr(p.lastIndexOf("/")+1);if(!this.resolve(p,c)){return}if(!o&&!c){c=this.oData}var O=this._getObject(o,c);if(O){O[P]=v;this.checkUpdate()}};
sap.ui.model.json.JSONModel.prototype.getProperty=function(p,c){return this._getObject(p,c)};
sap.ui.model.json.JSONModel.prototype._getObject=function(p,c){var n=this.isLegacySyntax()?this.oData:null;if(c instanceof sap.ui.model.Context){n=this._getObject(c.getPath())}else if(c){n=c}if(!p){return n}var P=p.split("/"),i=0;if(!P[0]){n=this.oData;i++}while(n&&P[i]){n=n[P[i]];i++}return n};
