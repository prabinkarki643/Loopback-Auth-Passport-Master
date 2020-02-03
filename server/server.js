// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var morgan = require('morgan')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var {sendEmail} =require('./utils/SupportingFiles')
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);


app.middleware('auth', loopback.token({
  model: app.models.accessToken
}));
// Enable http session
app.middleware('session:before', cookieParser('cookieSecret'));
app.middleware('session', session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true,
}));


//Now setting up the static files..
app.use('/static', loopback.static(__dirname + '../views/static'));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(morgan('dev'));

// app.get("/auth/facebook/callback",(req,res,next)=>{
//   res.send("login with facebook successfull!!!")
// })

app.get("/auth/account",(req,res,next)=>{
  console.log("/auth/account CALLED ******",req);
  res.json({message:"Login  successfull",data:req.accessToken})
})

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


// Load the provider configurations
var config = {};
try {
  config = require('./providers.json');
} catch(err) {
  console.error('Please configure your passport strategy in `providers.json`.');
  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
  process.exit(1);
}
// Initialize passport
passportConfigurator.init();

// Set up related models
passportConfigurator.setupModels({
  userModel: app.models.User,
  userIdentityModel: app.models.UserIdentity,
  userCredentialModel: app.models.UserCredential
});
// Configure passport strategies for third party auth providers
for(var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
