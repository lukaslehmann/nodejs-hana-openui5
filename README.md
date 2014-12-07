# SAP HANA, NodeJS & openUI5 on Cloudfoundry 

This tutorial shows you how to deploy an application which uses openUI5 as frontend, NodeJS as backend and SAP HANA as database.
Regulary SAP and SAP databases need a huge landscape which is not really fast and needs a lot of customizations. A big advantage of this use case is the very fast SAP HANA database. We use it directly from our NodeJS backend without any middleware.
Because of this architecture we're able to request our data really fast.
<br />
This is the architectural overview: 
![alt text](https://s3-eu-west-1.amazonaws.com/swisscom-its/nodjs-hana/architecture.png "Architecture")
<br />
To demonstrate the fast usage of HANA we provide a freestyle fuzzy search([wikipedia](http://en.wikipedia.org/wiki/Fuzzy_search)) over three columns and a big amount of data. Follow the tutorials to understand how it works.

<br />
There are two different types of tutorials:
+ <b>Kickstarter steps: </b>a short introduction on how to use this repository and what you have to do when you clone it.
+ <b>Step by step tutorial: </b>you learn to setup a NodeJS application and how to use a database service in Cloudfoundry.


## Kickstarter steps

This is a short introduction on how to use this repository for advanced developers who have an account on the Swisscom AppCloud or on another CloudFoundry service provider.

1. Clone the repository to your local environment  
"git clone https://github.com/lukaslehmann/nodejs-hana-openui5"
2. Go into the directory - "cd nodejs-hana-openui5"
3. Create a hanadb service - "cf cs hanadb free search"
3. cf push
4. Get the environment variables with "cf env hdb-backend-lukas"
5. Generate Fake Data
  1. Install the SAP HANA Studio([Download Link](https://hanadeveditionsapicl.hana.ondemand.com/hanadevedition/))
  2. Download the Demo data([100'000 datasets](https://s3-eu-west-1.amazonaws.com/swisscom-its/us-100000.csv) or [1 Million datasets](https://s3-eu-west-1.amazonaws.com/swisscom-its/us-1000000.csv))
  3. Add the HANA System with the credentials you got in step 4. 
  4. Use the script create_hana_tables.sql to create the tables on your schema.
  5. Import the downloaded csv into your SAP HANA studio via File->Import(picture at the end).
6. Enjoy and donate! :)

## Step by step tutorial
Learn how to write and deploy a NodeJS application with SAP HANA and openUI5.
Before starting with step 1 check the following requirements.
Requirements:
* installed NodeJS([Download Link](http://nodejs.org/))
* Installed the SAP HANA Studio([Download Link](https://hanadeveditionsapicl.hana.ondemand.com/hanadevedition/))
* Downloaded the demodata([Download Link](https://s3-eu-west-1.amazonaws.com/swisscom-its/us-1000000.csv))
* Account on a CloudFoundry Service Provider

As a prestep we will create the folderstructure for a usual NodeJS project.<br />
hana-example<br />
|<br />
+--libs<br />
|<br />
+--public<br />
|<br />
+--views<br />

1. Firstly we have to create a file named <b> package.json </b> with information about the application including the node modules we need. We use express as web application framework, jade as frontend engine, hdb is our HANA database client and we need generic-pool to create a connection pool to our database.

```JSON
{
  "name": "hdb-example",
  "version": "0.0.1",
  "author": "Lukas Lehmann",
  "dependencies": {
    "express": "3.1.x",
    "hdb": "0.3.8",
    "jade": "~1.0.2",
    "generic-pool": "~2.0.4"
  },
  "engines": {
    "node": "0.10.x",
    "npm": "1.2.x"
  }
}
```

2. After this we need to install the required node modules via the node package manager(npm). To do this, use <b> npm install </b> 
	within the console on the directory which we have created before.

3. Now we can start with coding. Yay! As the main step we create all the functions we need to operate with HANA. For this we use the node module hdb, which we downloaded before.
	Here we will set up here a connection pool for our database connection. In this step you can also see how to parse the database credentials for your SAP HANA Service. These credentials were saved in the environment variables of the container during the start. Now we'll prepare the SQL statement which we'll use later. Create the file pool.js under the lib folder with the following content:

```javascript
//needed modules
var gp = require('generic-pool');
var hdb = require('hdb');

if(process.env.VCAP_SERVICES){
  //app is running in the cloud
  // parse the environement variabels to get the credentials
  var svcs = JSON.parse(process.env.VCAP_SERVICES);
  var credentials = svcs['hanadb'][0].credentials;
  var options = {
    host     : credentials.hostname,
    port     : credentials.port,
    user     : credentials.username,
    password : credentials.password,
    database : credentials.name
  };
}
else{
  //local setup - credentials used if app is runnig local
  var options = {
    host     : 'localhost/yourserver',
    port     : 30015,
    user     : 'username',
    password : 'password',
    database : 'schema'
   };
}


//describe connection pool
var pool = gp.Pool({
  name: 'hdb',
  //descripe the create functions
  create: function create(callback) {
    var client = hdb.createClient(options);
    client.hadError = false;
    //check errors
    client.once('error', function onerror(err) {
      console.error('Client error:', err);
      client.hadError = true;
    });
    client.connect(function onconnect(err) {
      if (err) {
        return callback(err);
      }
      //fuzzy search SQL statement
      var sql = 'select TOP 30 TO_DECIMAL(SCORE(),3,2) AS score, * from ' + client._settings.database + '.CUSTOMERS where contains(TA_TOKEN, ? , FUZZY(0.6)) ORDER BY score DESC';
        //prepare statement
        client.prepare(sql, function (err, statement){
          if (err) {
            return console.error('Error:', err);
          } 
          else {
            //register statement
            req_statement = statement;
          }
        });
      callback(null, client);
    });
  },
  //describe the destroy function
  destroy: function destroy(client) {
    // if the client is already closed don't call end
    if (!client.hadError && client.readyState !== 'closed') {
      client.end();      
    }
  },
  // validate is called before a client is acquired from pool.
  // If the client is not connected it should be removed from pool. 
  validate: function validate(client) {
    return (!client.hadError && client.readyState === 'connected');
  },
  //max 5 con current connections - because of free plan
  max: 30,
  //everytime min 1 connection to hdb should be open
  min: 1,
  //connection timeout 5 minutes
  idleTimeoutMillis: 300000,
  log: false
});

//handle object acquisition for hdb client
var pooledFn = pool.pooled(function(client, arg, cb) {
  cb(null, arg);
});
//export file as module
exports = module.exports = pool;
```

5. As a next step, we will create our main part of the backend hdb_example.js in the root folder which starts the server including the node express framework and supports get requests on / and /search with parameter name(/search?name=foo). 

```javascript
//needed modules
var express = require("express");
var app = express()
  , server = require('http').createServer(app);
var pool = require('./libs/pool.js');

//configure the express settings
app.configure(function () {
  //vies are in folder views
  app.set('views', __dirname + '/views'); 
  //we use jade as view engine
  app.set('view engine', 'jade'); 
  app.use(app.router);
  //all the scripts we need for the client UI are in folder public
  app.use(express.static(__dirname + '/public')); 
});

//set the ajax request URL
if(process.env.VCAP_APPLICATION){
  //app is running in the cloud
  var application = JSON.parse(process.env.VCAP_APPLICATION);
  var uris = application['uris'][0];
  var url = "http://" + uris;
}
else{
  //for local testing
  var url = "http://localhost:3000";
}

//start server, on CF use binded port
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Listening on " + url + port);
  console.log(pool.getPoolSize() + " running hdb clients");
});

//get main - index
app.get('/', function(req, res) {
  res.render('index', { req_url: url });
});

//return JSON for requests on app/search?name=
app.get('/search', function(req, res){
  var name = req.query.name;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //execute the prepared statement
  req_statement.exec([name], function (err, rows) {
    if (err) {
      return console.error('Error:', err);
    }
    else {
      //return results as response
      res.send(rows);  
    } 
  });
});
```

5. In this step we will include the openUI5 library into our project. Download it ([here](https://openui5.hana.ondemand.com/downloads/openui5-runtime-1.16.8-SNAPSHOT.zip)) and integrate it under <b>public/resources</b>(copy&paste).


6. Now we are able to create a layout file which includes every view of the application. For that you need to create a file in<b> views/layout.jade </b>. This file has to contain the following code. The attribute data-url stores the application URL for the Ajax request.
```Haml
doctype html
html
	head
		title Hana Sample
		script#sap-ui-bootstrap(src='resources/sap-ui-core.js', data-sap-ui-theme='sap_goldreflection', data-sap-ui-libs='sap.ui.commons, sap.ui.table')
		script(type='text/javascript' src='scripts/layout.js')
	body(data-url=locals.req_url)
		.container_12
			#header.grid_12
			#content
				block content
```
7. We have to add the client side JavaScript code for our layout. Include the following code in <b>public/scripts/layout.js</b>. In this script we set the application header:
```javascript
//create the ApplicationHeader control
var oAppHeader = new sap.ui.commons.ApplicationHeader("appHeader"); 
//configure the branding area
oAppHeader.setLogoSrc("http://www.res1.scsstatic.ch/etc/designs/header/clientlibs/publish/themes/default/resources/images/logo.png");
oAppHeader.setLogoText("HANA Fuzzy Search Tutorial");
oAppHeader.setDisplayWelcome(false);
oAppHeader.setDisplayLogoff(false);
oAppHeader.placeAt("header");	
```

8. As we now have a layout, we can create the <b>views/index.jade</b> file which contains the main UI part of the application.
```Haml
extends layout
block content
	script(type='text/javascript' src='scripts/index.js')
			
	#header
	h3 Search over 1 Million customer Data!
	p the fuzzy search goes through company name, first and last name. 
	p i. e. type colin
	#search
	h3 Powered by SAP HANA
	#table
	br
	a(href='mailto:lukas.lehmann@swisscom.com') Questions, improvements?
```

9. The next step is to include the client side JavaScript for the newly created index.js file under the public/scripts folder. In this code we create objects for the search input field, the button and the table. 

```javascript
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
```

8. Congratulaions, you have finished the development! Now we can push the application to the Swisscom Cloud. Make sure that you're logged in(successful cf login). Use <b> cf push --command "node hdb_example.js" </b> to push the application to 
the Swisscom environment. The parameter command starts the NodeJS server after a successful push. Be sure that you create a <b> SAP HANA Database service </b> while pushing.
You can also run it locally with <b> node hdb_example.js </b>.

9. Now we need to import sample data into our database so that we can test the application. Use the command <b>cf logs</b> to get the database credentials(shown in logs/env.log) or you can check your credentials under developer.swisscom.com. Make sure that you have installed SAP HANA Studio and downloaded the demo data(requirements). Open the HANA Studio and add a system with the credentials you got before(instance number: 00). Hint: To add a system, go to the system administrator view and use right click. You need to create the tables on your schema with this SQL script:

```SQL
SET SCHEMA <your schema>;

CREATE COLUMN TABLE CUSTOMERS (
  ID INTEGER NOT NULL,
  FIRST_NAME varchar(250) NULL,
  LAST_NAME varchar(250) NULL,  
  COMPANY_NAME varchar(250) NULL,
  ADDRESS varchar(250) NULL,
  CITY varchar(250) NULL,   
    COUNTRY varchar(250) NULL,  
  ZIP varchar(10) NULL,
  PHONE varchar(30) NULL, 
  EMAIL varchar(80) NULL,
  WEB varchar(250) NULL,
  TA_TOKEN varchar(500) NULL
     );
     
-- fulltext search / optimized for fuzzy search
Create FullText Index "FUZZY_SEARCH_INDEX" On "CUSTOMERS"("TA_TOKEN")
FUZZY SEARCH INDEX ON
FAST PREPROCESS on;


```
You can now import your data via <b>File->Import...->SAP HANA Content->Data from local file</b>.
Import data with following options:
![alt text](https://s3-eu-west-1.amazonaws.com/swisscom-its/nodjs-hana/csv_import_hana.png "*.csv import HANA")
