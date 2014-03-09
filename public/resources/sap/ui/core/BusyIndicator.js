/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.BusyIndicator");jQuery.sap.require("sap.ui.core.Popup");sap.ui.core.BusyIndicator=jQuery.extend(jQuery.sap.newObject(sap.ui.base.EventProvider.prototype),{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1000,sDOM_ID:"sapUiBusyIndicator"});sap.ui.base.EventProvider.apply(sap.ui.core.BusyIndicator);sap.ui.core.BusyIndicator.M_EVENTS={Open:"Open",Close:"Close"};
sap.ui.core.BusyIndicator._init=function(){var r=document.createElement("div");r.id=this.sDOM_ID;var i=sap.ui.getCore().getStaticAreaRef();i.appendChild(r);jQuery(r).addClass("sapUiBusy").attr("tabindex",0).attr("role","progressbar").attr("alt","").attr("title","Please Wait");this.oDomRef=r;this.oPopup=new sap.ui.core.Popup(r);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false)};
sap.ui.core.BusyIndicator.show=function(d){jQuery.sap.log.debug("sap.ui.core.BusyIndicator.show (delay: "+d+") at "+new Date().getTime());if((d===undefined)||((d!=0)&&(parseInt(d,10)==0))||(parseInt(d,10)<0)){d=this.iDEFAULT_DELAY_MS}this.bOpenRequested=true;if(d===0){this._showNowIfRequested()}else{jQuery.sap.delayedCall(d,this,"_showNowIfRequested")}};
sap.ui.core.BusyIndicator._showNowIfRequested=function(){jQuery.sap.log.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+new Date().getTime());if(!this.bOpenRequested){return}if(!document.body||!sap.ui.getCore().isInitialized()){jQuery.sap.delayedCall(100,this,"_showNowIfRequested");return}this.bOpenRequested=false;if(!this.oDomRef){this._init()}this.oPopup.open(0,sap.ui.core.Popup.Dock.CenterCenter,sap.ui.core.Popup.Dock.CenterCenter,document);this.fireOpen({$Busy:this.oPopup._$()});var d=jQuery.sap.domById(sap.ui.core.BusyIndicator.sDOM_ID);jQuery.sap.focus(d);jQuery("body").attr("aria-busy",true)};
sap.ui.core.BusyIndicator.hide=function(){jQuery.sap.log.debug("sap.ui.core.BusyIndicator.hide at "+new Date().getTime());var t=sap.ui.core.BusyIndicator;t.bOpenRequested=false;if(t.oDomRef){jQuery("body").removeAttr("aria-busy");this.fireClose({$Busy:this.oPopup._$()});t.oPopup.close(0)}};
sap.ui.core.BusyIndicator.attachOpen=function(f,l){this.attachEvent(sap.ui.core.BusyIndicator.M_EVENTS.Open,f,l);return this};
sap.ui.core.BusyIndicator.detachOpen=function(f,l){this.detachEvent(sap.ui.core.BusyIndicator.M_EVENTS.Open,f,l);return this};
sap.ui.core.BusyIndicator.attachClose=function(f,l){this.attachEvent(sap.ui.core.BusyIndicator.M_EVENTS.Close,f,l);return this};
sap.ui.core.BusyIndicator.detachClose=function(f,l){this.detachEvent(sap.ui.core.BusyIndicator.M_EVENTS.Close,f,l);return this};
sap.ui.core.BusyIndicator.fireOpen=function(p){this.fireEvent(sap.ui.core.BusyIndicator.M_EVENTS.Open,p)};
sap.ui.core.BusyIndicator.fireClose=function(p){this.fireEvent(sap.ui.core.BusyIndicator.M_EVENTS.Close,p)};
