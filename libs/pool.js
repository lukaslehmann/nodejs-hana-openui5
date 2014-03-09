//needed modules
var gp = require('generic-pool');
var hdb = require('hdb');

//parse the environement variables
if(process.env.VCAP_SERVICES){
  //app is running in the cloud
  //parse the environement variabels to get the credentials
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
    host     : 'hana04.sap-cc.com',
    port     : 30015,
    user     : 'user',
    password : 'password',
    database : 'CFS_B22B4AF8_B13C_4256_BDF0_F8250502074A'
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
      var sql = 'select TOP 30 TO_DECIMAL(SCORE(),3,2) AS score, * from ' + client._settings.database + '.CUSTOMERS where contains((company_name, first_name, last_name), ? , FUZZY(0.5)) ORDER BY score DESC';
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