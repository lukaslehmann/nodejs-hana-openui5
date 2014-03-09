//read URL for ajax request
var url = document.getElementsByTagName("body")[0].getAttribute("data-url") + '/search?name=';  
//response data holder
var resp_data = [];
//create search input field
var oSearchField = new sap.ui.commons.TextField({
	id: 'search_field',
	width : '15em',
	liveChange : function(oEvent){
		//prepare ajax request url with parameter name
		ajax_url = url + oEvent.mParameters.liveValue;
		//ajax request on /search?name=<search term>
		$.ajax({
			url: ajax_url,  
			dataType: "json",
			success: function(data, textStatus, jqXHR) { 
				resp_data = data;
				oModel.setData({modelData: resp_data});
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("error");
			}
		});				
	}
	}).placeAt("search");

//create search button
var oSearchButton = new sap.ui.commons.Button({
	text : "Search",
	press : function() {
		//we do not really need this ;)
	}
	});
oSearchButton.placeAt("search");

//Create an instance of the table control
var oTable = new sap.ui.table.Table({
	title: "Results",
	visibleRowCount: 10,
	firstVisibleRow: 3,
	selectionMode: sap.ui.table.SelectionMode.Single,
});
//add columns
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Score"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "SCORE"),
	sortProperty: "score",
	filterProperty: "score",
	width: "75px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Customer nr."}),
	template: new sap.ui.commons.TextView().bindProperty("text", "ID"),
	sortProperty: "id",
	filterProperty: "id",
	width: "100px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Company Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "COMPANY_NAME"),
	sortProperty: "companyName",
	filterProperty: "companyName",
	width: "200px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Last Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "LAST_NAME"),
	sortProperty: "lastName",
	filterProperty: "lastName",
	width: "100px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "First Name"}),
	template: new sap.ui.commons.TextField().bindProperty("value", "FIRST_NAME"),
	sortProperty: "name",
	filterProperty: "name",
	width: "100px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Address"}),
	template: new sap.ui.commons.TextField().bindProperty("value", "ADDRESS"),
	sortProperty: "address",
	filterProperty: "address",
	width: "150px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "ZIP"}),
	template: new sap.ui.commons.TextField().bindProperty("value", "ZIP"),
	sortProperty: "phone",
	filterProperty: "phone",
	width: "100px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "City"}),
	template: new sap.ui.commons.TextField().bindProperty("value", "CITY"),
	sortProperty: "city",
	filterProperty: "city",
	width: "100px"
}));		
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Country"}),
	template: new sap.ui.commons.TextField().bindProperty("value", "COUNTRY"),
	sortProperty: "country",
	filterProperty: "country",
	width: "100px"
}));
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "E-Mail"}),
	template: new sap.ui.commons.TextField().bindProperty("value", "EMAIL"),
	sortProperty: "email",
	filterProperty: "email",
	width: "175px"
}));				
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Phone"}),
	template: new sap.ui.commons.TextField().bindProperty("value", "PHONE"),
	sortProperty: "phone",
	filterProperty: "phone",
	width: "125px"
}));		
oTable.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Web Site"}),
	template: new sap.ui.commons.Link().bindProperty("text", "WEB").bindProperty("href", "WEB"),
	sortProperty: "linkText",
	filterProperty: "linkText"
}));

//Create a model and bind the table rows to this model
var oModel = new sap.ui.model.json.JSONModel();
//set resp_data as datasource
oModel.setData({modelData: resp_data});
oTable.setModel(oModel);
oTable.bindRows("/modelData");

//Bring the table onto the UI 
oTable.placeAt("table");