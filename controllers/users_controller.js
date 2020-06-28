module.exports.profile = function(req,res){
    // res.end('<h1>User profile</h1>');
    return res.render('user_profile',{
        title:"User Profile"
    });
}

//render the sign up page
module.exports.signUp = function(req,res)
{
    return res.render('user_sign_up',{
        title : "Codeial | SignUp"
    })
}

//render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | SignIn"
    })
}

//get the sign up data
module.exports.create = function(req,res)
{
    //TODO later
}

//Sign in and create session for user
module.exports.createSession = function(req,res)
{
    //TODO later
}