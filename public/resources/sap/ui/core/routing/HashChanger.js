// Copyright (c) 2013 SAP AG, All Rights Reserved
jQuery.sap.declare("sap.ui.core.routing.HashChanger");jQuery.sap.require("sap.ui.base.EventProvider");jQuery.sap.require("sap.ui.thirdparty.signals");jQuery.sap.require("sap.ui.thirdparty.hasher");sap.ui.base.EventProvider.extend("sap.ui.core.routing.HashChanger",{constructor:function(){sap.ui.base.EventProvider.apply(this)}});
sap.ui.core.routing.HashChanger.prototype.init=function(){if(this._initialized){jQuery.sap.log.info("this HashChanger instance has already been initialized.");return false}hasher.changed.add(this.fireHashChanged,this);if(!hasher.isActive()){hasher.initialized.addOnce(this.fireHashChanged,this);hasher.init()}else{this.fireHashChanged(hasher.getHash())}return this._initialized=true};
sap.ui.core.routing.HashChanger.prototype.fireHashChanged=function(n,o){this.fireEvent("hashChanged",{newHash:n,oldHash:o})};
sap.ui.core.routing.HashChanger.prototype.setHash=function(h){this.fireEvent("hashSet",{sHash:h});hasher.setHash(h)};
sap.ui.core.routing.HashChanger.prototype.replaceHash=function(h){this.fireEvent("hashReplaced",{sHash:h});hasher.replaceHash(h)};
sap.ui.core.routing.HashChanger.prototype.getHash=function(){return hasher.getHash()};
sap.ui.core.routing.HashChanger.prototype.destroy=function(){hasher.changed.remove(this.fireHashChanged);sap.ui.base.EventProvider.prototype.destroy.apply(this,arguments)};
(function(){var _;sap.ui.core.routing.HashChanger.getInstance=function(){if(!_){_=new sap.ui.core.routing.HashChanger()}return _};sap.ui.core.routing.HashChanger.replaceHashChanger=function(h){if(_){jQuery.extend(h.mEventRegistry,_.mEventRegistry);_.destroy()}_=h}})()
