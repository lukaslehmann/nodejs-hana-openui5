/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.PasswordFieldRenderer");jQuery.sap.require("sap.ui.commons.TextFieldRenderer");sap.ui.commons.PasswordFieldRenderer=sap.ui.core.Renderer.extend(sap.ui.commons.TextFieldRenderer);
sap.ui.commons.PasswordFieldRenderer.renderInnerAttributes=function(r,t){r.writeAttribute('type','password')};
sap.ui.commons.PasswordFieldRenderer.renderTextFieldEnabled=function(r,t){if(!t.getEnabled()&&!t.getEditable()){r.writeAttribute('readonly','readonly');r.writeAttribute('tabindex','-1')}else{r.writeAttribute('tabindex','0')}};
sap.ui.commons.PasswordFieldRenderer.setEnabled=function(t,e){var T=jQuery.sap.domById(t.getId());if(e){if(t.getEditable()){jQuery(T).removeClass('sapUiTfDsbl').addClass('sapUiTfStd');jQuery(T).removeAttr('readonly').attr('tabindex','0')}else{jQuery(T).removeClass('sapUiTfDsbl').addClass('sapUiTfRo');jQuery(T).attr('tabindex','0')}}else{if(t.getEditable()){jQuery(T).removeClass('sapUiTfStd').addClass('sapUiTfDsbl');jQuery(T).attr('readonly','readonly').attr('tabindex','-1')}else{jQuery(T).removeClass('sapUiTfRo').addClass('sapUiTfDsbl');jQuery(T).attr('tabindex','-1')}}};
