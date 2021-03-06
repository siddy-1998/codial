const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){

    Post.create({
        content : req.body.content,
        user : req.user._id
    },function(err,post){
        if(err){
            //console.log('error in creating a post');
        req.flash('error', err);
         return res.redirect('back');

        }

        req.flash('success','Post published!');
        return res.redirect('back');
    });

}

module.exports.destroy = async function(req,res){


    try{

        let post = await Post.findById(req.params.id);
        //.id means converting the object _id to string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({
                post: req.params.id
            });
            
            req.flash('success','Post and associated comments deleted!')
            return res.redirect('back');

        } else {
         req.flash('error', 'Unauthorized');

            return res.redirect('back');
        }

    } catch (err) {
        //console.log('Error', err);
         req.flash('error', err);
          return res.redirect('back');
    }

    
    
}