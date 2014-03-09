/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Table");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.ListBase");sap.m.ListBase.extend("sap.m.Table",{metadata:{library:"sap.m",properties:{"backgroundDesign":{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:sap.m.BackgroundDesign.Translucent}},aggregations:{"columns":{type:"sap.m.Column",multiple:true,singularName:"column"}}}});
sap.m.Table.prototype.init=function(){this._hasPopin=false;this._selectAllCheckBox=null;sap.m.ListBase.prototype.init.call(this)};
sap.m.Table.prototype.onBeforeRendering=function(){sap.m.ListBase.prototype.onBeforeRendering.call(this);this.getDomRef()&&this._notifyColumns("ItemsRemoved");this._navRenderedBy=""};
sap.m.Table.prototype.onAfterRendering=function(){sap.m.ListBase.prototype.onAfterRendering.call(this);var $=jQuery(this.getTableDomRef());this._navRenderedBy&&$.addClass("sapMListTblHasNav");this._notifyColumns("ColumnRendered",$);this.updateSelectAllCheckbox()};
sap.m.Table.prototype.exit=function(){sap.m.ListBase.prototype.exit.call(this);if(this._selectAllCheckBox){this._selectAllCheckBox.destroy();this._selectAllCheckBox=null}};
sap.m.Table.prototype.destroyAggregation=function(a){a=="items"&&this._notifyColumns("ItemsRemoved");return sap.m.ListBase.prototype.destroyAggregation.apply(this,arguments)};
sap.m.Table.prototype.removeAllAggregation=function(a){a=="items"&&this._notifyColumns("ItemsRemoved");return sap.m.ListBase.prototype.removeAllAggregation.apply(this,arguments)};
sap.m.Table.prototype.removeSelections=function(){sap.m.ListBase.prototype.removeSelections.apply(this,arguments);this.updateSelectAllCheckbox();return this};
sap.m.Table.prototype.selectAll=function(){sap.m.ListBase.prototype.selectAll.apply(this,arguments);this.updateSelectAllCheckbox();return this};
sap.m.Table.prototype.getColumns=function(s){var c=this.getAggregation("columns",[]);if(s){c.sort(function(a,b){return a.getOrder()-b.getOrder()})}return c};
sap.m.Table.prototype.onAfterPageLoaded=function(){this.updateSelectAllCheckbox();this._navRenderedBy&&jQuery(this.getTableDomRef()).addClass("sapMListTblHasNav");sap.m.ListBase.prototype.onAfterPageLoaded.apply(this,arguments)};
sap.m.Table.prototype.onItemSetSelected=function(i,s){sap.m.ListBase.prototype.onItemSetSelected.apply(this,arguments);jQuery.sap.delayedCall(0,this,function(){this.updateSelectAllCheckbox()})};
sap.m.Table.prototype.ontouchstart=function(e){if(sap.m.ListBase.prototype.ontouchstart){sap.m.ListBase.prototype.ontouchstart.call(this,e)}if(this._hasPopin){sap.m.ColumnListItem.handleEvents(e,"touchstart",this.getDomRef())}};
sap.m.Table.prototype.ontap=function(e){if(this._hasPopin){sap.m.ColumnListItem.handleEvents(e,"tap",this.getDomRef())}};
sap.m.Table.prototype.getTableDomRef=function(){return jQuery.sap.domById(this.getId("listUl"))};
sap.m.Table.prototype.getItemsContainerDomRef=function(){return jQuery.sap.domById(this.getId("tblBody"))};
sap.m.Table.prototype.onColumnResize=function(c){if(!this._hasPopin&&!this._mutex){var h=this.getColumns().some(function(b){return b.isPopin()});if(!h){c.setDisplayViaMedia(this.getTableDomRef());return}}this._dirty=window.innerWidth;if(!this._mutex){var a=window.innerWidth;this._mutex=true;this.rerender();jQuery.sap.delayedCall(200,this,function(){if(Math.abs(this._dirty-a)>10){this._dirty=0;this.rerender()}this._mutex=false})}};
sap.m.Table.prototype.setTableHeaderVisibility=function(c){if(!this.getDomRef()){return}var $=jQuery(this.getTableDomRef()),a=$.find("thead > tr"),h=!a.hasClass("sapMListTblHeaderNone"),v=a.find(".sapMListTblCell").filter(":visible"),b=v.eq(0);if(v.length==1){b.width("")}else{b.width(b.attr("data-sap-orig-width"))}if(!c&&h){a[0].className="sapMListTblRow sapMListTblHeader"}else if(c&&!h&&!v.length){a[0].className="sapMListTblHeaderNone"}};
sap.m.Table.prototype._notifyColumns=function(a,p){this.getColumns().forEach(function(c){c["on"+a](p)})};
sap.m.Table.prototype._getSelectAllCheckbox=function(){return this._selectAllCheckBox||(this._selectAllCheckBox=new sap.m.CheckBox(this.getId("sa"),{activeHandling:false,}).setParent(this,null,true).attachSelect(function(){if(this._selectAllCheckBox.getSelected()){this.selectAll(true)}else{this.removeSelections(false,true)}},this).setTabIndex(-1))};
sap.m.Table.prototype.updateSelectAllCheckbox=function(){if(this._selectAllCheckBox&&this.getMode()==="MultiSelect"){var i=this.getItems(),s=i.length,a=this.getSelectedItems().length;i.forEach(function(I){if(!I.isSelectable()){s--}});this._selectAllCheckBox.setSelected(!!i.length&&a==s)}};
sap.m.Table.prototype.getColSpan=function(){return(this._colCount||1)-1};
sap.m.Table.prototype.getColCount=function(){return(this._colCount||0)};
sap.m.Table.prototype.hasPopin=function(){return!!this._hasPopin};
