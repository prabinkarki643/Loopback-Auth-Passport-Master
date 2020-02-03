// // Copyright IBM Corp. 2016. All Rights Reserved.
// // Node module: loopback-workspace
// // This file is licensed under the MIT License.
// // License text available at https://opensource.org/licenses/MIT

// 'use strict';

// module.exports = function(app) {
//   // enable loopback-passport
// var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
// var passportConfigurator = new PassportConfigurator(app);

// // Load the provider configurations
// var config = {};
// try {
//  config = require('../providers.json');
// } catch(err) {
//  console.error('Please configure your passport strategy in `providers.json`.');
//  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
//  process.exit(1);
// }

// // Initialize passport
// passportConfigurator.init();

// // Set up related models

// passportConfigurator.setupModels({
//   userModel: app.models.customer,
//   userIdentityModel: app.models.userIdentity,
//   userCredentialModel: app.models.userCredential
//  });

//   // Configure passport strategies for third party auth providers
// for(var s in config) {
//   var c = config[s];
//   c.session = c.session !== false;
//   passportConfigurator.configureProvider(s, c);
//  }

// };
