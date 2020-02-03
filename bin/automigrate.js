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
ds.automigrate(allModels,err=>{
  if(err) throw err;
  console.log("models synced! with automigrate");
  ds.disconnect();
  process.exit();
})
