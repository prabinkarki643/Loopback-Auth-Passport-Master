"use strict"
const app = require('../server/server')
const ds = app.datasources.mysqlDS;
var allModels = [
  'customer',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
  'meetup',
  'Order',
  'Product',
  'OrderItem',
  'CreditCard'
]
ds.autoupdate(allModels,err=>{
  if(err) throw err;
  console.log("models synced! with autoupdate");
  ds.disconnect();
  process.exit();
})
