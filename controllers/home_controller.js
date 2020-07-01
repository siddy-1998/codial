module.exports.home = function(req,res)
{   // return res.end('<h1>Express is up and running for codial!</h1>');
     
//for viewing and altering cookie
    // console.log(req.cookies);
    // res.cookie('user_id',25);
     
    
    return res.render('home',{
        title:"Home"
    });
}