//create the ApplicationHeader control
var oAppHeader = new sap.ui.commons.ApplicationHeader("appHeader"); 
//configure the branding area
oAppHeader.setLogoSrc("http://www.res1.scsstatic.ch/etc/designs/header/clientlibs/publish/themes/default/resources/images/logo.png");
oAppHeader.setLogoText("HANA Fuzzy Search Tutorial");
oAppHeader.setDisplayWelcome(false);
oAppHeader.setDisplayLogoff(false);
oAppHeader.placeAt("header");	