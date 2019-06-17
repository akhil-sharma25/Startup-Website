var middleObject={};
var Campground=require("../models/campground.js");
var Comment=require("../models/comment.js");
middleObject.isLogin= function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to Login first!!");
	res.redirect("/login");
};
middleObject.checkAuthComm=function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundOne){
			if(err){
				req.flash("Oops Something went wrong!!");
				console.log(err);
				res.redirect("back");
			}
			else{
				if(foundOne.author.id.equals(req.user._id) || req.user.isAdmin==true){
					next();
				}
				else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error","You need to Login first!");
		res.redirect("back");
	}
};
middleObject.checkAuth=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundOne){
			if(err){
				console.log(err);
				res.redirect("back");
			}
			else{
				if(foundOne.author.id.equals(req.user._id) || req.user.isAdmin==true){
					next();
				}
				else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error","You need to Login first!");
		res.redirect("back");
	}
};
module.exports=middleObject;