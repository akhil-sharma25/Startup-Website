var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var middleObject=require("../middleware/index.js");
var NodeGeocoder = require('node-geocoder');
var configure=require("../confi.js");
var key=configure.My_Key;
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey:key,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);
router.get("/" , function(req , res){
	// res.render("campground.ejs" , {campground:campground});
	Campground.find({},function(err , Campgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campground/campground.ejs" , {campground:Campgrounds});
		}
	});
});
router.get("/new", middleObject.isLogin,function(req , res){
	res.render("campground/form.ejs");
});
router.post("/",middleObject.isLogin,function(req , res){
	var name=req.body.name;
	var image=req.body.image;
	var dis=req.body.discription;
	var price=req.body.price;
	geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
		console.log(err);
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
	console.log(lat);
		console.log(lng);
		console.log(location);
	var campgroun={name:name, price:price,image:image , discription:dis,location:location,lat:lat,lng:lng};
	Campground.create(campgroun , function(err , campground){
		if(err){
			console.log(err);
		}
		else{
			campground.author.id=req.user._id;
			campground.author.username=req.user.username;
			campground.save();
			req.flash("success","Campground Added");
			res.redirect("/campground");
		}
	});
	});
	// campground.push(campgroun);
	// res.redirect("/campground");
});
router.get("/:id" , function(req , res){
	var front=configure.Front_Key;
	var id = req.params.id;
	Campground.findById(id).populate("comments").exec(function(err,foundCamp){
		if(err){
			console.log(err);
		}
		else{
			
			//console.log(front);
			//console.log(foundCamp);
			res.render("campground/show.ejs" ,{camp:foundCamp,front:front});	
		}
	});
});
router.get("/:id/edit", middleObject.checkAuth,function(req,res){
		Campground.findById(req.params.id,function(err,foundCamp){
				res.render("campground/edit.ejs",{campground:foundCamp});
		});
	});
router.put("/:id",function(req,res){
	geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCamp){
		if(err){
			console.log(err);
		}
		else{
			req.flash("success","Campground Updated");
			res.redirect("/campground/"+req.params.id);		
		}
	});
});
});
router.delete("/:id",middleObject.checkAuth,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
	if(err){
		console.log(err);
		res.redirect("/campground");
	}
	else{
		req.flash("success","Campground Deleted");
		res.redirect("/campground");
	}
	});
});	

module.exports=router;