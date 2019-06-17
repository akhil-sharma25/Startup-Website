var mongoose=require("mongoose");
var yelpSchema = mongoose.Schema({
	name:String,
	price:String,
	image:String,
	discription:String,
	location:String,
	lat:Number,
	lng:Number,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments:[
		{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
		}
	]
});
module.exports = mongoose.model("Campground" , yelpSchema);