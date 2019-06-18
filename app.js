require("dotenv").config();
var express=require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Seeds = require("./seeds.js");
var passport=require("passport");
var LocalStretagy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var Comment =require("./models/comment.js");
var User = require("./models/user.js");
var campgroundRoute=require("./routes/campground.js");
var commentRoute=require("./routes/comment.js");
var indexRoute=require("./routes/index.js");
var methodOverride=require("method-override");
var flash=require("connect-flash");
mongoose.connect("mongodb+srv://Akhil:Akhil123%23@yelpcamp-vpu52.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true , useCreateIndex:true});
// mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true });
var port = process.env.PORT || 3000;
// mongoose.connect('mongodb+srv://Akhil_Sharma:Akhil123%23@cluster0-ixixv.mongodb.net/test?retryWrites=true&w=majority', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true
// }).then(() => {
// 	console.log('Connected to DB!');
// }).catch(err => {
// 	console.log('ERROR:', err.message);
// });
app.use(flash());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
	secret:"Rusty is not a cute dog",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStretagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});
//Seeds();
app.use("/campground",campgroundRoute);
app.use("/campground/:id/comment",commentRoute);
app.use(indexRoute);
// app.listen(3000);

app.listen(process.env.PORT || 3000);
