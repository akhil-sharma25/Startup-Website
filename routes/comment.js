var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground.js");
var Comment=require("../models/comment.js");
var middleObject=require("../middleware/index.js");
router.get("/new",middleObject.isLogin,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log("error");
			console.logO(err);
		}
		else{
			res.render("comment/new.ejs",{campground:campground});
		}
	});
});

router.post("/",middleObject.isLogin,function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campground");
		}
		else{
		Comment.create(req.body.comment,function(err,comment){
		if(err){
			console.log(err);
			
			res.redirect("/campground");
		}
		else{
			comment.author.id=req.user._id;
			comment.author.username=req.user.username;
			comment.save();
			campground.comments.push(comment);
			campground.save();
			req.flash("success","Comment Added!");
			res.redirect("/campground/"+campground._id);
		}
			
						      
	});
		}
		});
});
router.get("/:comment_id/edit",middleObject.checkAuthComm,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}
		else{
			res.render("comment/edit.ejs",{campground_id:req.params.id,comment:foundComment});
		}
	});
});
router.put("/:comment_id",function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
				if(err){
					console.log(err);
					res.redirectr("back");
				}
				else{
					req.flash("success","Comment Updated!");
					res.redirect("/campground/"+req.params.id);
				}
		});
});
router.delete("/:comment_id",middleObject.checkAuthComm,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		}
		else{
			req.flash("success","Comment Deleted!");
			res.redirect("/campground/"+req.params.id);
		}
	});
});
module.exports=router;