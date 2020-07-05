const User = require('../models/user');

module.exports.profile = function(req,res){
    // res.end('<h1>User profile</h1>');

    User.findById(req.params.id,function(err,user){
         return res.render('user_profile', {
             title: "User Profile",
             profile_user : user
         });

    });
   
}

//render the sign up page
module.exports.signUp = function(req,res)
{  
    //if user is already signed in
   if(req.isAuthenticated()){
       return res.redirect('/users/profile')
   }

    return res.render('user_sign_up',{
        title : "Codeial | SignUp"
    })
}

//render the sign in page
module.exports.signIn = function (req, res) {

     //if user is already signed in
     if (req.isAuthenticated()) {
         return res.redirect('/users/profile')
     }

    return res.render('user_sign_in', {
        title: "Codeial | SignIn"
    })
}

//get the sign up data
module.exports.create = function(req,res)
{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({ email : req.body.email },function(err,user){
        
        if(err){console.log('error in finding user in signing up'); return;}

        if(!user){
            //new user , then create user and redirect to sign in page
           User.create(req.body,function(err,user){
             
            if (err) {  console.log('error in finding user in signing up');  return; }
            
            return res.redirect('/users/sign-in');

           });
        }else{
            //if user already exist redirect to same page i.e sign up page
            return res.redirect('back');
        }
    });
}

//Sign in and create session for user
module.exports.createSession = function(req,res)
{
    return res.redirect('/');
}

//destroy session and sign out
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}