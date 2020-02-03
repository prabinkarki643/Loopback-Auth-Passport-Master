const server = require('../server')
const loopback = require('loopback')
const path = require('path')
exports.sendEmail = function sendEmail() {
  var renderer = loopback.template(path.resolve('views/emailTemplates/welcome.ejs'));
  html_body = renderer({name:"Prabin Karki"});
  server.models.Email.send({
    to: 'p@meemmemory.com',
    from: 'pravinkarki143.pk@gmail.com',
    subject: 'my subject',
    text: 'my text',
    html: html_body
  }, function(err, mail) {
    if(err=>{
      console.log("Error sending mail",err);
    })
    console.log('email sent!',mail);
  });
}
