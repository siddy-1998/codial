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

//update name and email

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){

        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Name/Email updated successfully!');
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
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
        res.flash('error','Entered password do not match');
        return res.redirect('back');
    }

    User.findOne({ email : req.body.email },function(err,user){
        
        if(err){
            //console.log('error in finding user in signing up');
            req.flash('error', err);
             return res.redirect('back');
            }

        if(!user){
            //new user , then create user and redirect to sign in page
           User.create(req.body,function(err,user){
             
            if (err) {  
                //console.log('error in finding user in signing up'); 
                 req.flash('error', err);
                return res.redirect('back');
            }

            req.flash('success','User successfully created');
            
            return res.redirect('/users/sign-in');

           });
        }else{
            //if user already exist redirect to same page i.e sign up page

            req.flash('error','User already exists');
            return res.redirect('back');
        }
    });
}

//Sign in and create session for user
module.exports.createSession = function(req,res)
{
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

//destroy session and sign out
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success', 'You have logged out!!');

    return res.redirect('/');
}