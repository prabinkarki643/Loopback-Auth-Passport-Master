'use strict';

module.exports = function(Customer) {

// register verifyUserByEmailId RemoteMethod
Customer.verifyUserByEmailId = function (emailId,cb) {
  Customer.findOne({where:{email:emailId}})
  .then(customer=>{
    if(!customer){
      throw new Error("can't find user of specific email id")
    }
    var verifyOptions = {
      type: 'email',
      to: customer.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      html: '<div>Click to verify email</div>',
      redirect: '/verified',
      user: customer
    };
    customer.verify(verifyOptions, function(err, response, next) {
      if (err) throw err
      console.log('> verification email sent:', response);
      cb(null,"Signed up successfully, Please check your email and click on the verification link before logging in")
    });

  })
  .catch(err=>{
    cb(err)
  })
}
Customer.remoteMethod('verifyUserByEmailId',{
  http:{
    verb:'get',
    path:'/:emailId/verify-by-emailId'
  },
  accepts:{
    arg:'emailId',
    type:'string'
  },
  returns:{
    arg:"message",
    type:'string'
  }
})




//afterRemoteMethod
Customer.afterRemote('create', function(context, userInstance, next) {
  console.log('> user.afterRemote triggered');

  var verifyOptions = {
    type: 'email',
    to: userInstance.email,
    from: 'noreply@loopback.com',
    subject: 'Thanks for registering.',
    html: '<div>Click to verify email</div>',
    redirect: '/verified',
    user: userInstance
  };

  userInstance.verify(verifyOptions, function(err, response, next) {
    if (err) return next(err);
    console.log('> verification email sent:', response);
    context.res.send("Signed up successfully, Please check your email and click on the verification link before logging in")
  });
});



//send password reset link when requested
Customer.on('resetPasswordRequest', function(info) {
  console.log("Info",info);
  var url = 'http://localhost:3001' + '/reset-password';
  var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    Customer.app.models.Email.send({
    to: info.email,
    from: 'noreply@loopback.com',
    subject: 'Password reset',
    html: html
  }, function(err) {
    if (err) return console.log('> error sending password reset email');
    console.log('> sending password reset email to:', info.email);
  });
});

};
