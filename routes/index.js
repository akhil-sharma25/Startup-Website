var express=require("express");
var router=express.Router();
var User=require("../models/user.js");
var passport=require("passport");
var middleObject=require("../middleware/index.js");
router.get("/" , function(req , res){
	res.render("landing.ejs");
});



router.get("/register",function(req,res){
	res.render("register.ejs");
});
router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err);
			req.flash("error",err.message);
			return res.render("register.ejs");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campground");
		});
	}); 
});
router.get("/login",function(req,res){
	res.render("login.ejs");
});
router.post("/login",passport.authenticate("local",{
		 	successRedirect:"/campground",
			failureRedirect:"/login",
		 }),function(req,res){
	console.log("Tried!!");
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Log you out");
	res.redirect("/campground");
});
module.exports=router;
