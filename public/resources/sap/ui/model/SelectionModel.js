/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.SelectionModel");jQuery.sap.require("sap.ui.base.EventProvider");sap.ui.base.EventProvider.extend("sap.ui.model.SelectionModel",{constructor:function(s){sap.ui.base.EventProvider.apply(this);this.iSelectionMode=s||sap.ui.model.SelectionModel.SINGLE_SELECTION;this.aSelectedIndices=[];this.iLeadIndex=-1;this.fnSort=function(a,b){return a-b};this.fnSortReverse=function(a,b){return b-a}}});sap.ui.model.SelectionModel.SINGLE_SELECTION=0;sap.ui.model.SelectionModel.MULTI_SELECTION=1;
sap.ui.model.SelectionModel.prototype.getSelectionMode=function(){return this.iSelectionMode};
sap.ui.model.SelectionModel.prototype.setSelectionMode=function(s){this.iSelectionMode=s||sap.ui.model.SelectionModel.SINGLE_SELECTION};
sap.ui.model.SelectionModel.prototype.isSelectedIndex=function(i){return jQuery.inArray(i,this.aSelectedIndices)!==-1};
sap.ui.model.SelectionModel.prototype.getLeadSelectedIndex=function(){return this.iLeadIndex};
sap.ui.model.SelectionModel.prototype.setLeadSelectedIndex=function(l){this.setSelectionInterval(l,l);return this};
sap.ui.model.SelectionModel.prototype.getMinSelectionIndex=function(){if(this.aSelectedIndices.length>0){var i=this.aSelectedIndices.sort(this.fnSort);return i[0]}else{return-1}};
sap.ui.model.SelectionModel.prototype.getMaxSelectionIndex=function(){if(this.aSelectedIndices.length>0){var i=this.aSelectedIndices.sort(this.fnSortReverse);return i[0]}else{return-1}};
sap.ui.model.SelectionModel.prototype.getSelectedIndices=function(){var i=this.aSelectedIndices.sort(this.fnSort);return i};
sap.ui.model.SelectionModel.prototype.setSelectionInterval=function(f,t){if(this.iSelectionMode===sap.ui.model.SelectionModel.SINGLE_SELECTION){f=t}var F=Math.min(f,t);var T=Math.max(f,t);var c=this.aSelectedIndices.slice();var s=[];for(var i=F;i<=T;i++){s.push(i);var p=jQuery.inArray(i,c);if(p===-1){c.push(i)}else{c.splice(p,1)}}this._update(s,t,c);return this};
sap.ui.model.SelectionModel.prototype.addSelectionInterval=function(f,t){if(this.iSelectionMode===sap.ui.model.SelectionModel.SINGLE_SELECTION){return this.setSelectionInterval(f,t)}var F=Math.min(f,t);var T=Math.max(f,t);var c=[];var s=this.aSelectedIndices;for(var i=F;i<=T;i++){if(jQuery.inArray(i,s)===-1){s.push(i);c.push(i)}}this._update(s,T,c);return this};
sap.ui.model.SelectionModel.prototype.removeSelectionInterval=function(f,t){if(this.iSelectionMode===sap.ui.model.SelectionModel.SINGLE_SELECTION){f=t}var F=Math.min(f,t);var T=Math.max(f,t);var c=[];var s=this.aSelectedIndices;var l=this.iLeadIndex;for(var i=F;i<=T;i++){var I=jQuery.inArray(i,s);if(I>-1){s.splice(I,1);c.push(i)}if(i===this.iLeadIndex){l=-1}}this._update(s,l,c);return this};
sap.ui.model.SelectionModel.prototype.clearSelection=function(){if(this.aSelectedIndices.length>0||this.iLeadIndex!==-1){this._update([],-1,this.aSelectedIndices.slice())}return this};
sap.ui.model.SelectionModel.prototype.attachSelectionChanged=function(d,f,l){this.attachEvent("selectionChanged",d,f,l);return this};
sap.ui.model.SelectionModel.prototype.detachSelectionChanged=function(f,l){this.detachEvent("selectionChanged",f,l);return this};
sap.ui.model.SelectionModel.prototype.fireSelectionChanged=function(a){this.fireEvent("selectionChanged",a);return this};
sap.ui.model.SelectionModel.prototype._update=function(s,l,c){var p={rowIndices:c&&c.sort(this.fnSort)};this.aSelectedIndices=s;if(this.iLeadIndex!==l){this.iLeadIndex=l;p.leadIndex=l}if(c.length>0||typeof p.leadIndex!=="undefined"){this.fireSelectionChanged(p)}};
